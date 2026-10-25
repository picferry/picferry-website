// 使用 Node 内建 HTTP / WebSocket / test 和本机 Chrome，执行构建后真实页面集成测试。
import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { access, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MANIFEST_URL, R2_PREFIX, RELEASE_BASE } from '../src/lib/release-manifest.js';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json' };
let server, browser, profile, cdp, origin;
let currentManifest;
const browserErrors = [];
const manifestRequests = [];

function fixture(version) {
  // 只通过浏览器请求拦截使用，不进入网站产物或真实发布渠道。
  return {
    schemaVersion: 1, version, publishedAt: '2026-10-24T09:30:00+00:00',
    releaseUrl: `${RELEASE_BASE}/tag/${version}`,
    assets: [['linux', 'x64', 'tar.gz'], ['windows', 'x64', 'zip'], ['android', 'universal', 'apk']].map(([platform, arch, extension], index) => {
      const name = `picferry-${version}-${platform}-${arch}.${extension}`;
      return { platform, arch, name, size: (index + 1) * 1048576, sha256: String(index + 1).repeat(64),
        url: `${R2_PREFIX}${version}/${name}`, githubUrl: `${RELEASE_BASE}/download/${version}/${name}` };
    }),
  };
}

// 最小 CDP 传输层：每次请求独立限时，测试结束关闭会话和临时浏览器配置。
async function connect(url) {
  const socket = new WebSocket(url);
  await once(socket, 'open');
  let sequence = 0;
  const pending = new Map();
  const listeners = new Map();
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) {
      const item = pending.get(message.id);
      if (!item) return;
      pending.delete(message.id);
      clearTimeout(item.timer);
      if (message.error) item.reject(new Error(JSON.stringify(message.error)));
      else item.resolve(message.result);
    } else {
      listeners.get(message.method)?.(message.params);
    }
  });
  return {
    on(method, listener) { listeners.set(method, listener); },
    send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = ++sequence;
        const timer = setTimeout(() => { pending.delete(id); reject(new Error(`CDP 超时: ${method}`)); }, 15000);
        pending.set(id, { resolve, reject, timer });
        socket.send(JSON.stringify({ id, method, params }));
      });
    },
    close() { socket.close(); },
  };
}

async function evaluate(expression) {
  const result = await cdp.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  assert.equal(result.exceptionDetails, undefined, JSON.stringify(result.exceptionDetails));
  return result.result.value;
}

before(async () => {
  await access(join(dist, 'download/index.html'));
  server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      const file = resolve(dist, `.${pathname}`, pathname.endsWith('/') ? 'index.html' : '');
      if (!file.startsWith(`${dist.replace(/\/$/, '')}${sep}`)) throw new Error('路径范围');
      const body = await readFile(file);
      response.writeHead(200, { 'Content-Type': `${mime[extname(file)] ?? 'application/octet-stream'}; charset=utf-8` });
      response.end(body);
    } catch {
      response.writeHead(404).end();
    }
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  origin = `http://127.0.0.1:${server.address().port}`;
  profile = await mkdtemp(join(tmpdir(), 'picferry-download-test-'));
  browser = spawn(process.env.CHROME_BIN || 'google-chrome', [
    '--headless', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
  const debuggerUrl = await new Promise((resolve, reject) => {
    let output = '';
    const timer = setTimeout(() => reject(new Error('Chrome 启动超时；请设置 CHROME_BIN 指向本机浏览器')), 15000);
    const finish = (error, value) => { clearTimeout(timer); error ? reject(error) : resolve(value); };
    browser.once('error', (error) => finish(error));
    browser.once('exit', (code) => finish(new Error(`Chrome 退出: ${code}`)));
    browser.stderr.on('data', (chunk) => {
      output = (output + chunk).slice(-8192);
      const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) finish(null, match[1]);
    });
  });
  const endpoint = new URL(debuggerUrl);
  const tabs = await (await fetch(`http://${endpoint.host}/json/list`)).json();
  cdp = await connect(tabs.find((tab) => tab.type === 'page').webSocketDebuggerUrl);
  cdp.on('Runtime.exceptionThrown', (event) => browserErrors.push(event.exceptionDetails));
  cdp.on('Fetch.requestPaused', (event) => {
    manifestRequests.push(event.request.url);
    void cdp.send('Fetch.fulfillRequest', {
      requestId: event.requestId, responseCode: 200,
      responseHeaders: [
        { name: 'Content-Type', value: 'application/json' },
        { name: 'Access-Control-Allow-Origin', value: '*' },
        { name: 'Cache-Control', value: 'no-store' },
      ],
      body: Buffer.from(JSON.stringify(currentManifest)).toString('base64'),
    }).catch((error) => browserErrors.push(error.message));
  });
  await cdp.send('Runtime.enable');
  await cdp.send('Page.enable');
  await cdp.send('Network.enable');
  // 外部字体不属于下载功能，保证本地测试不依赖字体网络。
  await cdp.send('Network.setBlockedURLs', { urls: ['*fonts.googleapis.com*', '*fonts.gstatic.com*'] });
  await cdp.send('Fetch.enable', { patterns: [{ urlPattern: MANIFEST_URL, requestStage: 'Request' }] });
}, { timeout: 30000 });

after(async () => {
  cdp?.close();
  if (browser && browser.exitCode === null && browser.pid) {
    const exited = once(browser, 'exit');
    browser.kill();
    await exited;
  }
  if (server) await new Promise((resolve) => server.close(resolve));
  if (profile) await rm(profile, { recursive: true, force: true, maxRetries: 3 });
});

async function waitForRelease(version) {
  await evaluate(`new Promise((resolve, reject) => {
    const root = document.querySelector('[data-downloads]');
    const timer = setTimeout(() => { observer.disconnect(); reject(new Error('等待清单渲染超时: ' + root.dataset.state)); }, 12000);
    const check = () => {
      if (root.dataset.state === 'ready' && root.querySelector('.release-meta').textContent.includes(${JSON.stringify(version)})) {
        clearTimeout(timer); observer.disconnect(); resolve(true);
      }
    };
    const observer = new MutationObserver(check);
    observer.observe(root, { subtree: true, childList: true, attributes: true }); check();
  })`);
}

for (const locale of ['zh-CN', 'en']) {
  test(`${locale}：构建页面加载真实 DOM、双渠道链接、元数据和键盘刷新`, async () => {
    currentManifest = fixture('v1.2.3');
    const path = locale === 'en' ? '/en/download/' : '/download/';
    const loaded = new Promise((resolve) => cdp.on('Page.loadEventFired', resolve));
    await cdp.send('Page.navigate', { url: `${origin}${path}` });
    await loaded;
    await waitForRelease(currentManifest.version);
    const snapshot = await evaluate(`(() => {
      const root = document.querySelector('[data-downloads]');
      return { locale: root.dataset.locale, text: root.textContent,
        statusRole: root.querySelector('[data-status]').getAttribute('role'),
        release: root.querySelector('.release-meta a').href,
        cards: Array.from(root.querySelectorAll('.download-card'), card => ({
          name: card.querySelector('.asset-name').textContent,
          hash: card.querySelector('.asset-hash').textContent,
          links: Array.from(card.querySelectorAll('a'), a => ({ href: a.href, label: a.textContent, accessible: a.getAttribute('aria-label') }))
        })) };
    })()`);
    assert.equal(snapshot.locale, locale);
    assert.equal(snapshot.statusRole, 'status');
    assert.equal(snapshot.release, currentManifest.releaseUrl);
    assert.equal(snapshot.cards.length, 3);
    assert.ok(snapshot.text.includes(locale === 'en' ? 'Version: v1.2.3' : '版本: v1.2.3'));
    assert.ok(snapshot.text.includes('2026-10-24 09:30:00 UTC'));
    assert.ok(snapshot.text.includes('1 MiB (1,048,576'));
    assert.ok(snapshot.text.includes(locale === 'en' ? 'Intel / AMD 64-bit' : 'Intel / AMD 64 位'));
    currentManifest.assets.forEach((asset, index) => {
      const card = snapshot.cards[index];
      assert.equal(card.name, asset.name);
      assert.equal(card.hash, asset.sha256);
      assert.deepEqual(card.links.map((link) => link.href), [asset.url, asset.githubUrl]);
      assert.deepEqual(card.links.map((link) => link.label), locale === 'en'
        ? ['Download from R2', 'GitHub backup'] : ['R2 主下载', 'GitHub 备用下载']);
      assert.ok(card.links.every((link) => link.accessible.includes(asset.arch) && link.accessible.includes('v1.2.3')));
    });
    for (const width of [375, 1280]) {
      await cdp.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
      assert.equal(await evaluate('document.documentElement.scrollWidth <= window.innerWidth'), true);
    }
    // 只换请求响应，不重新构建或导航；原生按钮通过键盘获取下一版本。
    currentManifest = fixture('v1.2.4-rc.1');
    await evaluate("document.querySelector('[data-downloads] button').focus()");
    assert.equal(await evaluate("document.activeElement === document.querySelector('[data-downloads] button')"), true);
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', text: '\r', windowsVirtualKeyCode: 13 });
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
    await waitForRelease(currentManifest.version);
    assert.equal(await evaluate("document.activeElement === document.querySelector('[data-downloads] button')"), true);
    assert.deepEqual(await evaluate("Array.from(document.querySelectorAll('.download-actions a'), a => a.href)"),
      currentManifest.assets.flatMap((asset) => [asset.url, asset.githubUrl]));
    assert.deepEqual(browserErrors, []);
    assert.ok(manifestRequests.length >= 2 && manifestRequests.every((url) => url === MANIFEST_URL));
  }, { timeout: 30000 });
}
// 从构建产物验证政策正文与导航；只读本地文件，使用 Node 内建测试模块。
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const site = 'https://picferry.jqknono.com';
const locales = [
  {
    lang: 'zh-CN', prefix: '', other: '/en/privacy/', title: '隐私政策',
    sections: ['适用范围与开发者', '登录与认证信息', '本地配置、媒体与网络请求',
      '保留期限与清理方式', '网站访问与邮箱支持', '您的选择与隐私联系', '安全与未成年人', '政策更新'],
    facts: [
      /相册摆渡（PicFerry）Android 应用/, /应用免费、无广告、无应用内购买，也没有自有账号系统/,
      /普通新增账号入口包括 iCloud、小米、vivo 和 OPPO；华为与荣耀不在普通新增入口中/,
      /无需登录即可浏览随包装载的 8 张合成图和 2 条短视频/, /待验收；未验收前不作为已发布行为/,
      /真实云服务仍需对应厂商账户/, /由应用向 Apple 发送以完成认证/,
      /可选的安全密码保存，默认开启；您可关闭该选项/,
      /官方 WebView 登录页面/, /应用读取并在本地保存 Cookie\/session/,
      /认证和媒体业务直接访问厂商服务/, /IP 地址.*媒体预览、下载或删除/,
      /元数据、照片缩略图或预览缓存保存在本地/, /随包装载 8 张合成图和 2 条短视频/,
      /浏览和临时播放在设备内进行/, /仅在您主动保存后，演示副本进入系统图库/,
      /保存到系统图库或用户选择的目录/,
      /未集成第一方分析、广告或崩溃上报功能/, /缓存淘汰及主动清理操作/,
      /清除该账号配置及相关安全保存的密码；不会清除 session、缓存或已下载媒体/,
      /删除演示副本/, /不等于云端删除/, /小米、vivo 的 WebView Cookie 仍保留/,
      /清除应用私有数据；用户选择的目录和系统图库中的已下载媒体保留/,
      /通过对应厂商的账号安全或会话管理设置操作/,
      /阿里云 ESA 托管/, /访问日志可能包含 IP 地址/, /保留期限取决于实际服务配置与服务商规则/,
      /仅在您主动发邮件时/, /支持邮件按沟通、问题处理及必要后续跟进的需要保留/,
      /请求删除开发者持有的支持邮件信息/, /无法通过邮件远程清除/,
      /无法保证绝对安全/, /监护人适当指导/, /不自行设定法定年龄或应用商店年龄分级/,
      /最后更新：2026-11-03/, /不代表本地新文稿已部署或已在线生效/,
    ],
  },
  {
    lang: 'en', prefix: '/en', other: '/privacy/', title: 'Privacy Policy',
    sections: ['Scope and developer', 'Sign-in and authentication information',
      'Local configuration, media, and network requests', 'Retention and cleanup',
      'Website visits and email support', 'Your choices and privacy contact', 'Security and minors', 'Policy updates'],
    facts: [
      /PicFerry \(Chinese name: 相册摆渡\) Android app/, /free, has no ads or in-app purchases, and has no account system of its own/,
      /offers iCloud, Xiaomi, vivo, and OPPO; HUAWEI and HONOR are not part of that flow/,
      /browse 8 bundled composite images and 2 short videos with no sign-in/,
      /pending acceptance/, /Real cloud services still require the matching vendor account/,
      /sends them to Apple for authentication/, /Optional secure password storage is enabled by default, and you can turn it off/,
      /sign-in page in a WebView/, /app reads and locally saves cookies\/sessions/,
      /Authentication and media operations connect directly to vendor services/,
      /IP addresses.*media previews, downloads, or deletion/,
      /metadata, photo thumbnails, or preview caches are stored locally/,
      /ships 8 composite images and 2 short videos with the app/,
      /Browsing and temporary playback stay on the device/,
      /Demo copies reach the system library/,
      /saved to the system library or a user-selected directory/,
      /no integrated first-party analytics, advertising, or crash reporting/,
      /retention depends on your use, cache eviction, and active cleanup/,
      /configuration and associated securely saved passwords.*does not clear sessions, caches, or downloaded media/,
      /Delete a demo copy/, /is not cloud deletion/,
      /Xiaomi and vivo WebView cookies remain/,
      /Clears app-private data.*Downloaded media in user-selected directories and the system library remains/,
      /account-security or session-management settings/,
      /hosted on Alibaba Cloud ESA/, /access logs may contain IP addresses/,
      /how long they are kept depends on the actual service configuration and provider rules/,
      /only when you actively send an email/,
      /Support emails are retained as needed for correspondence, issue resolution, and necessary follow-up/,
      /request deletion of support email information held by the developer/,
      /cannot remotely clear/, /do not imply uniform encryption or guarantee absolute security/,
      /appropriate guardian guidance/, /does not independently set a legal age threshold or an app-store age rating/,
      /Last updated: 2026-11-03/, /does not mean a new local draft has been deployed or has taken effect online/,
    ],
  },
];

async function page(route) {
  return readFile(new URL(`../dist${route}index.html`, import.meta.url), 'utf8');
}

function text(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function body(html) {
  const content = html.match(/<div class="sl-markdown-content">([\s\S]*?)<\/main>/);
  assert.ok(content, '构建产物包含 Starlight 正文');
  return content[1];
}

function hasLink(html, href) {
  assert.ok(html.includes(`href="${href}"`), `包含链接 ${href}`);
}

for (const locale of locales) {
  const route = `${locale.prefix}/privacy/`;

  test(`${locale.lang}：隐私政策静态页面具有标题、语言、规范地址与联系方式`, async () => {
    const html = await page(route);
    assert.ok(html.includes(`lang="${locale.lang}"`));
    assert.ok(html.includes(`<link rel="canonical" href="${site}${route}"`));
    assert.equal(text(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)[1]), locale.title);
    const content = body(html);
    hasLink(content, 'mailto:jqknono@gmail.com');
    hasLink(content, `${site}/privacy/`);
    hasLink(content, locale.other);
    assert.match(text(content), /jqknono/);
    for (const domain of ['fonts.googleapis.com', 'fonts.gstatic.com']) {
      assert.ok(content.includes(domain), `披露网站字体请求 ${domain}`);
    }
  });

  test(`${locale.lang}：构建后的政策正文包含已核实的数据处理及清理边界`, async () => {
    const content = body(await page(route));
    const headings = [...content.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].map((match) => text(match[1]));
    assert.deepEqual(headings, locale.sections);
    const copy = text(content);
    for (const fact of locale.facts) assert.match(copy, fact);
  });

  test(`${locale.lang}：安全页正文、侧栏与政策页按语言互相连通`, async () => {
    const securityRoute = `${locale.prefix}/security/`;
    const privacy = await page(route);
    const security = await page(securityRoute);
    hasLink(body(privacy), securityRoute);
    hasLink(body(security), route);
    for (const html of [privacy, security, await page(`${locale.prefix}/download/`)]) {
      const sidebar = html.match(/<nav class="sidebar\b[^>]*>([\s\S]*?)<\/nav>/);
      assert.ok(sidebar, '复用 Starlight 侧栏');
      hasLink(sidebar[1], route);
      hasLink(sidebar[1], securityRoute);
      assert.ok(text(sidebar[1]).includes(locale.title));
    }
  });
}
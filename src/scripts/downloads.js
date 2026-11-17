import { fetchManifest, ManifestError } from '../lib/release-manifest.js';
import { downloadCopy } from '../lib/download-copy.js';

const PLATFORMS = { linux: 'Linux', windows: 'Windows', android: 'Android' };

export function mountDownloads(root) {
  if (root.dataset.mounted) return;
  root.dataset.mounted = 'true';
  const locale = root.dataset.locale === 'en' ? 'en' : 'zh-CN';
  const text = downloadCopy(locale);
  const status = root.querySelector('[data-status]');
  const content = root.querySelector('[data-release]');
  const refresh = root.querySelector('button');
  const document = root.ownerDocument;

  function element(tag, value, className) {
    const node = document.createElement(tag);
    if (value !== undefined) node.textContent = value;
    if (className) node.className = className;
    return node;
  }

  function link(label, url, className) {
    const anchor = element('a', label, className);
    anchor.href = url;
    return anchor;
  }

  function render(manifest) {
    const fragment = document.createDocumentFragment();
    const meta = element('div', undefined, 'release-meta');
    meta.append(element('p', `${text.version}: ${manifest.version}`));
    const published = element('p', `${text.published}: `);
    const time = element('time', new Date(manifest.publishedAt).toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, ' UTC'));
    time.dateTime = manifest.publishedAt;
    published.append(time);
    meta.append(published, link(text.release, manifest.releaseUrl));
    fragment.append(meta);
    const list = element('ul', undefined, 'download-list');
    list.setAttribute('role', 'list');
    for (const asset of manifest.assets) {
      const card = element('li', undefined, 'download-card');
      const platform = `${PLATFORMS[asset.platform]} ${asset.arch}`;
      card.append(element('h3', platform), element('p', text.architectures[asset.arch]));
      card.append(element('code', asset.name, 'asset-name'));
      const size = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(asset.size / 1024 ** 2);
      const bytes = new Intl.NumberFormat(locale).format(asset.size);
      card.append(element('p', `${text.size}: ${size} MiB (${bytes} ${text.bytes})`));
      const actions = element('div', undefined, 'download-actions');
      const primary = link(text.primary, asset.url, 'download-primary');
      const backup = link(text.backup, asset.githubUrl);
      primary.setAttribute('aria-label', `${text.primary} — ${platform} — ${manifest.version}`);
      backup.setAttribute('aria-label', `${text.backup} — ${platform} — ${manifest.version}`);
      actions.append(primary, backup);
      card.append(actions, element('p', 'SHA256'), element('code', asset.sha256, 'asset-hash'));
      list.append(card);
    }
    fragment.append(list);
    content.replaceChildren(fragment);
  }

  async function load() {
    if (root.dataset.state === 'loading') return;
    root.dataset.state = 'loading';
    refresh.setAttribute('aria-disabled', 'true');
    content.setAttribute('aria-busy', 'true');
    content.replaceChildren();
    status.textContent = text.loading;
    try {
      const result = await fetchManifest();
      if (result.manifest) render(result.manifest);
      root.dataset.state = result.state;
      status.textContent = text[result.state];
    } catch (error) {
      const kind = error instanceof ManifestError ? error.kind : 'network';
      root.dataset.state = kind;
      status.textContent = text[kind];
    } finally {
      content.setAttribute('aria-busy', 'false');
      refresh.setAttribute('aria-disabled', 'false');
    }
  }

  refresh.hidden = false;
  refresh.addEventListener('click', load);
  void load();
}
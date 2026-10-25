// 与私有 GUI 的 release_contract.py 保持一致；地址仅从校验后的清单取得。
export const R2_PREFIX = 'https://downloads.nullprivate.com/picferry/release/';
export const RELEASE_BASE = 'https://github.com/picferry/picferry-website/releases';
export const MANIFEST_URL = `${R2_PREFIX}latest.json`;
export const FETCH_TIMEOUT_MS = 10000;

const TAG = /^v(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(?:-([a-z][a-z0-9]*(?:\.(?:0|[1-9][0-9]*|[a-z][a-z0-9]*))*))?$/;
const EXTENSIONS = new Map([['linux', 'tar.gz'], ['windows', 'zip'], ['android', 'apk']]);
const ARCHITECTURES = new Set(['x64', 'arm64', 'universal']);
const ISO_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?:Z|[+-]\d{2}:\d{2})$/;

export class ManifestError extends Error {
  constructor(kind) {
    super(kind);
    this.kind = kind;
  }
}

function requireValid(condition) {
  if (!condition) throw new ManifestError('invalid');
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function validateUrl(value, expected) {
  // 完全相等同时约束协议、host、仓库、prefix、tag 和文件名，排除转义、查询和片段。
  requireValid(typeof value === 'string' && value === expected);
  const url = new URL(value);
  requireValid(url.protocol === 'https:' && !url.username && !url.password && !url.port);
  return value;
}

export function validateManifest(value) {
  requireValid(isRecord(value) && value.schemaVersion === 1);
  requireValid(typeof value.version === 'string' && value.version.length <= 80);
  const tag = TAG.exec(value.version);
  requireValid(tag && tag[0] === value.version && tag.slice(1, 4).every((part) => Number(part) <= 65535));
  requireValid(typeof value.publishedAt === 'string' && ISO_DATE.exec(value.publishedAt)?.[0] === value.publishedAt
    && Number.isFinite(Date.parse(value.publishedAt)));
  // Date.parse 会归一化部分越界日期；同时核对日历日期与时钟范围。
  const day = value.publishedAt.slice(0, 10);
  requireValid(new Date(`${day}T00:00:00Z`).toISOString().slice(0, 10) === day
    && Number(value.publishedAt.slice(11, 13)) < 24
    && Number(value.publishedAt.slice(14, 16)) < 60
    && Number(value.publishedAt.slice(17, 19)) < 60);
  const releaseUrl = validateUrl(value.releaseUrl, `${RELEASE_BASE}/tag/${value.version}`);
  requireValid(Array.isArray(value.assets) && value.assets.length <= 9);
  const seen = new Set();
  const assets = value.assets.map((asset) => {
    requireValid(isRecord(asset) && EXTENSIONS.has(asset.platform) && ARCHITECTURES.has(asset.arch)
      && (asset.arch !== 'universal' || asset.platform === 'android'));
    const key = `${asset.platform}-${asset.arch}`;
    requireValid(!seen.has(key));
    seen.add(key);
    const name = `picferry-${value.version}-${key}.${EXTENSIONS.get(asset.platform)}`;
    requireValid(asset.name === name);
    requireValid(Number.isSafeInteger(asset.size) && asset.size > 0 && asset.size < 2 * 1024 ** 3);
    requireValid(typeof asset.sha256 === 'string' && asset.sha256.length === 64 && /^[a-f0-9]{64}$/.test(asset.sha256));
    return {
      platform: asset.platform, arch: asset.arch, name, size: asset.size, sha256: asset.sha256,
      url: validateUrl(asset.url, `${R2_PREFIX}${value.version}/${name}`),
      githubUrl: validateUrl(asset.githubUrl, `${RELEASE_BASE}/download/${value.version}/${name}`),
    };
  });
  return { version: value.version, publishedAt: value.publishedAt, releaseUrl, assets };
}

export async function fetchManifest() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(MANIFEST_URL, {
      signal: controller.signal, mode: 'cors', credentials: 'omit',
      cache: 'no-store', redirect: 'error',
    });
    if (response.status === 404) return { state: 'waiting' };
    if (!response.ok) throw new ManifestError('http');
    let data;
    try {
      data = await response.json();
    } catch (error) {
      if (controller.signal.aborted) throw error;
      throw new ManifestError(error instanceof SyntaxError ? 'invalid' : 'network');
    }
    const manifest = validateManifest(data);
    return { state: manifest.assets.length ? 'ready' : 'empty', manifest };
  } catch (error) {
    if (controller.signal.aborted) throw new ManifestError('timeout');
    if (error instanceof ManifestError) throw error;
    throw new ManifestError('network');
  } finally {
    clearTimeout(timer);
  }
}
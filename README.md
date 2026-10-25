# PicFerry

Public website and bilingual user guides for [PicFerry](https://picferry.jqknono.com), an unofficial cloud photo app. The App currently enables iCloud, Xiaomi and vivo accounts; HUAWEI, OPPO and HONOR have core copy-download implementations but no new-account entry in the App.

CLI and GUI source live in sibling repositories that require access permission:

- [`picferry_core`](https://github.com/picferry/picferry_core) — shared Dart core + vendor packages (Melos monorepo)
- [`picferry_gui`](https://github.com/picferry/picferry_gui) — Flutter app with desktop folders and Android / iOS / OHOS media-library saving

本仓库代码树承载公开网站与双语指南，**官方 Releases 允许存放受控发布的编译产物，PR 保持源码、文档和测试范围，不附二进制**。私有 GUI 仓库自动构建 Linux x64、Windows x64、Android universal APK，同一份文件发布到本仓库 Releases 和 R2 `downloads` 桶。GUI/Core 源码权限与公开编译包下载分别管理。

**截至 2026-10-24，首个正式版本尚未发布。** 构建目标不等于已有安装包；下载页仅根据实时清单显示资产，不预置虚构下载链接。

## Local development

```sh
npm install
npm run dev
```

Production build:

```sh
npm run build
```

The static site is written to `dist/`.

## 下载清单与本地验证

- `/download/` 与 `/en/download/` 复用 `src/components/Downloads.astro`，浏览器获取 `https://downloads.nullprivate.com/picferry/release/latest.json`。清单更新后刷新列表即可显示新版本，无需重新构建网站。
- 契约为 `schemaVersion: 1`、`version`、ISO `publishedAt`、`releaseUrl` 和 `assets`；资产字段为 `platform`、`arch`、`name`、`size`（字节）、`sha256`、`url`、`githubUrl`。权威生产端为工作区 `../picferry_gui/tool/release_contract.py` 与 `publish_release.py`，本仓库负责消费，不执行发布。
- 清单校验限制版本格式（兼容 `v1.2.3-rc.1`）、文件名、平台/架构、大小和 SHA256；下载 URL 必须精确匹配 HTTPS 官方域名、仓库、`picferry/release/<tag>/<name>` 路径。全部清单校验成功后使用 DOM `textContent` 赋值。
- 获取使用 10 秒超时、匿名 CORS、`cache: no-store` 与拒绝重定向。404 表示首发等待；有效空列表、网络/CORS 失败、超时、HTTP 错误、清单校验问题分别提示。读取失败时仍提供官方 Releases 总入口，不推测资产路径。
- 当前构建矩阵是 Linux x64、Windows x64、Android universal APK；消费者也识别未来清单中的 x64/arm64 和 Android universal，但不会因架构名称存在而显示包。

以下命令均从 `picferry-website/` 执行，需要与 Astro 兼容的 Node.js（集成测试使用 Node 22+ 内建 WebSocket）及本机 Chrome/Chromium：

```sh
npm run build
npm test
git diff --check
```

测试使用 `node:test`、临时本地 HTTP 服务和真实无头 Chrome，通过 CDP 拦截清单请求提供**仅测试用**数据，验证构建后的中英文页面、三平台双下载链接、版本/大小/SHA256、窄屏布局和键盘刷新到下一版本。它不上传或下载二进制，不调用发布接口，不生成生产 `latest.json`，不增加第三方测试依赖。默认从 PATH 调用 `google-chrome`；其他浏览器可执行 `CHROME_BIN="$(command -v chromium)" npm test`。测试结束清理临时浏览器配置。

### CORS 与缓存交接（由主代理配置）

网站和 `downloads.nullprivate.com` 跨域，主代理需为公开 `downloads` 桶及其自定义域名响应配置 CORS，本仓库不包含云端配置变更：

| 项目 | 所需配置 |
| --- | --- |
| Allowed origins | 公开、无凭据分发推荐 `*`；若采用白名单，包含 `https://picferry.jqknono.com`、实际预览域名及本地开发 origin |
| Allowed methods | `GET`, `HEAD`；若网关处理预检，同时正确响应 `OPTIONS` |
| Response header | `Access-Control-Allow-Origin: *`（或匹配请求 origin，动态匹配时加 `Vary: Origin`） |
| Credentials | 前端 `credentials: omit`，无需 `Access-Control-Allow-Credentials` |
| Allowed / exposed headers | 前端无自定义请求头、无需额外暴露响应头；若网关触发预检，允许其实际请求头 |
| Manifest content type | `Content-Type: application/json` |
| Latest cache | `Cache-Control: no-cache, max-age=0, must-revalidate`，CDN 遵循回源与刷新，首发前 404 使用短缓存或不缓存 |

**404 及其他错误响应也需带 CORS 头**，否则浏览器只看到网络失败，无法识别首发等待。若 R2 原生规则未覆盖错误响应，由主代理在域名网关补齐。下载文件通过普通链接导航，不以 JS 读取；同桶 `GET/HEAD` 可保持一致策略。发布前用真实网站 origin 核验 404 与 200 响应，并确认缓存不掩盖新 `latest.json`。本地测试的 CORS 头仅用于测试，不代表生产配置已完成。

## Locales

- Chinese (default): `/`
- English: `/en/`

## Deploy

Hosted on Alibaba Cloud ESA Pages. Target public host: [https://picferry.jqknono.com](https://picferry.jqknono.com). Configure the ESA custom domain and public DNS before switching production traffic; until cutover, the previous host may remain active.

```sh
npm run build
esa-cli commit --name photos-downloader --assets dist --description "docs site" --no-bundle
esa-cli deploy --name photos-downloader --environment staging --no-bundle
esa-cli deploy --name photos-downloader --environment production --version <version>
esa-cli domain add picferry.jqknono.com
```

The ESA project remains named `photos-downloader` until it is explicitly renamed in the hosting account. Resolve the new custom-domain CNAME from ESA and configure public DNS before cutover; the new domain's production routing has not been verified.

## License

MIT

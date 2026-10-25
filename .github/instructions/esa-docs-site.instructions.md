---
description: "用于 PicFerry 官网发布渠道、下载组件、ESA Pages 部署和域名操作。"
applyTo:
  - "esa.jsonc"
  - "astro.config.mjs"
  - "README.md"
  - "CONTRIBUTING.md"
  - "src/components/Downloads.astro"
  - "src/lib/*.js"
  - "src/scripts/downloads.js"
  - "src/content/docs/**"
---

# PicFerry 官网发布与 ESA 指引

本仓库代码树维护公开网站与指南；ESA 操作手册统一引用现有技能资源。官方 GitHub Releases 可接收受控流程生成的编译产物，PR 聚焦网站源码、文档与测试，二进制通过 Release 渠道交付。

- 官方编译包由私有 GUI 仓库构建，目标为 Linux x64、Windows x64、Android universal APK；同一文件发布到 `picferry/picferry-website` Releases 和 R2 `downloads` 桶的 `picferry/release/` 前缀。
- 客户端读取 `https://downloads.nullprivate.com/picferry/release/latest.json`，校验后显示双渠道链接；版本发布独立于网站重新构建，源码权限独立于公开包下载。
- 首发前保持等待状态；可用性以校验后的真实清单为准。404、空列表与读取失败各有清晰提示，文案通过 `textContent` 安全赋值。
- CORS 与缓存由主代理配置，具体响应头与本地验证见 README。修改下载功能后运行 `npm run build` 和 `npm test`，采用正向真实浏览器集成场景。

- ESA project name: `photos-downloader` (rename separately in the hosting account)
- Target public host: `picferry.jqknono.com` (configure custom domain and DNS before production cutover)
- Work from this directory (`picferry-website/`), not the parent workspace root
- Canonical URL lives in `astro.config.mjs` `site` and `package.json` `homepage`
- Deploy and custom-domain steps: jqknono skill `jqknono-esa`, especially `references/pages-custom-domain.md`
- Public DNS (`alidns` CNAME, no `CreateRecord`): `jqknono-aliyun`
- Hard cutover (no 301): build/deploy with the existing ESA project name → `esa domain add` → read `RecordCname` → add only the new CNAME → verify with public DoH / `--resolve` → then delete the old ESA domain and DNS record
- Local `Resolve-DnsName` to `28.0.3.x` / `fc00::` is Mihomo fake-ip, not a cert failure
- Do not echo `esa_er_token` or treat `*.er.aliyun-esa.net` as the public site

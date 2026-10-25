# Contributing

本公开仓库的代码树包含 PicFerry 网站与双语指南；GitHub Releases 承载受控发布流程生成的官方编译包。

## Scope

- 欢迎文档、翻译、网站样式、下载组件及其正向集成测试改进。
- PR 保持网站源码、文档与测试范围，日志和截图采用脱敏数据；二进制通过官方 Release 流程交付，不随 PR 提交。凭据、Cookie、会话和签名媒体 URL 保持私密。
- 私有 GUI 仓库自动构建 Linux x64、Windows x64、Android universal APK，经授权发布到 `picferry/picferry-website` Releases 与 R2 `downloads` 桶，同一文件双份分发。
- GUI/Core 源码贡献需要对应仓库权限；公开编译包下载不要求源码权限。截至 2026-10-24，首个正式版本尚未发布，实际下载入口以校验后的实时清单为准。

## Local preview

```sh
npm install
npm run dev
```

Chinese pages live in `src/content/docs/`. English pages live in `src/content/docs/en/` and should use the same file names.

## Pull requests

1. Keep secrets out of commits. Review `git diff` before pushing.
2. Prefer small, reviewable documentation changes.
3. 修改配置、页面或下载组件后，在本仓库运行 `npm run build` 与 `npm test`；测试使用 Node 内建模块和本机 Chrome/Chromium，环境要求见 [README](README.md#下载清单与本地验证)。
4. 下载页的中英文共用组件、清单校验和状态文案；按真实契约验证版本、架构、大小、SHA256 和 R2/GitHub 链接。测试数据仅存在于测试拦截器，发布清单由受控流程提供。
5. 跨域 CORS 与缓存配置交由主代理按 [README](README.md#cors-与缓存交接由主代理配置) 完成；网站本地验证与云端发布分别授权。

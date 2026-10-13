---
title: iCloud
description: 使用 icloud_photos_downloader 认证、列出并下载 iCloud 照片。
---

`icloud_photos_downloader` 是 Dart library/CLI，位于 monorepo [`picferry_core`](https://github.com/picferry/picferry_core) 的 `packages/icloud_photos_downloader`。语义参考 [icloudpd](https://github.com/icloud-photos-downloader/icloud_photos_downloader)。预编译二进制尚未随本站发布。

## 账号前提

在 iPhone / iPad 上确认：

- 已开启「允许通过网页访问 iCloud 数据」
- **未**开启 Advanced Data Protection（ADP）

ADP 与 FIDO 不受支持。

## 认证

首次登录需要 Apple ID 密码和 2FA（设备推送或短信）。成功后 session 会写到 `~/.picferry/icloud/`（Windows 为 `%USERPROFILE%\.picferry\icloud\`）。

```sh
cd picferry_core/packages/icloud_photos_downloader
dart run bin/icloud_photos_downloader.dart --auth-only
dart run bin/icloud_photos_downloader.dart --username you@example.com --auth-only
dart run bin/icloud_photos_downloader.dart --mfa-method device --auth-only
dart run bin/icloud_photos_downloader.dart --domain cn --auth-only
```

中国区账号使用 `--domain cn`。不要使用 app-specific password。

## 两种模式

| 模式 | 行为 | 参数 |
| --- | --- | --- |
| 仅下载（默认） | 只下载本地没有的文件 | 无额外参数 |
| 下载并删除云原件 | 下载成功后从 iCloud 删除（可保留最近 N 天） | `--keep-icloud-recent-days N` |

破坏性操作先加 `--dry-run`。

## 常用命令

```sh
dart run bin/icloud_photos_downloader.dart --directory /photos --recent 10
dart run bin/icloud_photos_downloader.dart --list-libraries
dart run bin/icloud_photos_downloader.dart --list-albums
dart run bin/icloud_photos_downloader.dart --album Favorites --directory /photos
dart run bin/icloud_photos_downloader.dart --recent 5 --dry-run --directory ./tmp-icloud --folder-structure none
dart run bin/icloud_photos_downloader.dart --keep-icloud-recent-days 0 --directory /photos --dry-run
```

默认目录结构是 `{:%Y/%m/%d}`。`--folder-structure none` 会平铺到目标目录。

部分旧版 CLI 能力（watch、通知、RAW 对齐等）仍在移植中，详见 core 包内 `docs/porting-plan.md`。

## 配置文件

可把非密钥默认值放在工作目录 `.env`。命令行 flag 覆盖环境变量。不要提交 `.env`。

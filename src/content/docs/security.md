---
title: 安全
description: 非官方状态、凭据处理，以及不要把 cookie 提交到 Git。
---

## 非官方

本项目不是 Apple、华为、小米、vivo、OPPO 或荣耀的官方产品，也不由它们支持。厂商可能随时变更网页或 API，工具可能失效。

## 不要提交的内容

- Apple ID / 云账号密码
- 浏览器 cookie 与 `cookies.json`
- session 文件（默认在 `~/.picferry/`）
- 带签名或有时效的媒体 URL
- 真实账号标识、设备 ID

Issue 和 PR 里只使用脱敏后的协议轨迹。HONOR 提供方在 API 验证前不会发真实请求，就是为了避免把未确认的流量和密钥写进仓库。

## 破坏性操作

“下载并删除云原件”（`--keep-icloud-recent-days`）会删除云端文件。先 `--dry-run`，并用隔离目录或隔离相册验证。

## 会话文件

把 session 目录视为密钥。备份时加密；不要同步到公开网盘。

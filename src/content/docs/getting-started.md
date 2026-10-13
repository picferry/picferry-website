---
title: 简介
description: PicFerry 是什么、支持哪些厂商、当前能用什么。
---

PicFerry 是一套非官方工具，用于把云相册里的照片和视频下载到本地磁盘。

它包含：

- 各厂商独立 CLI（Dart，见 picferry_core）
- 共享核心 `CloudDownloader`
- Flutter 图形界面（聚合层）

第一期公开的是本站与使用指南。CLI / GUI 源码和预编译二进制尚未发布。

## 厂商状态

| 厂商 | 状态 | 认证方式 | 说明 |
| --- | --- | --- | --- |
| iCloud | 可用 | Apple ID + 2FA | 支持仅下载，以及下载并删除云原件 |
| HUAWEI | 可用 | 浏览器 cookie | 需要自行导出 `cookies.json` |
| Xiaomi | 开发中 | 待定 | 尚不可用 |
| vivo | 开发中 | 待定 | 尚不可用 |
| OPPO | 开发中 | 待定 | 尚不可用 |
| HONOR | 开发中 | cookie（预留） | 未验证 Gallery API 前不发请求 |

## 下一步

1. 先读 [安全](/security/)。
2. 看 [状态与路线图](/status/)。
3. 选择厂商指南： [iCloud](/guides/icloud/) 或 [HUAWEI](/guides/huawei/)。
4. 二进制就绪前，[下载页](/download/) 只列出计划平台。

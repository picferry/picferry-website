---
title: 架构
description: Flutter GUI、Dart 厂商包 monorepo 与共享 CloudDownloader 核心。
---

PicFerry 分成三层公开仓库。第一期文档站已上线；CLI/GUI 安装包仍在准备中。

```mermaid
flowchart LR
    GUI["Flutter GUI"]
    VENDORS["厂商 Dart 包 · CLI + lib"]
    CORE["picferry_share"]

    GUI --> VENDORS
    VENDORS --> CORE
```

| 层 | 组件 | 角色 |
| --- | --- | --- |
| GUI | [`picferry_gui`](https://github.com/picferry/picferry_gui) | Flutter 应用，选择厂商并显示进度 |
| 厂商 + 共享 | [`picferry_core`](https://github.com/picferry/picferry_core) Melos monorepo | `picferry_share` 与各厂商 Dart library/CLI |
| 文档 | 本仓库 `picferry` | 用户指南与状态说明 |

厂商实现统一实现 `CloudDownloader` 接口；GUI 通过 path/git 依赖直接调用 Dart 包，不再使用 Rust FFI。

公开讨论与文档 PR 请走 [picferry/picferry-website](https://github.com/picferry/picferry-website)。

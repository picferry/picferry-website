---
title: Architecture
description: Flutter GUI, Dart vendor monorepo, and the shared CloudDownloader core.
---

PicFerry has three public repositories. This first public release ships the website; CLI/GUI installers are still in progress.

```mermaid
flowchart LR
    GUI["Flutter GUI"]
    VENDORS["Vendor Dart packages · CLI + lib"]
    CORE["picferry_share"]

    GUI --> VENDORS
    VENDORS --> CORE
```

| Layer | Component | Role |
| --- | --- | --- |
| GUI | [`picferry_gui`](https://github.com/picferry/picferry_gui) | Flutter app: pick a vendor and show progress |
| Vendors + shared | [`picferry_core`](https://github.com/picferry/picferry_core) Melos monorepo | `picferry_share` plus per-vendor Dart libraries/CLIs |
| Docs | this `picferry` repo | User guides and status |

Every vendor implements the `CloudDownloader` interface. The GUI calls Dart packages directly (path or git dependencies); there is no Rust FFI bridge.

Public discussion and documentation PRs go to [picferry/picferry-website](https://github.com/picferry/picferry-website).

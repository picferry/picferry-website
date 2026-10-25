---
title: Status
description: Current vendor, authentication, platform, saving, and deletion capabilities, plus verified public availability.
---

This page is the reference capability matrix, distinguishing **GUI entry points, Core implementations, native projects, and public releases**. An implementation does not imply a downloadable installer or identical capabilities on every platform.

## Verified public availability

**As of 2026-10-24, the first official release has not been published.** Official compiled packages will be publicly distributed through R2 as the primary channel and the website repository's GitHub Releases as the backup. The controlled automatic build targets are Linux x64, Windows x64, and Android universal APK; a build target does not mean a package has been published.

Checks through the public GitHub API that day returned 200 for `picferry/picferry-website` and 404 for its latest release. Both the repository and latest-release endpoints for `picferry/picferry_gui` and `picferry/picferry_core` returned 404. These results describe only the public endpoints checked; they do not establish that no packages exist anywhere or reveal the contents of restricted repositories.

The public website repository is [picferry/picferry-website](https://github.com/picferry/picferry-website), whose Releases host official compiled artifacts. GUI/Core source permissions and package distribution are separate: restricted source does not prevent downloading official packages. [Download](/en/download/) reads R2's `picferry/release/latest.json` in the browser and displays version, architecture, size, SHA256, and both download links from a validated live manifest. HTTP 404 shows first-release waiting; network failures have a separate message. See [Build from source](/en/install/) if you already have source access. This page makes no promises about store listings or release dates.

## Vendors and authentication

Desktop authentication below refers to Windows / Linux, which currently have native projects. Web login requires **Chrome, Edge, or Chromium** installed locally.

| Vendor | Add account in GUI | Desktop authentication | Android | iOS | OHOS | Core and migration capabilities |
| --- | --- | --- | --- | --- | --- | --- |
| iCloud | Enabled | In-app Apple ID, password, and 2FA | Same as desktop | Same as desktop | Same as desktop | Copy and move; supports the China mainland account region |
| Xiaomi | Enabled | Separate browser login or Cookie file | Native web login or Cookie file | Cookie file | Native web login or Cookie file | Copy and move |
| vivo | Enabled | Separate browser login or Cookie file | Cookie file | Cookie file | Native web login or Cookie file | Copy; move requires a suite session, while legacy sessions use copy |
| HUAWEI | Disabled | No GUI add-account authentication flow available | Same | Same | Same | Real copy-download implementation exists; move is not enabled in the current GUI |
| OPPO | Disabled | No GUI add-account authentication flow available | Same | Same | Same | Real copy-download implementation exists; move is not enabled in the current GUI |
| HONOR | Disabled | No GUI add-account authentication flow available | Same | Same | Same | Real copy-download implementation exists; move is not enabled in the current GUI |

For authentication, see [iCloud](/en/guides/icloud/), [Xiaomi](/en/guides/xiaomi/), and [vivo](/en/guides/vivo/). For Core and GUI boundaries, see [HUAWEI](/en/guides/huawei/), [OPPO](/en/guides/oppo/), and [HONOR](/en/guides/honor/). A disabled add-account entry does not mean Core is only a placeholder.

## Platforms and save destinations

| Platform | Current project status | Destination and requirements |
| --- | --- | --- |
| Windows | Native project exists | Local folder; requires the desktop build toolchain |
| Linux | Native project exists | Local folder; requires the desktop build toolchain |
| Android | Native project exists | System photo library, with permissions required by the OS |
| iOS | Native project exists | System photo library; requires full photo-library access and an Apple build/signing environment |
| OHOS | Native project exists | System photo library; keep the app in the foreground and confirm the system save dialog, with at most 100 items per batch; use an isolated OHOS build environment |
| macOS | Dart platform branches exist, but there is currently no native `macos/` project | Not listed as a currently deliverable platform |
| Web | UI preview only | No real cloud-service connection or download capability |

Desktop batch downloads default to **UTC year/month/day (`YYYY/MM/DD`)** folders within the account directory. Single-item gallery downloads go directly into the account directory. Mobile saves use **PicFerry** archiving and do not recreate cloud album structures. Project status and public package availability are verified separately.

## Downloading, migration, and deletion

| Operation | Current behavior and boundaries |
| --- | --- |
| Copy (`copy`, default) | Saves locally and keeps cloud originals |
| Move (`move`) | iCloud, Xiaomi, and vivo only; vivo requires a suite session. Resource verification precedes deletion, and mobile platforms also require successful system-library save receipts |
| Migration resource verification | iCloud checks completion of selected resource groups and vendor rules; Xiaomi and vivo require integrity verification of originals downloaded in the current run. Insufficient verification or unconfirmed saving leaves cloud originals intact |
| Explicit gallery deletion | A separate cloud-deletion action that requires no prior download or backup and does not use migration's save verification; subject to vendor/session capabilities, including a suite session for vivo deletion |
| Cancel task | Keeps already saved media; cloud deletions already submitted may still take effect, and cancellation does not roll them back |
| Start again | Tasks can be run again, but this is not resumable downloading. There is no `sync` mode, automatic sync, or scheduling |
| Incremental mode | Stops at the first existing destination; it is not hash-based deduplication or a complete repair of gaps in older downloads |
| Gallery album selection | Used for browsing; does not scope batch downloads or recreate archives by cloud album |

Migration and explicit deletion can affect other devices using the same cloud service. Read [Security](/en/security/) before proceeding.

## Browsing, settings, and local data

- iCloud, Xiaomi, and vivo support image previews. Inline video playback is available only when iCloud returns a `small_video` resource; other videos can be downloaded and opened in a local player.
- Saving Live Photo resources does not guarantee that the system library restores them as paired Live Photos.
- Settings include Chinese and English, system/light/dark themes, gallery density, and default download parameters. Default concurrency is **4**.
- Account configuration, Cookie/session files, and preview/metadata caches are stored locally, without a uniform encryption guarantee.
- Removing an account removes only its in-app configuration. It does not clear sessions, caches, downloaded media, or cloud content, or revoke vendor authorization.

See the [GUI guide](/en/guides/gui/) for the workflow and [Architecture](/en/architecture/) for component responsibilities.

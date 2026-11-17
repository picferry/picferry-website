---
title: Status
description: Current vendor, authentication, platform, saving, and deletion capabilities, plus verified public availability.
---

This page is the reference capability matrix, distinguishing **app entry points, currently available actions, and public releases**. An implemented capability does not imply a downloadable installer or identical capabilities on every platform.

## Verified public availability

Official packages are available on [Download](/en/download/). Current packages cover Linux x64, Windows x64, and Android. macOS, iOS, and OHOS currently ship through app stores or other independent channels. Actual availability follows the list on that page.

You do not need source access to download official packages. Source access and public releases are verified separately; see [Build from source](/en/install/) if you already have source access. Store listings and website downloads are verified separately.

## Vendors and authentication

Desktop authentication below refers to Windows / Linux. Web login requires **Chrome, Edge, or Chromium** installed locally. REDMI and POCO use Xiaomi, iQOO uses vivo, and OnePlus and realme use OPPO. A sub-brand changes only the add-account entry; the account, authentication, and cloud service remain those of the parent provider.

| Vendor | Add account | Desktop authentication | Android | iOS | OHOS | Download and move |
| --- | --- | --- | --- | --- | --- | --- |
| iCloud | Enabled | In-app Apple ID, password, and 2FA | Same as desktop | Same as desktop | Same as desktop | Copy and move; supports the China mainland account region |
| Xiaomi | Enabled, including REDMI and POCO | Separate browser login or Cookie file | Native web login or Cookie file | Cookie file | Native web login or Cookie file | Copy and move |
| vivo | Enabled, including iQOO | Separate browser login or Cookie file | Cookie file | Cookie file | Native web login or Cookie file | Copy; move requires a suite session, while legacy sessions use copy |
| OPPO | Enabled, including OnePlus and realme | Official web sign-in; the session is captured after confirmation | In-app official web sign-in | In-app official web sign-in | Stops safely and issues no credentials until login isolation is accepted | Copy and individual gallery deletion; batch move is not enabled |
| HUAWEI | Disabled | No add-account authentication flow available | Same | Same | Same | Adding accounts is not available; cloud deletion and batch moves are not enabled |
| HONOR | Disabled | No add-account authentication flow available | Same | Same | Same | Adding accounts is not available; cloud deletion and batch moves are not enabled |

For authentication, see [iCloud](/en/guides/icloud/), [Xiaomi](/en/guides/xiaomi/), [vivo](/en/guides/vivo/), and [OPPO](/en/guides/oppo/). For entry-point boundaries, see [HUAWEI](/en/guides/huawei/) and [HONOR](/en/guides/honor/). A disabled add-account entry means you cannot add that account in the app yet.

## Platforms and save destinations

| Platform | Website download | Destination |
| --- | --- | --- |
| Windows | x64 installer available | Local folder |
| Linux | x64 installer available | Local folder |
| Android | universal APK available | System photo library, with permissions required by the OS |
| iOS | App stores or other independent channels | System photo library; requires full photo-library access |
| OHOS | App stores or other independent channels | System photo library; keep the app in the foreground and confirm the system save dialog, with at most 100 items per batch |
| macOS | App stores or other independent channels | Local folder |
| Web | UI preview only | No real cloud-service connection or download capability |

Desktop batch downloads default to **UTC year/month/day (`YYYY/MM/DD`)** folders within the account directory. Single-item gallery downloads go directly into the account directory. Mobile saves use **PicFerry** archiving and do not recreate cloud album structures. Platform capabilities and website installers are verified separately.

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

- iCloud, Xiaomi, vivo, and OPPO support image previews. Inline video playback is available only when iCloud returns a `small_video` resource; other videos can be downloaded and opened in a local player.
- Saving Live Photo resources does not guarantee that the system library restores them as paired Live Photos.
- Settings include Chinese and English, system/light/dark themes, gallery density, and default download parameters. Default concurrency is **4**.
- Account configuration, Cookie/session files, and preview/metadata caches are stored locally, without a uniform encryption guarantee.
- Removing an account removes only its in-app configuration. It does not clear sessions, caches, downloaded media, or cloud content, or revoke vendor authorization.

See the [GUI guide](/en/guides/gui/) for the workflow and [Architecture](/en/architecture/) for how the app is organized.

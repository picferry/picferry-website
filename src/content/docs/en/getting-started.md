---
title: Overview
description: What PicFerry is, which vendors work, and what ships in this first public release.
---

PicFerry is an unofficial toolkit for downloading photos and videos from cloud galleries to local disks.

It consists of:

- Per-vendor CLIs (Dart; see picferry_core)
- A shared `CloudDownloader` core
- A Flutter GUI that aggregates the vendors

This first public release is the website and user guides. CLI / GUI source and prebuilt binaries are not published yet.

## Vendor status

| Vendor | Status | Auth | Notes |
| --- | --- | --- | --- |
| iCloud | Ready | Apple ID + 2FA | Download only and download-and-delete-cloud modes |
| HUAWEI | Ready | Browser cookies | Export `cookies.json` yourself |
| Xiaomi | WIP | TBD | Not usable |
| vivo | WIP | TBD | Not usable |
| OPPO | WIP | TBD | Not usable |
| HONOR | WIP | Cookies (reserved) | No live requests until the Gallery API is verified |

## Next steps

1. Read [Security](/en/security/).
2. Check [Status](/en/status/).
3. Open a vendor guide: [iCloud](/en/guides/icloud/) or [HUAWEI](/en/guides/huawei/).
4. Until binaries exist, the [download page](/en/download/) only lists planned platforms.

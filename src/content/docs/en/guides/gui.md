---
title: GUI
description: Connect cloud accounts, browse photos, and copy or move media to your device with PicFerry.
---

Use PicFerry's graphical interface to connect cloud accounts, browse media, and save it to your device. See [Downloads](/en/download/) for package availability and release notes. For local builds, follow [Build from source](/en/install/); access to the GUI/Core source repositories is required.

## 1. Add and connect an account

Choose **Add account**, select a provider, and give the account a recognizable name. New accounts are currently enabled for [iCloud](/en/guides/icloud/), [Xiaomi](/en/guides/xiaomi/), and [vivo](/en/guides/vivo/). Adding HUAWEI, OPPO, or HONOR accounts is not enabled yet.

| Provider | Connection options |
| --- | --- |
| iCloud | Enter your Apple ID and password in the app, then complete two-factor authentication; select the corresponding region for mainland China accounts |
| Xiaomi | Separate browser sign-in or a Cookie file on desktop; native web sign-in on Android and OHOS; a Cookie file on iOS |
| vivo | Separate browser sign-in or a Cookie file on desktop; native web sign-in on OHOS; a Cookie file on Android and iOS |

Desktop web sign-in requires Chrome, Edge, or Chromium. Complete authentication on the official website, then return to PicFerry to confirm. Cookie files and saved sessions are credentials: keep them in trusted storage and sign in again or reimport them when they expire. See each provider's guide for details.

## 2. Browse and save a small sample

After connecting, open **Photos** to browse the media list or cloud albums, preview items, or download an individual item. Image previews are supported for iCloud, Xiaomi, and vivo. **Inline video playback is available only when iCloud supplies a `small_video` resource**; otherwise, download the video and use a local player.

Save a few photos and videos first. Check that they open correctly and appear in the expected location before starting a large batch. Saving Live Photo resources does not guarantee that the system photo library will reconstruct them as paired Live Photos.

## 3. Choose a destination and start a batch

Open the account's batch download page and check the destination. Keep the default **Download only** (`copy`) mode, then choose all media, photos only, or videos only. Leave **New downloads** blank for no limit. Default concurrency is **4**; adjust it for the task or change the default in Settings.

| Platform | Destination and requirements |
| --- | --- |
| Windows / Linux | Local folders, separated by account by default; select or open the save folder in the app |
| Android | System photo library by default; grant permissions when prompted |
| iOS | System Photos library by default; full photo library access is required |
| OHOS | System photo library by default; keep the app in the foreground and confirm the system save dialog, with up to 100 items per batch |

Desktop batch downloads use **UTC year/month/day** folders (`YYYY/MM/DD`) inside the account directory by default, so dates may differ from your local timezone. Individual gallery downloads go directly into the account directory. Mobile saves use PicFerry organization and **do not recreate cloud albums**. Browsing cloud albums also does not mean batch downloads are organized into album folders.

Choose **Start download** and review progress and results. Cancelling preserves media already saved; you can start a new task afterward, but this is **not resumable downloading**. The normal flow recognizes existing targets. **Incremental mode stops at the first existing target**, making it useful for recent additions rather than filling gaps among older files. Automatic sync and scheduled tasks are not available.

## 4. Optionally move or delete cloud media

- **Copy (default):** save media locally while keeping cloud originals; recommended for an initial backup.
- **Move (`move`):** choose the download-and-delete option and read the confirmation before proceeding. Supported for iCloud, Xiaomi, and vivo; vivo requires a suite session, while legacy sessions support copying only. Moving changes cloud data and may affect devices connected to the same cloud service.

Moving does not mean “delete whenever a same-named file exists.” iCloud checks completion of the selected resource group under its provider rules; Xiaomi and vivo require original-file integrity verification from the current download run. Mobile saves also require a successful system-library save receipt. Items without sufficient verification or confirmed saving remain in the cloud. First check a copy-mode backup before deciding to move media.

**Explicit deletion in the gallery is a separate action.** It does not require a prior download or backup and does not use the move workflow's verification conditions. Check the selected media in the confirmation dialog. Recovery periods depend on the provider; vivo deletion also requires a suite session.

## Settings and account management

Settings include Chinese/English, system/light/dark themes, gallery grid density, and default download options. Removing an account deletes only its in-app configuration: **sessions, caches, downloaded media, and cloud content remain**. It is not a cloud sign-out or session revocation.

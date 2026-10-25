---
title: Xiaomi
description: Connect Xiaomi Cloud through web sign-in or a Cookie file and download media in PicFerry.
---

PicFerry enables new Xiaomi accounts, cloud album browsing, image previews, copy downloads, and optional moves. See [Downloads](/en/download/) for package availability and release notes. First confirm that your account can still access the required cloud media on Xiaomi's official website; service availability is determined by Xiaomi.

## Connect your account

1. Choose **Add account → Xiaomi**, name the account, and open its connection page.
2. Select the sign-in method for your platform:
	- **Desktop:** start web sign-in, complete official authentication in the separate Chrome, Edge, or Chromium browser, enter the cloud gallery, and return to PicFerry to confirm completion. A Cookie file is also supported.
	- **Android / OHOS:** use the native web sign-in page opened by the app, complete Xiaomi's authentication, and choose the control to finish signing in.
	- **iOS:** use a Cookie file.
3. Wait for session validation and saving, then open **Photos** to check that you connected the intended account.

For Cookie sign-in, log in to [Xiaomi Cloud](https://i.mi.com) in a trusted browser, enter the gallery, and export the relevant cookies as a JSON file. Transfer it securely to your PicFerry device, select it under **Cookie File**, and save the connection. Preserve record fields such as domains so requests can be matched correctly. Keep Cookie and session files in secure local storage.

If no desktop browser is found, install Chrome, Edge, or Chromium and retry, or use a Cookie file. The Cookie expiry display does not guarantee continued server-side authentication; sign in again or reimport cookies when the session becomes invalid.

## Download and move

Preview and download a small sample, then use batch download with the default **Download only** (`copy`) mode. Desktop saves use account directories; Android, iOS, and OHOS default to the system photo library. See the [GUI guide](/en/guides/gui/) for folder organization, permissions, and OHOS save confirmation. Download videos to play them locally; Xiaomi inline video playback is not supported.

In download-and-delete (`move`) mode, only media **downloaded and integrity-verified as originals in the current run** qualifies for migration. Mobile saves also require a successful system-library save receipt. Same-named existing files, missing integrity evidence, or unverified compound resources are not grounds for deletion. Deletion propagates to devices signed in to Xiaomi Cloud; check your backup and the confirmation message first.

Explicit gallery deletion is a separate cloud action without a prior download or backup requirement; Xiaomi's recovery rules apply. Cancelling preserves saved media, and subsequent attempts start a new task rather than resume a transfer. Automatic sync is not available. Incremental mode stops at the first existing target; disable it to fill gaps among older files.

For CLI use, see [Build from source](/en/install/) and the Core package documentation. Source access requires repository permission.

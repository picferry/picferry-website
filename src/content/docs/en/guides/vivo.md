---
title: vivo
description: Connect vivo Cloud, copy media, and understand suite and legacy session differences in PicFerry.
---

PicFerry enables new vivo accounts, cloud album browsing, image previews, and copy downloads. Moving and cloud deletion depend on the session protocol: **suite supports them; legacy supports copying only**. See [Downloads](/en/download/) for package availability and release notes.

## Connect your account

1. Choose **Add account → vivo**, name the account, and open its connection page.
2. Authenticate using the method for your platform:
	- **Desktop:** use web sign-in, complete vivo's official authentication in the separate Chrome, Edge, or Chromium browser, enter the album, and return to PicFerry to confirm completion. Cookie file import is also supported.
	- **OHOS:** use the native web sign-in page opened by the app and confirm after completing official authentication.
	- **Android / iOS:** use a Cookie file. Android currently registers native web sign-in only for Xiaomi; use the Cookie flow for vivo.
3. Wait for session validation and saving, then open **Photos** to check your media.

For Cookie sign-in, log in to [vivo's official website](https://pc.vivo.com.cn/suite?origin=cloudWeb#/album/all?folderId=1&clientBucketId=0) in a trusted browser, enter the album, and export the relevant cookies as a JSON file. Transfer it securely to your PicFerry device, select it under **Cookie File**, and save the connection. Older web sessions remain usable for copying. The app selects the protocol from valid credentials; renaming a file does not turn a legacy session into a suite session.

Web sign-in saves the validated session and persists subsequent Cookie rotations. Sign in again or reimport cookies when authentication expires. Treat Cookie and session files as credentials.

## Copy and move

Preview and save a few photos first, then use batch download with the default **Download only** (`copy`) mode. Desktop saves use account directories; Android, iOS, and OHOS default to the system photo library. See the [GUI guide](/en/guides/gui/) for permissions, date folders, and OHOS save confirmation. Download videos to play them locally; vivo inline video playback is not supported.

With a suite session, you can choose download-and-delete (`move`). The app checks capabilities at runtime. Only originals downloaded and integrity-verified in the current run qualify; mobile saves also require a successful system-library save receipt. Missing verification, unverified compound resources, or a same-named existing file cannot justify moving an item merely because it “already exists.” Eligible originals go to vivo's Recently Deleted; vivo's official recovery periods apply.

Explicit gallery deletion also requires a suite session, but it is a separate action without a prior download or backup requirement. Check your selection and the confirmation message. Use copy mode with legacy sessions.

Cancelling preserves saved media; start a new task afterward. Resumable downloading, automatic sync, and scheduled tasks are not available. Incremental mode stops at the first existing target; disable it to fill gaps among older files.

For CLI use, see [Build from source](/en/install/) and the Core package documentation. Source access requires repository permission.

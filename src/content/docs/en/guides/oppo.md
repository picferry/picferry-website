---
title: OPPO
description: Connect OPPO Cloud in PicFerry through official web sign-in, then browse, copy, and delete individual media.
---

PicFerry enables new OPPO accounts. **OnePlus** and **realme** are also available when adding an account; both use the same OPPO cloud service, and the account is stored as OPPO. Cloud browsing, image previews, copy downloads, and individual gallery deletion are supported. **Batch moves are not enabled.** See [Download](/en/download/) for installers.

## Connect your account

1. Choose **Add account**, then **OPPO**, **OnePlus**, or **realme**. Name the account and open the OPPO connection page.
2. Choose **Sign in with OPPO account**, complete authentication on the official page, and enter the gallery:
	- **Desktop:** use the system default Chrome, Edge, or Chromium. Keep the window open after the browser is ready, return to PicFerry, and choose **Sign-in completed**. The app then captures and validates the session.
	- **Android / iOS:** complete authentication on the official sign-in page opened by the app, then confirm sign-in.
	- **HarmonyOS:** until login isolation is accepted, the entry stops safely and issues no credentials.
3. Wait for session validation and saving, then open **Photos** to check that you connected the intended account.

Desktop sign-in data is stored separately for each local account and should be protected like a session file. Cancelling, leaving the connection page, or closing the window before confirmation keeps the previous connection. Sign in again on the official page when authentication expires. The current connection page does not collect a password or verification code inside the app.

## Download and deletion

Preview and download a small sample, then use batch download in **Download only** (`copy`) mode. Desktop saves use account directories; Android, iOS, and HarmonyOS default to the system photo library. See the [GUI guide](/en/guides/gui/) for folder organization, permissions, and HarmonyOS save confirmation. Download videos to play them locally; OPPO inline video playback is not supported.

Explicit gallery deletion is a separate action. Select a photo or video and confirm cloud deletion. Successful deletion moves the item to OPPO Recently Deleted and may sync to devices signed in to the same cloud service. OPPO's recovery rules apply. Deletion does not require a prior download or backup and is not a batch move.

Cancelling preserves saved media, and a later attempt starts a new task rather than resuming a transfer. Automatic sync is not available. See [Download](/en/download/) for installers. For local builds, see [Build from source](/en/install/).

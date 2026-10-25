---
title: iCloud
description: Sign in to iCloud, complete two-factor authentication, and save photos and videos in PicFerry.
---

PicFerry supports in-app iCloud sign-in, photo and album browsing, and saving media to your device. See [Downloads](/en/download/) for package availability and release notes.

## Connect your account

1. Ensure your Apple account allows access to iCloud data on the web. The downloader's web access method does not support Advanced Data Protection (ADP) being enabled; review Apple's security settings and their implications first.
2. Choose **Add account → iCloud**, then set an account name and region. Select mainland China for accounts in that region, or global for other accounts.
3. On the account connection page, enter your **Apple ID and primary account password** and sign in. App-specific passwords do not work with this web authentication flow.
4. Complete two-factor authentication as prompted: enter the code from a trusted device, or use an available SMS verification option.
5. After authentication, open **Photos**. PicFerry reuses the saved session and asks you to authenticate again when needed; the password is not saved as account configuration.

If sign-in fails, check the account region, web access settings, and verification-code status first. Session files are also sensitive credentials and should remain private.

## Browse and save

Preview or download a few individual photos first. Then open batch download, keep **Download only**, choose the media type and new-download count, check the destination, and start.

- Desktop batches use UTC year/month/day folders inside the account directory by default. Individual downloads go directly into the account directory.
- Android, iOS, and OHOS save to the system photo library by default. iOS requires full photo access; OHOS requires foreground save confirmation, with up to 100 items per batch. See the [GUI guide](/en/guides/gui/).
- Image previews are supported. Inline video playback requires a `small_video` resource from iCloud.
- Browsing cloud albums does not mean batch downloads use album folders. Mobile saves do not recreate cloud albums, and paired Live Photo reconstruction in the system library is not guaranteed.

## Move and delete

The download-and-delete option is an optional move mode. It checks completion of the selected resource group under iCloud's rules; mobile saves also require confirmed system-library persistence. An arbitrary existing file is not evidence that a cloud original can be deleted. Check your backup, then read the confirmation before proceeding. Cloud deletion may affect other Apple devices; Apple's recovery rules apply.

Explicit deletion in the gallery is separate: it does not require a backup and does not use the batch move workflow's preconditions. Check your selection carefully.

Cancelling preserves saved media; start a new task afterward. Resumable downloading, automatic sync, and scheduling are not available. Incremental mode stops at the first existing target; turn it off when filling gaps among older files.

For CLI use or development, see [Build from source](/en/install/) and the Core package documentation. Source access requires repository permission; CLI options are not a list of GUI features.

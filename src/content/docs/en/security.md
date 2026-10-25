---
title: Security
description: Authentication and local-data boundaries, plus safety guidance for copying, migration, explicit deletion, and cancellation.
---

## Unofficial status and network boundaries

PicFerry is not an official Apple, HUAWEI, Xiaomi, vivo, OPPO, or HONOR product and is not supported by those vendors. Changes to vendor websites, APIs, risk controls, and session rules can affect authentication and downloads.

The current implementation connects directly from the local device to vendor services. No PicFerry-operated relay has been observed in authentication or media transfer. This is not an offline app: signing in, browsing cloud media, downloading, and cloud deletion require network access and remain subject to vendor rules. This description is not a comprehensive security audit or a privacy guarantee for every dependency.

## Where authentication information goes

- **iCloud**: the Apple ID and password enter the app's authentication flow, followed by two-factor authentication when prompted. The China mainland account region is supported. It would be inaccurate to say that the password never enters the app.
- **Xiaomi and vivo**: use official web authentication or import a Cookie file, depending on the platform. Cookies and sessions can confer account access and should be treated as credentials. See [Status](/en/status/#vendors-and-authentication) for available entry points.
- **HUAWEI, OPPO, and HONOR**: adding accounts is disabled in the GUI, but Core has real copy-download implementations. Do not assume that their code makes no network requests.

Use devices and authentication pages you trust. Enter passwords and verification codes yourself through the app or vendor authentication interface, and use sanitized information when reporting issues.

## Local storage does not imply uniform encryption

The app stores account configuration, Cookie/session files, and preview/metadata caches locally. Downloaded photos and videos go to the selected folder or system library. There is no uniform encryption guarantee covering this data, and local storage alone does not mean all credentials are protected by a system keychain.

- Keep cookies, session files, account configuration, and caches on access-controlled devices and in protected directories. Use protected backups for this data.
- Use sanitized copies of public logs, screenshots, issues, and PRs, removing passwords, verification codes, cookies, sessions, account/device identifiers, and signed media URLs.
- **Removing an account removes only its in-app configuration.** It does not clear sessions, caches, downloaded media, or cloud content, sign you out of the vendor service, or revoke authorization. To revoke a session, use the vendor's account-security controls and separately address remaining local data.

## Copying, migration, and explicit deletion

The default **`copy`** mode keeps cloud originals. Copy a few items first and verify readability, destination, and backup results before deciding whether to migrate.

**`move` (download and delete cloud originals)** is available only for iCloud, Xiaomi, and vivo. For vivo, it requires a suite session; legacy sessions use copy. Migration requires resource verification: iCloud checks completion of selected resource groups and vendor rules, while Xiaomi and vivo require integrity verification of originals downloaded in the current run. Mobile platforms also require successful system-library save receipts. Insufficient verification or unconfirmed saving leaves cloud originals intact.

**Explicit deletion from the gallery is a separate action. It requires no prior download or backup and does not use migration's save-verification flow.** Review selected items in the confirmation dialog. vivo deletion also requires suite-session capabilities. Cloud deletion may affect other devices using the same service; recovery methods and retention periods are controlled by the vendor.

System-library saving has platform prerequisites: iOS needs full photo-library access, and OHOS requires the app to remain in the foreground and the user to confirm the system save dialog, with at most 100 items per batch. See [Status](/en/status/) for the complete capability boundaries.

## Cancellation and starting again

Canceling a task keeps media already saved. **Cloud deletions already submitted may still take effect; cancellation is not a rollback.** Starting again runs the task again rather than resuming an interrupted download.

Incremental mode stops at the first existing destination. It is not hash-based deduplication and cannot establish that all gaps in older downloads have been repaired. Gallery album selection does not scope batch downloads; verify the actual task scope before migration rather than treating the album being browsed as the download boundary. There is no automatic sync or scheduling.

See the [GUI guide](/en/guides/gui/) for usage and [Contributing](/en/contributing/) for reporting guidance.

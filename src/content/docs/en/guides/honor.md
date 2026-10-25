---
title: HONOR
description: GUI account restrictions and real Core copy-download capabilities for HONOR Cloud.
---

**Adding HONOR accounts is not currently enabled in the GUI.** The Core HONOR provider implements real Cookie authentication, media listing, and copy downloads. It sends actual cloud-service requests rather than merely accepting cookies as a scaffold.

## Current usage path

- For new accounts, use a provider currently enabled in the GUI and follow the [GUI guide](/en/guides/gui/).
- Existing configured HONOR accounts can use the connection and copy actions available in the interface. Cloud deletion and batch moves are not enabled.
- For CLI use, first confirm that you have source repository access, then read [Build from source](/en/install/) and the `honor_photos_downloader` package documentation. Use valid cookies from your own official cloud-service session, copy a small sample, and check the results.

Real Core downloads do not mean GUI account creation or media previews are enabled, nor do they imply automatic sync, scheduling, or resumable downloading.

## Credentials and release information

Keep Cookie files, saved sessions, account identifiers, and signed media URLs private. Share only sanitized information when reporting problems. Sign in again to obtain valid cookies when authentication expires.

See [Downloads](/en/download/) for package availability and release notes. GUI/Core source access requires repository permission.

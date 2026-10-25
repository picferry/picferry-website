---
title: OPPO
description: GUI account restrictions and Core copy-download capabilities for OPPO Cloud.
---

**Adding OPPO accounts is not currently enabled in the GUI.** Core has real authentication, media listing, and copy downloads using valid login cookies. It is not a scaffold that cannot download.

## Current usage path

- For new accounts, use a provider currently enabled in the GUI and follow the [GUI guide](/en/guides/gui/).
- Existing configured OPPO accounts can use the connection and copy actions available in the interface. Cloud deletion and batch moves are not enabled.
- For the underlying CLI, first confirm that you have source repository access, then read [Build from source](/en/install/) and the `oppo_photos_downloader` package documentation. Use your own official cloud-service session and verify a small copy download and its saved files first.

Core copy support does not mean GUI account creation or media previews are enabled, nor does it promise automatic sync, scheduled tasks, or resumable downloading. Keep Cookie and session files in trusted storage and sign in again for valid credentials when they expire.

See [Downloads](/en/download/) for actual package availability and release notes.

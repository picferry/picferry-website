---
title: HUAWEI
description: Current GUI account restrictions and Core copy-download capabilities for HUAWEI Cloud Gallery.
---

**Adding HUAWEI accounts is not currently enabled in the GUI.** This is separate from the underlying implementation: the Core HUAWEI provider has real Cookie-based authentication, media listing, and copy downloads. It is not a scaffold.

## Current usage

- For new accounts, use the providers currently enabled in the app and follow the [GUI guide](/en/guides/gui/). This page does not provide a workaround for the disabled account-creation entry.
- If you already have a configured HUAWEI account, use the connection and copy-download actions available in the current interface. Cloud deletion and batch moves are not enabled.
- If you have source access and need the CLI, start with [Build from source](/en/install/), then follow the `huawei_photos_downloader` package documentation. Authentication uses valid cookies from your own signed-in [HUAWEI Cloud](https://cloud.huawei.com) session. Verify copying with a small sample first.

## Limits and credentials

Core copy support does not mean GUI account creation, image previews, inline video, or moves are enabled. It also does not imply automatic sync, scheduling, or resumable downloading. Check the saved local files after downloading.

When cookies expire, sign in again and export a fresh file. Keep credential files in trusted storage. See [Downloads](/en/download/) for package availability and release notes; GUI/Core source access requires repository permission.

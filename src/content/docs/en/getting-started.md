---
title: Overview
description: Connect cloud galleries, browse media, and save it locally with the PicFerry app.
---

PicFerry is an unofficial cloud-gallery download app: connect an account, browse photos and videos, and save media to a desktop folder or a mobile system photo library. The Flutter GUI is the everyday interface, backed by Dart vendor packages and a shared core.

## What you can do today

- Add and connect **iCloud, Xiaomi, and vivo** accounts. Adding HUAWEI, OPPO, and HONOR accounts is currently disabled in the GUI, although Core has real copy-download implementations for them.
- Browse media, preview images, and download files. The default **copy** mode keeps cloud originals.
- Use **move** (download and delete cloud originals) where supported. Migration and explicit deletion from the gallery are separate actions; read [Security](/en/security/) before using them.
- Choose Chinese or English, system/light/dark themes, gallery density, and download settings. Default concurrency is **4**.

The [Status page](/en/status/) is the reference for authentication methods, native-platform capabilities, and operation limits. An implemented capability does not imply a publicly available installer; see [Download](/en/download/) for availability.

## Get started

1. Read [Security](/en/security/) for authentication, local storage, and cloud-deletion boundaries.
2. Check the live manifest on [Download](/en/download/), choose R2 or the GitHub backup, and compare SHA256. As of 2026-10-24, the first official release has not been published. Linux x64, Windows x64, and Android universal APK are the automatic build targets; actual packages depend on the manifest. Public compiled packages do not require GUI/Core source access. Developers who already have source access can also follow [Build from source](/en/install/).
3. Follow the [GUI guide](/en/guides/gui/) to add an account, then use the authentication steps for [iCloud](/en/guides/icloud/), [Xiaomi](/en/guides/xiaomi/), or [vivo](/en/guides/vivo/).
4. Copy a few photos and videos first. Verify their location and readability before starting a batch task.

There is no automatic sync or scheduling, and restarting a task is not resumable downloading. Selecting an album in the gallery does not scope batch downloads, and saving does not recreate cloud album structures. See [Status](/en/status/) for details.

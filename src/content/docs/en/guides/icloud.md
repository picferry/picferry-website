---
title: iCloud
description: Authenticate, list, and download iCloud photos with icloud_photos_downloader.
---

`icloud_photos_downloader` is a Dart library/CLI in the [`picferry_core`](https://github.com/picferry/picferry_core) monorepo under `packages/icloud_photos_downloader`. Semantics follow [icloudpd](https://github.com/icloud-photos-downloader/icloud_photos_downloader). Prebuilt binaries are not published with this site yet.

## Account prerequisites

On iPhone / iPad confirm:

- “Access iCloud Data on the Web” is enabled
- Advanced Data Protection (ADP) is **off**

ADP and FIDO are unsupported.

## Authentication

First sign-in needs the Apple ID password and 2FA (device push or SMS). Sessions are stored under `~/.picferry/icloud/` (Windows: `%USERPROFILE%\.picferry\icloud\`).

```sh
cd picferry_core/packages/icloud_photos_downloader
dart run bin/icloud_photos_downloader.dart --auth-only
dart run bin/icloud_photos_downloader.dart --username you@example.com --auth-only
dart run bin/icloud_photos_downloader.dart --mfa-method device --auth-only
dart run bin/icloud_photos_downloader.dart --domain cn --auth-only
```

Use `--domain cn` for China accounts. Do not use app-specific passwords.

## Modes

| Mode | Behavior | Flags |
| --- | --- | --- |
| Download only (default) | Download files missing locally | none |
| Download then delete originals | After a successful download, delete from iCloud (optionally keep recent N days) | `--keep-icloud-recent-days N` |

Always try destructive flows with `--dry-run` first.

## Common commands

```sh
dart run bin/icloud_photos_downloader.dart --directory /photos --recent 10
dart run bin/icloud_photos_downloader.dart --list-libraries
dart run bin/icloud_photos_downloader.dart --list-albums
dart run bin/icloud_photos_downloader.dart --album Favorites --directory /photos
dart run bin/icloud_photos_downloader.dart --recent 5 --dry-run --directory ./tmp-icloud --folder-structure none
dart run bin/icloud_photos_downloader.dart --keep-icloud-recent-days 0 --directory /photos --dry-run
```

Default folder structure is `{:%Y/%m/%d}`. `--folder-structure none` flattens into the target directory.

Some legacy CLI features (watch, notifications, RAW pairing, and similar) are still being ported; see `docs/porting-plan.md` in the core package.

## Config files

Non-secret defaults may live in a working-directory `.env`. CLI flags override environment variables. Do not commit `.env`.

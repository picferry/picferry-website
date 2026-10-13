---
title: Security
description: Unofficial status, credential handling, and why cookies must stay off Git.
---

## Unofficial

This project is not an official Apple, HUAWEI, Xiaomi, vivo, OPPO, or HONOR product and is not supported by those vendors. Web or API changes can break the tools at any time.

## Never commit

- Apple ID / cloud passwords
- Browser cookies and `cookies.json`
- Session files (default `~/.picferry/`)
- Signed or time-limited media URLs
- Real account identifiers or device IDs

Issues and PRs should only include sanitized protocol traces. The HONOR provider refuses live requests until the API is verified so unverified traffic and secrets stay out of the repo.

## Destructive operations

Download and delete from cloud (`--keep-icloud-recent-days`) deletes cloud files. Use `--dry-run` first, with an isolated directory or album.

## Session files

Treat the session directory as a secret. Encrypt backups; do not sync it to a public drive.

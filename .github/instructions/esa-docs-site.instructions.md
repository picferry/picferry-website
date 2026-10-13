---
description: "Use when publishing, deploying, renaming, or operating the PicFerry docs site on Alibaba Cloud ESA Pages."
applyTo:
  - "esa.jsonc"
  - "astro.config.mjs"
  - "README.md"
---

# PicFerry docs site ESA pointer

This repository is the public docs site only. Do not copy ESA runbooks here.

- ESA project name: `photos-downloader` (rename separately in the hosting account)
- Target public host: `picferry.jqknono.com` (configure custom domain and DNS before production cutover)
- Work from this directory (`picferry/`), not the parent workspace root
- Canonical URL lives in `astro.config.mjs` `site` and `package.json` `homepage`
- Deploy and custom-domain steps: jqknono skill `jqknono-esa`, especially `references/pages-custom-domain.md`
- Public DNS (`alidns` CNAME, no `CreateRecord`): `jqknono-aliyun`
- Hard cutover (no 301): build/deploy with the existing ESA project name → `esa domain add` → read `RecordCname` → add only the new CNAME → verify with public DoH / `--resolve` → then delete the old ESA domain and DNS record
- Local `Resolve-DnsName` to `28.0.3.x` / `fc00::` is Mihomo fake-ip, not a cert failure
- Do not echo `esa_er_token` or treat `*.er.aliyun-esa.net` as the public site

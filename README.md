# PicFerry

Public website and user guides for [PicFerry](https://picferry.jqknono.com): unofficial tools that download photos and videos from iCloud, HUAWEI, Xiaomi, vivo, OPPO, and HONOR cloud galleries.

CLI and GUI source live in sibling repositories:

- [`picferry_core`](https://github.com/picferry/picferry_core) — shared Dart core + vendor packages (Melos monorepo)
- [`picferry_gui`](https://github.com/picferry/picferry_gui) — Flutter desktop GUI

This repository hosts the public website and guides only. Download pages remain placeholders until GitHub Releases ship installers.

## Local development

```sh
npm install
npm run dev
```

Production build:

```sh
npm run build
```

The static site is written to `dist/`.

## Locales

- Chinese (default): `/`
- English: `/en/`

## Deploy

Hosted on Alibaba Cloud ESA Pages. Target public host: [https://picferry.jqknono.com](https://picferry.jqknono.com). Configure the ESA custom domain and public DNS before switching production traffic; until cutover, the previous host may remain active.

```sh
npm run build
esa-cli commit --name photos-downloader --assets dist --description "docs site" --no-bundle
esa-cli deploy --name photos-downloader --environment staging --no-bundle
esa-cli deploy --name photos-downloader --environment production --version <version>
esa-cli domain add picferry.jqknono.com
```

The ESA project remains named `photos-downloader` until it is explicitly renamed in the hosting account. Resolve the new custom-domain CNAME from ESA and configure public DNS before cutover; the new domain's production routing has not been verified.

## License

MIT

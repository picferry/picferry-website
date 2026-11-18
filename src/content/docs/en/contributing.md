---
title: Contributing
description: Contributing to the public website, checking bilingual documentation, and respecting app source-access boundaries.
---

## Where and what to contribute

The public [picferry/picferry-website](https://github.com/picferry/picferry-website) repository accepts improvements to the **website, user guides, translations, and styling**. Contributions can correct typos, clarify workflows, or document verified platform differences and safety boundaries.

For app source access and public availability, use [Status](/en/status/). Implementation contributions require access to the corresponding repositories and adherence to their contribution rules. Keep PRs focused on website source, documentation, and tests; do not attach official installers to PRs. Public package downloads and source permissions are managed separately.

Current official packages cover Linux x64, Windows x64, and Android. macOS, iOS, and HarmonyOS currently ship through app stores or other independent channels. After a new version is published, refresh [Download](/en/download/).

## Documentation principles

- Chinese pages live in `src/content/docs/`, with matching filenames under `src/content/docs/en/` for English. Update both languages for each capability change.
- Use `/path/` for Chinese internal links and `/en/path/` for English links, preserving the reader's language.
- Maintain the complete capability matrix on [Status](/en/status/). Other pages should link to it and add their own workflow guidance instead of duplicating status tables.
- Distinguish app entry points, currently available actions, and public releases. Describe verified behavior and include the date and scope of release checks.
- Preserve existing page design and navigation. Keep wording changes focused on facts and readability, and explain new pages or styling changes separately.

## Local preview and checks

Run these commands from `picferry-website/` with Node.js/npm versions compatible with the project's current dependencies:

```sh
npm install
npm run dev
```

Local preview lets you check content and layout; it does not deploy the site. For documentation-only changes, check frontmatter, internal links, language pairs, and `git diff --check`. For download-component changes, run `npm run build` and `npm test` with a local real browser and a test manifest to validate bilingual pages and both download links; see the repository README. For app analysis, tests, and native environment preparation, see [Build from source](/en/install/).

## Reporting and pre-submission review

1. Describe the platform, app version or source revision, vendor, authentication method, and reproduction steps. Distinguish copying, migration, and explicit gallery deletion.
2. Attach only sanitized logs and screenshots, removing passwords, verification codes, cookies, sessions, account/device identifiers, and signed media URLs. See [Security](/en/security/) for handling guidance.
3. Review `git diff` for scope, equivalent Chinese/English meaning, and correct links. List the checks actually performed.
4. For reports about public installers or source accessibility, provide the verification date and public endpoint. Report observed facts rather than inferring unverified release plans.

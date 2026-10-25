---
title: Contributing
description: Contributing to the public website, checking bilingual documentation, and respecting GUI/Core source-access boundaries.
---

## Where and what to contribute

The public [picferry/picferry-website](https://github.com/picferry/picferry-website) repository accepts improvements to the **website, user guides, translations, and styling**. Contributions can correct typos, clarify workflows, or document verified platform differences and safety boundaries.

For GUI/Core source access and public availability, use the dated verification scope on [Status](/en/status/). Implementation contributions require access to the corresponding repositories and adherence to their contribution rules. The website repository's **Releases may host official compiled artifacts uploaded by the controlled release workflow**, with identical copies in R2. Keep PRs focused on website source, documentation, and tests; deliver binaries through the official Release workflow, not PR commits. Public package downloads and GUI/Core source permissions are managed separately.

As of 2026-10-24, the first official release has not been published. Automatic build targets are Linux x64, Windows x64, and Android universal APK. [Download](/en/download/) validates the live manifest in the browser before displaying R2 primary and GitHub backup links, version, size, and SHA256. New releases need no website rebuild.

## Documentation principles

- Chinese pages live in `src/content/docs/`, with matching filenames under `src/content/docs/en/` for English. Update both languages for each capability change.
- Use `/path/` for Chinese internal links and `/en/path/` for English links, preserving the reader's language.
- Maintain the complete capability matrix on [Status](/en/status/). Other pages should link to it and add their own workflow guidance instead of duplicating status tables.
- Distinguish GUI entry points, Core implementations, platform projects, and public releases. Describe verified behavior and include the date and scope of release checks.
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

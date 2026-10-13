# Contributing

This public repository contains the PicFerry website and user guides only.

## Scope

- Documentation, translations, and site styling are welcome.
- Do not open pull requests that add compiled binaries, account credentials, cookies, session files, or live media URLs.
- Vendor CLI / GUI source is not published in this repository yet.

## Local preview

```sh
npm install
npm run dev
```

Chinese pages live in `src/content/docs/`. English pages live in `src/content/docs/en/` and should use the same file names.

## Pull requests

1. Keep secrets out of commits. Review `git diff` before pushing.
2. Prefer small, reviewable documentation changes.
3. Run `npm run build` locally when you change config or add pages.

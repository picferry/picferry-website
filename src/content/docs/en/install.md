---
title: Build from source
description: Recommended sibling checkout for core and GUI.
---

Clone the three repositories as siblings under one parent directory:

```sh
mkdir -p picferry-org && cd picferry-org
git clone https://github.com/picferry/picferry_core.git
git clone https://github.com/picferry/picferry_gui.git
git clone https://github.com/picferry/picferry-website.git   # optional docs site
```

### Core (vendor CLIs + shared library)

Requires Dart SDK `>=3.3.0`.

```sh
cd picferry_core
dart pub get
dart pub global activate melos
melos bootstrap
melos run analyze
```

Run one vendor CLI:

```sh
cd packages/icloud_photos_downloader
dart run bin/icloud_photos_downloader.dart --help
```

### GUI

Requires Flutter `>=3.10`.

```sh
cd picferry_gui
flutter pub get
flutter run -d windows   # or macos / linux
```

This docs repository does not ship installers. When binaries are published they will appear on [GitHub Releases](https://github.com/picferry/picferry-website/releases).

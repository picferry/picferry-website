---
title: 从源码构建
description: 本地检出 core 与 GUI 的推荐方式。
---

推荐在同一父目录并排检出三个仓库：

```sh
mkdir -p picferry-org && cd picferry-org
git clone https://github.com/picferry/picferry_core.git
git clone https://github.com/picferry/picferry_gui.git
git clone https://github.com/picferry/picferry-website.git   # 可选，本站
```

### Core（厂商 CLI + 共享库）

需要 Dart SDK `>=3.3.0`。

```sh
cd picferry_core
dart pub get
dart pub global activate melos
melos bootstrap
melos run analyze
```

单个厂商 CLI：

```sh
cd packages/icloud_photos_downloader
dart run bin/icloud_photos_downloader.dart --help
```

### GUI

需要 Flutter `>=3.10`。

```sh
cd picferry_gui
flutter pub get
flutter run -d windows   # 或 macos / linux
```

本站仓库仅包含文档，不包含可执行安装包。安装包发布后会在 [GitHub Releases](https://github.com/picferry/picferry-website/releases) 提供。

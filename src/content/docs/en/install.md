---
title: Build from source
description: Standard Flutter and isolated OHOS setup for developers who already have source access.
---

This page is for developers who **already have access to the `picferry_gui` and `picferry_core` source code**. The website repository's source tree contains the site and documentation; its public Releases may host official compiled packages, with identical copies stored in R2. Restricted source access does not prevent public package downloads. App users should start with the R2 primary and GitHub backup list on [Download](/en/download/) and check version, architecture, and SHA256.

As of 2026-10-24, the first official release has not been published. Linux x64, Windows x64, and Android universal APK are the current automatic build targets; actual availability depends on the live manifest. iOS/OHOS are outside this release pipeline. See [Status](/en/status/) for GUI/Core source-access checks; building from source still requires permission.

## Directory and SDK prerequisites

Obtain source through an authorized channel and keep the following sibling layout to satisfy the GUI's relative path dependencies:

```text
parent-directory/
├── picferry-org/
│   ├── picferry_core/
│   ├── picferry_gui/
│   └── picferry-website/     # Optional public website
└── picferry-ohos-build/     # Isolated OHOS copies and artifacts
```

Use the **standard Flutter SDK and its bundled Dart** for the original GUI/Core workspace. Choose a toolchain compatible with the current source, resolved dependencies, and platform plugins. Check it with `flutter --version`, `dart --version`, and `flutter doctor -v`. Older SDK lower bounds in `pubspec.yaml` are declarations, not a guarantee that today's dependencies and native projects have been verified with those versions.

Each Core and GUI command block below starts independently from `picferry-org/`. Confirm the terminal's working directory before running it.

## Core: shared contracts and vendor implementations

Use the repository-declared Melos version to resolve packages, analyze code, and run tests:

```sh
cd picferry_core
dart pub get
dart run melos bootstrap
dart run melos run analyze
dart run melos run test
```

Vendor packages contain Dart libraries and CLI entry points. The GUI calls the libraries directly; using a CLI is not a prerequisite for using the app. See [Architecture](/en/architecture/) for responsibilities.

## GUI: standard Flutter

This example assumes a configured Linux desktop build environment:

```sh
cd picferry_gui
flutter pub get
flutter analyze
flutter test
flutter run -d linux
```

`flutter run` builds and starts the app. It does not create a public release or deploy the website. Read [Security](/en/security/) before running the app, and manage any test credentials securely on your own machine.

### Other native-platform prerequisites

| Platform | Preparation |
| --- | --- |
| Windows | Configure Flutter desktop support and the Visual Studio C++ toolchain on a Windows host, then select the Windows device |
| Android | Configure the Android SDK, build tools, and a device/emulator; grant photo-library permissions as required by the OS |
| iOS | Configure Xcode, dependencies, and signing on a macOS host. System-library saving needs full photo-library access; a macOS build host does not imply a supported macOS app target |
| OHOS | Use a compatible OHOS Flutter SDK, native toolchain, device, and signing configuration, with dependency isolation as described below |

There is currently no native `macos/` project, so desktop commands cannot simply be reused to produce a macOS app. Web is a UI preview without real cloud-service connections. See [Status](/en/status/) for the complete platform and authentication matrices.

## OHOS: isolated preparation

First set `OHOS_FLUTTER_ROOT` locally to your actual OHOS Flutter SDK directory. The following command's **working directory is `picferry-org/picferry_gui/`**. Its `../../picferry-ohos-build` path points outside the workspace, as in the layout above:

```sh
python3 tool/build_ohos.py --flutter-root "$OHOS_FLUTTER_ROOT" --build-root ../../picferry-ohos-build --prepare-only
```

`--prepare-only` prepares and checks the isolated copy; it does not perform a full app build. For subsequent builds, follow the OHOS tool instructions in the source you have access to, using the same SDK and isolated directory.

Keep the original GUI/Core dependencies, lockfiles, and `.dart_tool` associated with the standard SDK. OHOS dependency resolution, lockfiles, native dependencies, and artifacts stay in the isolated copy. Maintain shared source and overlay configuration in the source workspace, then sync through the preparation entry point. Use `--update-lock` only after separately approving dependency upgrades.

Saving media on OHOS still requires the app to remain in the foreground and the user to confirm the system save dialog, with at most 100 items per batch. A successful source build does not replace device-level validation of saving.

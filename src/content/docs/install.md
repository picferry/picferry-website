---
title: 从源码构建
description: 面向已有源码访问权限的开发者，准备标准 Flutter 与隔离 OHOS 构建环境。
---

本页面向**已取得 `picferry_gui` 和 `picferry_core` 源码访问权限**的开发者。网站仓库的代码树承载网站与文档，其公开 Releases 允许存放官方编译包，并在 R2 保存同一份文件。源码访问受限不影响公开包下载；普通使用者请先查看 [下载页](/download/) 的 R2 主下载与 GitHub 备用清单，核对版本、架构和 SHA256。

截至 2026-10-24，首个正式版本尚未发布。Linux x64、Windows x64、Android universal APK 是当前自动构建目标，实际可用包以实时清单为准；iOS/OHOS 不在此发布流水线中。GUI/Core 的源码访问核实结果见 [状态页](/status/)，自行构建仍需先取得源码权限。

## 目录与 SDK 前提

通过已获授权的渠道取得源码，并保持以下并排布局，以满足 GUI 的相对路径依赖：

```text
工作父目录/
├── picferry-org/
│   ├── picferry_core/
│   ├── picferry_gui/
│   └── picferry-website/     # 可选：公开网站
└── picferry-ohos-build/     # OHOS 隔离副本与产物
```

原始 GUI/Core 使用**标准 Flutter SDK 及其配套 Dart**。根据当前源码、依赖解析结果和平台插件选择兼容的工具链，先运行 `flutter --version`、`dart --version` 和 `flutter doctor -v` 检查环境。`pubspec.yaml` 中较早的 SDK 下限只是声明，不能视为当前依赖和原生工程都已验证兼容的保证。

以下 Core 与 GUI 命令块各自从 `picferry-org/` 开始；请在执行前确认终端工作目录。

## Core：共享契约与厂商实现

使用仓库声明的 Melos 版本解析包、静态检查并运行测试：

```sh
cd picferry_core
dart pub get
dart run melos bootstrap
dart run melos run analyze
dart run melos run test
```

厂商包包含 Dart 库和 CLI 入口；GUI 直接调用这些库，CLI 不是使用应用的前置步骤。职责划分见 [架构](/architecture/)。

## GUI：标准 Flutter

下面以已有 Linux 桌面构建环境为例：

```sh
cd picferry_gui
flutter pub get
flutter analyze
flutter test
flutter run -d linux
```

`flutter run` 会构建并启动应用，不会生成公开发布记录或部署网站。运行应用前请参考 [安全说明](/security/)，测试使用的凭据由开发者在本机安全管理。

### 其他原生平台前提

| 平台 | 准备事项 |
| --- | --- |
| Windows | 在 Windows 主机配置 Flutter 桌面支持和 Visual Studio C++ 工具链，再选择 Windows 设备运行 |
| Android | 配置 Android SDK、构建工具及设备/模拟器，按系统要求授予图库权限 |
| iOS | 在 macOS 主机配置 Xcode、依赖及签名环境；系统图库保存需要完整照片访问权限。macOS 构建主机不等于支持 macOS 应用目标 |
| OHOS | 使用兼容的 OHOS Flutter SDK、原生工具链、设备与签名配置，并按下节隔离依赖 |

当前没有 `macos/` 原生工程，不能直接沿用桌面命令生成 macOS 应用；Web 仅供 UI 预览，不连接真实云服务。完整平台与认证矩阵见 [状态页](/status/)。

## OHOS：隔离准备

先由用户在本机将 `OHOS_FLUTTER_ROOT` 设置为实际 OHOS Flutter SDK 目录。下面命令的**工作目录是 `picferry-org/picferry_gui/`**；`../../picferry-ohos-build` 指向上方布局中工作区之外的隔离目录：

```sh
python3 tool/build_ohos.py --flutter-root "$OHOS_FLUTTER_ROOT" --build-root ../../picferry-ohos-build --prepare-only
```

`--prepare-only` 用于准备和检查隔离副本，不执行完整应用构建。后续构建按已获授权源码中的 OHOS 工具说明进行，并使用相同的 SDK 与隔离目录。

原始 GUI/Core 的依赖、锁文件和 `.dart_tool` 保持标准 SDK 归属；OHOS 的依赖解析、锁文件、原生依赖和产物留在隔离副本中。共享源码及覆盖配置在源工作区维护，再通过入口同步生成副本。依赖升级单独确认后再使用 `--update-lock`。

OHOS 保存媒体时仍需应用在前台，确认系统保存对话框，每批最多 100 项；源码构建成功不替代设备上的保存流程验证。

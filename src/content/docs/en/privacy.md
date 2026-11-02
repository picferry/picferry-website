---
title: Privacy Policy
description: Authentication, local data, third-party services, and privacy contact details for PicFerry on Android, with separate website data handling information.
---

Last updated: 2026-11-02

## Scope and developer

This policy describes data handling for the **PicFerry Android app** and this website. It does not extend Android password storage or other implementation details into promises for every platform. PicFerry is an unofficial cloud photo tool developed by **jqknono**. The privacy contact is [jqknono@gmail.com](mailto:jqknono@gmail.com). The Chinese policy address is [https://picferry.jqknono.com/privacy/](https://picferry.jqknono.com/privacy/); see also the [中文版本](/privacy/).

The app is free, has no ads or in-app purchases, and has no account system of its own. An “account” in the app is a connection you add to a third-party cloud service, not an account registered with PicFerry. The current ordinary add-account flow on Android offers iCloud, Xiaomi, vivo, and OPPO; HUAWEI and HONOR are not part of that flow. PicFerry is not provided or endorsed by these vendors.

## Sign-in and authentication information

The app processes authentication information to connect to the cloud photo service you choose:

| Service | Data handling on Android |
| --- | --- |
| iCloud | You enter your Apple account and password in the app, which sends them to Apple for authentication, with two-factor authentication as required by Apple. The app processes the password; it is not entered solely on a vendor webpage. Optional secure password storage is enabled by default, and you can turn it off. Secure password storage does not mean all local data is encrypted. |
| Xiaomi, vivo, OPPO | You authenticate on the vendor's official sign-in page in a WebView, and the vendor receives the sign-in form information. After sign-in, the app reads and locally saves cookies/sessions for subsequent cloud photo access. The webpage may also retain cookies and other browser data. |

Cookies/sessions can confer account access and are sensitive authentication information. Authentication and media operations connect directly to vendor services, rather than through a PicFerry-operated business relay server. Third-party sign-in pages and vendor services receive authentication information, IP addresses, device or browser request information, and requests for albums, media previews, downloads, or deletion. Their processing is also governed by their respective policies and account settings.

## Local configuration, media, and network requests

- **Account configuration and sessions**: connection settings and cookies/sessions are stored locally on the device so you can continue using added cloud services.
- **Gallery metadata and preview caches**: album and media-entry metadata, photo thumbnails, or preview caches are stored locally for browsing and to reduce repeated loading. This does not mean every cloud original has been downloaded to the device.
- **Downloaded photos and videos**: media is saved to the system library or a user-selected directory as you request, using the access Android provides for that destination. Your other apps or system services may manage those locations and their backups.
- **Cloud operations**: browsing, previewing, downloading, and deletion or migration you select send requests to the relevant vendor. Cloud deletion differs from removing a local connection. Review the scope before confirming; see [Security](/en/security/).

Based on the current source code review, the app has no integrated first-party analytics, advertising, or crash reporting. This describes the app's own implementation, not an absence of data processing by third-party webpages, vendor services, or the device system. It is not a privacy audit of every dependency.

## Retention and cleanup

Local retention depends on your use, cache eviction, and active cleanup, rather than a single fixed number of days. Account configuration and sessions support ongoing connections; caches arise during use and are subject to cache eviction; you manage downloaded media. Cleanup has the following boundaries:

| Action | Data handling boundary |
| --- | --- |
| Delete an account in the app | Clears that account's configuration and associated securely saved passwords. It does not clear sessions, caches, or downloaded media, or delete the vendor account or cloud content. Xiaomi and vivo WebView cookies remain. This action does not mean a complete web sign-out or vendor-session revocation. |
| Clear app data or uninstall | Clears app-private data. Downloaded media in user-selected directories and the system library remains and must be managed separately in those locations. |
| Revoke a third-party session | Use the relevant vendor's account-security or session-management settings. Removing an in-app account, clearing app data, or uninstalling does not itself revoke a session on the vendor's side. |

PicFerry has no account-closure process of its own. To stop using it, remove connections, clean up local data as described above, and revoke vendor sessions as needed. Retention of cloud content and authentication records by vendors is governed by their service rules.

## Website visits and email support

This section is separate from local data handling in the Android app:

- **ESA hosting**: this website is hosted on Alibaba Cloud ESA. The hosting service processes visits, and access logs may contain IP addresses, access times, request paths, and browser or device request information for website delivery, operation, and security. Whether logs are recorded and how long they are kept depends on the actual service configuration and provider rules. This policy does not state an unverified fixed retention period.
- **Google Fonts**: website styles request Google Fonts (`fonts.googleapis.com` and `fonts.gstatic.com`). Font requests send IP addresses and browser request information to Google, whose policies govern that processing. This concerns website visits, not in-app Android analytics.
- **Email support**: only when you actively send an email does the developer receive your email address, message, and attachments you choose to provide, to respond, investigate your reported issue, or handle a privacy request. Email providers also process message delivery and storage. Share sanitized information where possible, keeping passwords, verification codes, cookies/sessions, and complete private media confidential.

Support emails are retained as needed for correspondence, issue resolution, and necessary follow-up. You can use the contact below to ask about or request cleanup of relevant email information held by the developer. Website logs, Google font requests, and email-service processing do not mean the developer holds your in-app credentials or copies of your cloud library.

## Your choices and privacy contact

You choose whether to add a cloud service, enable iCloud secure password storage, browse, download, or perform cloud deletion. You can also manage app permissions in Android settings, clear app data, or uninstall, and manage remaining media and vendor sessions as described above.

To ask about this policy, correct information you supplied, or request deletion of support email information held by the developer, contact [jqknono@gmail.com](mailto:jqknono@gmail.com) with only the information needed to identify your request. The developer will handle requests according to the data actually held and the actions available, asking for clarification where needed. The developer cannot remotely clear your device's private data, system library, or vendor cloud account data through email; you must perform those actions locally or through the vendor. No unverified fixed response or deletion deadline is promised here.

## Security and minors

Secure password storage and local storage can offer some protection, but do not imply uniform encryption or guarantee absolute security. Use trusted devices, protect device locks and backups, and sanitize logs or screenshots before sharing. See [Security](/en/security/) for further operational boundaries.

Minors should use the app with appropriate guardian guidance and follow applicable legal requirements and the account and usage rules of third-party cloud services. Guardians with privacy questions about information actively supplied to the developer can use the email above. This policy does not independently set a legal age threshold or an app-store age rating.

## Policy updates

Changes to data handling will be reflected in revisions to this policy and its page date. The date identifies the document version; it does not mean a new local draft has been deployed or has taken effect online. The public version is the page actually published.
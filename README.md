# 貝殼單詞 · iOS 打包（Capacitor + GitHub Actions）

把背單詞網站打包成 iOS `.ipa`。構建在 GitHub Actions 的 macOS 運行機上完成，無需本機 Mac。

## 工作原理

1. 推送代碼後，Actions 自動執行 `.github/workflows/ios.yml`：
   - `scripts/prepare_web.py` 下載最新網站並整理為 `www/index.html`（Capacitor 入口）；
   - 由 `resources/icon.svg` 經 `@resvg/resvg-js` 生成 App 圖標與啟動畫；
   - `npx cap add ios` 生成 iOS 工程；
   - `@capacitor/assets` 注入原生圖標；
   - `xcodebuild` 在不簽名狀態下構建 Release；
   - 打包為 `Shellwords-unsigned.ipa` 並發布到 Releases。
2. 在 [Releases](../../releases) 下載最新 IPA。

> 更換網站來源：修改工作流中 `prepare_web.py` 的網址，或自行把 `index.html` 放進 `www/` 並刪除該步驟。

## 安裝到 iPhone

IPA 未簽名，需重簽後安裝：

- **AltStore / SideStore（推薦）**：用自己的 Apple ID 重簽，免費帳號簽名有效期 7 天，到期需重新簽；
- **TrollStore**：僅支援特定 iOS 版本，可永久安裝未簽名 IPA。

## 本機複現（需要 macOS）

```bash
npm install
npm run icons
npx cap add ios
npx capacitor-assets generate --ios
npx cap sync ios
```

再用 Xcode 打開 `ios/App/App.xcworkspace`，配置簽名後 Archive。

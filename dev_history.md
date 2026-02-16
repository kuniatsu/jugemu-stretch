# 開発履歴 (dev_history.md)

## 2026-02-08

### 初期セットアップ
- Vite + React + TypeScript プロジェクト作成
- HashRouter導入（GitHub Pages SPA対応）
- SP表示専用レイアウト（max-width: 430px）
- React Native移行を意識したインライン・スタイル構成

### Web版ストレッチタイマー初期実装
- データ層: muscles, stretches, courses, bodyZones 定義
- コンポーネント: BodyMap（SVG人体図）、Header、TabBar
- 画面: HomeScreen（部位選択）、PlayerScreen（タイマー）、CourseListScreen、CourseDetailScreen
- useStretchTimer hook: prep(5s) → active(30s) → interval(5s) のステートマシン
- Web Audio API によるビープ音フィードバック

### GitHub Pages デプロイ対応
- base pathを `/stretch_app/docs/` に設定
- `build:gh-pages` スクリプト追加（`--outDir docs`）

### README追記
- 寿限無オーディオUX仕様（3.5節）
- カスタムコース＆課金機能仕様（3.4節）
- Stay Stillペナルティ仕様（3.5.2節）

### JSX要素にID属性を付与
- 全コンポーネント・画面のJSX要素に `id` 属性を追加
- 命名規則: `{screen}-{element}-{identifier}`

### リポジトリ名変更対応
- `stretch_app` → `Jugemu-stretch` に変更
- Gitリモート設定はそのまま（GitHub自動リダイレクト利用）

### 骸骨画像BodyMap
- `src/assets/images/` フォルダ作成
- front_skull.png, back_skull.png をユーザーがアップロード
- BodyMapをSVGから画像背景+タップゾーンオーバーレイ方式に変更

### GitHub Pages 404修正
- `.nojekyll` ファイルをリポジトリルートに配置（Viteビルドで消されない位置）
- base pathを小文字に統一（`/jugemu-stretch/docs/`）
- **教訓**: Viteの `--outDir docs` はフォルダをクリアするため、docs内に `.nojekyll` を置くと消える
- **教訓**: GitHubはリポジトリ名を小文字に正規化するため、base pathも小文字にする必要がある

### README注意事項追加
- 「更新時の注意事項」欄を新設
- `.nojekyll` 削除問題と base path 大文字小文字問題をドキュメント化

### メニュー画面追加
- MenuScreen を新規作成（ランディングページ）
- 4つのメニューボタン: コースでストレッチ、部位を指定してストレッチ、コースを作成する、設定
- TabBarを廃止し、Header の戻るボタンで画面遷移

### BodyMap横幅修正
- 画像ラッパーを `width: 100%` に変更

---

## 2026-02-16

### データJSON分離
- `muscles.json`, `stretches.json` を独立ファイルとして作成
- `muscles.ts`, `stretches.ts` をJSONインポート方式に変更
- `tsconfig.app.json` に `resolveJsonModule: true` 追加

### 新ストレッチ追加（4種）
- `neck_backward` - 首の後倒し
- `butterfly_forward_fold` - 合蹠前屈（足の裏をくっつけた前屈）
- `straddle_forward_fold` - 開脚前屈（左右）
- `seiza_backbend` - 正座後屈

### 基本ストレッチコース追加
- `basic_stretch` コースを新規定義
- 内容: 合蹠前屈→長座前屈→開脚前屈→正座後屈→肘引き→首横倒し→首後倒し→首前倒し

### カスタムコース機能
- `useCustomCourses` hook: localStorage によるCRUD操作
- `CreateCourseListScreen`: コース一覧（作成・削除・確認ダイアログ付き）
- `CreateCourseDetailScreen`: コース内容編集（名前変更・ストレッチ追加/削除）
- 無料版制限: カスタムコースに追加できるストレッチは1つまで

### ストレッチ選択画面
- `StretchSelectScreen`: フィルタ検索（ストレッチ名＋筋肉名で検索可能）
- 追加済みストレッチはグレーアウト表示
- 無料版制限超過時にポップアップ表示

### 設定画面
- `SettingsScreen`: じゅげむ音声ON/OFFトグル
- 無料版でOFFにしようとすると有料版誘導ポップアップ
- 有料版特典一覧表示（じゅげむOFF、複数ストレッチ、広告非表示）
- `useSettings` hook: localStorage による設定管理

### ナビゲーション更新
- AppNavigator に新ルート追加（/create-course, /settings, /select-stretch）
- MenuScreen の「コースを作成する」「設定」ボタンを有効化

### スキップボタン追加
- PlayerScreen にオレンジの「⏭ スキップ」ボタンを追加
- 現在のストレッチを飛ばして次の準備フェーズへ移行

### 休憩フェーズ廃止
- `interval` フェーズを完全削除
- ストレッチ間は `prep`（準備5秒）のみで統一
- 旧: prep(5s) → active → interval(5s) → prep(5s) → active（計10秒待ち）
- 新: prep(5s) → active → prep(5s) → active（5秒のみ）

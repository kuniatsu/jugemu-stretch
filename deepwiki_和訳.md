# kuniatsu/jugemu-stretch | DeepWiki 和訳
出典: https://deepwiki.com/kuniatsu/jugemu-stretch

---

## 概要（Overview）

**関連ソースファイル**: README.md

### 目的と範囲（Purpose and Scope）

本ドキュメントは Stretch Timer App（ストレッチタイマーアプリ）の概要を説明し、ハンズフリーのストレッチガイドシステムとしての中核的な目的、主な機能、技術選定、および高レベルなアーキテクチャ構成を紹介します。各サブシステムの詳細は以下を参照してください。

- 開発環境とビルド手順: Getting Started（はじめに）
- 技術アーキテクチャと設計判断: Architecture（アーキテクチャ）
- UI コンポーネントと画面: User Interface（ユーザーインターフェース）
- データモデルとクエリ関数: Data Layer（データレイヤー）
- タイマー状態機械とオーディオシステム: Core Systems（コアシステム）

### Stretch Timer App とは（What is the Stretch Timer App）

Stretch Timer App は、完全にハンズフリーな体験を提供する Web ベースのストレッチガイドアプリです。ユーザーがストレッチルーティンを開始すると、タイミング・フェーズ遷移・音声フィードバックをシステムが自動で行うため、ユーザーはデバイスを触らずにストレッチに集中できます。

主なユースケースは次の2つです。

- **解剖学的ナビゲーション**: インタラクティブなボディマップから部位と筋肉を選び、目的のストレッチを探す
- **ガイド付きルーティン**: あらかじめ設定されたコースに従い、複数のストレッチを自動で順番に実行する

**現状**: React と Vite を用いた Web プロトタイプとして実装され、機能検証を行っています。コードベースは、将来的な React Native へのモバイルアプリ展開を想定して構成されています。

### 主な機能（Key Features）

| 機能 | 説明 | 実装 |
|------|------|------|
| インタラクティブなボディマップ | 部位・筋肉選択のための SVG の正面/背面ボディ表示 | src/components/BodyMap.tsx の BodyMap コンポーネント |
| ハンズフリータイマー | 準備 → 本番 → インターバルのフェーズをユーザー操作なしで進行 | src/hooks/useStretchTimer.ts の useStretchTimer フック |
| 音声ガイド | 1秒ごとのチック音、最後5秒の緊急チック、終了音 | PlayerScreen 内の Web Audio API |
| 左右ストレッチロジック | 両側ストレッチで「右 → インターバル → 左」を自動実行 | useStretchTimer の状態機械 |
| コースシステム | 事前設定されたストレッチの並びと自動遷移 | src/data/courses.ts のコースデータ |
| 視覚的緊急表示 | 最後5秒でタイマー文字色を変更し、音以外でも注意を促す | PlayerScreen のタイマー UI 状態 |

アプリには「寿限無」オーディオ機能があり、デフォルトの音声ガイドではストレッチ中に日本の落語の名前言「寿限無寿限無五劫のすりきれ…」を読み上げます。慣れるか、プレミアムの無音モードにアップグレードするかを促す、印象的（ややうるさい可能性もある）体験を意図しています。

### 技術スタック（Technology Stack）

- **コア**: React 18.3（UI）、TypeScript 5.3（型安全）、Vite 5.1（ビルド・開発サーバー）
- **ルーティング**: React Router 6.22（HashRouter、GitHub Pages 対応）
- **オーディオ**: Web Audio API（AudioContext、AudioBufferSourceNode）
- **スタイル**: CSS-in-JS（TypeScript テーマ）+ グローバル CSS（モバイルファースト）
- **デプロイ**: GitHub Pages（/docs/ から静的配信）、ベースパス /stretch_app/docs/（vite.config.ts で設定）

バックエンドや外部 API は使わず、ストレッチデータ・筋肉定義・コース設定はすべて JavaScript バンドルに含まれます。

### 高レベルアーキテクチャ（High-Level Architecture）

#### アプリケーション層構造

| 層 | ファイル例 | 責務 |
|----|------------|------|
| エントリ | main.tsx, App.tsx, AppNavigator.tsx | 起動、ルーター設定、ルート定義 |
| 画面 | HomeScreen, CourseListScreen, CourseDetailScreen, PlayerScreen | フルページビュー、画面単位の状態、ルートハンドラ |
| コンポーネント | BodyMap, Header, TabBar | 共通 UI コンポーネント |
| ロジック | useStretchTimer, Web Audio API | ビジネスロジック、状態機械、オーディオ制御 |
| データ | bodyZones, muscles, stretches, courses | 静的データとクエリ、型インターフェース |
| スタイル | theme.ts | デザイントークン（色・余白・タイポグラフィ） |

#### ユーザージャーニーと画面フロー

- **ボディマップフロー**: HomeScreen → 部位選択 → getMusclesByZone() → 筋肉選択 → getStretchesByMuscle() → ストレッチ選択 → PlayerScreen（stretch_id）
- **コースフロー**: CourseListScreen → コース選択 → CourseDetailScreen（getCourseById()）→ 開始 → PlayerScreen（course_id）
- **再生**: 両方とも PlayerScreen に集約され、useStretchTimer と Web Audio API で状態機械と音声を制御

TabBar は HomeScreen と CourseListScreen 間のナビゲーションを提供しますが、PlayerScreen の再生中は非表示になります。

### デプロイモデル（Deployment Model）

- ビルド: `npm run build:gh-pages`
- 出力: ルートの `docs/`
- ベース URL: `/stretch_app/docs/`（vite.config.ts）
- ルーター: HashRouter（サーバー側ルーティング不要）
- アセット: コンテンツハッシュ付きファイル名でキャッシュ対策
- ホスティング: main ブランチの docs/ を GitHub Pages で配信

HashRouter は `/#/player?stretch_id=123` のようなハッシュベース URL を使い、サーバー側の URL 書き換えなしで SPA を動作させます。

### プロジェクト状況と今後の計画（Project Status and Future Plans）

**現フェーズ**: 機能検証のための Web プロトタイプ

実装済み:

- ✅ 部位/筋肉/ストレッチナビのインタラクティブボディマップ
- ✅ コース一覧・詳細
- ✅ 準備/本番/インターバルのタイマー状態機械
- ✅ チック・終了音の音声フィードバック
- ✅ 左右ストレッチ（右→左の順）
- ✅ 視覚的緊急表示
- ✅ モバイル向けレスポンシブ（max-width: 430px）

**今後**: React Native モバイルアプリ

- ディレクトリ構成は React Native プロジェクトに合わせてあり、インラインスタイルは StyleSheet 変換を想定
- 予定している置き換え: React Router → Expo Router、Web Audio API → expo-av、localStorage → AsyncStorage

**収益化（モバイルアプリ想定）**:

- 無料: プリセットコース、ボディマップ、標準音声
- 有料: カスタムコース作成、「Silence is Golden」パック（寿限無読み上げなし）、広告なし

---

## はじめに（Getting Started）

**関連ソースファイル**: index.html, package.json, vite.config.ts

開発環境のセットアップと Stretch Timer App の実行方法を説明します。技術スタック、プロジェクト構成、基本コマンドを扱います。開発ワークフローは Development Environment、本番ビルドとデプロイは Build and Deployment Pipeline を参照してください。

### 前提環境と技術スタック（Prerequisites and Technology Stack）

| 技術 | バージョン | 用途 |
|------|------------|------|
| Node.js | 最新 LTS | 開発用 JavaScript ランタイム |
| npm | Node 同梱 | パッケージ管理 |
| React | ^19.2.0 | UI |
| React Router DOM | ^7.13.0 | クライアントルーティング |
| TypeScript | ~5.9.3 | 型付き JavaScript |
| Vite | ^7.2.4 | ビルド・開発サーバー |

バックエンドや外部 API はなく、データはすべて src/data 内の TypeScript で静的に定義され、静的ホスティング用のファイル群が出力されます。

### クイックスタート（Quick Start）

| コマンド | 目的 | 出力 |
|----------|------|------|
| npm install | 依存関係のインストール | node_modules/ |
| npm run dev | 開発サーバー起動 | http://localhost:5173 |
| npm run build | 本番ビルド | dist/ |
| npm run build:gh-pages | GitHub Pages 用ビルド | docs/ |
| npm run lint | ESLint 実行 | コンソール |
| npm run preview | 本番ビルドのプレビュー | dist/ を配信 |

開発サーバーは http://localhost:5173 で起動し、HMR によりソース変更でブラウザが自動更新されます。

### 主要設定ファイル（Key Configuration Files）

- **vite.config.ts**: base が GitHub Pages 用に重要。アセット参照を /stretch_app/docs/ でプレフィックス。
- **index.html**: viewport（user-scalable=no）、#root、src/main.tsx を type="module" で読み込み。
- **package.json**: 依存関係、devDependencies、スクリプト、`"type": "module"`。

### アプリケーションエントリ（Application Entry Point）

1. index.html が src/main.tsx を ES モジュールとして読み込む
2. main.tsx が createRoot() で #root に &lt;App /&gt; をマウント
3. App.tsx が HashRouter でルーティングを設定
4. AppNavigator.tsx がルートと画面コンポーネントを定義

HashRouter により、GitHub Pages ではサーバー設定なしで、/#/course-list のようなハッシュ URL で動作します。

---

## 開発環境（Development Environment）

**関連ソースファイル**: eslint.config.js, package.json, vite.config.ts

ローカル開発環境のセットアップ、依存関係のインストール、利用可能な npm スクリプト、開発ワークフローを説明します。本番ビルドと GitHub Pages デプロイは Build and Deployment Pipeline を参照してください。

### 前提条件（Prerequisites）

- Node.js（ES モジュール対応）
- npm
- Git

package.json の `"type": "module"` と ECMAScript 2020 を使用しています。

### 利用可能な npm スクリプト（Available npm Scripts）

| スクリプト | コマンド | 目的 |
|------------|----------|------|
| dev | vite | 開発サーバーと HMR |
| build | tsc -b && vite build | 型チェック後に dist/ へビルド |
| build:gh-pages | tsc -b && vite build --outDir docs | docs/ へ GitHub Pages 用ビルド |
| lint | eslint . | 全 TS/TSX の ESLint |
| preview | vite preview | 本番ビルドのローカルプレビュー |

開発サーバーは http://localhost:5173 で、HMR・オンデマンド TypeScript コンパイル・public/ の静的配信・vite.config.ts の base を適用します。

### 設定ファイル（Configuration Files）

- **vite.config.ts**: @vitejs/plugin-react（Fast Refresh）、base: '/stretch_app/docs/'
- **eslint.config.js**: flat config、**/*.{ts,tsx}、@eslint/js、typescript-eslint、react-hooks、react-refresh、ECMAScript 2020

### HMR（Hot Module Reload）

Vite がファイル変更を検知し、変更モジュールのみ再コンパイルして WebSocket でブラウザに送信。@vitejs/plugin-react の Fast Refresh でコンポーネントの状態を保ったまま UI を更新します。

### 型チェック（TypeScript Type Checking）

ビルドでは `tsc -b` でプロジェクト全体の型チェックを行い、型エラーがあるとビルド失敗。開発時（npm run dev）は Vite がオンデマンドでトランスパイルするため、必要なら `tsc --noEmit` で別途型チェックできます。

### 環境別の挙動（Environment-Specific Behavior）

| 項目 | 開発 (npm run dev) | 本番 (npm run build) |
|------|--------------------|------------------------|
| トランスパイル | オンデマンド・モジュール単位 | フルバンドル・minify |
| 型チェック | オンデマンド・不完全 | tsc -b で全プロジェクト |
| ソースマップ | インライン | 外部・最適化 |
| アセットハッシュ | なし | あり（例: index-BlGIPGa_.js） |
| ベースパス | / | /stretch_app/docs/ |

開発は http://localhost:5173/、本番は https://kuniatsu.github.io/stretch_app/docs/ のため、HashRouter が重要です。

---

## ビルドとデプロイパイプライン（Build and Deployment Pipeline）

**関連ソースファイル**: docs/index.html, package.json, vite.config.ts

Vite によるビルド、ビルドスクリプト、出力構成、アセット最適化、GitHub Pages デプロイを説明します。

### ビルドツール（Build Tooling Overview）

Vite がビルドツール。vite.config.ts の base: '/stretch_app/docs/' により、GitHub Pages のサブディレクトリ配信に対応しています。

### ビルドスクリプト（Build Scripts and Commands）

build と build:gh-pages はいずれも先に `tsc -b` で型チェックし、その後にバンドルします。

### 出力構成（Output Structure）

npm run build:gh-pages 実行時、docs/ に index.html、assets/（ハッシュ付き JS/CSS）、public/ 由来の tick.mp3 等のオーディオと vite.svg が出力されます。

### アセットハッシュとキャッシュ（Asset Hashing and Cache Busting）

JS/CSS にコンテンツベースのハッシュを付与。コード変更でハッシュが変わり、ブラウザは新しい URL で最新を取得します。

### GitHub Pages デプロイ（GitHub Pages Deployment）

- 公開元: リポジトリの docs/ フォルダ（main ブランチ）
- ベース URL: /stretch_app/docs/
- デプロイ URL: https://kuniatsu.github.io/stretch_app/docs/
- 手順: ローカルで npm run build:gh-pages → docs/ をコミット・プッシュ → GitHub Pages が docs/ を配信

HashRouter により、/courses のようなパスはサーバーに送られず、/#/courses でクライアント側のみでルーティングされます。

### 開発ビルドと本番ビルド（Development vs Production Builds）

- **開発**: HMR、ソースマップ、Fast Refresh、最適化なし、base は /stretch_app/docs/
- **本番**: minify、tree shaking、アセットハッシュ、tsc -b による型安全性

---

## アーキテクチャ（Architecture）

**関連ソースファイル**: README.md, src/App.tsx, src/main.tsx

レイヤー構成、設計パターン、主要コンポーネントの関係を説明します。

### アーキテクチャ概要（Architectural Overview）

React と TypeScript の SPA を Vite でビルドし、GitHub Pages に静的アセットとしてデプロイする、責務が分離したレイヤーアーキテクチャです。

主な5層:

- **ビルド・デプロイ**: vite.config.ts, docs/ — コンパイル、バンドル、静的アセット生成
- **アプリケーションエントリ**: main.tsx, App.tsx — React 初期化とルーター設定
- **UI**: src/screens/*, src/components/* — 画面と共通コンポーネント
- **コアロジック**: src/hooks/* — ビジネスロジック、状態機械、オーディオ
- **データ**: src/data/* — 静的データとクエリ関数
- **スタイル**: src/styles/theme.ts, src/index.css — デザイントークンとグローバルスタイル

### レイヤー責務（Layer Responsibilities）

- **ビルド・デプロイ**: Vite、base path、HashRouter、docs/ への出力、GitHub Pages
- **エントリ**: main.tsx の createRoot()、App.tsx の HashRouter、AppNavigator のルート定義
- **UI**: HomeScreen / CourseListScreen / CourseDetailScreen / PlayerScreen、Header / TabBar / BodyMap、theme.ts を参照
- **コアロジック**: useStretchTimer（prep 5秒 → active 30秒 → interval 5秒、左右対応、Web Audio API で tick / tick_urgent / finish）
- **データ**: bodyZones, muscles, stretches, courses の4モジュールと getZonesBySide, getMusclesByZone, getStretchById, getCourseById 等のクエリ
- **スタイル**: theme（colors, fontSize, spacing, borderRadius）、index.css で max-width: 430px 等

### 依存関係の原則（Dependency Principles）

- 一方向: 上位レイヤーが下位に依存。データ/ロジックは UI を import しない。
- データの独立性: src/data/* は他に依存しない純粋な配列とクエリ。
- ロジックの分離: useStretchTimer は UI に依存せず、プリミティブな入出力。
- テーマの一元化: スタイルは theme.ts 経由のみ。
- ルーターは App.tsx と AppNavigator.tsx に集約。

### 設計パターン（Design Patterns）

- **状態機械**: useStretchTimer でフェーズと遷移を明示
- **コンポジション**: 継承ではなく Header / TabBar / BodyMap の組み合わせ
- **クエリ関数**: 配列を直接触らず getMusclesByZone(zoneId) 等でアクセス
- **テーマトークン**: 生の値ではなく colors.primary, fontSize.lg 等
- **静的サイト**: サーバーサイドレンダリングや API なし、ビルド時に全データをバンドル

### モバイルファースト制約（Mobile-First Constraints）

src/index.css で max-width: 430px、タブレット/デスクトップ用ブレークポイントはなし。ハンズフリーストレッチはモバイル専用としています。

### 将来の移行（Future Migration Path）

- HashRouter → Expo Router
- Web Audio API → expo-av
- localStorage → AsyncStorage
- CSS → React Native StyleSheet
- max-width → ネイティブ画面サイズ

src/ のディレクトリ構成は React Native を想定しており、インラインスタイルも移行しやすい形にしています。

---

## アプリケーション構造（Application Structure）

**関連ソースファイル**: docs/index.html, src/App.tsx, src/main.tsx

エントリポイント、ブートストラップ、初期化の流れを説明します。

### エントリチェーン（Application Entry Point Chain）

1. **HTML**: docs/index.html がバンドル JS を読み込む
2. **ブートストラップ**: main.tsx が React を DOM にマウント
3. **ルート**: App.tsx がルーティングコンテキストを提供
4. **ナビゲーション**: AppNavigator がルートと画面の対応を定義・描画

### HTML エントリ（HTML Entry Point）

- &lt;div id="root"&gt;: createRoot() のマウント先
- &lt;script type="module"&gt;: ハッシュ付き本番バンドル
- &lt;link rel="stylesheet"&gt;: ハッシュ付き CSS
- &lt;meta name="viewport"&gt;: user-scalable=no でモバイル最適化

アセットパスはすべて /stretch_app/docs/ でプレフィックスされます。

### ブートストラップ（main.tsx）

createRoot(document.getElementById('root')!)、StrictMode、&lt;App /&gt; をレンダー。./index.css を先に import。StrictMode は開発時のみ二重実行等のチェックを行います。

### ルートコンポーネント（App.tsx）

HashRouter でアプリ全体をラップ。GitHub Pages では BrowserRouter の /stretch_app/docs/home は 404 になるため、/#/home 形式の HashRouter を採用しています。

### 状態初期化（State Initialization）

ルート（main.tsx, App.tsx）は状態を持たない。ルーターの URL 状態は react-router-dom、画面ごとの状態は各画面、タイマーは useStretchTimer。Context/Redux 等のグローバル状態は使っていません。

### エラーバウンダリ（Error Boundaries）

ルートにはエラーバウンダリは未実装。未処理エラーはブラウザのデフォルト表示になり、本番では白画面になる可能性があります。

---

## データアーキテクチャ（Data Architecture）

**関連ソースファイル**: README.md, src/data/bodyZones.ts, courses.ts, muscles.ts, stretches.ts

静的データレイヤーのモデル、関連、保存構造、クエリパターンを説明します。

### データレイヤー概要（Data Layer Overview）

DB も外部 API も使わず、4つの TypeScript モジュールで静的に定義された配列をメモリ上で参照します。

- bodyZones.ts: 解剖学的ゾーン
- muscles.ts: ゾーンに紐づく筋肉
- stretches.ts: 筋肉に紐づくストレッチ
- courses.ts: ストレッチの並びを持つコース

### データモデル（Data Models）

- **BodyZone**: id, name, side, x, y, width, height（ボディマップ SVG 上のクリック領域、パーセント座標）
- **Muscle**: id, name, zone_id, side（BodyZone との多対1）
- **Stretch**: id, title, description, target_muscle_ids, duration_seconds, is_sided, image_resource_name（Muscle との多対多、is_sided はタイマー挙動に影響）
- **Course**: id, title, description, stretch_ids, is_free（ストレッチの順序付きリスト）

### 関連（Entity Relationships）

- BodyZone → Muscle: 1対多（Muscle.zone_id）
- Muscle → Stretch: 多対多（Stretch.target_muscle_ids）
- Stretch → Course: 多対多（Course.stretch_ids）

参照は手動で整合性を保ち、実行時チェックはありません。

### ストレージ構造（Data Storage Structure）

- bodyZones: 38 ゾーン（正面/背面で均等）
- muscles: 40
- stretches: 25（is_sided: true が14、false が11。左右ありは Prep→右30秒→Interval→左30秒、なしは Prep→本番30秒）
- courses: 8（is_free: true が4、false が2。無料は5–7ストレッチ、プレミアムの full_body は12）

### クエリ関数（Query Functions）

- getZonesBySide(side)
- getMusclesByZone(zoneId), getMuscleById(id)
- getStretchesByMuscle(muscleId), getStretchById(id)
- getCourseById(id)

いずれも配列の filter/find で実装。将来 DB に差し替えても呼び出し側を変えずに済む API 境界になっています。

### データフロー（Data Flow Patterns）

- **HomeScreen**: getZonesBySide('front') → ゾーンクリックで getMusclesByZone(zoneId) → 筋肉クリックで getStretchesByMuscle(muscleId) → ストレッチ選択で PlayerScreen へ
- **CourseDetailScreen**: getCourseById(courseId)、各 stretch_id に対して getStretchById() で詳細を解決

### データ整合性（Data Integrity）

zone_id / target_muscle_ids / stretch_ids は文字列 ID で手動参照。getById で見つからなければ undefined。ID の一意性・参照の有効性・Muscle.side と BodyZone.side の一致・Course.stretch_ids の順序は、コードレビューと手動テストで担保しています。

---

## ルーティングとナビゲーション（Routing and Navigation）

**関連ソースファイル**: README.md, src/App.tsx, src/navigation/AppNavigator.tsx

HashRouter、ルート定義、URL 構造、ナビゲーションパターンを説明します。

### ルーター設定（Router Configuration）

React Router v6 の HashRouter を使用。URL の # 以降をクライアント側で扱うため、GitHub Pages の静的ホスティングでサーバー設定が不要です。

### ルート構造（Route Structure）

| パス | コンポーネント | 用途 |
|------|----------------|------|
| / | HomeScreen | ボディマップと筋肉/ストレッチ選択 |
| /courses | CourseListScreen | コース一覧 |
| /courses/:courseId | CourseDetailScreen | コース詳細とストレッチ一覧 |
| /player | PlayerScreen | ストレッチ再生とタイマー |

/courses/:courseId は useParams で courseId を取得。例: /#/courses/morning_routine。

### ナビゲーションパターン（Navigation Patterns）

- **ボディマップ**: HomeScreen → … → PlayerScreen（stretch_id）
- **コース**: CourseListScreen → CourseDetailScreen → PlayerScreen（course_id）

useNavigate でプログラム的に遷移。PlayerScreen には location state で { stretchIds, returnPath } を渡し、useLocation().state で参照。戻るは Header の戻るボタンで navigate(-1)、または returnPath で完了後に指定画面へ。

### URL とクエリ（URL Structure and Query Parameters）

ベース: `https://kuniatsu.github.io/stretch_app/docs/#<route>`

- リンク・ブックマーク可能なものは URL パラメータ（:courseId）
- 一時的なデータ（stretchIds, returnPath）は location state で、URL に載せない

### TabBar（TabBar Integration）

AppNavigator のルートで TabBar を描画し、ルート変更でも表示し続ける。表示/非表示は画面ごとに制御:

- 表示: HomeScreen (/)、CourseListScreen (/courses)
- 非表示: CourseDetailScreen、PlayerScreen

アクティブタブは useLocation() で現在パスから判定。

### セキュリティと検証（Navigation Security and Validation）

/#/player を直接開いたように、必要な state がない場合は防御的にチェックし、エラーや誤動作を防ぐ必要があります。

### プレイヤー終了（Player Exit Flow）

- 手動で戻る: navigate(-1)
- 完了時 returnPath あり: navigate(returnPath)
- 完了時 returnPath なし: ホームなどデフォルトへ

現在はコード分割していないため、ナビゲーションは即座に反映されます。

---

## ユーザーインターフェース（User Interface）

**関連ソースファイル**: README.md, src/components/Header.tsx, src/screens/HomeScreen.tsx

### 目的と範囲（Purpose and Scope）

UI レイヤーのアーキテクチャ、デザインパターン、画面とコンポーネントの構成、テーマシステム、モバイルファースト制約、React Native 互換のインラインスタイルについて説明します。各画面は Screens、共通コンポーネントは Reusable Components、テーマは Styling and Theme System を参照してください。

### UI レイヤーアーキテクチャ（UI Layer Architecture）

UI は次の3つに整理されています: **画面**（ルーティングと連携したフルページ）、**再利用コンポーネント**（共通 UI）、**テーマシステム**（デザイントークン）。スタイルはすべてインラインで、将来の React Native 移行を想定しています。

### 画面とコンポーネントの構成（Screen and Component Organization）

**画面**はルート定義を持つフルページで、データレイヤーを呼び、ローカル状態を持ち、再利用コンポーネントを組み合わせます。**再利用コンポーネント**は props で設定を受け、自己完結した UI を描画します。

HomeScreen の例: useState で side（表/裏）と viewState（bodyMap → muscleList → stretchList）、getMusclesByZone() / getStretchesByMuscle() を呼び、&lt;Header&gt; / &lt;BodyMap&gt; と viewState.type に応じたリストを描画し、useNavigate() で PlayerScreen へ遷移します。

### インラインスタイル（Inline Styling Pattern）

CSS クラスや CSS-in-JS ではなく、React の CSSProperties でインラインスタイルを使用。各コンポーネントは `Record<string, React.CSSProperties>` の styles を export し、Phase 2 の React Native StyleSheet 移行を想定しています。

### モバイルファースト制約（Mobile-First Design Constraints）

グローバル CSS で max-width: 430px のモバイル専用ビューポート。ブレークポイントはなく、スマートフォン縦向けのみを対象としています。画面コンテナは paddingBottom: 60（TabBar 用）、Header は position: sticky, top: 0, zIndex: 100。

### コンポーネントの Props（Component Props and Interface Patterns）

再利用コンポーネントは TypeScript の props インターフェースを公開。Header は title（必須）と showBack（任意、false/undefined のときはプレースホルダー div でレイアウトを維持）。

### 状態管理（State Management Patterns）

画面は useState / useNavigate でローカル状態を管理。グローバル状態ライブラリは未使用。HomeScreen は viewState に判別共用体を使い、無効な状態の組み合わせを防いでいます。

### 視覚的フィードバック（Visual Feedback and Interaction）

cursor: pointer、十分なパディング（最低 spacing.md = 12px）、リストは白背景・軽いシャドウ・矢印、トグルはアクティブで背景色変更、カードは角丸と flex レイアウト。

### ナビゲーションとの関係（Relationship to Navigation System）

画面は AppNavigator のルートでラップされ、useNavigate() で `navigate(\`/player?stretches=${stretch.id}\`)` のように URL パラメータでデータを渡します。URL をデータ受け渡しの契約として使い、画面間の直接依存を減らしています。

---

## 画面（Screens）

**関連ソースファイル**: README.md, CourseDetailScreen.tsx, CourseListScreen.tsx, HomeScreen.tsx, PlayerScreen.tsx

### 目的と範囲（Purpose and Scope）

4つの画面コンポーネントの責務、ナビゲーション、アーキテクチャ上の関係を説明します。個別画面の詳細は HomeScreen / CourseListScreen / CourseDetailScreen / PlayerScreen を、ルーティングは Routing and Navigation を参照してください。

### 画面の責務（Screen Responsibilities）

| 画面 | ファイル | ルート | 主な責務 |
|------|----------|--------|----------|
| HomeScreen | HomeScreen.tsx | / | ボディマップ、表/裏切替、部位→筋肉→ストレッチ選択 |
| CourseListScreen | CourseListScreen.tsx | /courses | 全コース一覧、種目数・時間・有料バッジ、詳細へ遷移 |
| CourseDetailScreen | CourseDetailScreen.tsx | /courses/:courseId | コース詳細・ストレッチ順・合計時間、開始ボタン |
| PlayerScreen | PlayerScreen.tsx | /player?stretches=... | タイマー・音声・フェーズ・操作 UI |

### URL パラメータ（URL Parameter Handling）

- useParams&lt;{ courseId: string }&gt;(): CourseDetailScreen で :courseId を取得
- useSearchParams(): PlayerScreen で ?stretches= のカンマ区切り ID を取得
- useNavigate(): 全画面でプログラム的な遷移に使用

### 共通パターン（Common Screen Patterns）

- **Header**: HomeScreen「ストレッチタイマー」・CourseListScreen「コース一覧」は showBack なし。CourseDetailScreen は course.title と showBack。PlayerScreen は Header を使わず独自の閉じるボタン（✕）。
- **TabBar**: HomeScreen と CourseListScreen で表示。CourseDetailScreen と PlayerScreen では非表示。
- **スタイル**: 共通テーマを使用。PlayerScreen のみ背景 #1a1a2e のダークテーマで再生画面を区別。

### 状態管理（State Management Approaches）

- **HomeScreen**: bodyMap / muscleList / stretchList の3状態を判別共用体で管理。handleBack() で階層を戻る。
- **CourseListScreen**: ローカル状態なし。courses をそのまま map し、メタデータをインライン計算。
- **CourseDetailScreen**: useMemo でコース取得・ストレッチリスト・合計時間（is_sided 考慮）を算出。
- **PlayerScreen**: タイマーは useStretchTimer に委譲（フェーズ・秒数・再生/一時停止・左右）。画面は表示専用。

### データクエリ（Data Query Patterns）

HomeScreen は getMusclesByZone / getStretchesByMuscle、CourseListScreen は courses と getStretchById、CourseDetailScreen は getCourseById と getStretchById、PlayerScreen はクエリの各 ID で getStretchById。データ層を差し替えても画面の呼び出しを変えずに済む抽象化です。

### 空状態・フェーズ別表示（Screen-Specific UI Patterns）

- 空: HomeScreen「ストレッチが見つかりません」、CourseDetailScreen「コースが見つかりません」、PlayerScreen「ストレッチが選択されていません」。
- PlayerScreen: idle 時はプレビューリストと「スタート」、prep/active/interval 時はフェーズ・タイマー・プログレス・操作、finished 時は「お疲れ様でした!」とホームボタン。

### パフォーマンス（Performance Considerations）

useMemo で course.stretch_ids の map や合計時間などをメモ化。スタイルは styles オブジェクトのインラインスタイルで、React Native 移行とコンポーネント内でのスタイル管理を意識しています。

---

## HomeScreen（ホーム画面）

ボディマップ経由のストレッチワークフローの入口。部位 → 筋肉 → ストレッチの3段階ドリルダウンを実装。

### ビュー状態機械（View State Machine）

ViewState は bodyMap（ゾーンのみ）/ muscleList（zone + muscles）/ stretchList（muscle + stretches）の判別共用体。handleZonePress でゾーンに筋肉がある場合のみ muscleList へ。handleMusclePress で stretchList へ（ストレッチが0件なら「ストレッチが見つかりません」表示）。

### 表/裏切替（Front/Back Body Side Toggle）

useState&lt;'front' | 'back'&gt;('front')。bodyMap 表示時のみトグル表示。非アクティブは透明・textSecondary、アクティブは surface 背景・primary 文字・シャドウ。

### ゾーン選択（bodyMap → muscleList）

handleZonePress で getMusclesByZone(zone.id) を実行し、結果が空でなければ viewState を muscleList に更新。

### 筋肉選択（muscleList → stretchList）

「{zone.name} の筋肉」見出しと筋肉リスト。各項目は listItem スタイルで矢印「→」。handleMusclePress で getStretchesByMuscle(muscle.id) を実行し stretchList に更新。

### ストレッチ選択と Player への遷移（Stretch Selection and Playback Navigation）

ストレッチカードに時間バッジ（例: 30秒）、左右ありの場合は「左右」バッジ（accent）。選択で `navigate(\`/player?stretches=${stretch.id}\`)`。複数 ID はカンマ区切りで同じパターン（コース再生用）。

### 戻る（Back Navigation Logic）

handleBack(): stretchList → muscleList のときは muscle から getMusclesByZone(muscle.zone_id) で zone と muscles を再構築。muscleList → bodyMap のときは type: 'bodyMap' に戻すだけ。

### スタイル（Styling Architecture）

theme の colors / fontSize / spacing / borderRadius を参照。画面コンテナは minHeight: '100vh', paddingBottom: 60。リストは flexDirection: 'column', gap: spacing.sm。ボタン・カードは cursor: 'pointer'、軽い boxShadow、borderRadius、transition。

### データクエリ（Data Query Integration）

getZonesBySide(side) は BodyMap に渡す side で使用。getMusclesByZone / getStretchesByMuscle は zone/muscle クリック時に実行し、結果を viewState に保存。プリフェッチやキャッシュはなく、データはメモリ上の配列なのでコストは小さいです。

### ライフサイクル（Screen Lifecycle）

マウント時は side: 'front', viewState: { type: 'bodyMap' }。TabBar から戻ると再マウントされ、状態はリセットされます。

---

## CourseListScreen（コース一覧画面）

プリセットコース一覧を表示。各コースの種目数・時間を計算し、有料は「有料」バッジを表示。カード押下で /courses/{courseId} へ navigate。

### データと計算（Data Flow and Computation）

courses を map し、各 course で stretch_ids を reduce: getStretchById(id) でストレッチを取得し、duration_seconds に is_sided なら ×2、さらにストレッチごとに +5 秒（準備）を加算。合計秒を Math.ceil(totalSeconds / 60) で分表示。

### UI 構造（User Interface Structure）

Header + コースカードのリスト。カードは course-card-{id} 等の id、タイトル・有料バッジ（!course.is_free のとき）・説明・「{N}種目」「約{N}分」。

### スタイル（Styling System Integration）

theme の colors / fontSize / spacing / borderRadius のみ使用。styles は Record&lt;string, React.CSSProperties&gt;。カードに transition: 'transform 0.1s'。

### ナビゲーション（Navigation Integration）

useNavigate()、handleCoursePress(courseId) で navigate(\`/courses/${courseId}\`)。

### 有料表示（Premium Feature Indication）

course.is_free が false のとき「有料」バッジ。colors.accent 背景・colors.surface 文字・borderRadius.full のピル型。

---

## CourseDetailScreen（コース詳細画面）

コースの説明・ストレッチ順・合計時間を表示し、「スタート」で再生開始。useParams で courseId を取得し、getCourseById(courseId) でコースを取得。

### 統計（Course Statistics Processing）

useMemo で stretchList（course.stretch_ids を getStretchById で解決、undefined は除外）と totalSeconds（duration_seconds、is_sided なら ×2、ストレッチごとに +5 秒）を計算。表示は Math.ceil(totalSeconds / 60) 分。

### UI（UI Component Structure）

ヘッダー・説明・種目数/分数の統計・ストレッチ番号付きリスト。番号は colors.primary + '15' の円形バッジ。

### Player への遷移（Navigation to Player）

「スタート」で course.stretch_ids をカンマ区切りにして /player?stretches=id1,id2,id3 へ navigate。

### エラー（Error Handling）

getCourseById でコースが見つからない場合は「コース」タイトルと「コースが見つかりません」、showBack で戻る。

### 状態（Component State Management）

useParams（courseId）、useNavigate、useMemo（stretchList, totalSeconds）。paddingBottom: 80 で TabBar と重ならないようにしています。

---

## PlayerScreen（プレイヤー画面）

ストレッチ実行の中心画面。ハンズフリーでタイマー駆動、フェーズ遷移・表示・音声を提供。単一ストレッチとコースの両方に対応。

### URL とデータ（URL Parameters and Data Loading）

?stretches=id1,id2 形式。useSearchParams().get('stretches') を split(',').map(getStretchById).filter(s => s !== undefined) でストレッチ配列を取得（useMemo）。

### 画面状態（Screen State Flow）

useStretchTimer の phase に応じて表示を切り替え。空（stretchList.length === 0）はエラーと「ホームに戻る」。idle はプレビューと「スタート」。prep/active/interval はタイマーと操作。finished は「お疲れ様でした!」とホームボタン。

### UI 要素（Key UI Elements）

player-screen（背景 #1a1a2e）、player-top-bar、player-close-btn（✕）、player-progress-text（X / Y）、player-phase-indicator、player-timer-container、player-timer-text、player-progress-bar、player-controls（一時停止/再開/停止）。

### タイマー連携（Timer Integration）

useStretchTimer の戻り値を利用。getPhaseLabel で prep→「準備」、active+right→「右側」、active+left→「左側」、interval→「休憩」、finished→「完了!」。

### 視覚フィードバック（Visual Feedback System）

フェーズバッジ: prep=accent、interval=secondary、active=primary。最後5秒でタイマー文字を timerUrgent（赤）に。プログレスバーは (currentStretchIndex / totalStretches) * 100%。

### 操作（Control Flow and User Actions）

isRunning が true なら「⏸ 一時停止」と pause()、false なら「▶ 再開」と resume()。停止ボタンで stop() して idle に戻す。

### 空状態・完了（Empty State / Finished State）

ストレッチ未選択時は「ストレッチが選択されていません」とホームへ。完了時は 🎉 と「お疲れ様でした!」「全X つのストレッチを完了しました」と「ホームに戻る」。

### ナビゲーション（Navigation Patterns）

進入: HomeScreen から単一 /player?stretches=id、CourseDetailScreen からコース /player?stretches=id1,id2,id3。退出: ✕ で navigate(-1)、空/完了のホームボタンで navigate('/')。

---

## 再利用コンポーネント（Reusable Components）

**関連ソースファイル**: README.md, BodyMap.tsx, Header.tsx, TabBar.tsx

### 目的と範囲（Purpose and Scope）

複数画面で使う共通 UI の概要。一貫した見た目・ナビゲーション・テーマ利用を説明します。個別は BodyMap / Header / TabBar、テーマは Styling and Theme System を参照。

### コンポーネント一覧（Component Inventory）

| コンポーネント | パス | 役割 | 利用箇所 |
|----------------|------|------|----------|
| BodyMap | BodyMap.tsx | クリック可能な部位の SVG ボディ図 | HomeScreen のみ |
| Header | Header.tsx | タイトルとオプションの戻るボタン | PlayerScreen 以外の画面 |
| TabBar | TabBar.tsx | 下部タブ（ホーム・コース） | HomeScreen, CourseListScreen |

TypeScript の props、React.CSSProperties のインラインスタイル、theme のトークン、条件付きレンダリングで共通化しています。

### テーマ連携（Theme System Integration）

各コンポーネントは theme から colors / fontSize / spacing / borderRadius を import。styles は Record&lt;string, React.CSSProperties&gt; で型安全・React Native 互換・テーマ一元管理を実現しています。

### ナビゲーション（Navigation Integration）

- **Header**: showBack が true のとき戻るボタンを表示し、onClick で navigate(-1)。false のときは幅 60px のプレースホルダーでタイトルを中央に。
- **TabBar**: path / label / icon のタブ定義。useLocation() で pathname と比較してアクティブ表示。pathname.startsWith('/player') のときは null を返して非表示。タブクリックで navigate(tab.path)。

### 構成ルール（Composition Rules）

Home / CourseList は Header + TabBar。CourseDetail は Header のみ（showBack）。Player は両方使わず没入型。BodyMap は HomeScreen 専用。

### データフロー（Data Flow Patterns）

- **Header**: 親から渡される props のみ、ステートレス。
- **BodyMap**: getZonesBySide(side) を内部で呼び、onZonePress で親に通知。
- **TabBar**: 内部でタブ定義と useLocation/useNavigate を使用、親からデータは不要。

### React Native 移行（React Native Migration Compatibility）

インラインスタイルのみ、Flexbox、:hover なし（state で制御）、onClick → onPress にマッピング可能。移行時は div→View、button→TouchableOpacity、SVG→react-native-svg、useNavigate→React Navigation に置き換え。StyleSheet.create() は同じオブジェクト形状で利用可能。

---

## BodyMap コンポーネント

インタラクティブな SVG の解剖図で、部位クリックで筋肉・ストレッチへの導線を提供。

### インターフェース（Component Interface）

- **side**: 'front' | 'back'（表示する体の面）
- **onZonePress**: (zone: BodyZone) => void（ゾーンクリック時のコールバック）

getZonesBySide(side) でフィルタしたゾーンのみ描画。

### SVG 構造（SVG Body Structure）

viewBox="0 0 200 460"。頭・首・胴・腕・脚の7要素を path/ellipse/rect で固定。fill={colors.bodyFront}, stroke="#ccc"。表/裏でゾーンオーバーレイだけが変わります。

### ゾーンオーバーレイ（Zone Overlay System）

各ゾーンは &lt;g&gt; 内の &lt;rect&gt; とラベル。id は bodymap-zone-${zone.id} 等。

### 座標変換（Coordinate Transformation System）

bodyZones は 0–100% の x, y, width, height。BodyMap は (x/100)*200 等で SVG 座標（0–200, 0–460）に変換し、rect は中心から左上に -width/2, -height/2 で配置。

### イベント（Event Handling）

各ゾーン &lt;g&gt; に onClick を付け、onZonePress(zone) を呼ぶ。cursor: 'pointer'。

### スタイル（Styling and Theming）

colors.bodyFront / zoneHighlight / zoneBorder / text、borderRadius.sm。コンテナは flex・中央寄せ・padding 8・SVG 幅 70%・maxWidth 280。

---

## Header コンポーネント

画面上部の共通ヘッダー。中央にタイトル、オプションで戻るボタン。position: sticky, top: 0, zIndex: 100。

### インターフェース（Component Interface）

- **title**: string（必須）
- **showBack**: boolean（任意、デフォルト false）

showBack が true のとき「← 戻る」を表示し、クリックで navigate(-1)。

### レイアウト（Layout Architecture）

3カラムの flex（左: 戻る or 60px スペーサー、中央: タイトル flex:1 textAlign center、右: 60px スペーサー）。タイトルが常に中央に来るようにしています。

### テーマ（Theme Token Usage）

backgroundColor: colors.primary、color: colors.surface、padding: spacing.sm/md、fontSize: lg（タイトル）/ md（ボタン）。

### 使用パターン（Usage Patterns Across Screens）

HomeScreen / CourseListScreen は showBack: false（ルート）。CourseDetailScreen は showBack: true。

---

## TabBar コンポーネント

HomeScreen と CourseListScreen 間の下部ナビ。path / label / icon のタブ配列。

### タブ設定（Tab Configuration）

path: '/' と '/courses'、label（日本語）、icon（絵文字）の2タブ。

### 表示条件（Conditional Rendering Logic）

location.pathname.startsWith('/player') のとき null を返して非表示。それ以外のルートでは表示。

### アクティブ状態（Active State Management）

ホームは pathname === '/' のときのみアクティブ（完全一致）。コースは pathname.startsWith('/courses') でアクティブ（/courses/:id でもハイライト）。アクティブ時は colors.primary、非アクティブは colors.textLight。

### スタイル（Styling System）

display: flex、borderTop、backgroundColor: colors.surface、position: fixed、bottom: 0、zIndex: 100、paddingBottom: env(safe-area-inset-bottom, 0px)。タブは flex: 1、-webkit-tap-highlight-color: transparent。

---

## スタイリングとテーマシステム（Styling and Theme System）

**関連ソースファイル**: README.md, docs/assets/index-n4U8p_qz.css, src/index.css

### 目的と範囲（Purpose and Scope）

アプリ全体の見た目の一貫性のためのテーマアーキテクチャ。デザイントークン（色・タイポグラフィ・余白・角丸）を theme.ts で定義し、コンポーネントはハードコードせずトークンを参照します。

### テーマアーキテクチャ（Theme Architecture）

- **テーマトークン**（src/styles/theme.ts）: TypeScript オブジェクトでセマンティックなトークンを export
- **グローバルスタイル**（src/index.css）: リセット、モバイル制約、フォント等

### デザイントークン（Design Token Categories）

- **colors**: primary, secondary, accent, surface, text, textSecondary, border, timerNormal, timerUrgent, success, error
- **fontSize**: xs, sm, md, lg, xl, xxl, timer
- **spacing**: xs, sm, md, lg, xl
- **borderRadius**: sm, md, lg, full

### グローバルスタイル（Global Styles）

- リセット: margin/padding 0, box-sizing: border-box, -webkit-tap-highlight-color: transparent
- フォント: Hiragino Sans 等の日本語向けスタック、フォントスムージング
- モバイル: max-width: 430px、margin: 0 auto
- スクロールバー非表示、overscroll-behavior: none（iOS バウンス抑制）

### 利用パターン（Usage Patterns）

theme を import して colors.primary 等を参照。インラインの style オブジェクトで React Native 移行を意識。

### モバイルファースト（Mobile-First Design Philosophy）

430px 固定幅は意図的な設計。ブレークポイントなし・タッチ最適化・将来の React Native と同一体験を想定しています。

### ビルド出力（Build Output）

Vite が index.css 等を1つのハッシュ付き CSS（例: index-n4U8p_qz.css）にバンドル。キャッシュ対策にハッシュを使用。

---

## データレイヤー（Data Layer）

**関連ソースファイル**: README.md, bodyZones.ts, courses.ts, muscles.ts, stretches.ts

### 目的と範囲（Purpose and Scope）

ストレッチタイマーアプリの静的コンテンツを、メモリ上の TypeScript 配列とインターフェースで提供。部位→筋肉→ストレッチの階層とプリセットコースを定義。外部 API や DB は使いません。

### データアーキテクチャ概要（Data Architecture Overview）

4モジュールが階層的に関連。各モジュールは生配列とクエリ関数を export。データの流れは「部位 → 筋肉 → ストレッチ → コース」の一方向。

### データ保存戦略（Data Storage Strategy）

- 保存場所: src/data/*.ts の定数配列
- 形式: TypeScript インターフェース
- 永続化: なし（バンドルに静的コンパイル）
- クエリ: 配列の filter/find の純粋関数
- 変更: 未対応（読み取り専用）
- 読み込み: ビルド時の同期的 import

### データモデル（Data Models and Interfaces）

- **BodyZone**: id, name, side, x, y, width, height（SVG 用パーセント座標）
- **Muscle**: id, name, zone_id, side
- **Stretch**: id, title, description, target_muscle_ids, duration_seconds, is_sided, image_resource_name
- **Course**: id, title, description, stretch_ids, is_free

### Body Zones モジュール（Body Zones Module）

38 ゾーン（正面・背面に分割）。getZonesBySide(side) で side でフィルタ。

### Muscles モジュール（Muscles Module）

40 筋肉。zone_id で BodyZone に紐づく。getMusclesByZone(zoneId)、getMuscleById(id)。

### Stretches モジュール（Stretches Module）

25 ストレッチ。target_muscle_ids で Muscle と多対多。is_sided が true のときタイマーは「右→インターバル→左」。getStretchById(id)、getStretchesByMuscle(muscleId)。

### Courses モジュール（Courses Module）

8 コース。stretch_ids の順序が実行順。無料4（morning_basic, shoulder_relief, lower_body, back_care）、有料2（full_body, night_relax）。getCourseById(id)。

### クエリ関数一覧（Query Function Summary）

getZonesBySide(side)、getMusclesByZone(zoneId)、getMuscleById(id)、getStretchesByMuscle(muscleId)、getStretchById(id)、getCourseById(id)。いずれも副作用なし・データ変更なし。

### データフロー（Data Flow Patterns）

- **ボディマップ**: getZonesBySide → getMusclesByZone → getStretchesByMuscle → Player
- **コース**: getCourseById → stretch_ids を getStretchById で解決 → Player

### 整合性制約（Data Integrity Constraints）

zone_id / target_muscle_ids / stretch_ids の参照は TypeScript と手動レビューで担保。実行時検証はなく、無効 ID は getById が undefined を返します。duration_seconds はすべて 30、ID はモジュール内で一意という前提です。

### データ変更（Data Modification Strategy）

配列は const で読み取り専用。ランタイムでの変更・ユーザー作成コース・永続化・動的な追加/削除は未対応。将来は localStorage やカスタムコースビルダーを想定。

---

## データモデルとインターフェース（Data Models and Interfaces）

**関連ソースファイル**: README.md, bodyZones.ts, courses.ts, muscles.ts, stretches.ts

### 目的と範囲（Purpose and Scope）

データレイヤーの型システムを成す TypeScript インターフェースの定義。BodyZone / Muscle / Stretch / Course の型安全な契約を説明します。実データとクエリは Body Zones and Muscles と Stretches and Courses を参照。

### コアインターフェース（Core Interface Definitions）

- **BodyZone**: id, name, side, x, y, width, height（パーセント、SVG ヒット検出用）
- **Muscle**: id, name, zone_id, side（BodyZone との1対多、side は親ゾーンと一致）
- **Stretch**: id, title, description, target_muscle_ids, duration_seconds, is_sided, image_resource_name（Muscle と多対多、is_sided で prep→右→interval→左→完了 または prep→本番→完了）
- **Course**: id, title, description, stretch_ids（順序付き）, is_free

### エンティティ関係（Entity Relationship Model）

BodyZone → Muscle: 1対多（Muscle.zone_id）。Muscle → Stretch: 多対多（Stretch.target_muscle_ids）。Stretch → Course: 多対多（Course.stretch_ids）。

### 型制約（Type Constraints and Validation）

side は 'front' | 'back' のリテラル共用体でコンパイル時に検証。外部キーは文字列で DB 検証は行わず、getById が T | undefined を返すことで利用側に未存在の扱いを強制しています。

---

（注: 元ファイルは約28万文字あり、Core Systems（Timer State Machine, Audio Feedback System, Navigation Flow）などの後半セクションも含まれます。必要に応じて該当部分を指定いただければ、その範囲の和訳を追加できます。）

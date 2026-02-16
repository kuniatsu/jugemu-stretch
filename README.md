# Stretch Timer App (Expo/React Native)

**GitHub Pages:** https://kuniatsu.github.io/jugemu-stretch/docs/

## 1. Project Overview
This is a cross-platform mobile application built with **React Native (Expo)** designed to guide users through stretching routines.
The core value is a "hands-free" experience with audio guidance and automatic transitions, allowing users to focus entirely on their body.

## 2. Tech Stack & Environment
* **Framework:** React Native (Expo SDK 50+)
* **Language:** TypeScript
* **Navigation:** Expo Router (File-based routing)
* **State Management:** React Context or Zustand (Global state for course playback)
* **Storage:** AsyncStorage (Persisting custom courses)
* **Audio:** `expo-av` (For timer sounds)
* **Assets:**
    * `assets/sounds/`:
        * `tick.mp3` (Normal second tick)
        * `tick_urgent.mp3` (Last 5 seconds tick)
        * `finish.mp3` (Stretch complete)
    * `assets/images/`: Body illustrations (Front/Back), Stretch diagrams

## 3. Core Features & UX Flow

### 3.1. Home Screen (Body Map)
* **Visual:** Displays a human body illustration.
* **Toggle:** A slider/switch to toggle between **Front (表面)** and **Back (裏面)** views.
* **Interaction:**
    1.  User taps a general "Body Zone" (e.g., Thigh, Chest).
    2.  A list of specific "Muscles" in that zone appears (e.g., Quadriceps, Hamstrings).
    3.  User selects a muscle to view available stretches.
* **Course Selection:** A separate tab or button to access preset courses (e.g., "Morning Routine", "Shoulder Relief").

### 3.2. Stretch Player (The Core Feature)
* **Concept:** Hands-free operation. Once started, the user should not need to touch the screen until the entire routine is finished.
* **Timer Logic Sequence:**
    1.  **Preparation Phase:** 5 seconds countdown (Get ready).
    2.  **Stretch Phase:** 30 seconds active stretching.
    3.  **Interval Phase:** 5 seconds (Only if switching sides or moving to next exercise).
* **Sidedness (Left/Right Logic):**
    * If a stretch data has `is_sided: true`:
        * Flow: `Prep (5s)` -> `Right Side (30s)` -> `Interval (5s)` -> `Left Side (30s)` -> `Next Stretch`.
    * If `is_sided: false`:
        * Flow: `Prep (5s)` -> `Main (30s)` -> `Next Stretch`.
* **Audio Feedback:**
    * **Every second:** Play a short "Pip" sound (`tick.mp3`).
    * **Last 5 seconds:** Change sound to indicate nearing completion (`tick_urgent.mp3`).
    * **Completion:** Play a distinct finish sound (`finish.mp3`).
* **Visual Feedback:**
    * Display illustration of the current stretch.
    * Display large countdown timer.
    * **Last 5 seconds:** Change timer text color (e.g., from Black to Red) to visually alert the user.

### 3.3. Course System
* **Preset Courses:** Defined in JSON. Lists of stretches played sequentially.
* **Auto-Transition:** The player automatically moves from one stretch to the next.

### 3.4. Custom Course & Premium Features (Monetization)
* **Custom Course Builder:** Users can create and save personalized routines.
* **The "Silence is Golden" Pack (Paid):**
    * Ability to switch the audio guidance from "Jugemu" to standard "Beep" sounds (`tick.mp3`).
    * Removes the psychological pressure of classical Japanese storytelling.
* **Ad-Free:** Removes banner ads between stretches.

### 3.5. Emotional UX (The "Annoying" Factor)
To prevent the app from being "just another boring timer," it features a unique, somewhat intrusive default experience.

#### 3.5.1. Default Audio: "Jugemu" (寿限無)
* **Concept:** Instead of a cold, mechanical beep, the app defaults to a full recitation of "Jugemu"—the longest name in Japanese folklore.
* **Execution:**
    * The recitation lasts approximately 25-30 seconds, perfectly matching one stretch set.
    * The user is forced to listen to the entire name "Jugemu-jugemu Gokō-no-surikire..." every single time they stretch a muscle.
    * **The Psychological Loop:** The repetitive and rhythmic nature of the name is designed to be "mildly infuriating" yet oddly addictive, incentivizing users to either habituate or pay for silence.

#### 3.5.2. The "Stay Still" Penalty (Beta)
* **Logic:** Uses the device's accelerometer.
* **Penalty:** If the device detects excessive shaking (struggling) during the stretch, the "Jugemu" audio restarts from the beginning ("寿限無、寿限無..."), effectively extending the stretch duration.

## 4. Data Structure (JSON Schema)

### 4.1. Muscles Data (`data/muscles.ts`)
Maps clickable zones to specific muscles.

```typescript
export interface Muscle {
  id: string;
  name: string; // e.g., "僧帽筋"
  zone_id: string; // e.g., "neck_shoulder"
  side: 'front' | 'back';
}
```

### 4.2. Stretches Data (`data/stretches.ts`)
The source of truth for all exercises.

```typescript
export interface Stretch {
  id: string;
  title: string;
  description: string; // How to perform
  target_muscle_ids: string[]; // Links to Muscle IDs
  duration_seconds: number; // Default: 30
  is_sided: boolean; // If true, requires Right AND Left execution sequentially
  image_resource_name: string; // e.g., "stretch_quad_stand"
}
```

### 4.3. Courses Data (`data/courses.ts`)
Preset routines.

```typescript
export interface Course {
  id: string;
  title: string; // e.g., "朝の基本コース"
  description: string;
  stretch_ids: string[]; // Ordered list of stretch IDs to play
}
```

## 5. Development Strategy

### 5.1. Phase 1: Web Version (Current)
機能検証用のWeb版を先行開発する。全機能をWeb版で確認した後にSPアプリ（React Native）を開発する。

* **Web Framework:** Vite + React + TypeScript
* **Router:** React Router (HashRouter) — GitHub Pages互換
* **Audio:** Web Audio API (AudioContext) — `expo-av`の代替
* **Storage:** localStorage — `AsyncStorage`の代替
* **表示:** SP表示のみ（max-width: 430px）。レスポンシブ非対応
* **確認方法:** Chrome DevToolsのSPモード（モバイルシミュレーション）
* **デプロイ:** GitHub Pages（`docs/`フォルダからの配信）
* **構成:** React Native移行を意識したディレクトリ構成・インラインスタイル

### 5.2. Phase 2: Mobile App (Future)
* **Framework:** React Native (Expo SDK 50+)
* **Navigation:** Expo Router (File-based routing)
* **リリース:** Google Play / App Store に無料版・有料版を配信

### 5.3. Free / Paid Feature Split
* **無料版:** プリセットコース（`is_free: true`）、ボディマップからの個別ストレッチ
* **有料版:** プレミアムコース（`is_free: false`）、カスタムコースビルダー

## 6. Web Version Development

### 6.1. Build & Deploy
```bash
# 開発サーバー起動
npm run dev

# GitHub Pages用ビルド（docs/に出力）
npm run build:gh-pages

# プロダクションビルド（dist/に出力）
npm run build
```

### 6.2. Project Structure
```
src/
├── components/     # 共有UIコンポーネント
│   ├── BodyMap.tsx
│   ├── Header.tsx
│   └── TabBar.tsx
├── data/           # データ定義（muscles, stretches, courses）
│   ├── bodyZones.ts
│   ├── muscles.ts
│   ├── stretches.ts
│   └── courses.ts
├── hooks/          # カスタムフック
│   └── useStretchTimer.ts
├── navigation/     # ルーティング
│   └── AppNavigator.tsx
├── screens/        # 画面コンポーネント
│   ├── HomeScreen.tsx
│   ├── PlayerScreen.tsx
│   ├── CourseListScreen.tsx
│   └── CourseDetailScreen.tsx
├── styles/         # テーマ・スタイル定義
│   └── theme.ts
├── App.tsx
├── main.tsx
└── index.css
```

### 6.3. GitHub Pages Settings
* Source: `/ (root)` on the branch
* Base URL: `/jugemu-stretch/docs/`（小文字）
* 確認URL: `https://kuniatsu.github.io/jugemu-stretch/docs/`
* コミット前に必ず `npm run build:gh-pages` を実行すること

## 7. 更新時の注意事項（重要）

以下はクロードコードが過去に起こしたミスの記録です。再発防止のため必ず守ること。

### 7.1. `.nojekyll` ファイルを絶対に削除しない
* **経緯:** クロードコードが `npm run build:gh-pages` を実行した際、Viteが `docs/` ディレクトリを上書きし、手動で配置していた `docs/.nojekyll` が消失した。その後 `.nojekyll` をリポジトリルートに移動したが、これもクロードコードのリビルドで一度消失し、GitHub Pagesで404エラーが発生した。
* **対策:**
    * `.nojekyll` はリポジトリルート直下に配置する（`docs/` 内ではなくルート）
    * `docs/` 内に配置すると `vite build --outDir docs` 実行時に消されるため、絶対に `docs/` 内には置かない
    * ビルド後に `.nojekyll` がルートに存在することを確認してからコミットすること

### 7.2. GitHub Pages の base path は小文字
* **経緯:** リポジトリ名を `Jugemu-stretch`（大文字始まり）に変更したが、GitHubが内部的に `jugemu-stretch`（小文字）として扱っていたため、`vite.config.ts` の `base` に大文字の `/Jugemu-stretch/` を設定した結果、アセットのパスが不一致となり404エラーが発生した。
* **対策:**
    * `vite.config.ts` の `base` は必ず **小文字** で `/jugemu-stretch/docs/` と記述する
    * リポジトリ名を変更した場合は、GitHubのリダイレクト先URLの大文字小文字を確認して合わせる

### 7.3. ビルド前後のチェックリスト
コミット前に以下を必ず確認すること:
1. `npm run build:gh-pages` が正常終了した
2. ルート直下に `.nojekyll` が存在する
3. `docs/index.html` 内のアセットパスが `/jugemu-stretch/docs/assets/` で始まっている
4. `vite.config.ts` の `base` が `/jugemu-stretch/docs/` になっている

## 8. Implementation Steps for AI Agent

1.  **Initialize Project:** Set up Expo with TypeScript and Navigation.
2.  **Data Layer:** Create the `data/` folder and populate dummy data based on the schemas above.
3.  **Asset Management:** Create placeholder logic for images and sounds if files are missing.
4.  **Timer Logic (Crucial):** Implement a custom hook `useStretchTimer` that handles the `Prep -> Active -> Interval` state machine accurately.
5.  **UI Construction:**
    * Build `HomeScreen` with the Front/Back toggle.
    * Build `PlayerScreen` that consumes the Timer Hook.
    * Build `CourseListScreen`.
6.  **Custom Course Feature:** Implement `AsyncStorage` wrapper to save/load user arrays of stretch IDs.

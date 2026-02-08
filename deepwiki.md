# kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Overview 

Relevant source files 
- README.md 

### Purpose and Scope 

This document provides an introduction to the Stretch Timer App, explaining its core purpose as a hands-free stretching guidance system, key features, technology choices, and high-level architectural organization. For detailed information about specific subsystems, see: 

- Development setup and build process: Getting Started 
- Technical architecture patterns and design decisions: Architecture 
- User interface components and screens: User Interface 
- Data models and query functions: Data Layer 
- Timer state machine and audio system: Core Systems 

### What is the Stretch Timer App 

The Stretch Timer App is a web-based stretching guidance application designed to provide a completely hands-free experience. Once a user starts a stretch routine, the system automatically handles timing, phase transitions, and audio feedback, allowing the user to focus entirely on performing the stretches without needing to interact with the device. 

The application serves two primary use cases: 

- Anatomical Navigation : Users select body zones and muscles from an interactive body map to find specific stretches 
- Guided Routines : Users follow pre-configured courses that sequence multiple stretches automatically 

Current Status : The application is implemented as a Web-based prototype using React and Vite for feature validation. The codebase is structured to facilitate future migration to React Native for mobile app deployment. 

Sources: README.md 1-10 README.md 120-131 

### Key Features 

Feature Description Implementation 
Interactive Body Map SVG-based front/back body visualization for zone and muscle selection BodyMap component in src/components/BodyMap.tsx 
Hands-Free Timer Automatic progression through prep → active → interval phases with no user input required useStretchTimer hook in src/hooks/useStretchTimer.ts 
Audio Guidance Tick sounds every second, urgent ticks in final 5 seconds, finish sound at completion Web Audio API integration in PlayerScreen 
Sided Stretch Logic Automatically executes right side → interval → left side for bilateral stretches State machine logic in useStretchTimer 
Course System Pre-configured stretch sequences with automatic transitions Course data in src/data/courses.ts 
Visual Urgency Timer text changes color in final 5 seconds to provide non-audio alert Timer UI state in PlayerScreen 

The application includes a unique "Jugemu" audio feature where the default audio guidance recites the full Japanese folklore name "Jugemu-jugemu Gokō-no-surikire..." during stretch phases, designed to create a memorable (if potentially annoying) user experience that encourages either habituation or upgrade to premium silent mode. 

Sources: README.md 21-61 README.md 64-76 

### Technology Stack 

The application is built using the following technologies: 

Core Framework 

- React 18.3 : UI component library 
- TypeScript 5.3 : Type-safe development 
- Vite 5.1 : Build tool and development server 

Routing and Navigation 

- React Router 6.22 : Client-side routing using HashRouter for GitHub Pages compatibility 

Audio System 

- Web Audio API : Native browser audio playback ( AudioContext , AudioBufferSourceNode ) 

Styling 

- CSS-in-JS : Inline styles with TypeScript theme system 
- Global CSS : Base styles and mobile-first constraints 

Deployment 

- GitHub Pages : Static site hosting from /docs/ directory 
- Base Path : /stretch_app/docs/ configured in vite.config.ts 

The technology choices prioritize simplicity and static deployment, with no backend services or external APIs required. All stretch data, muscle definitions, and course configurations are compiled into the JavaScript bundle. 

Sources: README.md 7-19 README.md 123-129 README.md 183-187 

### High-Level Architecture 

#### Application Layer Structure 

The application is organized into distinct architectural layers, each with specific responsibilities: 

Layer Descriptions: 

Layer Files Responsibility 
Entry Layer main.tsx , App.tsx , AppNavigator.tsx Application bootstrapping, router setup, route configuration 
Screen Layer HomeScreen.tsx , CourseListScreen.tsx , CourseDetailScreen.tsx , PlayerScreen.tsx Full-page views, screen-level state management, route handlers 
Component Layer BodyMap.tsx , Header.tsx , TabBar.tsx Reusable UI components shared across screens 
Logic Layer useStretchTimer.ts , Web Audio API Business logic, state machines, audio playback control 
Data Layer bodyZones.ts , muscles.ts , stretches.ts , courses.ts Static data definitions, query functions, type interfaces 
Style Layer theme.ts Design tokens (colors, spacing, typography) 

Sources: README.md 155-181 Diagram 1 from high-level analysis 

#### User Journey and Screen Flow 

The following diagram maps user navigation paths to actual screen components and their associated data queries: 

Navigation Patterns: 

- Body Map Flow : HomeScreen → Zone Selection → getMusclesByZone() → Muscle Selection → getStretchesByMuscle() → Stretch Selection → PlayerScreen with stretch_id parameter 
- Course Flow : CourseListScreen → Course Selection → CourseDetailScreen with getCourseById() → Start Course → PlayerScreen with course_id parameter 
- Playback : Both flows converge on PlayerScreen , which invokes useStretchTimer to manage the state machine and audio feedback through Web Audio API 

The TabBar component provides persistent navigation between HomeScreen and CourseListScreen , but is hidden during playback in PlayerScreen . 

Sources: README.md 23-55 Diagram 2 from high-level analysis, src/navigation/AppNavigator.tsx 

### Deployment Model 

The application uses a static site deployment strategy optimized for GitHub Pages: 

Key Deployment Characteristics: 

Aspect Configuration 
Build Command npm run build:gh-pages 
Output Directory docs/ (root-level, not in src/ ) 
Base URL /stretch_app/docs/ configured in vite.config.ts 5 
Router Strategy HashRouter to avoid server-side routing requirements 
Asset Hashing Content-hashed filenames for cache busting 
Hosting GitHub Pages serving from docs/ folder on main branch 

The HashRouter uses URL hash fragments (e.g., /#/player?stretch_id=123 ) instead of path-based routing, which allows the single-page application to function without server-side URL rewriting rules. 

Sources: README.md 143-153 README.md 183-187 Diagram 6 from high-level analysis 

### Project Status and Future Plans 

Current Phase : Web-based prototype for feature validation 

The application is fully functional as a web app with all core features implemented: 

- ✅ Interactive body map with zone/muscle/stretch navigation 
- ✅ Course browsing and detail viewing 
- ✅ Timer state machine with prep/active/interval phases 
- ✅ Audio feedback system with tick and finish sounds 
- ✅ Sided stretch logic (right → left sequencing) 
- ✅ Visual urgency indicators 
- ✅ Mobile-optimized responsive design (max-width: 430px) 

Future Phase : React Native mobile application 

The codebase structure and component organization are designed to facilitate migration to React Native: 

- Directory structure mirrors typical React Native projects ( README.md 155-181 ) 
- Inline styles prepared for React Native StyleSheet conversion 
- Separation of concerns enables component reuse 
- Planned replacements: React Router → Expo Router , Web Audio API → expo-av , localStorage → AsyncStorage 

Monetization Strategy (planned for mobile app): 

- Free tier: Preset courses, body map navigation, standard audio 
- Paid tier: Custom course builder, "Silence is Golden" pack (removes Jugemu recitation), ad-free experience 

Sources: README.md 120-140 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Overview 
- Purpose and Scope 
- What is the Stretch Timer App 
- Key Features 
- Technology Stack 
- High-Level Architecture 
- Application Layer Structure 
- User Journey and Screen Flow 
- Deployment Model 
- Project Status and Future Plans


---

# kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/1-overview

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Overview 

Relevant source files 
- README.md 

### Purpose and Scope 

This document provides an introduction to the Stretch Timer App, explaining its core purpose as a hands-free stretching guidance system, key features, technology choices, and high-level architectural organization. For detailed information about specific subsystems, see: 

- Development setup and build process: Getting Started 
- Technical architecture patterns and design decisions: Architecture 
- User interface components and screens: User Interface 
- Data models and query functions: Data Layer 
- Timer state machine and audio system: Core Systems 

### What is the Stretch Timer App 

The Stretch Timer App is a web-based stretching guidance application designed to provide a completely hands-free experience. Once a user starts a stretch routine, the system automatically handles timing, phase transitions, and audio feedback, allowing the user to focus entirely on performing the stretches without needing to interact with the device. 

The application serves two primary use cases: 

- Anatomical Navigation : Users select body zones and muscles from an interactive body map to find specific stretches 
- Guided Routines : Users follow pre-configured courses that sequence multiple stretches automatically 

Current Status : The application is implemented as a Web-based prototype using React and Vite for feature validation. The codebase is structured to facilitate future migration to React Native for mobile app deployment. 

Sources: README.md 1-10 README.md 120-131 

### Key Features 

Feature Description Implementation 
Interactive Body Map SVG-based front/back body visualization for zone and muscle selection BodyMap component in src/components/BodyMap.tsx 
Hands-Free Timer Automatic progression through prep → active → interval phases with no user input required useStretchTimer hook in src/hooks/useStretchTimer.ts 
Audio Guidance Tick sounds every second, urgent ticks in final 5 seconds, finish sound at completion Web Audio API integration in PlayerScreen 
Sided Stretch Logic Automatically executes right side → interval → left side for bilateral stretches State machine logic in useStretchTimer 
Course System Pre-configured stretch sequences with automatic transitions Course data in src/data/courses.ts 
Visual Urgency Timer text changes color in final 5 seconds to provide non-audio alert Timer UI state in PlayerScreen 

The application includes a unique "Jugemu" audio feature where the default audio guidance recites the full Japanese folklore name "Jugemu-jugemu Gokō-no-surikire..." during stretch phases, designed to create a memorable (if potentially annoying) user experience that encourages either habituation or upgrade to premium silent mode. 

Sources: README.md 21-61 README.md 64-76 

### Technology Stack 

The application is built using the following technologies: 

Core Framework 

- React 18.3 : UI component library 
- TypeScript 5.3 : Type-safe development 
- Vite 5.1 : Build tool and development server 

Routing and Navigation 

- React Router 6.22 : Client-side routing using HashRouter for GitHub Pages compatibility 

Audio System 

- Web Audio API : Native browser audio playback ( AudioContext , AudioBufferSourceNode ) 

Styling 

- CSS-in-JS : Inline styles with TypeScript theme system 
- Global CSS : Base styles and mobile-first constraints 

Deployment 

- GitHub Pages : Static site hosting from /docs/ directory 
- Base Path : /stretch_app/docs/ configured in vite.config.ts 

The technology choices prioritize simplicity and static deployment, with no backend services or external APIs required. All stretch data, muscle definitions, and course configurations are compiled into the JavaScript bundle. 

Sources: README.md 7-19 README.md 123-129 README.md 183-187 

### High-Level Architecture 

#### Application Layer Structure 

The application is organized into distinct architectural layers, each with specific responsibilities: 

Layer Descriptions: 

Layer Files Responsibility 
Entry Layer main.tsx , App.tsx , AppNavigator.tsx Application bootstrapping, router setup, route configuration 
Screen Layer HomeScreen.tsx , CourseListScreen.tsx , CourseDetailScreen.tsx , PlayerScreen.tsx Full-page views, screen-level state management, route handlers 
Component Layer BodyMap.tsx , Header.tsx , TabBar.tsx Reusable UI components shared across screens 
Logic Layer useStretchTimer.ts , Web Audio API Business logic, state machines, audio playback control 
Data Layer bodyZones.ts , muscles.ts , stretches.ts , courses.ts Static data definitions, query functions, type interfaces 
Style Layer theme.ts Design tokens (colors, spacing, typography) 

Sources: README.md 155-181 Diagram 1 from high-level analysis 

#### User Journey and Screen Flow 

The following diagram maps user navigation paths to actual screen components and their associated data queries: 

Navigation Patterns: 

- Body Map Flow : HomeScreen → Zone Selection → getMusclesByZone() → Muscle Selection → getStretchesByMuscle() → Stretch Selection → PlayerScreen with stretch_id parameter 
- Course Flow : CourseListScreen → Course Selection → CourseDetailScreen with getCourseById() → Start Course → PlayerScreen with course_id parameter 
- Playback : Both flows converge on PlayerScreen , which invokes useStretchTimer to manage the state machine and audio feedback through Web Audio API 

The TabBar component provides persistent navigation between HomeScreen and CourseListScreen , but is hidden during playback in PlayerScreen . 

Sources: README.md 23-55 Diagram 2 from high-level analysis, src/navigation/AppNavigator.tsx 

### Deployment Model 

The application uses a static site deployment strategy optimized for GitHub Pages: 

Key Deployment Characteristics: 

Aspect Configuration 
Build Command npm run build:gh-pages 
Output Directory docs/ (root-level, not in src/ ) 
Base URL /stretch_app/docs/ configured in vite.config.ts 5 
Router Strategy HashRouter to avoid server-side routing requirements 
Asset Hashing Content-hashed filenames for cache busting 
Hosting GitHub Pages serving from docs/ folder on main branch 

The HashRouter uses URL hash fragments (e.g., /#/player?stretch_id=123 ) instead of path-based routing, which allows the single-page application to function without server-side URL rewriting rules. 

Sources: README.md 143-153 README.md 183-187 Diagram 6 from high-level analysis 

### Project Status and Future Plans 

Current Phase : Web-based prototype for feature validation 

The application is fully functional as a web app with all core features implemented: 

- ✅ Interactive body map with zone/muscle/stretch navigation 
- ✅ Course browsing and detail viewing 
- ✅ Timer state machine with prep/active/interval phases 
- ✅ Audio feedback system with tick and finish sounds 
- ✅ Sided stretch logic (right → left sequencing) 
- ✅ Visual urgency indicators 
- ✅ Mobile-optimized responsive design (max-width: 430px) 

Future Phase : React Native mobile application 

The codebase structure and component organization are designed to facilitate migration to React Native: 

- Directory structure mirrors typical React Native projects ( README.md 155-181 ) 
- Inline styles prepared for React Native StyleSheet conversion 
- Separation of concerns enables component reuse 
- Planned replacements: React Router → Expo Router , Web Audio API → expo-av , localStorage → AsyncStorage 

Monetization Strategy (planned for mobile app): 

- Free tier: Preset courses, body map navigation, standard audio 
- Paid tier: Custom course builder, "Silence is Golden" pack (removes Jugemu recitation), ad-free experience 

Sources: README.md 120-140 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Overview 
- Purpose and Scope 
- What is the Stretch Timer App 
- Key Features 
- Technology Stack 
- High-Level Architecture 
- Application Layer Structure 
- User Journey and Screen Flow 
- Deployment Model 
- Project Status and Future Plans

---

# Getting Started | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/2-getting-started

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Getting Started 

Relevant source files 
- index.html 
- package.json 
- vite.config.ts 

This page provides an introduction to setting up and running the Stretch Timer App development environment. It covers the technology stack, project structure, and essential commands to begin working with the codebase. For detailed instructions on development workflows, see Development Environment . For information about production builds and deployment, see Build and Deployment Pipeline . 

### Prerequisites and Technology Stack 

The Stretch Timer App is a client-side single-page application (SPA) built with modern web technologies. The following tools and frameworks are required: 

Technology Version Purpose 
Node.js Latest LTS JavaScript runtime for development tools 
npm Bundled with Node.js Package manager 
React ^19.2.0 UI component library 
React Router DOM ^7.13.0 Client-side routing 
TypeScript ~5.9.3 Type-safe JavaScript 
Vite ^7.2.4 Build tool and dev server 

The application uses no backend services or external APIs. All data is statically defined in TypeScript files within the src/data directory. The build output is a set of static files suitable for deployment to any static hosting service. 

Sources: package.json 13-30 

### Project Structure Overview 

The following diagram maps the repository's directory structure to its architectural purpose: 

Repository Structure and Code Organization 

Sources: package.json 1-32 vite.config.ts 1-8 index.html 1-14 

### Quick Start 

The repository provides npm scripts for common development tasks. All commands should be run from the repository root: 

Command Purpose Output 
npm install Install dependencies node_modules/ directory 
npm run dev Start development server Dev server at http://localhost:5173 
npm run build Production build dist/ directory 
npm run build:gh-pages GitHub Pages build docs/ directory 
npm run lint Run ESLint checks Console output with errors/warnings 
npm run preview Preview production build Local server serving dist/ 

Minimal setup sequence: 

The development server will start at http://localhost:5173 . The application uses hot module replacement (HMR), so changes to source files automatically refresh the browser. 

Sources: package.json 6-11 

### Development Workflow 

The following diagram illustrates the relationship between npm scripts, build tools, and output artifacts: 

Build Scripts and Output Artifacts 

Sources: package.json 6-11 vite.config.ts 1-8 

### Key Configuration Files 

#### vite.config.ts 

The Vite configuration file defines the build behavior and plugin system: 

The base setting is critical for GitHub Pages deployment. It ensures all asset references (JavaScript, CSS, images) are prefixed with /stretch_app/docs/ , matching the repository's GitHub Pages URL structure. 

Sources: vite.config.ts 1-8 

#### index.html 

The entry HTML file defines the application shell: 

- Line 5: Links to the Vite favicon at /stretch_app/vite.svg (uses GitHub Pages path) 
- Line 6: Sets viewport meta tag with user-scalable=no for mobile optimization 
- Line 10: Defines <div id="root"></div> as React mount point 
- Line 11: Loads src/main.tsx as the application entry point 

The script tag uses type="module" to enable ES module imports in the browser during development. 

Sources: index.html 1-14 

#### package.json 

The package manifest defines project metadata, dependencies, and scripts: 

- Dependencies ( package.json 13-16 ): Runtime libraries (React, React Router) 
- DevDependencies ( package.json 18-30 ): Build tools and type definitions 
- Scripts ( package.json 6-11 ): Automated tasks for development and deployment 
- Type ( package.json 5 ): Set to "module" to enable ES module resolution 

Notable dependency choices: 

- React 19.2.0 uses the latest React features 
- react-router-dom enables client-side routing without backend configuration 
- Vite 7.2.4 provides fast build times and optimized HMR 

Sources: package.json 1-32 

### Application Entry Point 

The application bootstrap sequence follows this chain: 

- index.html loads src/main.tsx as an ES module 
- main.tsx calls ReactDOM.createRoot() and mounts <App /> to #root 
- App.tsx sets up HashRouter for client-side routing 
- AppNavigator.tsx defines route mappings to screen components 

The use of HashRouter (rather than BrowserRouter ) enables GitHub Pages deployment without server-side routing configuration. All routes use hash-based URLs like /#/course-list . 

Sources: index.html 10-11 

### Next Steps 

This page provided a high-level overview of the project structure and quick start commands. For more detailed information: 

- Development workflow, hot module reload, and debugging: See Development Environment 
- Production builds, output structure, and GitHub Pages deployment: See Build and Deployment Pipeline 
- Application architecture and design patterns: See Architecture 
- Routing system and navigation flow: See Routing and Navigation 

The most common development tasks are: 

- Run npm run dev to start the development server 
- Edit files in src/ to see live changes via HMR 
- Run npm run lint to check for code quality issues 
- Run npm run build:gh-pages to generate production build for deployment 

Sources: package.json 6-11 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Getting Started 
- Prerequisites and Technology Stack 
- Project Structure Overview 
- Quick Start 
- Development Workflow 
- Key Configuration Files 
- vite.config.ts 
- index.html 
- package.json 
- Application Entry Point 
- Next Steps

---

# Development Environment | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/2.1-development-environment

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Development Environment 

Relevant source files 
- eslint.config.js 
- package.json 
- vite.config.ts 

### Purpose and Scope 

This page documents the local development environment setup for the Stretch Timer App, including prerequisites, dependency installation, available npm scripts, and the development workflow. This covers the tools and processes for day-to-day development work. 

For information about the production build process and deployment to GitHub Pages, see Build and Deployment Pipeline . 

### Prerequisites 

The development environment requires: 

Tool Purpose 
Node.js JavaScript runtime (compatible with ES modules) 
npm Package manager for installing dependencies 
Git Version control for cloning the repository 

The project uses ES modules ( "type": "module" in package.json 5 ) and ECMAScript 2020 language features ( eslint.config.js 19 ). 

Sources: package.json 5 

### Installation and Setup 

Clone the repository and install dependencies: 

The npm install command installs all dependencies defined in package.json 13-31 The project distinguishes between runtime dependencies and development tooling: 

Runtime Dependencies: 

Package Version Purpose 
react ^19.2.0 Core React library 
react-dom ^19.2.0 React DOM rendering 
react-router-dom ^7.13.0 Client-side routing (HashRouter) 

Development Dependencies: 

Package Purpose 
vite Build tool and development server 
typescript Type checking and compilation 
eslint Code quality and style enforcement 
@vitejs/plugin-react Vite plugin for React Fast Refresh 
typescript-eslint ESLint TypeScript integration 
@types/* packages TypeScript type definitions for runtime libraries 

Sources: package.json 13-31 

### Development Workflow Overview 

The following diagram illustrates how the development tools interact during local development: 

Sources: package.json 6-11 vite.config.ts 1-7 eslint.config.js 1-23 

### Available npm Scripts 

The project defines five npm scripts in package.json 6-11 : 

Script Command Purpose 
dev vite Start development server with HMR 
build tsc -b && vite build Type check and build to dist/ 
build:gh-pages tsc -b && vite build --outDir docs Type check and build to docs/ for GitHub Pages 
lint eslint . Run ESLint on all TypeScript files 
preview vite preview Preview production build locally 

#### Development Server 

Start the development server: 

This command launches the Vite development server, which: 

- Serves the application at http://localhost:5173 (default port) 
- Enables Hot Module Reload (HMR) for instant updates without full page refresh 
- Provides fast TypeScript compilation on-demand 
- Serves static assets from the public/ directory 
- Applies the base path configuration from vite.config.ts 6 

The server watches for file changes and automatically recompiles and hot-reloads the browser when source files are modified. 

#### Linting 

Run ESLint to check code quality: 

This executes eslint . which scans all files matching the pattern **/*.{ts,tsx} as defined in eslint.config.js 11 The linting configuration extends multiple recommended rulesets as shown in eslint.config.js 13-16 

#### Preview Production Build 

After running npm run build , preview the production bundle: 

This serves the built application from the dist/ directory, allowing local testing of the production bundle before deployment. 

Sources: package.json 6-11 

### Configuration Files and Tool Chain 

The following diagram maps configuration files to their respective tools: 

Sources: package.json 1-32 vite.config.ts 1-7 eslint.config.js 1-23 

#### Vite Configuration 

The vite.config.ts 1-7 file contains minimal configuration: 

- Plugin: @vitejs/plugin-react enables React Fast Refresh ( vite.config.ts 5 ) 
- Base Path: '/stretch_app/docs/' sets the public base path for GitHub Pages deployment ( vite.config.ts 6 ) 

This base path affects all asset URLs in the built application, ensuring correct resource loading when deployed to https://kuniatsu.github.io/stretch_app/docs/ . 

#### ESLint Configuration 

The eslint.config.js 1-23 file uses the flat config format and includes: 

- Global Ignores: Excludes the dist/ directory ( eslint.config.js 9 ) 
- File Pattern: Applies rules to **/*.{ts,tsx} files ( eslint.config.js 11 ) 
- Extended Configs: 
- @eslint/js recommended rules ( eslint.config.js 13 ) 
- typescript-eslint recommended rules ( eslint.config.js 14 ) 
- eslint-plugin-react-hooks for React Hooks rules ( eslint.config.js 15 ) 
- eslint-plugin-react-refresh for Fast Refresh compatibility ( eslint.config.js 16 ) 

- Language Options: ECMAScript 2020 with browser globals ( eslint.config.js 18-20 ) 

Sources: vite.config.ts 1-7 eslint.config.js 1-23 

### Hot Module Reload (HMR) Workflow 

Vite's HMR system provides near-instantaneous feedback during development: 

The HMR process: 

- Vite watches for file system changes 
- When a source file is modified, Vite recompiles only the affected module 
- The update is sent to the browser via WebSocket connection 
- React Fast Refresh (enabled by @vitejs/plugin-react ) preserves component state while applying changes 
- The UI updates without a full page reload, maintaining application state 

This workflow is significantly faster than traditional bundlers because Vite serves ES modules directly during development, avoiding full bundle rebuilds. 

Sources: vite.config.ts 5 package.json 23 

### TypeScript Type Checking 

The build process includes a type-checking phase via tsc -b before bundling: 

The tsc -b command: 

- Performs full type checking across the entire codebase 
- Uses project references for incremental builds 
- Fails the build if type errors are detected 
- Does not emit JavaScript files (Vite handles transpilation) 

During development ( npm run dev ), Vite performs on-demand transpilation without full type checking for speed. Developers can run tsc --noEmit separately to check types without building. 

Sources: package.json 8-9 

### Development Best Practices 

Practice Rationale 
Run npm run lint before commits Catches code quality issues early 
Monitor terminal output during npm run dev Shows TypeScript errors and warnings in real-time 
Use browser DevTools Console Identifies runtime errors and React warnings 
Test with npm run preview before deploying Validates production bundle behavior 
Keep dependencies updated Security patches and bug fixes 

### Environment-Specific Behavior 

The development server and production build behave differently: 

Aspect Development ( npm run dev ) Production ( npm run build ) 
Transpilation On-demand, per-module Full bundle with minification 
Type Checking On-demand, incomplete Full project type check with tsc -b 
Source Maps Inline, full External, optimized 
Asset Hashing No Yes (e.g., index-BlGIPGa_.js ) 
Base Path / (root) /stretch_app/docs/ 
Bundle Size Unoptimized Minified and tree-shaken 

The base path difference means that during development, the app runs at http://localhost:5173/ , but in production it runs at https://kuniatsu.github.io/stretch_app/docs/ . This is why HashRouter is used (see Routing and Navigation ) to avoid server-side routing dependencies. 

Sources: vite.config.ts 6 package.json 7-9 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Development Environment 
- Purpose and Scope 
- Prerequisites 
- Installation and Setup 
- Development Workflow Overview 
- Available npm Scripts 
- Development Server 
- Linting 
- Preview Production Build 
- Configuration Files and Tool Chain 
- Vite Configuration 
- ESLint Configuration 
- Hot Module Reload (HMR) Workflow 
- TypeScript Type Checking 
- Development Best Practices 
- Environment-Specific Behavior

---

# Build and Deployment Pipeline | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/2.2-build-and-deployment-pipeline

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Build and Deployment Pipeline 

Relevant source files 
- docs/index.html 
- package.json 
- vite.config.ts 

### Purpose and Scope 

This document explains the build and deployment pipeline for the Stretch Timer application. It covers the build tooling (Vite), build scripts, output structure, asset optimization strategies, and the GitHub Pages deployment process. For information about the development environment and local setup, see Development Environment . For details about how the application initializes after deployment, see Application Structure . 

### Build Tooling Overview 

The application uses Vite as its build tool, configured via vite.config.ts 1-8 Vite provides: 

- Development server with hot module reload 
- TypeScript compilation 
- React JSX transformation via @vitejs/plugin-react 
- Asset bundling and optimization 
- CSS processing and minification 

The critical configuration is the base path setting at vite.config.ts 6 which sets all asset URLs to /stretch_app/docs/ . This enables deployment to a GitHub Pages subdirectory rather than the repository root. 

Sources: vite.config.ts 1-8 package.json 1-32 

### Build Scripts and Commands 

The application defines three primary build-related npm scripts in package.json 6-11 : 

Script Command Output Directory Purpose 
dev vite N/A (dev server) Starts Vite development server with hot reload 
build tsc -b && vite build dist/ Standard production build with TypeScript compilation 
build:gh-pages tsc -b && vite build --outDir docs docs/ GitHub Pages-specific build targeting docs/ folder 
preview vite preview N/A (serves dist/ ) Preview production build locally 
lint eslint . N/A Run ESLint code quality checks 

#### Build Process Sequence 

Both build and build:gh-pages execute TypeScript compilation first ( tsc -b ), which performs type checking and ensures the codebase is error-free before proceeding to the bundling phase. The -b flag enables incremental builds via TypeScript's project references. 

Sources: package.json 6-11 

### Build Configurations 

#### Base Path Configuration 

The vite.config.ts 6 setting base: '/stretch_app/docs/' is critical for GitHub Pages deployment. This configuration: 

- Prefixes all asset URLs in the generated HTML 
- Ensures the application loads correctly at https://kuniatsu.github.io/stretch_app/docs/ 
- Affects script tags, stylesheet links, and any programmatic asset imports 

Example from docs/index.html 8-9 : 

Without the base path, these URLs would resolve to the repository root, causing 404 errors. 

#### Plugin Configuration 

The React plugin at vite.config.ts 2-5 provides: 

- Fast Refresh for instant component updates during development 
- Automatic JSX transformation (no need to import React in every file) 
- React DevTools integration 

Sources: vite.config.ts 1-8 docs/index.html 1-15 

### Output Structure 

#### Production Build Output 

When npm run build:gh-pages executes, Vite generates the following structure in the docs/ directory: 

docs/
├── index.html                    # Entry HTML with hashed asset references
├── assets/
│   ├── index-BlGIPGa_.js        # Hashed JavaScript bundle
│   └── index-n4U8p_qz.css       # Hashed CSS bundle
├── tick.mp3                      # Audio assets (from public/)
├── tick_urgent.mp3
├── finish.mp3
└── vite.svg                      # Static assets (from public/) 

#### Build Output Comparison 

The only difference between the two builds is the output directory. Both produce identical optimized bundles with the same hashing and optimization strategies. 

Sources: package.json 8-9 docs/index.html 1-15 

### Asset Hashing and Cache Busting 

Vite implements content-based hashing for JavaScript and CSS bundles. The hash is derived from the file contents, ensuring that: 

- Changed files get new URLs : When code changes, the hash changes (e.g., index-BlGIPGa_.js becomes index-XyZ123_.js ) 
- Browsers cache aggressively : Unchanged assets can be cached indefinitely since new versions have different URLs 
- No cache invalidation issues : Users always get the latest code without manual cache clearing 

#### Asset Hashing Example 

From docs/index.html 8-9 : 

/stretch_app/docs/assets/index-BlGIPGa_.js   (8-character hash)
/stretch_app/docs/assets/index-n4U8p_qz.css  (8-character hash) 

The hash ( BlGIPGa_ , n4U8p_qz ) is automatically generated by Vite's Rollup-based bundler. When source files change and the build runs again, new hashes are generated. 

#### Asset Reference Updates 

The index.html file at docs/index.html 8-9 is automatically rewritten during each build to reference the newly hashed assets. 

Sources: docs/index.html 8-9 

### GitHub Pages Deployment 

#### Deployment Configuration 

The application deploys to GitHub Pages using the repository's docs/ folder as the publishing source. This is configured in the GitHub repository settings, not in code. 

Configuration Value 
Repository kuniatsu/jugemu-stretch 
Publishing Source docs/ folder from main branch 
Base URL /stretch_app/docs/ 
Deployed URL https://kuniatsu.github.io/stretch_app/docs/ 

#### Deployment Process 

The deployment is manual and follows this sequence: 

- Developer runs npm run build:gh-pages locally 
- Vite generates optimized assets in docs/ 
- Developer commits the docs/ folder to Git 
- Developer pushes to the main branch 
- GitHub Pages automatically serves the new docs/ contents 

There is no CI/CD pipeline or GitHub Actions workflow automating this process. The docs/ folder is committed directly to version control. 

#### HashRouter Strategy 

The application uses React Router's HashRouter (see Application Structure for implementation details) to ensure compatibility with GitHub Pages. GitHub Pages serves static files without server-side routing, so: 

- Problem : Traditional BrowserRouter routes like /courses would cause 404 errors (GitHub Pages looks for a courses/index.html file) 
- Solution : HashRouter uses hash-based URLs like /#/courses , which are entirely client-side and never sent to the server 

This allows all routing to be handled by the JavaScript bundle without requiring server configuration. 

Sources: vite.config.ts 6 docs/index.html 1-15 

### Development vs Production Builds 

#### Development Mode ( npm run dev ) 

When running vite via package.json 7 the development server provides: 

Feature Implementation 
Hot Module Reload (HMR) Changes to React components instantly update without page refresh 
Source Maps Full source maps for debugging TypeScript and JSX 
Fast Refresh React state preserved during hot reloads 
No Optimization Code served as-is for faster iteration 
Base Path Still applies /stretch_app/docs/ prefix due to vite.config.ts 6 

The development server runs on http://localhost:5173 by default (Vite's standard port). 

#### Production Mode ( npm run build:gh-pages ) 

Production builds at package.json 9 apply aggressive optimizations: 

Optimization Description 
Minification JavaScript and CSS are minified, removing whitespace and shortening variable names 
Tree Shaking Unused code is eliminated from the bundle 
Code Splitting Dynamic imports create separate chunks (though this app uses a single bundle) 
Asset Hashing Files receive content-based hashes for cache busting 
TypeScript Compilation tsc -b ensures type safety before bundling 

#### Build Size Comparison 

The production build generates highly optimized assets. From docs/index.html 8-9 the bundled JavaScript and CSS are served as single files, indicating no code splitting is currently employed (the app is small enough for a single bundle). 

Sources: package.json 7-9 vite.config.ts 1-8 docs/index.html 8-9 

### Dependencies and Tooling Versions 

The build pipeline relies on the following key dependencies from package.json 13-31 : 

Tool Version Role 
vite ^7.2.4 Build tool and dev server 
@vitejs/plugin-react ^5.1.1 React JSX transformation and Fast Refresh 
typescript ~5.9.3 Type checking and compilation 
eslint ^9.39.1 Code quality and linting 
react ^19.2.0 Runtime dependency (bundled) 
react-dom ^19.2.0 DOM rendering (bundled) 
react-router-dom ^7.13.0 Client-side routing (bundled) 

The caret ( ^ ) and tilde ( ~ ) versioning allows for compatible updates without breaking changes. 

Sources: package.json 13-31 

### Build Process State Diagram 

This state diagram shows the complete build execution flow, from TypeScript compilation through asset optimization to final output generation. 

Sources: package.json 9 vite.config.ts 1-8 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Build and Deployment Pipeline 
- Purpose and Scope 
- Build Tooling Overview 
- Build Scripts and Commands 
- Build Process Sequence 
- Build Configurations 
- Base Path Configuration 
- Plugin Configuration 
- Output Structure 
- Production Build Output 
- Build Output Comparison 
- Asset Hashing and Cache Busting 
- Asset Hashing Example 
- Asset Reference Updates 
- GitHub Pages Deployment 
- Deployment Configuration 
- Deployment Process 
- HashRouter Strategy 
- Development vs Production Builds 
- Development Mode (`npm run dev`) 
- Production Mode (`npm run build:gh-pages`) 
- Build Size Comparison 
- Dependencies and Tooling Versions 
- Build Process State Diagram

---

# Architecture | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/3-architecture

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Architecture 

Relevant source files 
- README.md 
- src/App.tsx 
- src/main.tsx 

### Purpose and Scope 

This document provides a comprehensive overview of the Stretch Timer App's technical architecture, describing how the application is organized into distinct layers, the design patterns employed, and the relationships between major system components. This page focuses on the high-level architectural structure and design principles that govern the codebase. 

For detailed information about specific subsystems, see: 

- Application initialization and bootstrapping: Application Structure 
- Data models, relationships, and query patterns: Data Architecture 
- Routing configuration and navigation flow: Routing and Navigation 

### Architectural Overview 

The Stretch Timer App follows a layered architecture pattern with clear separation of concerns. The application is structured as a single-page application (SPA) built with React and TypeScript, compiled by Vite, and deployed as static assets to GitHub Pages. 

The architecture consists of five primary layers: 

Layer Directory/Files Responsibility 
Build & Deployment vite.config.ts , docs/ Compilation, bundling, and static asset generation 
Application Entry src/main.tsx , src/App.tsx React initialization and router configuration 
UI Layer src/screens/* , src/components/* User interface screens and reusable components 
Core Logic src/hooks/* Business logic, state machines, and audio systems 
Data Layer src/data/* Static data definitions and query functions 
Styling System src/styles/theme.ts , src/index.css Design tokens and global styles 

Sources: README.md 1-181 src/main.tsx 1-10 src/App.tsx 1-12 

### Layered Architecture Diagram 

Figure 3.1: Layered Architecture with Code Entity Mapping 

Sources: README.md 155-181 src/main.tsx 1-10 src/App.tsx 1-12 

### Layer Responsibilities 

#### Build & Deployment Layer 

The build system uses Vite as the primary build tool, configured in vite.config.ts It handles TypeScript compilation, bundling, code splitting, and asset optimization. The build process generates content-hashed filenames for cache busting (e.g., index-BlGIPGa_.js ). 

Key configuration: 

- Base path : /stretch_app/docs/ for GitHub Pages subdirectory deployment 
- Output directory : docs/ (configured via build.outDir in vite.config.ts) 
- Router strategy : HashRouter ( /#/path ) for client-side routing compatibility 

The deployment target is GitHub Pages, serving static files directly from the docs/ folder on the repository's main branch. 

Sources: README.md 142-153 README.md 183-187 

#### Application Entry Layer 

The application bootstraps through a three-stage initialization: 

- React Initialization : src/main.tsx 6-10 uses createRoot() to mount the React application to the DOM element with id root 
- Router Setup : src/App.tsx 6-8 wraps the application in HashRouter from react-router-dom 
- Route Configuration : src/navigation/AppNavigator.tsx defines all application routes using Routes and Route components 

The HashRouter strategy is critical for GitHub Pages deployment, as it enables client-side routing without server-side configuration. 

Sources: src/main.tsx 1-10 src/App.tsx 1-12 README.md 124 

#### UI Layer 

The UI layer is divided into two categories: 

Screens ( src/screens/* ): Full-page components that represent distinct application views 

- HomeScreen.tsx : Body map interface with zone/muscle/stretch selection 
- CourseListScreen.tsx : Browse preset stretch courses 
- CourseDetailScreen.tsx : Display course details and stretch list 
- PlayerScreen.tsx : Execute stretch routines with timer and audio feedback 

Reusable Components ( src/components/* ): Shared UI elements used across screens 

- Header.tsx : Navigation header with back button 
- TabBar.tsx : Bottom tab navigation bar 
- BodyMap.tsx : Interactive SVG body diagram 

All UI components consume the centralized theme system from src/styles/theme.ts rather than hardcoding style values. 

Sources: README.md 155-181 

#### Core Logic Layer 

Business logic is encapsulated in custom React hooks located in src/hooks/ : 

useStretchTimer ( src/hooks/useStretchTimer.ts ): Implements a state machine for stretch playback with phases: 

- prep : 5-second preparation countdown 
- active : 30-second stretch execution 
- interval : 5-second rest period (for sided stretches or course transitions) 

The hook manages: 

- Phase transitions and timing logic 
- Sidedness handling (right side → interval → left side) 
- Audio cue triggering via Web Audio API 
- Automatic progression through multi-stretch courses 

Audio feedback is implemented using the browser's AudioContext API, playing three distinct sounds: 

- tick.mp3 : Standard second tick 
- tick_urgent.mp3 : Countdown alert (final 5 seconds) 
- finish.mp3 : Phase completion signal 

Sources: README.md 34-51 README.md 167-168 

#### Data Layer 

The data layer consists of four static TypeScript modules in src/data/ : 

Data Modules : 

- bodyZones.ts : Defines 38 anatomical zones with front/back classification 
- muscles.ts : Defines 40 muscles with zone relationships ( zone_id references) 
- stretches.ts : Defines 25 stretches with muscle targets ( target_muscle_ids array) 
- courses.ts : Defines 8 preset courses as ordered stretch sequences ( stretch_ids array) 

Query Functions : Each module exports helper functions for data retrieval: 

- getZonesBySide(side) : Filter zones by 'front' or 'back' 
- getMusclesByZone(zoneId) : Filter muscles by zone 
- getMuscleById(id) : Direct lookup 
- getStretchesByMuscle(muscleId) : Find stretches targeting specific muscle 
- getStretchById(id) : Direct lookup 
- getCourseById(id) : Direct lookup 

All data is in-memory with no database or API calls. Relationships form a hierarchy: zones → muscles → stretches → courses. 

Sources: README.md 77-116 README.md 162-166 

#### Styling System 

The styling system centralizes all design tokens in src/styles/theme.ts : 

Theme Object Structure : 

theme {
  colors: { primary, secondary, accent, surface, text, timerNormal, timerUrgent, ... }
  fontSize: { xs, sm, md, lg, xl, xxl, timer }
  spacing: { xs, sm, md, lg, xl }
  borderRadius: { sm, md, lg, full }
} 

Global styles in src/index.css enforce mobile-only constraints: 

- max-width: 430px on body and root elements 
- Responsive design is intentionally not supported (mobile-first only) 

All components import and reference theme object properties rather than hardcoded values, enabling consistent styling and easy theme modifications. 

Sources: README.md 127 README.md 176-177 

### Dependency Flow 

Figure 3.2: Module Dependency Graph 

Sources: src/main.tsx 1-10 src/App.tsx 1-12 README.md 155-181 

#### Dependency Principles 

The architecture enforces these dependency rules: 

- 

Unidirectional Flow : Dependencies flow downward through layers. UI components depend on data and logic layers, but data/logic layers never import UI components. 

- 

Data Independence : Data modules ( src/data/* ) have no external dependencies. They export pure data arrays and query functions with no side effects. 

- 

Logic Isolation : Core logic hooks ( useStretchTimer ) are UI-agnostic. They accept primitive inputs and return state/functions, enabling reusability. 

- 

Theme Centralization : All styling references flow through theme.ts . Direct style values (colors, sizes) are never hardcoded in components. 

- 

Single Router : Only App.tsx imports and configures the router. Navigation logic is centralized in AppNavigator.tsx . 

Sources: README.md 155-181 

### Technology Stack Mapping 

Table 3.1: Technologies by Layer 

Layer Technology Purpose Configuration 
Build Vite 5.x Build tool, dev server vite.config.ts 
Build TypeScript 5.x Type safety tsconfig.json 
Runtime React 18.x UI framework src/main.tsx 
Routing React Router 6.x Client-side routing HashRouter in src/App.tsx 
Audio Web Audio API Sound playback Native browser API 
Styling CSS + Theme Object Design system src/styles/theme.ts , src/index.css 
Deployment GitHub Pages Static hosting docs/ directory 

Sources: README.md 1-20 README.md 119-130 

### Design Patterns 

#### State Machine Pattern 

The useStretchTimer hook implements a finite state machine for timer control with explicit states and transitions. This ensures predictable behavior and prevents invalid state combinations (e.g., cannot be in both prep and active phases simultaneously). 

#### Composition Over Inheritance 

React components use composition rather than class inheritance. Screens compose reusable components ( Header , TabBar , BodyMap ) rather than extending base screen classes. 

#### Query Function Pattern 

The data layer uses query functions as the sole interface for data access. Consumers call getMusclesByZone(zoneId) rather than filtering MUSCLES array directly, abstracting the data structure and enabling future refactoring. 

#### Theme Token Pattern 

Styling uses design tokens (semantic names like colors.primary , fontSize.lg ) rather than raw values. This provides a single source of truth for visual properties and enables theme switching. 

#### Static Site Architecture 

The application uses static site generation with no server-side rendering or backend API. All data is bundled at build time, enabling deployment to simple static hosting without server infrastructure. 

Sources: README.md 34-51 README.md 119-130 

### Mobile-First Constraints 

The architecture enforces mobile-only display through CSS constraints in src/index.css : 

- max-width: 430px on all root containers 
- No responsive breakpoints for tablet/desktop 
- Development and testing use Chrome DevTools mobile simulation 

This design decision simplifies the codebase by eliminating responsive layout logic, as the application targets mobile devices exclusively for the hands-free stretching experience. 

Sources: README.md 127 

### Future Migration Path 

The architecture is designed to facilitate migration from the current web implementation to React Native: 

Web-to-Native Mapping : 

- HashRouter → Expo Router (file-based routing) 
- Web Audio API → expo-av 
- localStorage → AsyncStorage 
- CSS styling → React Native StyleSheet 
- max-width constraint → Native screen dimensions 

The directory structure in src/ mirrors the intended React Native organization, with screens, components, data, and hooks in separate folders. Inline styles in components (when used) follow React Native patterns to minimize refactoring during migration. 

Sources: README.md 119-140 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Architecture 
- Purpose and Scope 
- Architectural Overview 
- Layered Architecture Diagram 
- Layer Responsibilities 
- Build & Deployment Layer 
- Application Entry Layer 
- UI Layer 
- Core Logic Layer 
- Data Layer 
- Styling System 
- Dependency Flow 
- Dependency Principles 
- Technology Stack Mapping 
- Design Patterns 
- State Machine Pattern 
- Composition Over Inheritance 
- Query Function Pattern 
- Theme Token Pattern 
- Static Site Architecture 
- Mobile-First Constraints 
- Future Migration Path

---

# Application Structure | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/3.1-application-structure

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Application Structure 

Relevant source files 
- docs/index.html 
- src/App.tsx 
- src/main.tsx 

### Purpose and Scope 

This document describes the entry points, bootstrapping process, and initialization sequence of the Stretch Timer application. It covers how the React application initializes from the static HTML file through the root component setup, and how the routing system is established at the application level. 

For information about the routing configuration and screen definitions, see Routing and Navigation . For details on the data layer initialization, see Data Architecture . 

### Application Entry Point Chain 

The application follows a three-stage initialization chain that progresses from static HTML to a fully-mounted React application: 

Initialization Sequence: 

- HTML Entry - Browser loads docs/index.html which references the bundled JavaScript 
- Bootstrap - src/main.tsx executes and attaches React to the DOM 
- Root Component - App.tsx establishes the routing context 
- Navigation Layer - AppNavigator defines and renders route-matched screens 

Sources: docs/index.html 1-14 src/main.tsx 1-10 src/App.tsx 1-12 

### HTML Entry Point 

The production HTML file serves as the initial entry point for the application. It provides the minimal DOM structure required for React to mount. 

Key Elements: 

Element Purpose Details 
<div id="root"> React mount point Target DOM node for createRoot() docs/index.html 12 
<script type="module"> JavaScript bundle Content-hashed production bundle docs/index.html 8 
<link rel="stylesheet"> CSS bundle Content-hashed styles docs/index.html 9 
<meta name="viewport"> Mobile optimization Disables zoom with user-scalable=no docs/index.html 6 

Path Configuration: All asset paths are prefixed with /stretch_app/docs/ to accommodate the GitHub Pages subdirectory deployment structure. This prefix is injected by Vite's base configuration during the build process. 

Sources: docs/index.html 1-14 

### Bootstrap Process (main.tsx) 

The src/main.tsx file executes the React 18 initialization sequence, mounting the application to the DOM and enabling development-time safety checks. 

Implementation Details: 

src/main.tsx 6-10 

Component Breakdown: 

Symbol Type Purpose 
createRoot React 18 API Creates concurrent-mode-enabled root src/main.tsx 6 
document.getElementById('root')! DOM query Retrieves mount target with non-null assertion src/main.tsx 6 
<StrictMode> React wrapper Enables additional development checks src/main.tsx 7 
<App /> Root component Entry point to application logic src/main.tsx 8 

StrictMode Behavior: In development, StrictMode intentionally double-invokes component functions, effects, and hooks to surface side-effect issues. This wrapper is removed in production builds but helps identify potential problems during development. 

Global CSS Import: The ./index.css import at src/main.tsx 3 loads global styles before any components render, ensuring baseline styles are available immediately. 

Sources: src/main.tsx 1-10 

### Root Component (App.tsx) 

The App component establishes the routing context for the entire application. It wraps the navigator in a HashRouter to enable client-side routing compatible with GitHub Pages hosting. 

Implementation: 

The component is minimal by design, serving solely as a routing context provider: 

src/App.tsx 4-10 

Router Selection: HashRouter vs BrowserRouter 

The application uses HashRouter rather than BrowserRouter for a specific deployment reason: 

Router Type URL Format GitHub Pages Compatible 
BrowserRouter /stretch_app/docs/home ❌ Requires server-side routing 
HashRouter /stretch_app/docs/#/home ✅ Works with static hosting 

Why HashRouter? GitHub Pages serves static files without server-side routing capabilities. When a user navigates to /stretch_app/docs/home , GitHub Pages attempts to serve a file at that path, resulting in a 404. With HashRouter , the URL becomes /stretch_app/docs/#/home , where everything after the # is handled client-side by JavaScript. The server only needs to serve the base HTML file. 

Sources: src/App.tsx 1-12 

### Application Root Container 

The following diagram illustrates the complete DOM hierarchy from the HTML root to the rendered application: 

Rendering Layers: 

- DOM Layer - Static HTML provides <div id="root"> docs/index.html 12 
- React Root Layer - createRoot() attaches React to the DOM src/main.tsx 6 
- Development Layer - StrictMode wraps for development checks src/main.tsx 7 
- Application Layer - App component renders src/main.tsx 8 
- Router Layer - HashRouter provides routing context src/App.tsx 6 
- Navigation Layer - AppNavigator defines routes src/App.tsx 7 
- Screen Layer - Matched route component renders (see Routing and Navigation ) 

Sources: docs/index.html 12 src/main.tsx 6-10 src/App.tsx 4-10 

### Bootstrap Sequence Timeline 

The following sequence diagram shows the temporal order of initialization operations: 

Initialization Phases: 

Phase Component Key Operation 
1. Load Browser → HTML Parse HTML, identify root div 
2. Execute Bundle → main.tsx Import dependencies and global CSS 
3. Mount main.tsx Call createRoot() and render() 
4. Wrap App.tsx Establish HashRouter context 
5. Route AppNavigator Match URL to screen component 
6. Display Screen Render UI based on route 

Timing Considerations: The entire bootstrap sequence executes synchronously during the initial script evaluation. React 18's concurrent features become active after the initial mount, but the bootstrap itself is a synchronous operation. 

Sources: docs/index.html 8 src/main.tsx 1-10 src/App.tsx 1-12 

### Module Import Graph 

The following diagram maps the dependency relationships between the core application files: 

Import Chain: 

- 

src/main.tsx imports: 

- react - StrictMode wrapper src/main.tsx 1 
- react-dom/client - createRoot API src/main.tsx 2 
- ./index.css - Global styles src/main.tsx 3 
- ./App - Root component src/main.tsx 4 

- 

src/App.tsx imports: 

- react-router-dom - HashRouter src/App.tsx 1 
- ./navigation/AppNavigator - Route definitions src/App.tsx 2 

Bundling Process: During production builds, Vite processes these imports and generates the content-hashed bundle index-BlGIPGa_.js . The hash changes when any source file changes, enabling cache invalidation. 

Sources: src/main.tsx 1-4 src/App.tsx 1-2 docs/index.html 8 

### State Initialization 

The application structure is intentionally stateless at the root level. Neither main.tsx nor App.tsx manage any application state. 

State Management Strategy: 

Level State Owner State Type 
Root (App.tsx) None No state - pure routing wrapper 
Router HashRouter URL state managed by react-router-dom 
Screens Individual screen components Local UI state (selections, filters) 
Timer useStretchTimer hook Timer state machine (see Timer State Machine ) 

No Global State Management: The application does not use Context API, Redux, or other global state management solutions at the root level. State is colocated with the components that use it, following React's principle of component isolation. 

Router State: The only "global" state is the URL hash maintained by HashRouter , which determines which screen renders. This state is managed entirely by react-router-dom and accessed via hooks like useNavigate , useParams , and useLocation in child components. 

Sources: src/App.tsx 4-10 src/main.tsx 6-10 

### Error Boundaries 

The current application structure does not implement error boundaries at the root level. All errors propagate to the browser's default error handling. 

Production Implications: In production builds, unhandled errors will display a blank white screen. StrictMode is removed in production, so its additional error checking is not active. 

Potential Enhancement: A production-ready application would typically wrap <App /> in an error boundary component to catch and display user-friendly error messages rather than allowing the entire application to crash. 

Sources: src/main.tsx 6-10 

### Summary 

The application structure follows a clean, minimal bootstrapping pattern: 

- HTML Entry Point - docs/index.html provides the DOM mount point docs/index.html 12 
- Bootstrap Script - src/main.tsx initializes React 18 with createRoot() src/main.tsx 6 
- Root Component - src/App.tsx establishes routing with HashRouter src/App.tsx 6 
- Navigation Layer - AppNavigator defines and renders routes src/App.tsx 7 

This architecture is stateless at the root level, delegating all routing to react-router-dom and all business logic to screen components and custom hooks. The use of HashRouter enables static hosting on GitHub Pages without server-side routing requirements. 

Sources: docs/index.html 1-14 src/main.tsx 1-10 src/App.tsx 1-12 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Application Structure 
- Purpose and Scope 
- Application Entry Point Chain 
- HTML Entry Point 
- Bootstrap Process (main.tsx) 
- Root Component (App.tsx) 
- Application Root Container 
- Bootstrap Sequence Timeline 
- Module Import Graph 
- State Initialization 
- Error Boundaries 
- Summary

---

# Data Architecture | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/3.2-data-architecture

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Data Architecture 

Relevant source files 
- README.md 
- src/data/bodyZones.ts 
- src/data/courses.ts 
- src/data/muscles.ts 
- src/data/stretches.ts 

### Purpose and Scope 

This document describes the static data layer architecture of the Stretch Timer App, including data models, entity relationships, storage structures, and query patterns. The data layer provides in-memory access to body zones, muscles, stretches, and courses through TypeScript modules. 

For information about how screens navigate and consume this data, see Routing and Navigation . For details on the UI components that display this data, see Screens . 

### Data Layer Overview 

The application uses a static, in-memory data architecture with no database or external API calls. All content is defined as TypeScript arrays exported from four core data modules: 

- src/data/bodyZones.ts - Anatomical zone definitions 
- src/data/muscles.ts - Muscle definitions linked to zones 
- src/data/stretches.ts - Stretch exercise definitions linked to muscles 
- src/data/courses.ts - Preset course definitions linking to stretches 

This architecture was chosen for the Phase 1 Web Version to enable fast prototyping and GitHub Pages deployment without backend infrastructure. Data is loaded into memory at application startup and remains constant throughout the session. 

Sources: README.md 119-130 README.md 77-116 

#### Static Data Architecture Diagram 

Sources: src/data/bodyZones.ts 1-36 src/data/muscles.ts 1-56 src/data/stretches.ts 1-250 src/data/courses.ts 1-105 

### Data Models 

#### TypeScript Interfaces 

The data layer defines four primary TypeScript interfaces that model the domain entities: 

Interface File Properties Purpose 
BodyZone src/data/bodyZones.ts 1-10 id , name , side , x , y , width , height Represents clickable anatomical regions on the body map SVG 
Muscle src/data/muscles.ts 1-6 id , name , zone_id , side Represents specific muscles within a body zone 
Stretch src/data/stretches.ts 1-9 id , title , description , target_muscle_ids , duration_seconds , is_sided , image_resource_name Represents stretch exercises with execution parameters 
Course src/data/courses.ts 1-7 id , title , description , stretch_ids , is_free Represents preset stretch routines 

#### BodyZone Interface 

src/data/bodyZones.ts 1-10 

The BodyZone interface includes SVG positioning data ( x , y , width , height ) as percentage-based coordinates to enable interactive zone selection on the BodyMap component. Each zone is categorized by side to support the front/back body view toggle. 

Sources: src/data/bodyZones.ts 1-10 

#### Muscle Interface 

src/data/muscles.ts 1-6 

The zone_id property establishes a many-to-one relationship with BodyZone , allowing multiple muscles to belong to a single anatomical zone. 

Sources: src/data/muscles.ts 1-6 

#### Stretch Interface 

src/data/stretches.ts 1-9 

The target_muscle_ids array creates a many-to-many relationship with Muscle , since a single stretch can target multiple muscles and a muscle can have multiple stretches. The is_sided boolean flag controls timer state machine behavior (see Timer State Machine ). 

Sources: src/data/stretches.ts 1-9 

#### Course Interface 

src/data/courses.ts 1-7 

The stretch_ids array defines an ordered sequence of stretches to be executed. The ordering is preserved during playback. The is_free property supports the app's monetization model (see README.md 136-139 ). 

Sources: src/data/courses.ts 1-7 

### Entity Relationships 

The data model forms a hierarchical graph with unidirectional references from specific to general entities: 

#### Relationship Cardinalities 

Relationship Type Implementation 
BodyZone → Muscle One-to-Many Muscle.zone_id references BodyZone.id 
Muscle → Stretch Many-to-Many Stretch.target_muscle_ids[] array references Muscle.id 
Stretch → Course Many-to-Many Course.stretch_ids[] array references Stretch.id 

The relationships are unidirectional (child references parent) and enforced through manual referential integrity during data authoring. There are no runtime validation checks for dangling references. 

Sources: src/data/bodyZones.ts 1-36 src/data/muscles.ts 1-56 src/data/stretches.ts 1-250 src/data/courses.ts 1-105 

### Data Storage Structure 

#### Array-Based Storage 

All data is stored in exported constant arrays: 

Array Variable Name File Count Example IDs 
Body Zones bodyZones src/data/bodyZones.ts 12-31 38 neck_front , chest , thigh_back , calf 
Muscles muscles src/data/muscles.ts 8-47 40 pectoralis_major , quadriceps , hamstrings 
Stretches stretches src/data/stretches.ts 11-241 25 neck_side_tilt , cobra_stretch , pigeon_pose 
Courses courses src/data/courses.ts 9-100 8 morning_basic , shoulder_relief , full_body 

#### Zone Distribution 

The 38 body zones are split evenly between front and back views: 

Sources: src/data/bodyZones.ts 12-31 

#### Stretch Sidedness Distribution 

Of the 25 stretches, sidedness determines timer execution flow: 

Property Count Examples 
is_sided: true 14 neck_side_tilt , shoulder_cross_body , quad_standing 
is_sided: false 11 neck_forward , chest_doorway , cobra_stretch 

Sided stretches execute as: Prep (5s) → Right (30s) → Interval (5s) → Left (30s), while non-sided stretches execute as: Prep (5s) → Main (30s). See Timer State Machine for execution logic. 

Sources: src/data/stretches.ts 11-241 

#### Course Content Distribution 

Property Count Course IDs 
is_free: true 4 morning_basic , shoulder_relief , lower_body , back_care 
is_free: false 2 full_body , night_relax 

Free courses contain 5-7 stretches each. The full-body premium course contains 12 stretches. 

Sources: src/data/courses.ts 9-100 

### Query Functions 

Each data module exports query functions that abstract direct array access: 

#### Query Function Reference 

Function Parameters Return Type Purpose File 
getZonesBySide() side: 'front' | 'back' BodyZone[] Filter zones by body side src/data/bodyZones.ts 33-35 
getMusclesByZone() zoneId: string Muscle[] Find all muscles in a zone src/data/muscles.ts 49-51 
getMuscleById() id: string Muscle | undefined Lookup muscle by ID src/data/muscles.ts 53-55 
getStretchesByMuscle() muscleId: string Stretch[] Find stretches targeting a muscle src/data/stretches.ts 247-249 
getStretchById() id: string Stretch | undefined Lookup stretch by ID src/data/stretches.ts 243-245 
getCourseById() id: string Course | undefined Lookup course by ID src/data/courses.ts 102-104 

#### Query Implementation Pattern 

All query functions use array filtering or search: 

These functions provide a clean API boundary that could be replaced with database queries in a future backend implementation without changing consuming code. 

Sources: src/data/bodyZones.ts 33-35 src/data/muscles.ts 49-55 src/data/stretches.ts 243-249 src/data/courses.ts 102-104 

### Data Flow Patterns 

#### Screen-to-Data Query Flow 

#### HomeScreen Navigation Query Pattern 

The HomeScreen executes a chain of queries as the user drills down: 

- Initial Load: getZonesBySide('front') → Display front body zones 
- Zone Click: getMusclesByZone(zoneId) → Display muscles in selected zone 
- Muscle Click: getStretchesByMuscle(muscleId) → Display available stretches 
- Stretch Click: Navigate to PlayerScreen with stretchId parameter 

Each query filters the data hierarchy one level deeper, maintaining the user's context through component state. 

Sources: src/data/bodyZones.ts 33-35 src/data/muscles.ts 49-51 src/data/stretches.ts 247-249 

#### CourseDetailScreen Resolution Pattern 

The CourseDetailScreen resolves course data through two queries: 

- Route Load: getCourseById(courseId) → Get course metadata 
- Stretch Resolution: For each stretch_id in course.stretch_ids[] , call getStretchById(stretch_id) → Resolve full stretch details for preview display 

This creates a lazy resolution pattern where courses store only IDs, and full objects are resolved on-demand. 

Sources: src/data/courses.ts 102-104 src/data/stretches.ts 243-245 

### Data Integrity 

#### Referential Integrity Approach 

The data layer uses manual referential integrity with no runtime validation: 

- Foreign Key References: String IDs in zone_id , target_muscle_ids[] , and stretch_ids[] arrays 
- Validation Timing: Data correctness is verified during development/testing only 
- Missing Reference Behavior: getById() functions return undefined if ID is not found 

#### Example Reference Chains 

The following shows how IDs link across modules: 

Sources: src/data/bodyZones.ts 12-31 src/data/muscles.ts 8-47 src/data/stretches.ts 11-241 src/data/courses.ts 9-100 

#### Data Authoring Constraints 

To maintain referential integrity during data authoring: 

- ID Uniqueness: All IDs must be unique within their entity type 
- Reference Validity: All zone_id , target_muscle_ids[] , and stretch_ids[] must reference existing entities 
- Side Consistency: Muscle.side should match its referenced BodyZone.side 
- Ordering Preservation: Course.stretch_ids[] order determines playback sequence 

These constraints are enforced through code review and manual testing, not automated validation. 

Sources: README.md 77-116 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Data Architecture 
- Purpose and Scope 
- Data Layer Overview 
- Static Data Architecture Diagram 
- Data Models 
- TypeScript Interfaces 
- BodyZone Interface 
- Muscle Interface 
- Stretch Interface 
- Course Interface 
- Entity Relationships 
- Relationship Cardinalities 
- Data Storage Structure 
- Array-Based Storage 
- Zone Distribution 
- Stretch Sidedness Distribution 
- Course Content Distribution 
- Query Functions 
- Query Function Reference 
- Query Implementation Pattern 
- Data Flow Patterns 
- Screen-to-Data Query Flow 
- HomeScreen Navigation Query Pattern 
- CourseDetailScreen Resolution Pattern 
- Data Integrity 
- Referential Integrity Approach 
- Example Reference Chains 
- Data Authoring Constraints

---

# Routing and Navigation | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/3.3-routing-and-navigation

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Routing and Navigation 

Relevant source files 
- README.md 
- src/App.tsx 
- src/navigation/AppNavigator.tsx 

### Purpose and Scope 

This document describes the routing system and navigation architecture of the Stretch Timer App. It covers the HashRouter configuration, route definitions, URL structure, navigation patterns, and how users move between screens. For information about the timer state management during navigation, see Timer State Machine . For details on the user interface of individual screens, see Screens . 

### Router Configuration 

The application uses React Router v6 with HashRouter instead of BrowserRouter to ensure compatibility with GitHub Pages static hosting. HashRouter uses URL hashes ( # ) to maintain navigation state entirely on the client side, eliminating the need for server-side routing configuration. 

The router is initialized in src/App.tsx 1-12 where HashRouter wraps the entire application: 

This configuration enables URL patterns like https://kuniatsu.github.io/stretch_app/docs/#/courses rather than requiring server-side path rewriting for /courses . 

Sources: src/App.tsx 1-12 README.md 124 

### Route Structure 

#### Route Definitions 

All route definitions are centralized in the AppNavigator component at src/navigation/AppNavigator.tsx 8-20 The application defines four primary routes: 

Route Path Component Purpose 
/ HomeScreen Body map interface with muscle/stretch selection 
/courses CourseListScreen Browse available preset courses 
/courses/:courseId CourseDetailScreen View course details and stretch list 
/player PlayerScreen Execute stretch playback with timer 

The route structure is intentionally flat (no nested routes) to simplify navigation logic and state management. 

Router Architecture Diagram: 

Sources: src/navigation/AppNavigator.tsx 8-20 src/App.tsx 4-9 

#### Dynamic Route Parameters 

The /courses/:courseId route uses a URL parameter to identify which course to display. The courseId parameter is extracted using React Router's useParams hook in the CourseDetailScreen component. 

Example URLs: 

- /#/courses/morning_routine 
- /#/courses/shoulder_relief 

Sources: src/navigation/AppNavigator.tsx 14 

### Navigation Patterns 

#### User Journey Flow 

The application supports two distinct navigation patterns that converge on the player screen: 

Navigation Flow Diagram: 

Sources: README.md 23-30 README.md 52-54 src/navigation/AppNavigator.tsx 11-15 

#### Navigation Methods 

##### Programmatic Navigation with useNavigate 

Screens use React Router's useNavigate hook to trigger navigation programmatically: 

##### State Passing via Navigation 

Since the application does not use global state management for navigation context, data is passed between screens using React Router's location state: 

Source Screen Target Screen State Passed 
HomeScreen PlayerScreen { stretchIds: string[], returnPath: string } 
CourseDetailScreen PlayerScreen { stretchIds: string[], returnPath: string } 

The PlayerScreen accesses this state via useLocation().state . 

Sources: README.md 32-54 

#### Back Navigation 

The application implements back navigation through two mechanisms: 

- Header Component Back Button : The Header component renders a back arrow that calls navigate(-1) to return to the previous screen in the history stack 
- Conditional Return Paths : The PlayerScreen can receive a returnPath in location state to navigate to a specific screen upon completion 

Sources: src/navigation/AppNavigator.tsx 1-20 

### URL Structure and Query Parameters 

#### Hash-Based URLs 

All application URLs follow the pattern: 

https://kuniatsu.github.io/stretch_app/docs/#<route> 

The hash fragment ( # ) ensures that the server always serves the root index.html , and the React Router handles the path following the hash. 

#### Example URL Patterns 

User Action URL Description 
Open app /#/ Default home screen 
View courses /#/courses Course list view 
Open morning routine /#/courses/morning_routine Specific course detail 
Start playback /#/player Player screen (state in memory, not URL) 

#### State vs. URL Parameters 

The application makes a clear distinction: 

- URL Parameters ( :courseId ): Used for linkable, bookmarkable content (course details) 
- Location State : Used for transient data (stretch IDs, return paths) that should not be bookmarkable or shared 

This design prevents users from bookmarking a player URL with invalid state and encountering errors when returning later. 

Sources: README.md 124 README.md 186 

### TabBar Integration 

#### Conditional Rendering 

The TabBar component is rendered at the root level of AppNavigator src/navigation/AppNavigator.tsx 17 making it persist across route changes. However, the TabBar itself implements conditional visibility logic: 

- Visible : On HomeScreen ( / ) and CourseListScreen ( /courses ) 
- Hidden : On CourseDetailScreen ( /courses/:courseId ) and PlayerScreen ( /player ) 

This ensures the bottom navigation is accessible for primary screens but hidden during focused activities like viewing course details or executing stretches. 

TabBar Navigation Integration Diagram: 

Sources: src/navigation/AppNavigator.tsx 17 src/navigation/AppNavigator.tsx 1-20 

#### Active Tab State 

The TabBar uses useLocation() to detect the current route and highlight the active tab: 

This approach ensures the tab state is always synchronized with the router state without requiring separate state management. 

Sources: src/navigation/AppNavigator.tsx 6 

### Navigation Security and Validation 

#### Missing State Handling 

When a screen expects navigation state but doesn't receive it (e.g., user manually enters /#/player ), the screen should implement defensive checks: 

This prevents runtime errors when users access routes through bookmarks or direct URL entry. 

Sources: README.md 124 

### Navigation Timing and Lifecycle 

#### Player Exit Flow 

When playback completes or the user exits the PlayerScreen , navigation behavior varies: 

- Manual Exit : User presses back button → navigate(-1) returns to previous screen 
- Completion with Return Path : User completes routine → navigate(returnPath) returns to originating screen 
- Completion without Return Path : Default behavior returns to home screen 

This flexible exit strategy ensures users return to the context they came from, maintaining a coherent navigation experience. 

Sources: README.md 32-54 

#### Navigation Performance 

Since all routes are eagerly loaded (no code splitting in the current implementation), navigation is instantaneous. The HashRouter's in-memory history stack ensures smooth back/forward navigation without server round trips. 

Sources: src/navigation/AppNavigator.tsx 1-20 src/App.tsx 1-12 

### Summary 

The routing system provides a simple, flat route structure optimized for GitHub Pages deployment using HashRouter. Navigation is achieved through React Router's useNavigate hook, with state passed via location state for transient data and URL parameters for persistent, bookmarkable routes. The TabBar provides consistent bottom navigation for primary screens while hiding during focused activities. This architecture supports two distinct user journeys—body map exploration and course selection—that converge on the unified player interface. 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Routing and Navigation 
- Purpose and Scope 
- Router Configuration 
- Route Structure 
- Route Definitions 
- Dynamic Route Parameters 
- Navigation Patterns 
- User Journey Flow 
- Navigation Methods 
- Programmatic Navigation with `useNavigate` 
- State Passing via Navigation 
- Back Navigation 
- URL Structure and Query Parameters 
- Hash-Based URLs 
- Example URL Patterns 
- State vs. URL Parameters 
- TabBar Integration 
- Conditional Rendering 
- Active Tab State 
- Navigation Security and Validation 
- Missing State Handling 
- Navigation Timing and Lifecycle 
- Player Exit Flow 
- Navigation Performance 
- Summary

---

# User Interface | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/4-user-interface

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## User Interface 

Relevant source files 
- README.md 
- src/components/Header.tsx 
- src/screens/HomeScreen.tsx 

### Purpose and Scope 

This document provides an overview of the User Interface layer, describing the architecture, design patterns, and visual systems used to construct the application's screens and components. It covers the relationship between screens, reusable components, and the theme system, as well as the mobile-first constraints and inline styling approach adopted for React Native compatibility. 

For detailed documentation of individual screen components, see Screens . For reusable UI components, see Reusable Components . For theme architecture and design tokens, see Styling and Theme System . 

### UI Layer Architecture 

The User Interface layer is organized into three primary subsystems: Screens (full-page views with routing integration), Reusable Components (shared UI elements), and Theme System (centralized design tokens). All UI code follows inline styling patterns to facilitate future migration to React Native, as documented in the Phase 1 Web Version strategy. 

Diagram: UI Layer Component Hierarchy 

Sources: README.md 156-181 src/components/Header.tsx 1-59 src/screens/HomeScreen.tsx 1-271 

### Screen and Component Organization 

The UI layer distinguishes between screens (components with route definitions) and reusable components (shared UI elements). Screens consume data layer functions, manage local state, and compose reusable components. Reusable components accept props for configuration and render self-contained UI elements. 

Diagram: Screen-Component Consumption Pattern 

Sources: src/screens/HomeScreen.tsx 1-46 src/components/Header.tsx 4-25 

The HomeScreen component demonstrates this pattern clearly: 

- State Management : Uses useState for side (front/back toggle) and viewState (three-stage navigation: bodyMap → muscleList → stretchList) 
- Data Queries : Calls getMusclesByZone() and getStretchesByMuscle() in event handlers 
- Component Composition : Renders <Header> , <BodyMap> , and conditional list views based on viewState.type 
- Navigation Integration : Uses useNavigate() hook to transition to PlayerScreen with URL parameters 

### Inline Styling Pattern 

All components use inline styles via React CSSProperties objects rather than CSS classes or CSS-in-JS libraries. This approach ensures compatibility with React Native's StyleSheet API during the planned Phase 2 migration. Each component exports a styles constant of type Record<string, React.CSSProperties> . 

Diagram: Styling Architecture 

Sources: src/components/Header.tsx 2-58 src/screens/HomeScreen.tsx 10-270 

Example from Header component: 

Import Statement Usage in Styles Applied to Element 
colors.primary backgroundColor: colors.primary Header container src/components/Header.tsx 33 
colors.surface color: colors.surface Header text and back button src/components/Header.tsx 34-49 
fontSize.lg fontSize: fontSize.lg Title text src/components/Header.tsx 40 
spacing.sm padding: ${spacing.sm}px ${spacing.md}px Container padding src/components/Header.tsx 32 

### Mobile-First Design Constraints 

The application enforces a strict mobile-only viewport with a maximum width of 430px, as specified in the global CSS. No responsive breakpoints exist; the entire UI is optimized for smartphone portrait orientation. 

Key Constraints: 

Constraint Value Implementation 
Max Width 430px #root { max-width: 430px } in src/index.css 
Viewport Mobile only Chrome DevTools mobile simulation for development 
Bottom Navigation 60px clearance paddingBottom: 60 on screen containers src/screens/HomeScreen.tsx 146 
Fixed Header Sticky positioning position: sticky, top: 0, zIndex: 100 src/components/Header.tsx 35-37 

Sources: README.md 127 src/screens/HomeScreen.tsx 143-147 src/components/Header.tsx 28-38 

### Component Props and Interface Patterns 

Reusable components expose TypeScript interfaces for props, ensuring type safety and clear API contracts. The Header component exemplifies the minimal props pattern: 

Sources: src/components/Header.tsx 4-7 

The showBack optional boolean controls conditional rendering of the back navigation button. When false or undefined , a placeholder <div> maintains layout symmetry. This pattern is visible in the render logic: src/components/Header.tsx 14-20 

### State Management Patterns 

Screens manage local state using React hooks ( useState , useNavigate ). No global state management library is currently used. The HomeScreen demonstrates a common pattern with a discriminated union type for view state: 

Sources: src/screens/HomeScreen.tsx 12-15 

This type ensures exhaustive handling in conditional rendering blocks and prevents invalid state combinations. Each view type carries the minimum data needed to render that specific UI state. 

### Visual Feedback and Interaction 

All interactive elements use cursor styles, hover effects, and clear affordances for touch interaction. Buttons are styled as cursor: pointer with sufficient padding for tap targets (minimum spacing.md = 12px). 

Common Interaction Patterns: 

Element Type Visual Treatment Example 
List Items White background, subtle shadow, arrow indicator src/screens/HomeScreen.tsx 195-214 
Toggle Buttons Background color swap on active state src/screens/HomeScreen.tsx 158-174 
Cards Padding, rounded corners, flex layout src/screens/HomeScreen.tsx 215-226 
Badges Small text, colored background with transparency src/screens/HomeScreen.tsx 248-258 

Sources: src/screens/HomeScreen.tsx 142-270 

### Relationship to Navigation System 

All screen components are wrapped by routing logic in AppNavigator (see Routing and Navigation ). The useNavigate() hook from React Router enables programmatic navigation with URL parameters for data passing: 

navigate(`/player?stretches=${stretch.id}`) 

Sources: src/screens/HomeScreen.tsx 34 

This pattern decouples screens from direct knowledge of other screens' internal state, using the URL as the contract for data transfer. 

### Summary 

The User Interface layer employs a component-based architecture with clear separation between screens (routing-aware) and reusable components (presentational). All styling uses inline CSSProperties objects consuming centralized theme tokens, ensuring consistency and React Native compatibility. The mobile-first constraint enforces a focused UX optimized for single-hand portrait use. For implementation details of individual screens, components, or the theme system, refer to the respective child pages in this section. 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- User Interface 
- Purpose and Scope 
- UI Layer Architecture 
- Screen and Component Organization 
- Inline Styling Pattern 
- Mobile-First Design Constraints 
- Component Props and Interface Patterns 
- State Management Patterns 
- Visual Feedback and Interaction 
- Relationship to Navigation System 
- Summary

---

# Screens | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/4.1-screens

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Screens 

Relevant source files 
- README.md 
- src/screens/CourseDetailScreen.tsx 
- src/screens/CourseListScreen.tsx 
- src/screens/HomeScreen.tsx 
- src/screens/PlayerScreen.tsx 

### Purpose and Scope 

This document provides a comprehensive overview of the screen components in the Stretch Timer App, including their responsibilities, navigation patterns, and architectural relationships. Screens are full-page views that represent distinct user interface states in the application. This page covers the architectural overview of all four screen components; for detailed documentation of individual screens, see HomeScreen , CourseListScreen , CourseDetailScreen , and PlayerScreen . For information about the routing system that manages screen transitions, see Routing and Navigation . 

### Screen Architecture Overview 

The application consists of four primary screen components, each located in the src/screens/ directory. Each screen is a self-contained React component that manages its own local state and coordinates interactions with the data layer, navigation system, and reusable UI components. 

Screen Component Architecture 

Sources: src/screens/HomeScreen.tsx src/screens/CourseListScreen.tsx src/screens/CourseDetailScreen.tsx src/screens/PlayerScreen.tsx 

### Screen Responsibilities 

Screen File Route Primary Responsibility 
HomeScreen src/screens/HomeScreen.tsx / Body map interface with front/back toggle, zone selection, muscle browsing, and stretch selection 
CourseListScreen src/screens/CourseListScreen.tsx /courses Display list of all available courses with metadata (stretch count, duration, premium status) 
CourseDetailScreen src/screens/CourseDetailScreen.tsx /courses/:courseId Preview specific course details, show stretch sequence, calculate total duration 
PlayerScreen src/screens/PlayerScreen.tsx /player?stretches=... Execute stretch routines with timer, audio feedback, phase management, and controls 

Sources: src/screens/HomeScreen.tsx 17-140 src/screens/CourseListScreen.tsx 7-52 src/screens/CourseDetailScreen.tsx 9-87 src/screens/PlayerScreen.tsx 25-167 

### Navigation Flow and Route Definitions 

Route Structure and Transitions 

Sources: src/screens/HomeScreen.tsx 33-35 src/screens/CourseListScreen.tsx 10-12 src/screens/CourseDetailScreen.tsx 39-42 src/screens/PlayerScreen.tsx 27-57 

#### URL Parameter Handling 

Screens use React Router hooks to access route parameters and query strings: 

- useParams<{ courseId: string }>() : Used by CourseDetailScreen to extract :courseId from the URL path src/screens/CourseDetailScreen.tsx 10 
- useSearchParams() : Used by PlayerScreen to extract comma-separated stretch IDs from ?stretches= query parameter src/screens/PlayerScreen.tsx 26-30 
- useNavigate() : All screens use this hook to programmatically navigate between routes src/screens/HomeScreen.tsx 18 src/screens/CourseListScreen.tsx 8 src/screens/CourseDetailScreen.tsx 11 src/screens/PlayerScreen.tsx 27 

Sources: src/screens/CourseDetailScreen.tsx 10-11 src/screens/PlayerScreen.tsx 26-32 

### Common Screen Patterns 

#### Header Integration 

Three of the four screens ( HomeScreen , CourseListScreen , CourseDetailScreen ) use the Header component to display a consistent top navigation bar: 

Screen Header Configuration Back Button 
HomeScreen title="ストレッチタイマー" No 
CourseListScreen title="コース一覧" No 
CourseDetailScreen title={course.title} Yes ( showBack prop) 
PlayerScreen Custom top bar (no Header component) Custom close button (✕) 

Sources: src/screens/HomeScreen.tsx 50 src/screens/CourseListScreen.tsx 16 src/screens/CourseDetailScreen.tsx 31-46 src/screens/PlayerScreen.tsx 55-62 

#### TabBar Visibility 

HomeScreen and CourseListScreen display the TabBar component for bottom navigation, while CourseDetailScreen and PlayerScreen do not: 

The TabBar is conditionally rendered only on the two primary navigation screens to maintain a clean, distraction-free interface during course preview and playback. 

Sources: src/screens/HomeScreen.tsx 48-138 src/screens/CourseListScreen.tsx 14-51 

#### Styling Consistency 

All screens follow a consistent styling pattern using the centralized theme system: 

Exception: PlayerScreen uses a dark theme ( backgroundColor: '#1a1a2e' ) to differentiate the immersive playback experience from the browsing interface. 

Sources: src/screens/HomeScreen.tsx 142-147 src/screens/CourseListScreen.tsx 54-59 src/screens/CourseDetailScreen.tsx 89-97 src/screens/PlayerScreen.tsx 169-176 

### State Management Approaches 

Each screen manages its own local state using React hooks, without relying on global state management libraries. The patterns differ based on the screen's complexity: 

Screen State Management Patterns 

#### HomeScreen State: Multi-Level View Navigation 

HomeScreen implements a state machine to manage three distinct view states: 

This discriminated union pattern allows the component to render different UIs based on the user's navigation depth within the body map flow. The handleBack() function src/screens/HomeScreen.tsx 37-46 manages transitions backward through the state hierarchy. 

Sources: src/screens/HomeScreen.tsx 12-20 

#### CourseListScreen: Stateless Presentation 

CourseListScreen has no local state. It directly renders the courses array from the data layer and performs inline calculations for metadata display (stretch count, duration) within the map function. 

Sources: src/screens/CourseListScreen.tsx 7-52 

#### CourseDetailScreen: Memoized Derived Data 

CourseDetailScreen uses useMemo hooks to derive data efficiently: 

- Course lookup src/screens/CourseDetailScreen.tsx 13 : Retrieves course by courseId param 
- Stretch list src/screens/CourseDetailScreen.tsx 15-20 : Maps course.stretch_ids to full Stretch objects 
- Total duration src/screens/CourseDetailScreen.tsx 22-26 : Calculates sum of all stretch durations, accounting for is_sided multiplier 

Sources: src/screens/CourseDetailScreen.tsx 13-26 

#### PlayerScreen: Timer State Machine Integration 

PlayerScreen delegates all timer logic to the useStretchTimer hook, which manages: 

- Current stretch index and phase ( prep , active , interval , finished ) 
- Countdown timer state ( secondsRemaining ) 
- Play/pause state ( isRunning ) 
- Side tracking for sided stretches ( activeSide ) 

The screen component acts as a pure presentation layer, rendering UI based on the timer's state. 

Sources: src/screens/PlayerScreen.tsx 29-34 

### Data Query Patterns 

Screens query the data layer using specialized functions rather than directly accessing data arrays: 

Data Access by Screen 

Screen Data Queries Used 
HomeScreen getMusclesByZone(zone.id) src/screens/HomeScreen.tsx 23 
getStretchesByMuscle(muscle.id) src/screens/HomeScreen.tsx 29 
CourseListScreen Direct import of courses array src/screens/CourseListScreen.tsx 3 
getStretchById(id) for metadata calculation src/screens/CourseListScreen.tsx 21 
CourseDetailScreen getCourseById(courseId) src/screens/CourseDetailScreen.tsx 13 
getStretchById(id) for list population src/screens/CourseDetailScreen.tsx 18 
PlayerScreen getStretchById(id) for each ID in query params src/screens/PlayerScreen.tsx 31 

This abstraction layer allows the data layer to be refactored (e.g., migrated to a database) without requiring changes to screen components. For more information about these query functions, see Data Models and Interfaces . 

Sources: src/screens/HomeScreen.tsx 5-6 src/screens/CourseListScreen.tsx 3-4 src/screens/CourseDetailScreen.tsx 4-5 src/screens/PlayerScreen.tsx 4 

### Screen-Specific UI Patterns 

#### Empty State Handling 

All screens implement graceful empty state handling: 

- HomeScreen : Displays "ストレッチが見つかりません" when stretches.length === 0 src/screens/HomeScreen.tsx 107-109 
- CourseDetailScreen : Shows "コースが見つかりません" when !course src/screens/CourseDetailScreen.tsx 28-37 
- PlayerScreen : Displays "ストレッチが選択されていません" when stretchList.length === 0 src/screens/PlayerScreen.tsx 39-50 

Sources: src/screens/HomeScreen.tsx 107-109 src/screens/CourseDetailScreen.tsx 28-37 src/screens/PlayerScreen.tsx 39-50 

#### Conditional Rendering by Phase 

PlayerScreen implements phase-based conditional rendering to display different UI components based on the timer state: 

Phase UI Elements Rendered 
idle Ready screen with stretch preview list and start button 
prep , active , interval Phase indicator, stretch info, timer display, progress bar, controls 
finished Completion message with celebration icon and home button 

This pattern ensures a clean, focused user experience appropriate to each stage of the stretch routine. 

Sources: src/screens/PlayerScreen.tsx 65-163 

### Performance Considerations 

#### Memoization Strategy 

Screens use useMemo to prevent unnecessary recalculations: 

This pattern is particularly important when: 

- Mapping large arrays ( course.stretch_ids ) 
- Performing filtering operations 
- Calculating aggregate values (total duration) 

Sources: src/screens/CourseDetailScreen.tsx 15-20 src/screens/PlayerScreen.tsx 29-32 

#### Inline Styles 

All screens use inline styles via the styles object pattern rather than CSS modules or styled-components. This approach: 

- Maintains React Native compatibility for future migration 
- Keeps component logic and styling co-located 
- Uses TypeScript typing: Record<string, React.CSSProperties> 

Sources: src/screens/HomeScreen.tsx 142 src/screens/CourseListScreen.tsx 54 src/screens/CourseDetailScreen.tsx 89 src/screens/PlayerScreen.tsx 169 

### Accessibility and Semantic HTML 

All screens use semantic id attributes on every interactive and display element for testing and accessibility purposes: 

This pattern enables: 

- Automated testing with predictable selectors 
- Screen reader navigation improvements 
- Debugging and DOM inspection 

Sources: src/screens/HomeScreen.tsx 49-138 src/screens/CourseListScreen.tsx 15-50 src/screens/CourseDetailScreen.tsx 30-85 src/screens/PlayerScreen.tsx 41-165 

### Future Considerations 

The current screen architecture is designed for easy migration to React Native: 

- Inline styles : All styling uses React Native-compatible style objects 
- Component structure : Screens are self-contained with minimal external dependencies 
- Navigation : Uses React Router patterns that map directly to Expo Router file-based routing 
- Data queries : Abstract query functions can be swapped for async API calls 

For the planned React Native migration strategy, see the Phase 2 roadmap in README.md 132-136 

Sources: README.md 120-136 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Screens 
- Purpose and Scope 
- Screen Architecture Overview 
- Screen Responsibilities 
- Navigation Flow and Route Definitions 
- URL Parameter Handling 
- Common Screen Patterns 
- Header Integration 
- TabBar Visibility 
- Styling Consistency 
- State Management Approaches 
- HomeScreen State: Multi-Level View Navigation 
- CourseListScreen: Stateless Presentation 
- CourseDetailScreen: Memoized Derived Data 
- PlayerScreen: Timer State Machine Integration 
- Data Query Patterns 
- Screen-Specific UI Patterns 
- Empty State Handling 
- Conditional Rendering by Phase 
- Performance Considerations 
- Memoization Strategy 
- Inline Styles 
- Accessibility and Semantic HTML 
- Future Considerations

---

# HomeScreen | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/4.1.1-homescreen

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## HomeScreen 

Relevant source files 
- README.md 
- src/components/BodyMap.tsx 
- src/screens/HomeScreen.tsx 

### Purpose and Scope 

The HomeScreen component is the primary entry point for the body-map-based stretching workflow. It implements a three-tier drill-down interface that guides users from anatomical zones → specific muscles → individual stretches. This screen handles the "granular, muscle-specific approach" described in the overall navigation architecture. 

For information about the course-based workflow, see CourseListScreen . For details on stretch playback execution, see PlayerScreen . For the interactive SVG body map implementation, see BodyMap Component . 

Sources: README.md 23-30 src/screens/HomeScreen.tsx 1-271 

### Component Architecture 

The HomeScreen implements a finite state machine with three distinct view states, each rendering different UI and managing its own subset of data. The component is entirely self-contained for state management, using React's useState hooks without external state management libraries. 

#### View State Machine 

The ViewState type union enforces compile-time safety for state transitions: 

State Type Properties Data Source UI Components 
bodyMap None getZonesBySide(side) BodyMap SVG + side toggle 
muscleList zone: BodyZone , muscles: Muscle[] getMusclesByZone(zone.id) Back button + list items 
stretchList muscle: Muscle , stretches: Stretch[] getStretchesByMuscle(muscle.id) Back button + stretch cards 

Sources: src/screens/HomeScreen.tsx 12-15 src/screens/HomeScreen.tsx 17-20 src/screens/HomeScreen.tsx 22-46 

### Component Data Flow 

#### Data Flow Architecture Diagram 

Sources: src/screens/HomeScreen.tsx 1-10 src/screens/HomeScreen.tsx 17-46 

### Front/Back Body Side Toggle 

The side toggle is a binary switch controlling which anatomical view (front or back) is displayed in the body map. It is only visible when viewState.type === 'bodyMap' . 

#### Implementation Details 

- State Variable: side stored via useState<'front' | 'back'>('front') 
- Default View: Front view ( 'front' ) 
- UI Pattern: Two-button toggle with active state styling 
- Data Impact: Passed directly to <BodyMap side={side} /> component 

#### Toggle Button Styling 

Button State Background Color Text Color Box Shadow 
Inactive transparent colors.textSecondary None 
Active colors.surface colors.primary 0 1px 3px rgba(0,0,0,0.1) 

The toggle container uses colors.border as background with borderRadius.lg to create a pill-shaped selector. 

Sources: src/screens/HomeScreen.tsx 19 src/screens/HomeScreen.tsx 52-78 src/screens/HomeScreen.tsx 151-174 

### Zone Selection Flow (bodyMap → muscleList) 

#### User Interaction Sequence 

#### handleZonePress Function Logic 

The handler at src/screens/HomeScreen.tsx 22-26 implements defensive programming by checking if any muscles exist in the selected zone before transitioning state: 

This prevents the UI from entering a broken state if a body zone has no associated muscles in the data layer. 

Sources: src/screens/HomeScreen.tsx 22-26 src/screens/HomeScreen.tsx 77 

### Muscle Selection Flow (muscleList → stretchList) 

#### Muscle List UI Structure 

When in muscleList state, the screen displays: 

- Back Navigation Button - Returns to body map view 
- Section Title - "{zone.name} の筋肉" (e.g., "首・肩 の筋肉") 
- Muscle List Items - Interactive buttons for each muscle 

#### Muscle List Item Components 

Each muscle is rendered as a clickable button with the structure: 

Element Content Style Key 
Container <button> styles.listItem 
Text Label muscle.name styles.listItemText 
Arrow Indicator "→" styles.arrow 

The arrow indicator provides visual affordance that the item is tappable and will navigate deeper. 

#### handleMusclePress Function 

Unlike zone selection, this handler does not check for empty arrays. If no stretches exist, the UI displays an empty state message: "ストレッチが見つかりません" . 

Sources: src/screens/HomeScreen.tsx 28-31 src/screens/HomeScreen.tsx 81-99 src/screens/HomeScreen.tsx 195-214 

### Stretch Selection and Playback Navigation 

#### Stretch Card UI Components 

Stretch cards display comprehensive metadata to help users choose the appropriate exercise: 

#### Badge System 

Badges provide visual metadata cues with semantic color coding: 

Badge Type Condition Background Text Color Content 
Duration Always shown colors.primary + '20' colors.primary "{duration_seconds}秒" 
Sided stretch.is_sided === true colors.accent + '20' colors.accent "左右" 

The sided badge alerts users that the stretch will execute on both right and left sides sequentially. 

#### Navigation to PlayerScreen 

When a stretch is selected, the handler constructs a navigation URL with query parameters: 

This URL pattern is consumed by the PlayerScreen to initialize the timer system. The query parameter name stretches (plural) allows the same URL pattern to support comma-separated IDs for course playback. 

Sources: src/screens/HomeScreen.tsx 33-35 src/screens/HomeScreen.tsx 101-136 src/screens/HomeScreen.tsx 215-263 

### Back Navigation Logic 

The handleBack() function implements context-aware navigation based on the current view state: 

#### Navigation State Transitions 

#### stretchList → muscleList Transition 

When backing out of the stretch list, the component must reconstruct the muscle list state: 

- Extract muscle from current viewState.muscle 
- Query getMusclesByZone(muscle.zone_id) to rebuild the muscle array 
- Reconstruct a minimal zone object (only id and side are required for state) 
- Set state to { type: 'muscleList', zone, muscles } 

This reconstruction is necessary because the stretchList state only stores the selected muscle, not the full zone context. 

#### muscleList → bodyMap Transition 

This is simpler: setViewState({ type: 'bodyMap' }) with no additional data required. 

Sources: src/screens/HomeScreen.tsx 37-46 

### Component Composition 

#### Top-Level Structure 

#### Conditional Rendering Pattern 

The component uses explicit conditional rendering based on viewState.type : 

View State Rendered Elements 
bodyMap Toggle buttons + BodyMap component 
muscleList Back button + section title + muscle list items 
stretchList Back button + section title + stretch cards (or empty state) 

This pattern ensures only one "content panel" is active at a time, preventing layout thrashing or state conflicts. 

Sources: src/screens/HomeScreen.tsx 48-139 src/screens/HomeScreen.tsx 1-4 

### Styling Architecture 

#### Theme Integration 

All visual properties are sourced from the centralized theme system: 

Style Category Theme Import Usage Examples 
Colors colors from theme.ts colors.background , colors.primary , colors.surface 
Typography fontSize from theme.ts fontSize.md , fontSize.xl , fontSize.xs 
Spacing spacing from theme.ts padding: spacing.md , gap: spacing.sm 
Borders borderRadius from theme.ts borderRadius.lg , borderRadius.md , borderRadius.full 

#### Layout Container Styles 

The screen implements a vertical scroll layout with bottom navigation spacing: 

- Screen Container: minHeight: '100vh' , paddingBottom: 60 (accounts for TabBar) 
- Content Container: padding: spacing.md for consistent edge margins 
- List Containers: flexDirection: 'column' , gap: spacing.sm for vertical item spacing 

#### Interactive Element Styles 

All interactive elements (buttons, cards) use: 

- cursor: 'pointer' for hover affordance 
- boxShadow: '0 1px 2px rgba(0,0,0,0.05)' for subtle depth 
- borderRadius.md or borderRadius.lg for soft corners 
- transition: 'all 0.2s' for smooth state changes (toggle buttons) 

Sources: src/screens/HomeScreen.tsx 10 src/screens/HomeScreen.tsx 142-270 src/styles/theme.ts 

### Data Query Integration 

#### Query Function Dependencies 

The HomeScreen imports and uses three data query functions from the data layer: 

#### Query Execution Timing 

Query Function Called By Timing Result Stored In 
getMusclesByZone() handleZonePress() On zone click viewState.muscles 
getStretchesByMuscle() handleMusclePress() On muscle click viewState.stretches 

The component does not pre-fetch or cache data. Each user interaction triggers a fresh query. Since the data layer is in-memory TypeScript arrays (not async API calls), this has no performance penalty. 

#### Type Safety 

The component imports TypeScript interfaces for type-checked data structures: 

- BodyZone from bodyZones.ts 
- Muscle from muscles.ts 
- Stretch from stretches.ts 

These types ensure compile-time verification of data shape and prevent runtime errors from property access mistakes. 

Sources: src/screens/HomeScreen.tsx 5-9 src/screens/HomeScreen.tsx 22-31 

### Screen Lifecycle 

#### Initialization 

On mount, the component initializes with: 

- side state set to 'front' 
- viewState set to { type: 'bodyMap' } 

No data fetching occurs until user interaction. The Header component is immediately visible with the title "ストレッチタイマー" . 

#### State Persistence 

State is not persisted across navigation. When the user navigates away to PlayerScreen and returns via TabBar navigation, the HomeScreen re-mounts with default state (body map view, front side). 

This design decision prevents stale state but means users must re-navigate through zone → muscle → stretch if they return after playback. 

Sources: src/screens/HomeScreen.tsx 17-20 src/screens/HomeScreen.tsx 48-50 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- HomeScreen 
- Purpose and Scope 
- Component Architecture 
- View State Machine 
- Component Data Flow 
- Data Flow Architecture Diagram 
- Front/Back Body Side Toggle 
- Implementation Details 
- Toggle Button Styling 
- Zone Selection Flow (bodyMap → muscleList) 
- User Interaction Sequence 
- handleZonePress Function Logic 
- Muscle Selection Flow (muscleList → stretchList) 
- Muscle List UI Structure 
- Muscle List Item Components 
- handleMusclePress Function 
- Stretch Selection and Playback Navigation 
- Stretch Card UI Components 
- Badge System 
- Navigation to PlayerScreen 
- Back Navigation Logic 
- Navigation State Transitions 
- stretchList → muscleList Transition 
- muscleList → bodyMap Transition 
- Component Composition 
- Top-Level Structure 
- Conditional Rendering Pattern 
- Styling Architecture 
- Theme Integration 
- Layout Container Styles 
- Interactive Element Styles 
- Data Query Integration 
- Query Function Dependencies 
- Query Execution Timing 
- Type Safety 
- Screen Lifecycle 
- Initialization 
- State Persistence

---

# CourseListScreen | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/4.1.2-courselistscreen

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## CourseListScreen 

Relevant source files 
- README.md 
- src/screens/CourseListScreen.tsx 

### Purpose and Scope 

This document describes the CourseListScreen component, which implements the course browsing interface in the Stretch Timer App. This screen displays a list of preset stretch courses with calculated metadata (stretch count, duration) and handles navigation to individual course detail pages. 

For information about the course detail view that users navigate to from this screen, see CourseDetailScreen . For the alternative entry point using the body map interface, see HomeScreen . For the overall course data structure, see Stretches and Courses . 

Sources: README.md 1-200 src/screens/CourseListScreen.tsx 1-117 

### Component Overview 

The CourseListScreen is a React functional component located at src/screens/CourseListScreen.tsx 7-52 It serves as the primary interface for users to browse and select preset stretch courses. The screen displays all courses from the static data layer, rendering each as an interactive card with metadata about duration and stretch count. 

This screen is accessible via the TabBar navigation component and represents one of two primary entry points into the stretch playback system (the other being the body map on HomeScreen). 

Key Responsibilities: 

Responsibility Implementation 
Display all courses Iterates over courses array from data layer 
Calculate metadata Computes total stretch count and duration per course 
Handle premium badges Conditionally displays "有料" badge for paid courses 
Navigate to details Routes to /courses/{courseId} on card press 
Apply theming Uses centralized theme tokens for consistent styling 

Sources: src/screens/CourseListScreen.tsx 1-52 

### Component Architecture 

#### Dependency Graph 

Sources: src/screens/CourseListScreen.tsx 1-6 

#### File Structure 

The component file follows a standard structure: 

CourseListScreen.tsx
├── Imports (lines 1-5)
│   ├── useNavigate from react-router-dom
│   ├── Header component
│   ├── courses data array
│   ├── getStretchById query function
│   └── Theme tokens (colors, fontSize, spacing, borderRadius)
├── CourseListScreen Component (lines 7-52)
│   ├── Navigation hook initialization
│   ├── handleCoursePress callback
│   └── JSX rendering
└── Styles Object (lines 54-116)
    └── Inline CSS-in-JS style definitions 

Sources: src/screens/CourseListScreen.tsx 1-117 

### Data Flow and Computation 

#### Course Data Processing Pipeline 

Sources: src/screens/CourseListScreen.tsx 18-26 

#### Duration Calculation Logic 

The screen calculates total course duration using the following algorithm at src/screens/CourseListScreen.tsx 20-25 : 

For each stretch_id in course.stretch_ids:
  1. Call getStretchById(id) to retrieve Stretch object
  2. Get base duration: stretch.duration_seconds
  3. Apply sidedness multiplier: x2 if is_sided, x1 otherwise
  4. Add preparation time: +5 seconds per stretch
  5. Accumulate to totalSeconds
  
Convert totalSeconds to totalMinutes using Math.ceil(totalSeconds / 60) 

Example Calculation: 

Stretch ID Duration Is Sided Calculation Result 
stretch_01 30s false (30 × 1) + 5 35s 
stretch_02 30s true (30 × 2) + 5 65s 
Total 35 + 65 100s = 2 min 

The +5 accounts for the preparation phase that precedes each stretch in the timer state machine (see Timer State Machine ). 

Sources: src/screens/CourseListScreen.tsx 20-25 

### User Interface Structure 

#### Screen Layout Hierarchy 

Sources: src/screens/CourseListScreen.tsx 15-49 

#### Card Component Structure 

Each course card is rendered as a <button> element with the following structure at src/screens/CourseListScreen.tsx 28-46 : 

Element ID Pattern Content Condition 
Container course-card-{id} Button wrapper Always 
Header Row course-card-header-{id} Title + Badge container Always 
Title course-card-title-{id} course.title Always 
Premium Badge course-premium-badge-{id} "有料" text Only if !course.is_free 
Description course-card-desc-{id} course.description Always 
Metadata Row course-card-meta-{id} Count + Time container Always 
Stretch Count course-card-count-{id} "{N}種目" Always 
Separator Dot course-card-dot-{id} "·" Always 
Duration course-card-time-{id} "約{N}分" Always 

Sources: src/screens/CourseListScreen.tsx 28-46 

### Styling System Integration 

The component uses the centralized theme system exclusively, avoiding any hardcoded values. All style tokens are imported from src/styles/theme.ts 

#### Theme Token Usage 

Token Category Imported Symbols Usage 
colors background , surface , text , textSecondary , textLight , accent Screen background, card background, text hierarchy, premium badge 
fontSize xs , sm , md , xl Badge (xs), metadata (sm), description (md), title (xl) 
spacing xs , sm , md Gaps, padding, margins 
borderRadius lg , full Card corners (lg), badge (full) 

#### Style Object Structure 

The styles are defined as a Record<string, React.CSSProperties> object at src/screens/CourseListScreen.tsx 54-116 : 

styles {
  screen: Root container styling
  content: Flexbox layout with vertical gap
  card: Interactive button with shadow and transition
  cardHeader: Flexbox row with space-between
  cardTitle: Bold heading with theme font size
  premiumBadge: Pill-shaped accent badge
  cardDesc: Secondary text with line height
  cardMeta: Flexbox row for metadata items
  metaItem: Light text for counts/durations
  metaDot: Separator character styling
} 

The card applies a subtle hover effect via transition: 'transform 0.1s' at src/screens/CourseListScreen.tsx 77 though the transform itself is not explicitly defined (likely handled by browser defaults or parent CSS). 

Sources: src/screens/CourseListScreen.tsx 54-116 

### Navigation Integration 

#### Route Handling 

The component uses react-router-dom 's useNavigate hook at src/screens/CourseListScreen.tsx 8 to handle navigation: 

const navigate = useNavigate() 

#### Navigation Flow Diagram 

Sources: src/screens/CourseListScreen.tsx 8-12 

#### Click Handler Implementation 

The handleCoursePress callback at src/screens/CourseListScreen.tsx 10-12 receives a courseId string and navigates to the course detail route: 

This is attached to each card button's onClick handler at src/screens/CourseListScreen.tsx 32 : 

The route pattern /courses/:courseId is defined in the AppNavigator (see Routing and Navigation ). 

Sources: src/screens/CourseListScreen.tsx 10-12 src/screens/CourseListScreen.tsx 32 

### Premium Feature Indication 

The screen distinguishes free and premium courses using the is_free boolean property from the Course interface (see Stretches and Courses ). 

#### Premium Badge Logic 

At src/screens/CourseListScreen.tsx 36-38 a conditional render displays the premium badge: 

Logic Table: 

course.is_free Badge Rendered Text Displayed 
true No — 
false Yes "有料" (Paid) 

The badge uses colors.accent background with colors.surface text, creating high contrast against the card. The borderRadius.full creates a pill shape, and the badge is positioned at the end of the flexbox header via justifyContent: 'space-between' . 

Sources: src/screens/CourseListScreen.tsx 36-38 src/screens/CourseListScreen.tsx 90-97 

### Rendering Performance 

The component performs O(n*m) operations where n = number of courses and m = average stretch count per course, due to the nested reduce operation at src/screens/CourseListScreen.tsx 20-24 

Computational Complexity: 

For 8 courses with average 5 stretches each:
- Map iterations: 8
- Reduce iterations per course: 5
- getStretchById calls: 8 × 5 = 40
- Total operations: ~40-50 

This is acceptable for static data, but if courses were fetched dynamically or the list grew significantly, memoization via useMemo would be recommended to cache the calculated metadata. 

Sources: src/screens/CourseListScreen.tsx 18-26 

### Integration Points 

The CourseListScreen integrates with the following systems: 

System Integration Point Purpose 
Data Layer courses array import Source of course definitions 
Data Layer getStretchById() function Query stretch details for calculations 
Navigation useNavigate hook Route to course detail screen 
UI Components Header component Display screen title and back button 
Styling Theme token imports Apply consistent visual design 
Routing /courses/:courseId route URL pattern for detail navigation 

The screen is mounted by the AppNavigator when the route /courses is active (see Routing and Navigation ). It is accessible via the TabBar bottom navigation component (see TabBar Component ). 

Sources: src/screens/CourseListScreen.tsx 1-117 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- CourseListScreen 
- Purpose and Scope 
- Component Overview 
- Component Architecture 
- Dependency Graph 
- File Structure 
- Data Flow and Computation 
- Course Data Processing Pipeline 
- Duration Calculation Logic 
- User Interface Structure 
- Screen Layout Hierarchy 
- Card Component Structure 
- Styling System Integration 
- Theme Token Usage 
- Style Object Structure 
- Navigation Integration 
- Route Handling 
- Navigation Flow Diagram 
- Click Handler Implementation 
- Premium Feature Indication 
- Premium Badge Logic 
- Rendering Performance 
- Integration Points

---

# CourseDetailScreen | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/4.1.3-coursedetailscreen

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## CourseDetailScreen 

Relevant source files 
- README.md 
- src/screens/CourseDetailScreen.tsx 

### Purpose and Scope 

CourseDetailScreen is responsible for displaying detailed information about a specific stretching course, including its description, stretch sequence, total duration, and providing a start button to initiate course playback. This screen acts as a preview interface between course selection and course execution. 

For information about course browsing and selection, see CourseListScreen . For information about course playback execution, see PlayerScreen . For information about the course data structure and query functions, see Stretches and Courses . 

Sources: src/screens/CourseDetailScreen.tsx 1-195 

### Component Architecture 

The CourseDetailScreen component follows a standard screen pattern with header navigation, content area, and action button. It retrieves course data via URL parameters and processes it for display. 

Diagram: CourseDetailScreen Component Architecture 

Sources: src/screens/CourseDetailScreen.tsx 1-20 src/screens/CourseDetailScreen.tsx 39-42 

### URL Parameters and Data Loading 

The component retrieves the course identifier from the URL route parameter and loads the corresponding course data. 

Parameter Type Source Purpose 
courseId string useParams<{ courseId: string }>() Identifies which course to display 

The data loading sequence: 

Diagram: Data Loading Sequence 

Sources: src/screens/CourseDetailScreen.tsx 10-13 src/screens/CourseDetailScreen.tsx 15-20 

### Course Statistics Processing 

The component computes two key metrics using memoized calculations: 

#### Stretch List Processing 

Diagram: Stretch List Transformation 

The stretchList memo filters out any undefined stretches that may result from invalid IDs: 

Sources: src/screens/CourseDetailScreen.tsx 15-20 

#### Total Duration Calculation 

The totalSeconds calculation accounts for: 

Component Formula Purpose 
Active stretch duration duration_seconds Time spent actively stretching 
Sidedness multiplier × 2 if is_sided === true Both left and right sides 
Preparation phase + 5 seconds per stretch Pre-stretch countdown 

The displayed time is converted to minutes using Math.ceil(totalSeconds / 60) . 

Sources: src/screens/CourseDetailScreen.tsx 22-26 

### UI Component Structure 

The screen renders a hierarchical layout with distinct sections: 

Diagram: UI Component Hierarchy 

Sources: src/screens/CourseDetailScreen.tsx 44-86 

#### Info Card Layout 

The info card displays course metadata in a visually prominent format: 

Element Content Style Properties 
Description course.description fontSize.md , colors.textSecondary , lineHeight: 1.6 
Stat Value (Count) stretchList.length fontSize.xxl , fontWeight: bold , colors.primary 
Stat Label (Count) "種目" fontSize.sm , colors.textLight 
Stat Value (Time) Math.ceil(totalSeconds / 60) fontSize.xxl , fontWeight: bold , colors.primary 
Stat Label (Time) "分" fontSize.sm , colors.textLight 

Sources: src/screens/CourseDetailScreen.tsx 48-60 src/screens/CourseDetailScreen.tsx 98-128 

#### Stretch List Rendering 

Each stretch item in the list displays: 

Diagram: Stretch Item Structure 

The numbered circle uses a circular badge style with primary color background at 15% opacity ( colors.primary + '15' ). 

Sources: src/screens/CourseDetailScreen.tsx 64-78 src/screens/CourseDetailScreen.tsx 140-174 

### Navigation to Player 

The start button initiates course playback by constructing a URL with all stretch IDs as a comma-separated query parameter: 

Diagram: Course Start Navigation Flow 

The navigation pattern: 

- Combines all course.stretch_ids into a single string: "stretch1,stretch2,stretch3" 
- Navigates to: /player?stretches=stretch1,stretch2,stretch3 
- PlayerScreen receives and parses the stretch sequence 

Sources: src/screens/CourseDetailScreen.tsx 39-42 

### Error Handling 

The component handles the case where no course is found for the given courseId : 

Diagram: Error Handling Logic 

The empty state renders: 

- Generic header title: "コース" 
- Centered message: "コースが見つかりません" 
- showBack navigation enabled to return to previous screen 

Sources: src/screens/CourseDetailScreen.tsx 28-37 

### Styling System Integration 

The component uses the centralized theme system for all visual properties: 

Style Category Theme Imports Usage Examples 
Colors colors colors.background , colors.primary , colors.textSecondary 
Typography fontSize fontSize.xxl , fontSize.lg , fontSize.md , fontSize.sm 
Layout spacing spacing.lg , spacing.md , spacing.sm 
Borders borderRadius borderRadius.lg , borderRadius.md 

Key styling decisions: 

Diagram: Theme System Application 

The paddingBottom: 80 on the screen accounts for the bottom TabBar navigation, preventing content overlap. 

Sources: src/screens/CourseDetailScreen.tsx 7 src/screens/CourseDetailScreen.tsx 89-194 

### Component State Management 

The component uses React hooks for state and memoization: 

Hook Purpose Dependencies Return Value 
useParams Extract courseId from URL React Router context { courseId: string | undefined } 
useNavigate Programmatic navigation React Router context navigate function 
useMemo (stretchList) Compute stretch array [course] Stretch[] 
useMemo (totalSeconds) Calculate total duration [stretchList] number 

The memoization strategy prevents unnecessary recomputation when the component re-renders due to parent updates. 

Sources: src/screens/CourseDetailScreen.tsx 9-26 

### Integration Points 

CourseDetailScreen interfaces with multiple system components: 

Diagram: Component Integration Map 

Sources: src/screens/CourseDetailScreen.tsx 1-7 src/screens/CourseDetailScreen.tsx 39-42 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- CourseDetailScreen 
- Purpose and Scope 
- Component Architecture 
- URL Parameters and Data Loading 
- Course Statistics Processing 
- Stretch List Processing 
- Total Duration Calculation 
- UI Component Structure 
- Info Card Layout 
- Stretch List Rendering 
- Navigation to Player 
- Error Handling 
- Styling System Integration 
- Component State Management 
- Integration Points

---

# PlayerScreen | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/4.1.4-playerscreen

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## PlayerScreen 

Relevant source files 
- README.md 
- src/hooks/useStretchTimer.ts 
- src/screens/PlayerScreen.tsx 

### Purpose and Scope 

The PlayerScreen is the core execution interface where users perform stretching routines. It provides a hands-free, timer-driven experience with automatic phase transitions, visual feedback, and audio cues. This screen handles both single stretch playback and multi-stretch course sequences. 

For information about the timer state machine logic, see Timer State Machine . For navigation patterns that lead to this screen, see Navigation Flow . For course data structures, see Stretches and Courses . 

Sources: src/screens/PlayerScreen.tsx 1-373 README.md 32-76 

### Component Location and Responsibilities 

The PlayerScreen component is defined in src/screens/PlayerScreen.tsx and serves as the primary stretch execution interface. Its responsibilities include: 

- Parsing stretch IDs from URL query parameters 
- Managing timer state via the useStretchTimer hook 
- Rendering appropriate UI for each timer phase 
- Providing manual controls (pause, resume, stop) 
- Displaying progress indicators and phase labels 
- Handling empty state and completion flows 

Sources: src/screens/PlayerScreen.tsx 25-167 

### URL Parameters and Data Loading 

#### Query Parameter Format 

The screen receives stretch data through the stretches URL parameter containing comma-separated stretch IDs: 

/player?stretches=stretch_quad_stand,stretch_hamstring_sit 

The parsing logic extracts and validates stretch objects: 

Diagram: URL Parameter Processing Flow 

The useMemo hook ensures efficient parsing: 

Step Function Purpose 
1 searchParams.get('stretches') Extract comma-separated ID string 
2 .split(',') Convert to ID array 
3 .map(getStretchById) Fetch stretch objects from data layer 
4 .filter(s => s !== undefined) Remove invalid IDs 

Sources: src/screens/PlayerScreen.tsx 26-32 src/data/stretches.ts 

### Screen State Flow 

The PlayerScreen renders different UI layouts based on the timer.phase value returned by useStretchTimer : 

Diagram: PlayerScreen Phase State Machine 

#### State Rendering Logic 

Phase Condition UI Rendered 
Empty stretchList.length === 0 Error message + "ホームに戻る" button 
Idle timer.phase === 'idle' Preview list + "スタート" button 
Prep/Active/Interval timer.phase in active phases Timer display + controls 
Finished timer.phase === 'finished' Completion message + home button 

Sources: src/screens/PlayerScreen.tsx 39-166 src/hooks/useStretchTimer.ts 4-5 

### User Interface Structure 

#### Layout Hierarchy 

Diagram: PlayerScreen DOM Structure 

#### Key UI Elements 

Element ID Purpose Conditional Rendering 
player-screen Root container with dark background (#1a1a2e) Always rendered 
player-top-bar Fixed header with close button and progress Always rendered 
player-close-btn Navigate back button (✕ symbol) Always rendered 
player-progress-text Shows "X / Y" stretch counter Always rendered 
player-content Main content area (flex-centered) Always rendered 
player-phase-indicator Colored badge showing current phase Active phases only 
player-timer-container Circular border container for timer Active phases only 
player-timer-text Large countdown number Active phases only 
player-progress-bar Horizontal progress indicator Active phases only 
player-controls Pause/Resume/Stop buttons Active phases only 

Sources: src/screens/PlayerScreen.tsx 52-166 src/screens/PlayerScreen.tsx 169-372 

### Timer Integration 

#### useStretchTimer Hook Consumption 

The screen instantiates the timer hook and destructures its return values: 

Diagram: useStretchTimer Data Flow 

Sources: src/screens/PlayerScreen.tsx 34 src/hooks/useStretchTimer.ts 15-22 

#### Phase Label Mapping 

The getPhaseLabel function translates timer phases into Japanese UI text: 

Phase Value Active Side Display Label 
'prep' Any "準備" (Preparation) 
'active' 'right' "右側" (Right side) 
'active' 'left' "左側" (Left side) 
'active' 'none' "実行中" (In progress) 
'interval' Any "休憩" (Rest) 
'finished' Any "完了!" (Complete) 

Sources: src/screens/PlayerScreen.tsx 8-23 

### Visual Feedback System 

#### Phase Indicator Colors 

The phase indicator badge changes background color based on the current phase: 

Diagram: Phase Indicator Color Logic 

Phase Color Variable Purpose 
Prep colors.accent Preparation phase 
Interval colors.secondary Rest between sides/stretches 
Active colors.primary Active stretching phase 

Sources: src/screens/PlayerScreen.tsx 91-104 src/styles/theme.ts 

#### Timer Urgency Display 

The timer text color changes to red in the final 5 seconds of the active phase: 

Diagram: Timer Color Urgency Logic 

Sources: src/screens/PlayerScreen.tsx 36-37 src/screens/PlayerScreen.tsx 118 src/hooks/useStretchTimer.ts 26 

#### Progress Bar Width Calculation 

The horizontal progress bar fills based on completed stretches: 

width = (currentStretchIndex / totalStretches) * 100% Example Current Index Total Width 
First stretch 0 3 0% 
Second stretch 1 3 33.3% 
Third stretch 2 3 66.6% 
All complete 3 3 100% 

Sources: src/screens/PlayerScreen.tsx 124-132 

### Control Flow and User Actions 

#### Control Button Behavior 

Diagram: User Control State Transitions 

#### Button Rendering Logic 

The pause/resume button toggles based on timer.isRunning : 

Condition Button Rendered Action ID 
timer.isRunning === true "⏸ 一時停止" timer.pause() player-pause-btn 
timer.isRunning === false "▶ 再開" timer.resume() player-resume-btn 

The stop button is always visible during active phases and calls timer.stop() to return to idle state. 

Sources: src/screens/PlayerScreen.tsx 135-148 

### Idle State: Stretch Preview 

#### Preview List Structure 

Before starting playback, the idle state displays a scrollable list of upcoming stretches: 

Component Data Displayed Format 
Preview Number Array index + 1 Circular badge with number 
Preview Title stretch.title Main text 
Preview Duration stretch.duration_seconds "30秒" or "30秒×2" for sided 

The duration display logic accounts for sided stretches: 

display = stretch.is_sided 
  ? `${duration_seconds}秒×2`
  : `${duration_seconds}秒` 

Example: A sided stretch with 30-second duration displays as "30秒×2" (30 seconds × 2 sides). 

Sources: src/screens/PlayerScreen.tsx 65-85 src/screens/PlayerScreen.tsx 285-318 

### Empty State Handling 

When no stretches are provided (empty or invalid query parameter), the screen renders an error state: 

Diagram: Empty State Detection Flow 

This prevents runtime errors from attempting to play an empty stretch list. 

Sources: src/screens/PlayerScreen.tsx 39-50 

### Finished State 

Upon completing all stretches, the screen transitions to a completion view: 

Element Content Purpose 
Finished Icon 🎉 emoji (64px) Visual celebration 
Finished Title "お疲れ様でした!" Congratulations message 
Finished Description "全X つのストレッチを完了しました" Summary with count 
Home Button "ホームに戻る" Navigate to root 

Sources: src/screens/PlayerScreen.tsx 152-163 src/screens/PlayerScreen.tsx 330-359 

### Styling and Theme Integration 

#### Style Object Structure 

The component uses inline React styles via a styles object defined at src/screens/PlayerScreen.tsx 169-372 Key style categories: 

Style Key CSS Properties Purpose 
screen minHeight: 100vh , dark background Full-screen container 
topBar display: flex , space-between Header layout 
timerContainer Circular border, 180×180px Timer visual frame 
timerText fontSize.timer , fontVariantNumeric: tabular-nums Large countdown display 
progressBarFill Dynamic width, transition Smooth progress animation 
phaseIndicator Dynamic background, rounded pill Phase label badge 

#### Theme Token Usage 

The component imports and applies theme tokens from src/styles/theme.ts : 

Diagram: Theme Token Dependencies 

Sources: src/screens/PlayerScreen.tsx 6 src/styles/theme.ts 

### Navigation Patterns 

#### Entry Routes 

Users navigate to PlayerScreen from two primary flows: 

Source Screen Route Pattern Example 
HomeScreen Single stretch /player?stretches=stretch_quad_stand 
CourseDetailScreen Course sequence /player?stretches=stretch_a,stretch_b,stretch_c 

#### Exit Routes 

Trigger Navigation Target Method 
Close button (✕) Previous screen navigate(-1) 
Empty state home button HomeScreen navigate('/') 
Finished state home button HomeScreen navigate('/') 

Sources: src/screens/PlayerScreen.tsx 27 src/screens/PlayerScreen.tsx 44 src/screens/PlayerScreen.tsx 56 src/screens/PlayerScreen.tsx 159 

### Implementation Summary 

#### Key Functions and Hooks 

Function/Hook File Purpose 
PlayerScreen src/screens/PlayerScreen.tsx 25-167 Main component export 
useSearchParams React Router Parse query parameters 
useNavigate React Router Programmatic navigation 
useMemo React Memoize stretch list parsing 
useStretchTimer src/hooks/useStretchTimer.ts 28-226 Timer state machine 
getPhaseLabel src/screens/PlayerScreen.tsx 8-23 Phase name localization 
getStretchById src/data/stretches.ts Fetch stretch by ID 

#### Critical Dependencies 

Diagram: PlayerScreen Dependency Graph 

Sources: src/screens/PlayerScreen.tsx 1-6 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- PlayerScreen 
- Purpose and Scope 
- Component Location and Responsibilities 
- URL Parameters and Data Loading 
- Query Parameter Format 
- Screen State Flow 
- State Rendering Logic 
- User Interface Structure 
- Layout Hierarchy 
- Key UI Elements 
- Timer Integration 
- useStretchTimer Hook Consumption 
- Phase Label Mapping 
- Visual Feedback System 
- Phase Indicator Colors 
- Timer Urgency Display 
- Progress Bar Width Calculation 
- Control Flow and User Actions 
- Control Button Behavior 
- Button Rendering Logic 
- Idle State: Stretch Preview 
- Preview List Structure 
- Empty State Handling 
- Finished State 
- Styling and Theme Integration 
- Style Object Structure 
- Theme Token Usage 
- Navigation Patterns 
- Entry Routes 
- Exit Routes 
- Implementation Summary 
- Key Functions and Hooks 
- Critical Dependencies

---

# Reusable Components | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/4.2-reusable-components

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Reusable Components 

Relevant source files 
- README.md 
- src/components/BodyMap.tsx 
- src/components/Header.tsx 
- src/components/TabBar.tsx 

### Purpose and Scope 

This document provides an overview of the shared UI components used across multiple screens in the Stretch Timer App. These components implement consistent visual patterns, navigation behaviors, and theme integration throughout the application. Each component is designed as a presentational element with minimal business logic, accepting props for customization and callbacks for interaction handling. 

For detailed documentation of individual reusable components, see: 

- BodyMap Component: 4.2.1 
- Header Component: 4.2.2 
- TabBar Component: 4.2.3 

For screen-level components that consume these reusable components, see 4.1 . For the centralized styling system that all components use, see 4.3 . 

### Component Inventory 

The application contains three primary reusable components located in the src/components/ directory. Each component serves a distinct architectural role in the UI layer: 

Component File Path Purpose Usage Context 
BodyMap src/components/BodyMap.tsx 1-123 Interactive SVG body visualization with clickable anatomical zones HomeScreen only 
Header src/components/Header.tsx 1-59 Navigation header with title display and optional back button All screens except PlayerScreen 
TabBar src/components/TabBar.tsx 1-91 Bottom navigation bar for primary app sections HomeScreen and CourseListScreen 

All three components follow consistent architectural patterns: 

- TypeScript interfaces for type-safe props ( BodyMap.tsx 4-7 Header.tsx 4-7 TabBar.tsx 4-8 ) 
- Inline styles using React.CSSProperties for React Native migration compatibility 
- Theme token imports from src/styles/theme for visual consistency 
- Conditional rendering based on navigation state or component props 

Sources: src/components/BodyMap.tsx 1-123 src/components/Header.tsx 1-59 src/components/TabBar.tsx 1-91 

### Component Architecture Overview 

The following diagram illustrates the component hierarchy and how reusable components integrate into the screen layer: 

Diagram: Component Integration Architecture 

This architecture demonstrates several key design principles: 

- Unidirectional theme dependency: All components import theme tokens but never define their own colors or spacing values 
- Router integration: Header and TabBar components use React Router hooks for navigation logic 
- Data coupling: Only BodyMap directly imports data layer functions; other components receive data through props 
- Selective composition: Not all screens use all components (e.g., PlayerScreen uses neither Header nor TabBar ) 

Sources: src/components/BodyMap.tsx 1-3 src/components/Header.tsx 1-2 src/components/TabBar.tsx 1-2 

### Theme System Integration 

All reusable components implement a consistent pattern for accessing design tokens from the centralized theme system. The import pattern follows this structure: 

#### Theme Token Usage by Component 

Component colors fontSize spacing borderRadius 
BodyMap ✓ ✓ - ✓ 
Header ✓ ✓ ✓ - 
TabBar ✓ ✓ ✓ - 

Each component defines a styles object of type Record<string, React.CSSProperties> containing all style definitions: 

- BodyMap.tsx 101-122 - Defines container , svg , and zoneLabel styles 
- Header.tsx 27-58 - Defines container , title , backButton , and placeholder styles 
- TabBar.tsx 57-90 - Defines container , tab , tabActive , icon , and label styles 

This pattern ensures: 

- Type safety: TypeScript enforces valid CSS properties 
- Colocation: Styles are defined near the component logic 
- React Native compatibility: Inline style objects work identically in React Native 
- Theme consistency: All visual properties reference theme tokens rather than hardcoded values 

Sources: src/components/BodyMap.tsx 1-3 src/components/Header.tsx 1-2 src/components/TabBar.tsx 1-2 

### Navigation Integration 

Two of the three reusable components ( Header and TabBar ) integrate with React Router for navigation functionality. The following diagram maps navigation patterns to code entities: 

Diagram: Navigation Pattern Implementation 

#### Header Navigation Logic 

The Header component implements backward navigation using navigate(-1) : 

- Conditional rendering: When showBack={true} , renders a back button ( Header.tsx 14-17 ) 
- Navigation action: onClick={() => navigate(-1)} returns to previous route ( Header.tsx 15 ) 
- Layout placeholder: When showBack={false} , renders empty div to maintain symmetrical layout ( Header.tsx 19 ) 

#### TabBar Navigation Logic 

The TabBar component implements bottom navigation with active state detection: 

- Tab definitions: Static array of Tab objects with path , label , and icon ( TabBar.tsx 10-13 ) 
- Active detection: Compares location.pathname with tab paths to highlight current route ( TabBar.tsx 27-29 ) 
- Conditional visibility: Returns null when location.pathname.startsWith('/player') ( TabBar.tsx 20-22 ) 
- Navigation action: onClick={() => navigate(tab.path)} navigates to tab route ( TabBar.tsx 38 ) 

Sources: src/components/Header.tsx 1-24 src/components/TabBar.tsx 1-55 

### Component Composition Patterns 

Screens compose reusable components following predictable patterns based on screen type and navigation requirements. The following table documents component usage across all screens: 

Screen Header TabBar BodyMap Header.showBack 
HomeScreen ✓ ✓ ✓ false 
CourseListScreen ✓ ✓ - false 
CourseDetailScreen ✓ - - true 
PlayerScreen - - - N/A 

#### Composition Rules 

- Primary screens (Home, CourseList) always include both Header and TabBar 
- Detail screens (CourseDetail) include Header with back navigation but no TabBar 
- Player screen uses neither component for immersive, distraction-free experience 
- BodyMap is exclusive to HomeScreen due to its specialized body zone selection purpose 

#### Layout Structure Pattern 

All screens that use reusable components follow this layout hierarchy: 

Diagram: Screen Layout Composition Pattern 

Key positioning characteristics: 

- Header : Sticky positioning at top with zIndex: 100 ( Header.tsx 35-37 ) 
- TabBar : Fixed positioning at bottom with zIndex: 100 ( TabBar.tsx 62-66 ) 
- Both components use zIndex: 100 to ensure they remain above scrolling content 
- TabBar includes paddingBottom: 'env(safe-area-inset-bottom, 0px)' for iOS safe area compatibility ( TabBar.tsx 67 ) 

Sources: src/components/Header.tsx 27-58 src/components/TabBar.tsx 57-90 

### Data Flow Patterns 

Reusable components follow different data flow patterns based on their responsibilities: 

Diagram: Component Data Flow Categories 

#### Category Definitions 

- 

Props-Driven Components ( Header ): 

- Fully controlled by parent screen 
- No internal data sources or side effects 
- Stateless and purely presentational 

- 

Data-Connected Components ( BodyMap ): 

- Imports data layer query functions directly 
- Accepts configuration props ( side ) and interaction callbacks ( onZonePress ) 
- Manages data fetching internally but delegates interaction handling to parent 

- 

Self-Contained Components ( TabBar ): 

- Contains internal configuration (tabs array) 
- Uses React Router hooks directly for state and navigation 
- No props required from parent screens 

This categorization enables screens to compose components with varying levels of control and coupling to the data layer. 

Sources: src/components/BodyMap.tsx 1-7 src/components/Header.tsx 4-7 src/components/TabBar.tsx 10-55 

### Styling Implementation Details 

All components use inline styles defined as Record<string, React.CSSProperties> objects. This approach provides several advantages: 

#### Type Safety Example 

#### Style Application Pattern 

Components apply styles using the spread operator: 

- Single style: style={styles.container} 
- Conditional merge: style={{ ...styles.tab, ...(isActive ? styles.tabActive : {}) }} 
- Dynamic values: color: isActive ? colors.primary : colors.textLight 

#### Theme Token Reference Patterns 

Token Category Usage Example Component 
colors.primary Header background Header.tsx 33 
colors.surface TabBar background TabBar.tsx 61 
colors.zoneHighlight BodyMap zone fill BodyMap.tsx 75 
fontSize.lg Header title Header.tsx 40 
fontSize.xs TabBar label TabBar.tsx 87 
spacing.sm Header padding vertical Header.tsx 32 
spacing.md Header padding horizontal Header.tsx 32 

This consistent pattern ensures all visual properties can be updated globally by modifying the theme definition. 

Sources: src/components/BodyMap.tsx 101-122 src/components/Header.tsx 27-58 src/components/TabBar.tsx 57-90 

### React Native Migration Compatibility 

All reusable components are designed with React Native migration in mind, following these principles: 

#### Compatible Patterns Used 

- Inline styles only: No CSS classes or external stylesheets ( all components ) 
- CSSProperties type: All styles use React.CSSProperties for type safety 
- Flexbox layout: All layouts use flexbox rather than CSS Grid 
- No pseudo-selectors: Hover states managed through state variables, not :hover 
- Safe event handlers: onClick can be directly mapped to onPress in React Native 

#### Future Migration Path 

When converting to React Native, the transformation would involve: 

- Replace <div> with <View> 
- Replace <button> with <TouchableOpacity> or <Pressable> 
- Replace <h1> with <Text> with appropriate styling 
- Replace SVG rendering (BodyMap) with react-native-svg library 
- Replace useNavigate() with React Navigation's navigation.navigate() 
- Replace useLocation() with React Navigation's route state 

The inline style objects require no modification, as React Native's StyleSheet.create() accepts the same structure. 

Sources: README.md 120-131 

### Component Interface Summary 

#### BodyMap 

Responsibilities: 

- Render SVG human body illustration 
- Display clickable zone overlays with labels 
- Transform zone coordinates from percentage to SVG coordinates 
- Emit zone selection events to parent screen 

Sources: src/components/BodyMap.tsx 4-7 

#### Header 

Responsibilities: 

- Display screen title centered in header bar 
- Conditionally render back navigation button 
- Maintain symmetrical layout with placeholder elements 
- Execute backward navigation on back button click 

Sources: src/components/Header.tsx 4-7 

#### TabBar 

Responsibilities: 

- Render bottom navigation with Home and Courses tabs 
- Detect and highlight active tab based on current route 
- Navigate to tab routes on user interaction 
- Conditionally hide when on Player screen routes 

Sources: src/components/TabBar.tsx 4-13 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Reusable Components 
- Purpose and Scope 
- Component Inventory 
- Component Architecture Overview 
- Theme System Integration 
- Theme Token Usage by Component 
- Navigation Integration 
- Header Navigation Logic 
- TabBar Navigation Logic 
- Component Composition Patterns 
- Composition Rules 
- Layout Structure Pattern 
- Data Flow Patterns 
- Category Definitions 
- Styling Implementation Details 
- Type Safety Example 
- Style Application Pattern 
- Theme Token Reference Patterns 
- React Native Migration Compatibility 
- Compatible Patterns Used 
- Future Migration Path 
- Component Interface Summary 
- BodyMap 
- Header 
- TabBar

---

# BodyMap Component | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/4.2.1-bodymap-component

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## BodyMap Component 

Relevant source files 
- src/components/BodyMap.tsx 
- src/data/bodyZones.ts 

### Purpose and Scope 

The BodyMap component renders an interactive SVG-based anatomical body diagram that allows users to select body zones to browse associated muscles and stretches. This component serves as the primary entry point for the body-map-based navigation flow in the application. 

Scope of this document: 

- Component props and interface 
- SVG body structure and rendering 
- Zone overlay coordinate transformation system 
- Click event handling and zone selection 
- Styling and theme integration 

Related pages: 

- For the parent screen that uses this component, see HomeScreen 
- For the data structure of body zones, see Body Zones and Muscles 
- For the theme system and design tokens, see Styling and Theme System 

### Component Interface 

The BodyMap component accepts two props that control its rendering and behavior: 

Prop Type Required Description 
side 'front' | 'back' Yes Determines which side of the body to display 
onZonePress (zone: BodyZone) => void Yes Callback invoked when a user clicks a body zone 

Interface Definition: 

The component filters zones based on the side prop using getZonesBySide(side) and renders only zones matching the selected side. 

Sources: src/components/BodyMap.tsx 4-7 src/components/BodyMap.tsx 9-10 

### Architecture Overview 

The following diagram illustrates how the BodyMap component integrates with the data layer and parent components: 

#### Component Data Flow 

Sources: src/components/BodyMap.tsx 1 src/components/BodyMap.tsx 9-10 src/data/bodyZones.ts 33-35 

### SVG Body Structure 

The component renders a fixed SVG body diagram using a viewBox="0 0 200 460" coordinate system. The body consists of seven hardcoded anatomical shapes that form the base silhouette: 

#### Anatomical Elements 

Element SVG Type ID Coordinates 
Head <ellipse> bodymap-head cx=100, cy=30, rx=22, ry=26 
Neck <rect> bodymap-neck x=90, y=54, width=20, height=16 
Torso <path> bodymap-torso Complex path defining chest/abdomen 
Left Arm <path> bodymap-arm-left Path from shoulder to hand 
Right Arm <path> bodymap-arm-right Path from shoulder to hand 
Left Leg <path> bodymap-leg-left Path from hip to foot 
Right Leg <path> bodymap-leg-right Path from hip to foot 

All body elements use fill={colors.bodyFront} and stroke="#ccc" for consistent visual appearance. The body silhouette is identical for both front and back views—only the zone overlays change based on the side prop. 

#### SVG Body Structure Diagram 

Sources: src/components/BodyMap.tsx 14-58 

### Zone Overlay System 

The interactive zones are rendered as overlays on top of the static body silhouette. Each zone consists of a clickable <rect> with a text label, grouped within an SVG <g> element. 

#### Zone Rendering Structure 

Each zone overlay is identified with structured IDs: 

- Group: bodymap-zone-${zone.id} 
- Rectangle: bodymap-zone-rect-${zone.id} 
- Label: bodymap-zone-label-${zone.id} 

Sources: src/components/BodyMap.tsx 61-95 

### Coordinate Transformation System 

Body zones are defined in bodyZones.ts using percentage-based coordinates (0-100% for x/y/width/height). The BodyMap component transforms these percentages into SVG coordinate space (0-200 for x-axis, 0-460 for y-axis). 

#### Transformation Algorithm 

The transformation occurs in four steps: 

Step Formula Purpose 
1. X Center → SVG svgX = (zone.x / 100) * 200 Convert percentage to SVG x-coordinate 
2. Y Center → SVG svgY = (zone.y / 100) * 460 Convert percentage to SVG y-coordinate 
3. Width Scale svgW = (zone.width / 100) * 200 Scale zone width to SVG space 
4. Height Scale svgH = (zone.height / 100) * 460 Scale zone height to SVG space 
5. Center to Top-Left finalX = svgX - svgW / 2 Adjust for rect positioning 
6. Center to Top-Left finalY = svgY - svgH / 2 Adjust for rect positioning 

Example Transformation: 

Given a zone with percentage coordinates: 

The transformation produces: 

#### Coordinate Transformation Flow 

Sources: src/components/BodyMap.tsx 62-65 src/data/bodyZones.ts 5-10 

### Event Handling 

Zone selection is implemented using standard DOM click events on the SVG <g> elements. Each zone group has a click handler that invokes the onZonePress callback with the corresponding BodyZone object. 

#### Click Event Flow 

The click handler implementation: 

The cursor: 'pointer' style provides visual feedback that zones are interactive. 

Sources: src/components/BodyMap.tsx 68 

### Styling and Theming 

The BodyMap component uses the centralized theme system for all visual properties. No colors or sizes are hardcoded except for structural SVG properties. 

#### Theme Token Usage 

Visual Property Theme Token Usage 
Body fill color colors.bodyFront All body silhouette elements 
Zone highlight colors.zoneHighlight Zone overlay rectangle fill 
Zone border colors.zoneBorder Zone overlay rectangle stroke 
Text color colors.text Zone label text 
Font size (label) Inline: "10" Zone label text size (SVG units) 
Border radius borderRadius.sm Zone rectangle corners (rx/ry) 

#### Container Styling 

The component uses inline React styles for layout: 

Style Property Value Purpose 
display 'flex' Flexbox layout 
justifyContent 'center' Center horizontally 
alignItems 'center' Center vertically 
padding 8 Inner spacing 
width (SVG) '70%' Responsive width 
maxWidth (SVG) 280 Maximum SVG size 
height (SVG) 'auto' Maintain aspect ratio 

#### Style Application Diagram 

Sources: src/components/BodyMap.tsx 2 src/components/BodyMap.tsx 16 src/components/BodyMap.tsx 75-76 src/components/BodyMap.tsx 88 src/components/BodyMap.tsx 101-122 

### Integration Points 

The BodyMap component integrates with multiple layers of the application architecture: 

#### Data Layer Integration 

Data flow: 

- Component receives side prop from HomeScreen 
- Calls getZonesBySide(side) on mount and when side changes 
- Receives filtered array of BodyZone objects 
- Iterates over zones with zones.map() to render overlays 

Sources: src/components/BodyMap.tsx 1 src/components/BodyMap.tsx 10 

#### Parent Component Integration 

The BodyMap is used exclusively by the HomeScreen component (see HomeScreen ). The parent controls both the displayed side and handles zone selection: 

#### Zone Selection Data Structure 

The BodyZone interface passed to the onZonePress callback contains: 

Field Type Description 
id string Unique zone identifier (e.g., 'neck_front' ) 
name string Display name in Japanese (e.g., '首' ) 
side 'front' | 'back' Which side of body this zone appears on 
x number Center X position (percentage 0-100) 
y number Center Y position (percentage 0-100) 
width number Zone width (percentage 0-100) 
height number Zone height (percentage 0-100) 

Sources: src/data/bodyZones.ts 1-10 

### Visual Rendering Pipeline 

The complete rendering pipeline from data to user interaction: 

Sources: src/components/BodyMap.tsx 9-98 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- BodyMap Component 
- Purpose and Scope 
- Component Interface 
- Architecture Overview 
- Component Data Flow 
- SVG Body Structure 
- Anatomical Elements 
- SVG Body Structure Diagram 
- Zone Overlay System 
- Zone Rendering Structure 
- Coordinate Transformation System 
- Transformation Algorithm 
- Coordinate Transformation Flow 
- Event Handling 
- Click Event Flow 
- Styling and Theming 
- Theme Token Usage 
- Container Styling 
- Style Application Diagram 
- Integration Points 
- Data Layer Integration 
- Parent Component Integration 
- Zone Selection Data Structure 
- Visual Rendering Pipeline

---

# Header Component | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/4.2.2-header-component

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Header Component 

Relevant source files 
- src/components/Header.tsx 

### Purpose and Scope 

The Header component provides a consistent navigation header across all screens in the Stretch Timer App. It displays a centered title and an optional back button for navigation hierarchy. The component is mounted at the top of the screen with sticky positioning, ensuring persistent visibility during scrolling. For information about the TabBar component which provides bottom navigation, see TabBar Component . For information about screen-level navigation flow, see Navigation Flow . 

Sources: src/components/Header.tsx 1-59 

### Component Interface 

The Header component accepts two props defined in the HeaderProps interface: 

Prop Type Required Default Purpose 
title string Yes - The text displayed in the center of the header 
showBack boolean No false Controls whether the back button is rendered 

The component uses React Router's useNavigate hook to handle navigation when the back button is clicked. When showBack is true, clicking the back button calls navigate(-1) , which returns the user to the previous screen in the browser history. 

Sources: src/components/Header.tsx 4-25 

### Layout Architecture 

The Header employs a three-column flexbox layout to achieve consistent visual balance regardless of the back button's presence. This design ensures the title remains centered even when the left column contains a back button. 

#### DOM Structure 

Sources: src/components/Header.tsx 13-24 

#### Layout Properties 

The container uses display: flex with justifyContent: 'space-between' to distribute the three columns. The title element has flex: 1 which allows it to expand and fill available space, while textAlign: 'center' ensures the text is centered within that space. The placeholder divs have a fixed width: 60 pixels, which matches the approximate width of the back button, maintaining visual symmetry. 

Element Layout Role Key Properties 
Container Flex container display: flex , justifyContent: space-between , alignItems: center 
Left column Back button or spacer Fixed width when placeholder (60px) 
Title (h1) Centered content flex: 1 , textAlign: center 
Right column Visual balance Fixed width (60px) 

Sources: src/components/Header.tsx 27-58 

### Styling System Integration 

The Header component adheres to the centralized theme system defined in Styling and Theme System . All visual properties are derived from theme tokens rather than hardcoded values. 

#### Theme Token Usage 

Sources: src/components/Header.tsx 2 src/components/Header.tsx 27-58 

#### Applied Theme Values 

The following theme tokens are applied in the component's inline styles: 

Style Property Theme Token Purpose 
backgroundColor colors.primary Header background color 
color colors.surface Text color for title and button 
padding spacing.sm , spacing.md Container padding 
fontSize (title) fontSize.lg Title text size 
fontSize (button) fontSize.md Back button text size 
padding (button) spacing.xs , spacing.sm Button padding 

Sources: src/components/Header.tsx 28-54 

#### Positioning Strategy 

The Header uses position: sticky with top: 0 and zIndex: 100 to remain visible at the top of the viewport during scrolling. This ensures the navigation controls are always accessible without requiring the user to scroll back up. 

position: 'sticky'     // Stays at top during scroll
top: 0                 // Positioned at viewport top
zIndex: 100            // Renders above screen content 

Sources: src/components/Header.tsx 35-37 

### Navigation Integration 

The Header integrates with React Router DOM to provide browser history-based navigation. The component imports and uses the useNavigate hook to programmatically control navigation. 

#### Back Button Behavior 

When the user clicks the back button, the component calls navigate(-1) , which: 

- Moves backward one entry in the browser history stack 
- Triggers a route change handled by the AppNavigator 
- Unmounts the current screen and mounts the previous screen 
- Preserves the scroll position of the destination screen (browser default behavior) 

The back button displays Japanese text "← 戻る" (Return/Go Back) and is styled with no background or border, appearing as a text link with a left arrow. 

Sources: src/components/Header.tsx 1 src/components/Header.tsx 10 src/components/Header.tsx 15-17 

### Usage Patterns Across Screens 

The Header component is used by multiple screens in the application with different configurations based on navigation context. 

Sources: src/components/Header.tsx 1-59 

#### Configuration Patterns 

Screen showBack Value Rationale 
HomeScreen false Root screen in body map flow, accessed via TabBar 
CourseListScreen false Root screen in course flow, accessed via TabBar 
CourseDetailScreen true Detail view requiring back navigation to CourseListScreen 
PlayerScreen Conditional Depends on entry point; typically true for navigable contexts 

Screens accessible via the TabBar component (HomeScreen, CourseListScreen) do not display a back button because they are root-level destinations. Screens deeper in the navigation hierarchy (CourseDetailScreen, PlayerScreen) display the back button to allow upward navigation. 

Sources: src/components/Header.tsx 6 src/components/Header.tsx 14 

### Component File Structure 

The Header component is defined in a single file with all styles co-located as an inline styles object. This pattern is consistent with other components in the application. 

src/components/Header.tsx
├── imports (React Router, theme)
├── HeaderProps interface
├── Header function component
│   ├── useNavigate hook initialization
│   └── JSX return statement
└── styles object (React.CSSProperties)
    ├── container
    ├── title
    ├── backButton
    └── placeholder 

The styles object is typed as Record<string, React.CSSProperties> , providing type safety for all CSS property definitions. This prevents invalid CSS properties from being applied and enables IDE autocomplete for style values. 

Sources: src/components/Header.tsx 1-59 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Header Component 
- Purpose and Scope 
- Component Interface 
- Layout Architecture 
- DOM Structure 
- Layout Properties 
- Styling System Integration 
- Theme Token Usage 
- Applied Theme Values 
- Positioning Strategy 
- Navigation Integration 
- Back Button Behavior 
- Usage Patterns Across Screens 
- Configuration Patterns 
- Component File Structure

---

# TabBar Component | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/4.2.3-tabbar-component

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## TabBar Component 

Relevant source files 
- src/components/TabBar.tsx 

### Purpose and Scope 

The TabBar component provides persistent bottom navigation between the two primary screens of the application: HomeScreen and CourseListScreen. It implements conditional rendering logic to hide itself during stretch playback and manages active state visualization based on the current route. This document covers the component's structure, tab configuration, route-based visibility logic, and active state detection algorithm. 

For information about the screens that contain this component, see Screens . For details on the overall navigation system, see Routing and Navigation . For the styling system used by this component, see Styling and Theme System . 

Sources: src/components/TabBar.tsx 1-91 

### Component Architecture 

The TabBar component follows a simple declarative pattern with three primary concerns: tab definition, conditional rendering, and active state management. 

#### High-Level Component Structure 

Sources: src/components/TabBar.tsx 1-55 

### Tab Configuration 

The component uses a static array of tab definitions that map paths to labels and emoji icons. 

#### Tab Definition Interface 

Field Type Description 
path string React Router path for the tab destination 
label string Display text shown below icon (Japanese) 
icon string Emoji character representing the tab 

Sources: src/components/TabBar.tsx 4-8 

#### Configured Tabs 

The tabs array is defined at src/components/TabBar.tsx 10-13 and contains exactly two tab definitions. This configuration creates a simple binary navigation structure between the two main entry points of the application. 

Sources: src/components/TabBar.tsx 10-13 

### Conditional Rendering Logic 

The TabBar implements a visibility rule that hides the component during stretch playback to provide an immersive, distraction-free experience. 

#### Visibility Decision Flow 

The conditional logic at src/components/TabBar.tsx 19-22 uses location.pathname.startsWith('/player') to detect any route within the player screen hierarchy. This approach handles both /player and any potential sub-routes like /player/:id uniformly. 

Route TabBar Visible Rationale 
/ ✓ Yes User can switch to courses 
/courses ✓ Yes User can switch to home 
/course/:id ✓ Yes User can navigate away from detail view 
/player ✗ No Full-screen playback mode 
/player?... ✗ No Query params don't affect visibility 

Sources: src/components/TabBar.tsx 15-22 

### Active State Management 

The component implements path-based active state detection to highlight the currently active tab. The algorithm handles both exact matches and prefix-based matching depending on the tab. 

#### Active State Detection Algorithm 

The active state logic is implemented at src/components/TabBar.tsx 27-29 : 

This dual-strategy approach solves a critical edge case: the home tab ( path: '/' ) would match all routes if using prefix matching (since all paths start with / ), so it requires exact matching. Conversely, the courses tab must use prefix matching to remain highlighted when viewing individual course details at /course/:id . 

#### Active State Visual Feedback 

Visual Element Active State Inactive State 
Label Color colors.primary colors.textLight 
Icon Same size ( fontSize.xl ) Same size ( fontSize.xl ) 
Background transparent transparent 
Additional Styles styles.tabActive (empty) None 

The conditional styling is applied at src/components/TabBar.tsx 34-49 Note that styles.tabActive at line 81 is an empty object, suggesting placeholder for future enhancements. 

Sources: src/components/TabBar.tsx 27-49 src/components/TabBar.tsx 81 

### Component Structure and Rendering 

#### DOM Hierarchy 

The component generates semantic id attributes for all interactive elements, enabling automated testing and debugging. The ID generation logic at src/components/TabBar.tsx 33 and src/components/TabBar.tsx 40-42 converts paths into readable IDs: 

- / → tabbar-tab-home , tabbar-icon-home , tabbar-label-home 
- /courses → tabbar-tab-courses , tabbar-icon-courses , tabbar-label-courses 

Sources: src/components/TabBar.tsx 25-54 

### Styling System 

The TabBar uses inline styles with values imported from the centralized theme system at src/components/TabBar.tsx 2 

#### Container Styles 

Property Value Purpose 
display flex Horizontal tab layout 
borderTop 1px solid ${colors.border} Visual separation from content 
backgroundColor colors.surface Consistent surface color 
position fixed Persistent bottom placement 
bottom 0 Anchor to viewport bottom 
left , right 0 Full-width spanning 
zIndex 100 Above content, below modals 
paddingBottom env(safe-area-inset-bottom, 0px) iPhone notch compensation 

The paddingBottom value at src/components/TabBar.tsx 67 uses CSS environment variables to adapt to devices with bottom safe areas (iPhone X and newer). The fallback value of 0px ensures compatibility with devices without notches. 

Sources: src/components/TabBar.tsx 58-68 

#### Tab Button Styles 

The flex: 1 property at src/components/TabBar.tsx 70 ensures equal width distribution among tabs. The -webkit-tap-highlight-color: transparent property at src/components/TabBar.tsx 79 removes the default mobile tap flash effect for a more polished interaction. 

Sources: src/components/TabBar.tsx 69-89 

### Integration Points 

#### Usage in Screen Components 

The TabBar component is imported and rendered by screen components that require bottom navigation: 

Screen Import Pattern Rendering 
HomeScreen import { TabBar } from '../components/TabBar' Rendered at bottom of screen container 
CourseListScreen import { TabBar } from '../components/TabBar' Rendered at bottom of screen container 
CourseDetailScreen import { TabBar } from '../components/TabBar' Rendered at bottom of screen container 
PlayerScreen Not imported TabBar renders null via conditional logic 

The component's self-contained visibility logic means screens don't need to conditionally render it themselves. Even if a screen were to include the TabBar, it would automatically hide on player routes. 

#### Navigation Flow 

The navigation flow leverages React Router's useNavigate hook at src/components/TabBar.tsx 16 and src/components/TabBar.tsx 38 The button click triggers navigation, which causes the entire component tree to re-render with the new route, automatically updating the TabBar's active state through the useLocation hook at src/components/TabBar.tsx 17 

Sources: src/components/TabBar.tsx 16-17 src/components/TabBar.tsx 38 

### Theme Dependencies 

The component imports three theme modules at src/components/TabBar.tsx 2 : 

Theme Module Properties Used Usage Context 
colors border , surface , primary , textLight Container border, background, label colors 
fontSize xl , xs Icon size, label size 
spacing sm Button padding 

These dependencies create a unidirectional coupling: changes to theme values automatically propagate to the TabBar without code modifications. However, the component is tightly coupled to the theme structure, meaning theme refactoring would require updating these import references. 

Sources: src/components/TabBar.tsx 2 src/components/TabBar.tsx 60-89 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- TabBar Component 
- Purpose and Scope 
- Component Architecture 
- High-Level Component Structure 
- Tab Configuration 
- Tab Definition Interface 
- Configured Tabs 
- Conditional Rendering Logic 
- Visibility Decision Flow 
- Active State Management 
- Active State Detection Algorithm 
- Active State Visual Feedback 
- Component Structure and Rendering 
- DOM Hierarchy 
- Styling System 
- Container Styles 
- Tab Button Styles 
- Integration Points 
- Usage in Screen Components 
- Navigation Flow 
- Theme Dependencies

---

# Styling and Theme System | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/4.3-styling-and-theme-system

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Styling and Theme System 

Relevant source files 
- README.md 
- docs/assets/index-n4U8p_qz.css 
- src/index.css 

### Purpose and Scope 

This document describes the centralized styling architecture that ensures visual consistency across the Stretch Timer App. The theme system provides design tokens (colors, typography, spacing, border radius) that all UI components consume, eliminating hardcoded style values and enabling maintainable styling patterns. 

This page covers the theme definition structure, design token categories, global CSS configuration, and usage patterns. For information about individual UI components that consume these styles, see Reusable Components and Screens . For the overall UI layer architecture, see User Interface . 

### Theme Architecture 

The styling system is organized into two primary layers: 

- Theme Tokens ( src/styles/theme.ts ): Exports semantic design tokens as TypeScript objects 
- Global Styles ( src/index.css ): Establishes baseline CSS resets, mobile constraints, and browser normalization 

All screen components and reusable components import tokens from the theme file rather than defining inline style values, creating a single source of truth for visual properties. 

#### Theme Module Structure 

Sources: Diagram 5 from high-level system architecture 

### Design Token Categories 

The theme system exports four distinct token categories, each addressing a specific aspect of visual design. 

#### Colors 

The colors object provides a semantic color palette for UI elements. Token names describe purpose rather than visual properties (e.g., primary instead of blue ). 

Token Name Purpose 
primary Primary brand color, accent elements 
secondary Secondary UI elements, less prominent actions 
accent Highlight elements, call-to-action states 
surface Background colors for cards and containers 
text Primary text color 
textSecondary Subdued text, descriptions 
border Border colors for dividers and outlines 
timerNormal Default timer display color 
timerUrgent Timer color when secondsRemaining <= URGENT_THRESHOLD 
success Completion states, positive feedback 
error Error states, warnings 

The timer-specific colors ( timerNormal , timerUrgent ) directly support the urgent countdown visual feedback described in the timer state machine (see Timer State Machine ). 

Sources: Diagram 5 from high-level system architecture, README.md 50 

#### Typography (fontSize) 

The fontSize object defines a progressive type scale for text hierarchy: 

Token Name Use Case 
xs Small labels, metadata 
sm Secondary text, descriptions 
md Body text, default size 
lg Section headings, emphasis 
xl Screen titles, primary headings 
xxl Hero text, major headings 
timer Dedicated size for timer display 

The dedicated timer token ensures consistent sizing of the countdown display in PlayerScreen , which is a critical visual element during stretch execution. 

Sources: Diagram 5 from high-level system architecture 

#### Spacing 

The spacing object provides a consistent layout scale for margins, padding, and gaps: 

Token Name Purpose 
xs Minimal spacing between tightly grouped elements 
sm Small gaps within components 
md Default spacing between related elements 
lg Spacing between component sections 
xl Large spacing for visual separation 

All layout dimensions reference these tokens to maintain consistent density and rhythm across the application. 

Sources: Diagram 5 from high-level system architecture 

#### Border Radius 

The borderRadius object defines corner rounding values: 

Token Name Use Case 
sm Subtle rounding for buttons, inputs 
md Standard rounding for cards, containers 
lg Prominent rounding for large elements 
full Circular elements (pills, avatars) 

Sources: Diagram 5 from high-level system architecture 

### Global Styles 

The global stylesheet establishes baseline styles applied to the entire application before component-specific styles are applied. 

#### CSS Reset and Normalization 

src/index.css 1-6 applies a universal reset: 

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
} 

The -webkit-tap-highlight-color: transparent removes the default blue flash on touch devices, critical for mobile UX. 

#### Typography and Rendering 

src/index.css 8-20 configures font rendering and mobile layout constraints: 

- Font Stack : System fonts prioritizing Japanese support ( Hiragino Sans , Hiragino Kaku Gothic ProN , Yu Gothic , Meiryo ) 
- Font Smoothing : Anti-aliasing for macOS/iOS ( -webkit-font-smoothing ) and Firefox ( -moz-osx-font-smoothing ) 
- Mobile Constraint : max-width: 430px enforces mobile-only display 
- Centering : margin: 0 auto centers the app on wider screens 

#### Mobile-First Constraints 

The hardcoded max-width: 430px at src/index.css 16 is the most critical architectural constraint. The application is explicitly not responsive and targets only mobile devices. This constraint is enforced at the global level rather than per-component, ensuring consistency. 

#### Scrollbar Hiding 

src/index.css 34-42 hides scrollbars while maintaining scroll functionality: 

::-webkit-scrollbar { display: none; }
* { -ms-overflow-style: none; scrollbar-width: none; } 

This creates a cleaner, more app-like experience on mobile devices. 

#### Overscroll Prevention 

src/index.css 22-24 prevents rubber-band bouncing on iOS: 

body { overscroll-behavior: none; } 

Sources: src/index.css 1-43 README.md 127 

### Usage Patterns 

Components consume theme tokens through standard ES6 imports. The pattern ensures type safety and IDE autocomplete support. 

#### Import Pattern 

#### Theme Token Consumption Flow 

#### Inline Style Objects 

React Native-style inline objects are used throughout the codebase to facilitate future migration: 

This pattern avoids CSS classes, making the eventual React Native migration more straightforward since React Native uses JavaScript style objects exclusively. 

Sources: README.md 130 (mentions React Native migration consciousness) 

### Mobile-First Design Philosophy 

The styling system enforces a mobile-only design constraint. This is an intentional architectural decision, not a temporary limitation. 

#### Viewport Constraint Enforcement 

#### Rationale for Fixed Width 

- Simplicity : No responsive breakpoint logic required 
- Consistency : Identical experience across all devices 
- Touch Optimization : All UI elements sized for finger interaction 
- Future Parity : Web version matches future React Native mobile app exactly 

The constraint is visible at src/index.css 16 and documented in README.md 127 

Sources: src/index.css 15-16 README.md 127 

### Component Style Integration 

The relationship between theme tokens and component rendering follows a consistent pattern across the codebase. 

#### Theme-to-Component Data Flow 

#### Example: Timer Color State Logic 

The timer display in PlayerScreen demonstrates dynamic theme token usage: 

This logic creates the visual urgency effect described in README.md 50 without hardcoding color values. 

Sources: Diagram 5 from high-level system architecture, README.md 50 

### Build Output 

The Vite build process compiles all styles into a single hashed CSS file for production. 

#### Production Bundle Structure 

The output file at docs/assets/index-n4U8p_qz.css 1 contains the minified global styles. The hash in the filename ( n4U8p_qz ) enables cache busting on deployment. 

Sources: docs/assets/index-n4U8p_qz.css 1 Diagram 6 from high-level system architecture 

### Summary 

The styling system provides: 

Feature Implementation 
Design Tokens src/styles/theme.ts exports colors , fontSize , spacing , borderRadius 
Global Baseline src/index.css provides resets, mobile constraints, font rendering 
Mobile Constraint 430px max-width enforced globally 
Type Safety TypeScript theme objects enable autocomplete 
Semantic Naming Token names describe purpose (e.g., timerUrgent ) not values (e.g., red ) 
Inline Styles JavaScript style objects prepare for React Native migration 
Build Output Vite compiles to hashed CSS bundle for cache busting 

This architecture ensures visual consistency while maintaining flexibility for future theming requirements and mobile app migration. 

Sources: src/index.css 1-43 Diagram 5 from high-level system architecture, README.md 121-130 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Styling and Theme System 
- Purpose and Scope 
- Theme Architecture 
- Theme Module Structure 
- Design Token Categories 
- Colors 
- Typography (fontSize) 
- Spacing 
- Border Radius 
- Global Styles 
- CSS Reset and Normalization 
- Typography and Rendering 
- Mobile-First Constraints 
- Scrollbar Hiding 
- Overscroll Prevention 
- Usage Patterns 
- Import Pattern 
- Theme Token Consumption Flow 
- Inline Style Objects 
- Mobile-First Design Philosophy 
- Viewport Constraint Enforcement 
- Rationale for Fixed Width 
- Component Style Integration 
- Theme-to-Component Data Flow 
- Example: Timer Color State Logic 
- Build Output 
- Production Bundle Structure 
- Summary

---

# Data Layer | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/5-data-layer

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Data Layer 

Relevant source files 
- README.md 
- src/data/bodyZones.ts 
- src/data/courses.ts 
- src/data/muscles.ts 
- src/data/stretches.ts 

### Purpose and Scope 

The Data Layer provides all static content for the Stretch Timer App through in-memory TypeScript arrays and interfaces. This layer defines the anatomical hierarchy (body zones → muscles → stretches) and preset exercise routines (courses). All data is stored as constant arrays in the `src/data/` directory, eliminating the need for external APIs or databases. 

For information about how this data is consumed by the UI components, see User Interface . For details on the timer execution logic that uses stretch data, see Timer State Machine . 

Sources: README.md 77-116 src/data/bodyZones.ts src/data/muscles.ts src/data/stretches.ts src/data/courses.ts 

### Data Architecture Overview 

The Data Layer consists of four interconnected modules with a hierarchical relationship structure: 

Diagram: Data Module Dependencies and Query API 

The architecture enforces unidirectional data flow from anatomical specificity (zones) to exercise abstractions (courses). Each module exports both its raw data array and specialized query functions. 

Sources: src/data/bodyZones.ts 1-36 src/data/muscles.ts 1-56 src/data/stretches.ts 1-250 src/data/courses.ts 1-105 

### Data Storage Strategy 

All data resides in TypeScript source files as exported constant arrays. This approach provides: 

Feature Implementation 
Storage Location In-memory constant arrays in src/data/*.ts 
Data Format TypeScript interfaces with type safety 
Persistence None (data is statically compiled into bundle) 
Query Mechanism Pure functions filtering/finding array elements 
Modification Not supported (read-only data) 
Loading Strategy Synchronous imports at build time 

This static data strategy eliminates runtime dependencies on network requests or database connections, ensuring instant data availability and predictable performance. 

Sources: README.md 120-130 src/data/bodyZones.ts 12-31 src/data/muscles.ts 8-47 

### Data Models and Interfaces 

The Data Layer defines four primary TypeScript interfaces: 

#### BodyZone Interface 

Defines anatomical regions on the front or back of the human body with SVG coordinate mappings. 

Sources: src/data/bodyZones.ts 1-10 

#### Muscle Interface 

Maps specific muscles to body zones with anatomical side classification. 

Sources: src/data/muscles.ts 1-6 

#### Stretch Interface 

Defines individual stretching exercises with execution parameters. 

Sources: src/data/stretches.ts 1-9 

#### Course Interface 

Represents preset routines as ordered sequences of stretches. 

Sources: src/data/courses.ts 1-7 

### Body Zones Module 

The bodyZones.ts module defines 38 anatomical regions split between front (8 zones) and back (7 zones) body views. 

#### Zone Data Structure 

Diagram: Body Zone Organization 

Each zone contains percentage-based coordinates for mapping to the interactive SVG body map component. The coordinate system uses center point positioning ( x , y ) with dimensions ( width , height ) to define clickable regions. 

Example Zone Definitions: 

Zone ID Name Side X Y Width Height 
neck_front 首 front 50 10 16 5 
chest 胸 front 50 25 32 9 
thigh_back 太もも裏 back 50 62 28 14 

Sources: src/data/bodyZones.ts 12-31 

#### Zone Query Function 

The module exports getZonesBySide(side: 'front' | 'back') which filters the bodyZones array by the specified anatomical side. 

This function is consumed by HomeScreen to populate the body map view when users toggle between front and back perspectives. 

Sources: src/data/bodyZones.ts 33-35 

### Muscles Module 

The muscles.ts module contains 40 muscle definitions distributed across the body zones. Each muscle references exactly one parent zone via zone_id . 

#### Muscle-to-Zone Mapping 

Diagram: Muscle-Zone Relationship Examples 

Distribution by Zone Type: 

Zone Type Muscle Count Example Muscles 
Neck/Shoulder (front) 3 sternocleidomastoid , anterior_deltoid 
Chest 2 pectoralis_major , pectoralis_minor 
Hip (front) 2 hip_flexor , adductors 
Glutes 2 gluteus_maximus , gluteus_medius 
Upper Back 2 rhomboids , trapezius_mid 

Sources: src/data/muscles.ts 8-47 

#### Muscle Query Functions 

The module provides two query functions: 

Function Parameters Return Type Purpose 
getMusclesByZone zoneId: string Muscle[] Filters muscles by zone_id 
getMuscleById id: string Muscle | undefined Direct ID lookup 

Implementation Reference: src/data/muscles.ts 49-55 

These functions support the navigation flow where users select a zone on the body map, then drill down to view muscles in that zone. 

Sources: src/data/muscles.ts 49-56 

### Stretches Module 

The stretches.ts module defines 25 stretching exercises with execution metadata. Each stretch targets one or more muscles via the target_muscle_ids array. 

#### Stretch Properties Breakdown 

Property Type Purpose Example Values 
id string Unique identifier "neck_side_tilt" , "quad_standing" 
title string Display name "首の横倒し" , "大腿四頭筋の立位ストレッチ" 
description string Execution instructions Full text guidance 
target_muscle_ids string[] Muscle references ["sternocleidomastoid", "trapezius_upper"] 
duration_seconds number Default timer duration 30 (all stretches) 
is_sided boolean Left/Right execution flag true (15 stretches), false (10 stretches) 
image_resource_name string Asset identifier "stretch_neck_side" 

Sources: src/data/stretches.ts 1-9 

#### Sidedness Logic 

The is_sided property determines timer execution flow in the useStretchTimer hook: 

- is_sided: true (15 stretches): Execute right side → 5s interval → left side 
- is_sided: false (10 stretches): Execute single set without side switching 

Sided Stretch Examples: 

- src/data/stretches.ts 13-21 - neck_side_tilt (sided) 
- src/data/stretches.ts 32-39 - shoulder_cross_body (sided) 
- src/data/stretches.ts 118-125 - quad_standing (sided) 

Non-Sided Stretch Examples: 

- src/data/stretches.ts 23-30 - neck_forward (non-sided) 
- src/data/stretches.ts 51-58 - chest_doorway (non-sided) 
- src/data/stretches.ts 157-164 - child_pose (non-sided) 

Sources: src/data/stretches.ts 11-241 

#### Muscle-to-Stretch Relationships 

Diagram: Many-to-Many Muscle-Stretch Relationships 

A single stretch can target multiple muscles (e.g., seated_forward_fold targets both hamstrings and erector_spinae ). Conversely, a single muscle may be targeted by multiple stretches (though this is less common in the current dataset). 

Sources: src/data/stretches.ts 11-241 

#### Stretch Query Functions 

Function Parameters Return Type Purpose 
getStretchById id: string Stretch | undefined Direct ID lookup for PlayerScreen 
getStretchesByMuscle muscleId: string Stretch[] Filters by target_muscle_ids inclusion 

Implementation: 

- src/data/stretches.ts 243-245 - getStretchById 
- src/data/stretches.ts 247-249 - getStretchesByMuscle 

The getStretchesByMuscle function uses Array.filter() with includes() to find all stretches where target_muscle_ids contains the specified muscle ID. 

Sources: src/data/stretches.ts 243-250 

### Courses Module 

The courses.ts module defines 8 preset routines, each consisting of an ordered sequence of stretch IDs. Courses provide a curated exercise flow without requiring users to manually select individual stretches. 

#### Course Definitions 

Course ID Title Stretch Count Free Tier Description Summary 
morning_basic 朝の基本コース 6 ✓ Full-body wake-up routine 
shoulder_relief 肩こり解消コース 6 ✓ Shoulder and neck focus 
lower_body 下半身集中コース 7 ✓ Leg and glute emphasis 
back_care 腰痛予防コース 6 ✓ Lower back and hip 
full_body 全身ストレッチコース 12 ✗ Comprehensive routine 
night_relax 夜のリラックスコース 5 ✗ Pre-sleep relaxation 

Sources: src/data/courses.ts 9-100 

#### Course Structure 

Diagram: Course-to-Stretch Sequential Relationship 

The stretch_ids array order defines the execution sequence. The PlayerScreen iterates through this array, executing each stretch with its individual sidedness settings. 

Example Course Definition: src/data/courses.ts 10-23 

Sources: src/data/courses.ts 9-100 

#### Free vs. Premium Courses 

The is_free boolean property controls course availability: 

- Free Courses (4): morning_basic , shoulder_relief , lower_body , back_care 
- Premium Courses (2): full_body , night_relax 

This property is intended for future monetization features where premium courses require payment or subscription. 

Sources: src/data/courses.ts 9-100 README.md 137-140 

#### Course Query Function 

Implementation: src/data/courses.ts 102-104 

This function performs direct ID lookup in the courses array and is consumed by both CourseDetailScreen (to display course information) and PlayerScreen (to execute the course sequence). 

Sources: src/data/courses.ts 102-105 

### Query Function Summary 

All query functions follow a consistent pattern: they accept filter criteria or an ID and return filtered results or a single object. None of the query functions perform side effects or modify data. 

Module Function Input Output Filtering Logic 
bodyZones.ts getZonesBySide side: 'front' | 'back' BodyZone[] zone.side === side 
muscles.ts getMusclesByZone zoneId: string Muscle[] muscle.zone_id === zoneId 
muscles.ts getMuscleById id: string Muscle | undefined muscle.id === id 
stretches.ts getStretchesByMuscle muscleId: string Stretch[] stretch.target_muscle_ids.includes(muscleId) 
stretches.ts getStretchById id: string Stretch | undefined stretch.id === id 
courses.ts getCourseById id: string Course | undefined course.id === id 

Implementation References: 

- src/data/bodyZones.ts 33-35 
- src/data/muscles.ts 49-56 
- src/data/stretches.ts 243-250 
- src/data/courses.ts 102-105 

### Data Flow Patterns 

The Data Layer supports two primary user flows: 

#### Flow 1: Body Map Navigation 

Diagram: Body Map Data Flow 

This flow demonstrates the progressive refinement pattern: anatomical region → specific muscle → available exercises → execution. 

Sources: src/data/bodyZones.ts 33-35 src/data/muscles.ts 49-51 src/data/stretches.ts 247-249 

#### Flow 2: Course Selection 

Diagram: Course Selection Data Flow 

This flow bypasses the body map hierarchy, allowing users to directly access preset routines. The PlayerScreen handles course playback by iterating through stretch_ids and calling getStretchById for each. 

Sources: src/data/courses.ts 102-104 src/data/stretches.ts 243-245 

### Data Integrity Constraints 

The Data Layer enforces referential integrity through TypeScript types, but does not validate foreign key relationships at runtime. The following constraints exist by convention: 

Constraint Description Enforcement 
Zone → Muscle Every Muscle.zone_id must reference a valid BodyZone.id Manual review 
Muscle → Stretch Every ID in Stretch.target_muscle_ids[] must reference a valid Muscle.id Manual review 
Stretch → Course Every ID in Course.stretch_ids[] must reference a valid Stretch.id Manual review 
Duration Standardization All Stretch.duration_seconds are set to 30 Consistent across dataset 
Unique IDs No duplicate IDs within each data module Manual review required 

No automated validation exists to check these constraints. Invalid references will result in undefined returns from query functions, which consuming components must handle. 

Sources: src/data/bodyZones.ts 1-36 src/data/muscles.ts 1-56 src/data/stretches.ts 1-250 src/data/courses.ts 1-105 

### Data Modification Strategy 

All data arrays are exported as const declarations, making them read-only at the TypeScript level. The current architecture does not support: 

- Runtime data modification 
- User-created custom courses (despite README.md mentioning this feature) 
- Persistent state beyond session storage 
- Dynamic addition or removal of stretches 

Future implementations may introduce: 

- localStorage for persisting user preferences 
- Custom course builder storing arrays of stretch IDs 
- User-defined stretch duration overrides 

Sources: README.md 56-61 README.md 120-130 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Data Layer 
- Purpose and Scope 
- Data Architecture Overview 
- Data Storage Strategy 
- Data Models and Interfaces 
- BodyZone Interface 
- Muscle Interface 
- Stretch Interface 
- Course Interface 
- Body Zones Module 
- Zone Data Structure 
- Zone Query Function 
- Muscles Module 
- Muscle-to-Zone Mapping 
- Muscle Query Functions 
- Stretches Module 
- Stretch Properties Breakdown 
- Sidedness Logic 
- Muscle-to-Stretch Relationships 
- Stretch Query Functions 
- Courses Module 
- Course Definitions 
- Course Structure 
- Free vs. Premium Courses 
- Course Query Function 
- Query Function Summary 
- Data Flow Patterns 
- Flow 1: Body Map Navigation 
- Flow 2: Course Selection 
- Data Integrity Constraints 
- Data Modification Strategy

---

# Data Models and Interfaces | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/5.1-data-models-and-interfaces

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Data Models and Interfaces 

Relevant source files 
- README.md 
- src/data/bodyZones.ts 
- src/data/courses.ts 
- src/data/muscles.ts 
- src/data/stretches.ts 

### Purpose and Scope 

This document defines the TypeScript interfaces that form the data layer's type system in the Stretch Timer App. These interfaces provide type-safe contracts for body anatomical zones, muscles, stretches, and courses. This page covers interface definitions, property specifications, and type relationships. For information about the actual data instances and query functions, see Body Zones and Muscles and Stretches and Courses . For understanding how these models are consumed by UI components, see Application Structure and Screens . 

The data models are statically defined in TypeScript files located in src/data/ with no external database or API dependencies. All type definitions enforce compile-time type safety and serve as the single source of truth for data shape across the application. 

### Core Interface Definitions 

#### BodyZone Interface 

The BodyZone interface represents anatomical regions of the human body that users can select on the interactive body map. Each zone defines a clickable region with percentage-based positioning coordinates. 

Property Type Description 
id string Unique identifier (e.g., "neck_front" , "shoulder_back" ) 
name string Japanese display name (e.g., "首" , "肩" ) 
side 'front' | 'back' Body orientation view 
x number Center X position as percentage (0-100) 
y number Center Y position as percentage (0-100) 
width number Zone width as percentage 
height number Zone height as percentage 

The coordinate system ( x , y , width , height ) enables SVG-based hit detection on the BodyMap component. Values are percentages relative to the body illustration's bounding box, allowing responsive scaling without recalculation. 

Sources: src/data/bodyZones.ts 1-10 README.md 77-89 

#### Muscle Interface 

The Muscle interface represents specific anatomical muscles within body zones. Muscles serve as the primary organizational unit for finding relevant stretches. 

Property Type Description 
id string Unique identifier (e.g., "quadriceps" , "trapezius_upper" ) 
name string Japanese anatomical name (e.g., "大腿四頭筋" , "僧帽筋上部" ) 
zone_id string Foreign key reference to BodyZone.id 
side 'front' | 'back' Body orientation (must match parent zone's side) 

The zone_id property creates a one-to-many relationship: each BodyZone contains multiple Muscle records. The side property is denormalized for query optimization, though it must remain consistent with the referenced zone's side. 

Sources: src/data/muscles.ts 1-6 README.md 79-89 

#### Stretch Interface 

The Stretch interface defines individual stretching exercises with timing parameters, targeting information, and behavioral flags. 

Property Type Description 
id string Unique identifier (e.g., "neck_side_tilt" , "quad_standing" ) 
title string Japanese exercise name (e.g., "首の横倒し" ) 
description string Execution instructions in Japanese 
target_muscle_ids string[] Foreign key array referencing Muscle.id 
duration_seconds number Duration of active stretch phase (typically 30) 
is_sided boolean Whether stretch requires left/right execution 
image_resource_name string Asset filename without extension (e.g., "stretch_quad_stand" ) 

The target_muscle_ids array enables many-to-many relationships: stretches can target multiple muscles, and muscles can be targeted by multiple stretches. The is_sided flag controls timer state machine behavior—when true , the timer executes the sequence: prep → right → interval → left → complete . When false , it follows: prep → main → complete . 

Sources: src/data/stretches.ts 1-9 README.md 91-104 

#### Course Interface 

The Course interface represents pre-configured sequences of stretches that play automatically without user intervention. 

Property Type Description 
id string Unique identifier (e.g., "morning_basic" , "shoulder_relief" ) 
title string Japanese course name (e.g., "朝の基本コース" ) 
description string Course purpose and benefits description 
stretch_ids string[] Ordered foreign key array referencing Stretch.id 
is_free boolean Whether course is available in free tier 

The stretch_ids array defines playback order. The PlayerScreen iterates through this array, automatically transitioning between stretches using the timer state machine. The is_free flag supports future monetization where is_free: false courses require payment or unlocking. 

Sources: src/data/courses.ts 1-7 README.md 106-116 

### Entity Relationship Model 

The following diagram illustrates the referential relationships between data models, showing foreign key dependencies and cardinality. 

Entity Relationship Diagram: 

Key Relationships: 

- BodyZone → Muscle: One-to-Many via Muscle.zone_id 
- Muscle → Stretch: Many-to-Many via Stretch.target_muscle_ids[] 
- Stretch → Course: Many-to-Many via Course.stretch_ids[] 

Sources: src/data/bodyZones.ts 1-36 src/data/muscles.ts 1-56 src/data/stretches.ts 1-250 src/data/courses.ts 1-105 

### Type Hierarchy and Navigation Flow 

This diagram shows how data models map to the user navigation flow, illustrating which interfaces are consumed at each screen level. 

Data Model to Screen Mapping: 

Sources: src/data/bodyZones.ts 1-36 src/data/muscles.ts 1-56 src/data/stretches.ts 1-250 src/data/courses.ts 1-105 

### Type Constraints and Validation 

#### Enum-like Union Types 

The side property in both BodyZone and Muscle interfaces uses TypeScript's literal union type for compile-time validation: 

This ensures only valid values ( "front" or "back" ) can be assigned, preventing runtime errors from typos or invalid data. No additional validation library is required—TypeScript's type checker enforces correctness at build time. 

Sources: src/data/bodyZones.ts 4 src/data/muscles.ts 5 

#### Foreign Key Integrity 

The data models use string-based foreign keys without database-level enforcement. Referential integrity is maintained through: 

- Compile-time constants: All IDs are defined as string literals in the data files 
- Query function validation: Lookup functions like getMuscleById() return T | undefined , forcing consumers to handle missing references 
- Static analysis: TypeScript's type system ensures zone_id , target_muscle_ids , and stretch_ids are strings 

This approach trades runtime validation for simplicity, relying on the fact that all data is hand-curated and version-controlled. 

Sources: src/data/muscles.ts 49-55 src/data/stretches.ts 243-249 src/data/courses.ts 102-104 

### Property Type Specifications 

#### Coordinate System (BodyZone) 

The x , y , width , and height properties use percentage-based coordinates relative to a normalized 100×100 grid. This system provides: 

- Responsiveness: Coordinates scale with container size 
- SVG compatibility: Direct mapping to SVG viewBox percentages 
- Device agnosticism: No pixel-based calculations required 

Example zone definition: 

Sources: src/data/bodyZones.ts 5-9 src/data/bodyZones.ts 15 

#### Duration Semantics (Stretch) 

The duration_seconds property defines the active stretch phase duration. The actual playback sequence includes additional phases: 

Phase Duration Source 
Preparation 5 seconds Hardcoded in timer hook 
Active stretch duration_seconds (30) Stretch.duration_seconds 
Interval (if sided) 5 seconds Hardcoded in timer hook 
Active stretch (left side) duration_seconds (30) Stretch.duration_seconds 

The duration_seconds value is always 30 in the current dataset, but the interface allows for variable durations in future iterations. 

Sources: src/data/stretches.ts 6 README.md 34-46 

#### Sidedness Logic (Stretch) 

The is_sided boolean controls timer state machine behavior: 

When is_sided: true : 

prep (5s) → active_right (30s) → interval (5s) → active_left (30s) → complete 

When is_sided: false : 

prep (5s) → active_main (30s) → complete 

This property affects: 

- Total playback time (70 seconds vs 35 seconds) 
- Audio cue timing (finish.mp3 plays twice for sided stretches) 
- Visual indicators (side labels shown in PlayerScreen) 

Sources: src/data/stretches.ts 7 README.md 38-42 

### Data Model Summary Table 

Interface File Location Primary Key Foreign Keys Array Fields Flags 
BodyZone bodyZones.ts 1-10 id None None side 
Muscle muscles.ts 1-6 id zone_id None side 
Stretch stretches.ts 1-9 id None target_muscle_ids is_sided 
Course courses.ts 1-7 id None stretch_ids is_free 

Sources: src/data/bodyZones.ts 1-10 src/data/muscles.ts 1-6 src/data/stretches.ts 1-9 src/data/courses.ts 1-7 

### Design Patterns and Architectural Decisions 

#### Denormalization for Query Performance 

The Muscle.side property duplicates data from its parent BodyZone.side . This denormalization pattern enables: 

- Direct filtering without joins: muscles.filter(m => m.side === 'front') 
- Simplified query functions: No need to resolve zone_id before filtering by side 
- Reduced complexity in UI components 

Trade-off: Requires manual consistency maintenance when modifying data. 

Sources: src/data/muscles.ts 5 src/data/bodyZones.ts 4 

#### Array-based Many-to-Many Relationships 

Both Stretch.target_muscle_ids and Course.stretch_ids use string arrays to represent many-to-many relationships. This pattern avoids: 

- Junction tables (unnecessary for in-memory data) 
- Complex query builders 
- ORM dependencies 

The array-based approach is efficient for small datasets (25 stretches, 8 courses) and provides intuitive iteration patterns in JavaScript. 

Sources: src/data/stretches.ts 5 src/data/courses.ts 5 

#### Locale-specific Properties 

All user-facing strings ( name , title , description ) are defined in Japanese. The data layer does not support internationalization or locale switching. This design decision: 

- Simplifies data structure (no nested locale objects) 
- Reduces file size and complexity 
- Aligns with target market (Japanese users) 

Future i18n support would require migration to a structure like: 

Sources: src/data/stretches.ts 3-4 src/data/muscles.ts 2 src/data/courses.ts 3-4 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Data Models and Interfaces 
- Purpose and Scope 
- Core Interface Definitions 
- BodyZone Interface 
- Muscle Interface 
- Stretch Interface 
- Course Interface 
- Entity Relationship Model 
- Type Hierarchy and Navigation Flow 
- Type Constraints and Validation 
- Enum-like Union Types 
- Foreign Key Integrity 
- Property Type Specifications 
- Coordinate System (BodyZone) 
- Duration Semantics (Stretch) 
- Sidedness Logic (Stretch) 
- Data Model Summary Table 
- Design Patterns and Architectural Decisions 
- Denormalization for Query Performance 
- Array-based Many-to-Many Relationships 
- Locale-specific Properties

---

# Body Zones and Muscles | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/5.2-body-zones-and-muscles

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Body Zones and Muscles 

Relevant source files 
- README.md 
- src/data/bodyZones.ts 
- src/data/muscles.ts 

### Purpose and Scope 

This document describes the anatomical zone and muscle data structures that form the foundation of the body map interface. It covers the BodyZone and Muscle data models, their coordinate systems, relationships, and query functions. 

For the TypeScript interface definitions of these models, see Data Models and Interfaces . For how stretches target these muscles, see Stretches and Courses . 

Sources: src/data/bodyZones.ts 1-36 src/data/muscles.ts 1-56 README.md 79-89 

### Body Zone System 

#### Overview 

Body zones represent broad anatomical regions that users can tap on the interactive body map. Each zone contains multiple muscles and serves as a hierarchical navigation entry point. The system defines 15 zones split between front and back body views. 

Sources: src/data/bodyZones.ts 12-31 

#### BodyZone Interface 

The BodyZone interface defines the structure for each anatomical region: 

The coordinate properties ( x , y , width , height ) define percentage-based positioning for the interactive body map SVG. This coordinate system enables responsive zone hit detection regardless of screen size. 

Sources: src/data/bodyZones.ts 1-10 

#### Coordinate System 

The body zone coordinate system uses percentage-based values (0-100) relative to the body illustration container: 

Property Range Description 
x 0-100 Horizontal center position, where 50 = center of body 
y 0-100 Vertical position from head (10) to feet (82) 
width 0-100 Horizontal span of tappable region 
height 0-100 Vertical span of tappable region 

This percentage-based system allows the BodyMap component to scale zones proportionally when rendering the interactive SVG overlay. 

Sources: src/data/bodyZones.ts 5-9 

#### Zone Definitions by Body Side 

##### Zone Definitions Diagram 

Sources: src/data/bodyZones.ts 13-30 

##### Front View Zones 

Zone ID Name Y Position Width Height 
neck_front 首 10 16 5 
shoulder_front 肩 17 40 6 
chest 胸 25 32 9 
arm_front 腕 35 52 12 
abdomen 腹部 38 24 10 
hip_front 股関節 50 28 7 
thigh_front 太もも前面 62 28 14 
lower_leg_front すね 82 20 14 

Sources: src/data/bodyZones.ts 14-21 

##### Back View Zones 

Zone ID Name Y Position Width Height 
neck_back 首(後) 10 16 5 
shoulder_back 肩(後) 17 40 6 
upper_back 背中上部 25 32 9 
lower_back 腰 38 24 10 
glutes お尻 50 28 7 
thigh_back 太もも裏 62 28 14 
calf ふくらはぎ 82 20 14 

Sources: src/data/bodyZones.ts 24-30 

### Muscle System 

#### Overview 

Muscles represent specific anatomical structures within body zones. Each muscle links to exactly one zone and inherits its side property. The system defines 24 muscles distributed across the 15 body zones. 

Sources: src/data/muscles.ts 8-46 

#### Muscle Interface 

The Muscle interface defines individual muscle entries: 

The zone_id property establishes a many-to-one relationship: multiple muscles belong to a single zone. The side property duplicates the parent zone's side for efficient filtering without zone lookups. 

Sources: src/data/muscles.ts 1-6 

#### Muscle-to-Zone Relationship Diagram 

Sources: src/data/muscles.ts 8-46 src/data/bodyZones.ts 12-31 

#### Muscle Definitions by Zone 

##### Front Body Muscles 

Zone ID Zone Name Muscle ID Muscle Name 
neck_front 首 sternocleidomastoid 胸鎖乳突筋 
shoulder_front 肩 anterior_deltoid 三角筋前部 
chest 胸 pectoralis_major 大胸筋 
chest 胸 pectoralis_minor 小胸筋 
arm_front 腕 biceps 上腕二頭筋 
arm_front 腕 forearm_flexors 前腕屈筋群 
abdomen 腹部 rectus_abdominis 腹直筋 
abdomen 腹部 obliques 腹斜筋 
hip_front 股関節 hip_flexor 腸腰筋 
hip_front 股関節 adductors 内転筋群 
thigh_front 太もも前面 quadriceps 大腿四頭筋 
lower_leg_front すね tibialis_anterior 前脛骨筋 

Sources: src/data/muscles.ts 9-27 

##### Back Body Muscles 

Zone ID Zone Name Muscle ID Muscle Name 
neck_back 首(後) trapezius_upper 僧帽筋上部 
shoulder_back 肩(後) posterior_deltoid 三角筋後部 
shoulder_back 肩(後) rotator_cuff 回旋筋腱板 
upper_back 背中上部 rhomboids 菱形筋 
upper_back 背中上部 trapezius_mid 僧帽筋中部 
lower_back 腰 erector_spinae 脊柱起立筋 
lower_back 腰 quadratus_lumborum 腰方形筋 
glutes お尻 gluteus_maximus 大殿筋 
glutes お尻 gluteus_medius 中殿筋 
thigh_back 太もも裏 hamstrings ハムストリングス 
calf ふくらはぎ gastrocnemius 腓腹筋 
calf ふくらはぎ soleus ヒラメ筋 

Sources: src/data/muscles.ts 29-46 

### Query Functions 

#### Zone Query Functions 

##### getZonesBySide 

Filters the bodyZones array by body side. Used by HomeScreen when the user toggles between front and back views. 

Usage Example: 

Sources: src/data/bodyZones.ts 33-35 

#### Muscle Query Functions 

##### getMusclesByZone 

Filters the muscles array by zone_id . Returns all muscles belonging to a specific body zone. Used by HomeScreen to display the muscle list after a zone is selected. 

Usage Example: 

Sources: src/data/muscles.ts 49-51 

##### getMuscleById 

Performs direct lookup of a muscle by ID. Returns undefined if the muscle does not exist. Used when displaying muscle-specific information or validating stretch targets. 

Usage Example: 

Sources: src/data/muscles.ts 53-55 

### Data Flow and Integration 

#### Query Function Usage Diagram 

Sources: src/data/bodyZones.ts 33-35 src/data/muscles.ts 49-51 README.md 23-29 

#### Data Hierarchy 

The zone-muscle system forms a three-level hierarchy that drives the user navigation flow: 

- Body Side ( front | back ) → User toggles view 
- Body Zone (15 zones) → User taps anatomical region 
- Muscle (24 muscles) → User selects specific muscle 

This hierarchy is enforced through: 

- The side property on both BodyZone and Muscle interfaces 
- The zone_id foreign key relationship from Muscle to BodyZone 
- Query functions that filter at each level 

The next level in the hierarchy connects muscles to stretches via target_muscle_ids arrays in the stretch definitions. See Stretches and Courses for details on that relationship. 

Sources: src/data/bodyZones.ts 1-36 src/data/muscles.ts 1-56 README.md 23-29 

### Implementation Notes 

#### Static Data Architecture 

Both bodyZones and muscles are statically defined TypeScript arrays exported from their respective modules. This design choice provides: 

- Zero Network Latency: All data is bundled at build time 
- Type Safety: TypeScript interfaces enforce data structure 
- Referential Integrity: zone_id references are validated at compile time (through TypeScript string literal types if strict typing is added) 
- Simplicity: No database, no API calls, no loading states 

Sources: src/data/bodyZones.ts 12-31 src/data/muscles.ts 8-46 

#### Coordinate System Usage 

The percentage-based coordinate system in BodyZone is consumed by the BodyMap component, which: 

- Renders zone boundaries as invisible SVG overlays 
- Detects tap/click events using percentage-based hit testing 
- Highlights selected zones by drawing rectangles at (x, y, width, height) 

The coordinate values are calibrated to match the body illustration SVG used in the UI. Changes to the illustration require recalibration of these values. 

Sources: src/data/bodyZones.ts 5-9 README.md 23-29 

#### Zone Distribution Analysis 

Zone Category Front Zones Back Zones Total 
Upper Body 4 3 7 
Core 1 1 2 
Lower Body 3 3 6 
Total 8 7 15 

The asymmetry (8 front vs 7 back zones) reflects anatomical detail priority: the front view includes separate chest and abdomen zones, while the back view combines them into upper_back and lower_back . 

Sources: src/data/bodyZones.ts 13-30 

#### Muscle Distribution Analysis 

Zone Category Muscle Count Example Zones 
Single-Muscle Zones 4 neck_front , thigh_front , neck_back , thigh_back 
Dual-Muscle Zones 11 chest , arm_front , abdomen , hip_front , shoulder_back , upper_back , lower_back , glutes , calf 

Most zones (73%) contain exactly 2 muscles, providing balanced granularity for stretch targeting. Single-muscle zones represent anatomical regions where finer subdivision is unnecessary (e.g., quadriceps as a single unit). 

Sources: src/data/muscles.ts 8-46 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Body Zones and Muscles 
- Purpose and Scope 
- Body Zone System 
- Overview 
- BodyZone Interface 
- Coordinate System 
- Zone Definitions by Body Side 
- Zone Definitions Diagram 
- Front View Zones 
- Back View Zones 
- Muscle System 
- Overview 
- Muscle Interface 
- Muscle-to-Zone Relationship Diagram 
- Muscle Definitions by Zone 
- Front Body Muscles 
- Back Body Muscles 
- Query Functions 
- Zone Query Functions 
- getZonesBySide 
- Muscle Query Functions 
- getMusclesByZone 
- getMuscleById 
- Data Flow and Integration 
- Query Function Usage Diagram 
- Data Hierarchy 
- Implementation Notes 
- Static Data Architecture 
- Coordinate System Usage 
- Zone Distribution Analysis 
- Muscle Distribution Analysis

---

# Stretches and Courses | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/5.3-stretches-and-courses

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Stretches and Courses 

Relevant source files 
- README.md 
- src/data/courses.ts 
- src/data/stretches.ts 

### Purpose and Scope 

This document describes the stretch and course data structures that form the core content layer of the application. Stretches represent individual exercises with timing and targeting information, while courses are predefined sequences of stretches designed for specific goals. For information about the underlying muscle and body zone data that stretches target, see Body Zones and Muscles . For information about the TypeScript interfaces, see Data Models and Interfaces . 

Sources: src/data/stretches.ts 1-250 src/data/courses.ts 1-105 README.md 77-116 

### Stretch Data Structure 

The Stretch interface defines individual stretching exercises. Each stretch is a self-contained unit that can be played independently or as part of a course sequence. 

#### Core Properties 

Property Type Purpose 
id string Unique identifier used for referencing (e.g., 'neck_side_tilt' ) 
title string Japanese display name shown to users 
description string Instructions for performing the stretch 
target_muscle_ids string[] Array of muscle IDs this stretch targets (links to Muscle data) 
duration_seconds number Active stretch duration (default: 30 seconds) 
is_sided boolean Whether stretch must be performed on both left and right sides 
image_resource_name string Placeholder for stretch illustration asset name 

Sources: src/data/stretches.ts 1-9 README.md 91-104 

#### The is_sided Property 

The is_sided property is critical for timer state machine behavior. When true , the stretch executes in a specific sequence: 

Prep (5s) → Right Side (30s) → Interval (5s) → Left Side (30s) → Next Stretch 

When false , the stretch executes once: 

Prep (5s) → Main (30s) → Next Stretch 

This property directly impacts the Timer State Machine transitions and total playback duration. 

Example Sided Stretch: 

src/data/stretches.ts 13-21 

{
  id: 'neck_side_tilt',
  title: '首の横倒し',
  is_sided: true,  // Requires both left and right execution
  ...
} 

Example Non-Sided Stretch: 

src/data/stretches.ts 22-30 

{
  id: 'neck_forward',
  title: '首の前倒し',
  is_sided: false,  // Single execution
  ...
} 

Sources: src/data/stretches.ts 13-30 README.md 38-42 

### Stretch Definitions 

The application defines 25 stretches covering the entire body. Stretches are organized by anatomical region and target specific muscle groups. 

#### Stretch Categories 

The following diagram shows how stretches are organized by body region: 

Sources: src/data/stretches.ts 11-241 

#### Complete Stretch Inventory 

ID Title Sidedness Target Muscles Duration 
neck_side_tilt 首の横倒し Sided sternocleidomastoid, trapezius_upper 30s 
neck_forward 首の前倒し Non-sided trapezius_upper 30s 
shoulder_cross_body 肩のクロスボディストレッチ Sided posterior_deltoid, rhomboids 30s 
shoulder_overhead 肩の上腕三頭筋ストレッチ Sided anterior_deltoid, posterior_deltoid 30s 
chest_doorway 胸のドアフレームストレッチ Non-sided pectoralis_major, pectoralis_minor 30s 
wrist_flexor_stretch 手首屈筋のストレッチ Sided forearm_flexors 30s 
bicep_wall_stretch 上腕二頭筋の壁ストレッチ Sided biceps 30s 
cobra_stretch コブラストレッチ Non-sided rectus_abdominis 30s 
side_bend 体側のストレッチ Sided obliques 30s 
hip_flexor_lunge 腸腰筋のランジストレッチ Sided hip_flexor 30s 
adductor_stretch 内転筋ストレッチ Sided adductors 30s 
quad_standing 大腿四頭筋の立位ストレッチ Sided quadriceps 30s 
shin_stretch 前脛骨筋のストレッチ Non-sided tibialis_anterior 30s 
cat_cow キャットカウストレッチ Non-sided erector_spinae, rhomboids 30s 
upper_back_clasp 背中の手組みストレッチ Non-sided rhomboids, trapezius_mid 30s 
child_pose チャイルドポーズ Non-sided erector_spinae, quadratus_lumborum 30s 
seated_twist 座位のツイストストレッチ Sided erector_spinae, obliques 30s 
pigeon_pose ピジョンポーズ Sided gluteus_maximus, gluteus_medius 30s 
figure_four 4の字ストレッチ Sided gluteus_maximus, gluteus_medius 30s 
standing_hamstring ハムストリングスの立位ストレッチ Sided hamstrings 30s 
seated_forward_fold 長座前屈 Non-sided hamstrings, erector_spinae 30s 
calf_wall_stretch ふくらはぎの壁ストレッチ Sided gastrocnemius 30s 
soleus_stretch ヒラメ筋のストレッチ Sided soleus 30s 
sleeper_stretch スリーパーストレッチ Sided rotator_cuff 30s 

Sidedness Distribution: 

- Sided stretches: 16 (require left and right execution) 
- Non-sided stretches: 9 (single execution) 

Sources: src/data/stretches.ts 11-241 

### Course Data Structure 

The Course interface defines preset sequences of stretches designed for specific goals (e.g., morning routines, pain relief). 

#### Core Properties 

Property Type Purpose 
id string Unique identifier (e.g., 'morning_basic' ) 
title string Japanese display name shown in course list 
description string Purpose and benefits of the course 
stretch_ids string[] Ordered list of stretch IDs to play sequentially 
is_free boolean Whether course is available in free version 

Sources: src/data/courses.ts 1-7 README.md 106-116 

#### Free vs Premium Courses 

The is_free property determines monetization tier: 

- Free courses ( is_free: true ): Accessible to all users, typically 5-7 stretches 
- Premium courses ( is_free: false ): Require purchase, typically 8-12 stretches 

Sources: src/data/courses.ts 22-99 README.md 136-139 

### Course Definitions 

The application defines 8 courses with varying focuses and durations. 

#### Course Inventory 

ID Title Description Stretches Free 
morning_basic 朝の基本コース Morning wake-up routine 6 ✓ 
shoulder_relief 肩こり解消コース Desk work shoulder relief 6 ✓ 
lower_body 下半身集中コース Lower body focus 7 ✓ 
back_care 腰痛予防コース Lower back pain prevention 6 ✓ 
full_body 全身ストレッチコース Comprehensive full body 12 ✗ 
night_relax 夜のリラックスコース Bedtime relaxation 5 ✗ 

Content Distribution: 

- Free courses: 4 (25 total stretches across courses) 
- Premium courses: 2 (17 total stretches across courses) 

Sources: src/data/courses.ts 9-100 

#### Example Course Structure 

The morning_basic course demonstrates typical composition: 

src/data/courses.ts 10-23 

This course totals approximately 5 minutes of active stretching: 

- 5 sided stretches: 5 × (5s prep + 30s right + 5s interval + 30s left) = 350s 
- 1 non-sided stretch: 1 × (5s prep + 30s main) = 35s 
- Total: 385 seconds ≈ 6.4 minutes 

Sources: src/data/courses.ts 10-23 

### Data Relationships 

The following diagram illustrates how courses, stretches, and muscles are interconnected: 

Diagram: Data Relationship Graph 

Sources: src/data/courses.ts 10-86 src/data/stretches.ts 11-241 

#### Referential Integrity 

The data layer maintains referential integrity through ID-based relationships: 

- Courses → Stretches: Each stretch_ids entry must match a valid Stretch.id 
- Stretches → Muscles: Each target_muscle_ids entry must match a valid Muscle.id (see Body Zones and Muscles ) 

Note: These relationships are static and defined at compile time. No runtime validation is performed. 

Sources: src/data/courses.ts 14-21 src/data/stretches.ts 17 

### Query Functions 

Both data modules export helper functions for accessing and filtering data. 

#### Stretch Query Functions 

Diagram: Stretch Query Function API 

Sources: src/data/stretches.ts 243-249 

##### getStretchById 

src/data/stretches.ts 243-245 

Performs direct lookup by ID. Used by: 

- PlayerScreen to fetch stretch details for playback 
- CourseDetailScreen to resolve course stretch_ids to full objects 

Usage Example: 

##### getStretchesByMuscle 

src/data/stretches.ts 247-249 

Filters stretches where target_muscle_ids includes the specified muscle ID. Used by: 

- HomeScreen to display stretches for a selected muscle 

Usage Example: 

Sources: src/data/stretches.ts 243-249 

#### Course Query Functions 

Diagram: Course Query Function API 

Sources: src/data/courses.ts 102-104 

##### getCourseById 

src/data/courses.ts 102-104 

Performs direct lookup by ID. Used by: 

- CourseDetailScreen to fetch course details and stretch list 
- PlayerScreen to initialize course playback sequence 

Usage Example: 

Sources: src/data/courses.ts 102-104 

### Data Access Patterns 

The following diagram shows how screens consume stretch and course data: 

Diagram: Screen Data Access Patterns 

Access Pattern Summary: 

- HomeScreen: Uses getStretchesByMuscle() to filter stretches by selected muscle 
- CourseListScreen: Directly renders all courses from courses array 
- CourseDetailScreen: Uses getCourseById() to fetch course, then getStretchById() for each stretch in stretch_ids 
- PlayerScreen: Uses getStretchById() to fetch stretch details for timer and display 

Sources: src/data/stretches.ts 243-249 src/data/courses.ts 102-104 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Stretches and Courses 
- Purpose and Scope 
- Stretch Data Structure 
- Core Properties 
- The is_sided Property 
- Stretch Definitions 
- Stretch Categories 
- Complete Stretch Inventory 
- Course Data Structure 
- Core Properties 
- Free vs Premium Courses 
- Course Definitions 
- Course Inventory 
- Example Course Structure 
- Data Relationships 
- Referential Integrity 
- Query Functions 
- Stretch Query Functions 
- getStretchById 
- getStretchesByMuscle 
- Course Query Functions 
- getCourseById 
- Data Access Patterns

---

# Core Systems | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/6-core-systems

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Core Systems 

Relevant source files 
- README.md 
- src/hooks/useStretchTimer.ts 
- src/screens/PlayerScreen.tsx 

This document provides an overview of the three critical business logic systems that enable the application's hands-free stretching experience. These systems handle timer state management, audio feedback generation, and navigation coordination. 

For detailed screen-level UI implementation, see UI Layer . For data model definitions and query patterns, see Data Layer . 

### Purpose and Scope 

The core systems layer encompasses: 

- Timer State Machine - Manages stretch execution phases, automatic transitions, and sidedness logic 
- Audio Feedback System - Generates real-time audio cues using Web Audio API 
- Navigation Flow - Coordinates user journeys and URL parameter passing 

These systems are designed to operate without user intervention once initiated, fulfilling the "hands-free" design goal described in the project requirements. 

### System Integration Architecture 

The following diagram illustrates how the three core systems integrate with the UI and data layers: 

System Integration Overview 

Sources: src/screens/PlayerScreen.tsx 1-167 src/hooks/useStretchTimer.ts 1-229 

### System Interaction Flow 

This diagram maps the complete execution flow from user action to stretch completion: 

User Action to Audio Feedback Flow 

Sources: src/screens/PlayerScreen.tsx 25-167 src/hooks/useStretchTimer.ts 28-226 

### Timer State Machine Overview 

The useStretchTimer hook implements a finite state machine with five distinct phases: 

Phase Duration Description Next Phase 
idle N/A Initial state before start prep (on user action) 
prep 5 seconds Preparation countdown active 
active 30 seconds (default) Active stretching interval or finished 
interval 5 seconds Rest period between sides/stretches active or prep 
finished N/A All stretches complete Terminal state 

#### State Transition Logic 

The state machine handles two distinct execution patterns: 

Non-Sided Stretches ( is_sided: false ) 

idle → prep (5s) → active (30s) → interval (5s) → prep (next stretch) → ... 

Sided Stretches ( is_sided: true ) 

idle → prep (5s) → active_right (30s) → interval (5s) → active_left (30s) → interval (5s) → prep (next stretch) → ... 

The state machine automatically determines the correct transition path based on the is_sided property and activeSide state variable. 

Sources: src/hooks/useStretchTimer.ts 4-6 src/hooks/useStretchTimer.ts 83-145 README.md 34-51 

#### Key State Variables 

The timer maintains the following state structure: 

Phase Constants: 

- PREP_DURATION = 5 - Preparation phase length src/hooks/useStretchTimer.ts 24 
- INTERVAL_DURATION = 5 - Rest interval length src/hooks/useStretchTimer.ts 25 
- URGENT_THRESHOLD = 5 - Seconds remaining to trigger urgent audio/visual feedback src/hooks/useStretchTimer.ts 26 

Sources: src/hooks/useStretchTimer.ts 7-22 src/hooks/useStretchTimer.ts 24-26 

### Audio Feedback System Overview 

The audio system uses Web Audio API ( AudioContext ) to generate three distinct audio cues without requiring external sound files: 

Audio Cue Trigger Frequency Duration Implementation 
playTick() Every second (when > 5s remaining) 800 Hz 0.05s sine wave oscillator 
playUrgentTick() Every second (when ≤ 5s remaining) 1200 Hz 0.08s sine wave oscillator 
playFinish() Phase completion 523→659→784 Hz 0.6s total Three-note chord sequence 

#### Audio Architecture 

Sources: src/hooks/useStretchTimer.ts 38-74 

#### Audio Initialization Strategy 

The AudioContext is lazily initialized on the first call to getAudioContext() and cached in a ref to avoid creating multiple contexts: 

- Initialization : Triggered by start() method on user interaction src/hooks/useStretchTimer.ts 180-191 
- Caching : Stored in audioContextRef.current src/hooks/useStretchTimer.ts 38-45 
- Browser Compatibility : Wrapped in try-catch to handle browsers without Web Audio API support src/hooks/useStretchTimer.ts 49-64 

The system uses exponential gain ramping ( exponentialRampToValueAtTime ) to prevent audio popping artifacts when stopping oscillators src/hooks/useStretchTimer.ts 58 

Sources: src/hooks/useStretchTimer.ts 38-74 

### Navigation Flow Overview 

The navigation system coordinates three user journey patterns: 

#### 1. Body Map Flow (Single Stretch) 

#### 2. Course Flow (Multiple Stretches) 

#### 3. Exit Flow 

Both flows return to their origin point on completion or cancellation: 

- Body map flow: navigate('/') returns to HomeScreen 
- Course flow: navigate(-1) returns to CourseDetailScreen or CourseListScreen 

Sources: src/screens/PlayerScreen.tsx 26-32 src/screens/PlayerScreen.tsx 56-57 src/screens/PlayerScreen.tsx 159-161 

### URL Parameter Schema 

The PlayerScreen receives its data through URL query parameters: 

Parameter Format Example Description 
stretches Comma-separated IDs ?stretches=neck_tilt Single stretch execution 
stretches Comma-separated IDs ?stretches=neck_tilt,shoulder_roll,chest_stretch Course/multi-stretch sequence 

The parsing logic in PlayerScreen : 

This pattern ensures type safety by filtering out undefined results from invalid IDs. 

Sources: src/screens/PlayerScreen.tsx 29-32 

### Timer Control Interface 

The useStretchTimer hook exposes four control methods to the UI: 

Method State Change Use Case 
start() idle → prep with isRunning=true Initial playback start from idle state 
pause() Sets isRunning=false User temporarily pauses during execution 
resume() Sets isRunning=true User resumes from pause (no phase reset) 
stop() Resets to idle state User exits/cancels execution 

These methods maintain the state machine's integrity by only allowing valid transitions. For example, resume() will not restart a finished or idle timer src/hooks/useStretchTimer.ts 197-202 

Sources: src/hooks/useStretchTimer.ts 180-213 

### Timer Interval Management 

The state machine uses a single setInterval that runs while isRunning=true : 

Interval Lifecycle Diagram 

The interval reference is stored in intervalRef.current and properly cleaned up in the useEffect cleanup function to prevent memory leaks src/hooks/useStretchTimer.ts 76-81 

Sources: src/hooks/useStretchTimer.ts 147-178 

### Phase Transition Function 

The moveToNextPhase() function encapsulates all state transition logic. It accepts the current TimerState and returns the next state based on: 

- Current phase ( prep | active | interval ) 
- Stretch properties ( is_sided , duration_seconds ) 
- Current side ( right | left | none ) 
- Position in stretch array ( currentStretchIndex ) 

Key Transition Rules: 

- prep → active : Always transitions with activeSide set based on is_sided 
- active (right side) → interval : Only for sided stretches 
- interval (after right) → active (left side): Continues sided stretch 
- active (non-sided or left side) → interval → prep : Moves to next stretch 
- Any phase → finished : When currentStretchIndex >= stretchList.length 

This function is pure (no side effects) and deterministic, making it testable and predictable. 

Sources: src/hooks/useStretchTimer.ts 83-145 

### Visual Feedback Integration 

The PlayerScreen component consumes timer state to provide visual feedback: 

Timer Display Color Logic: 

This creates a synchronized audio-visual feedback system where both the audio cue changes (to playUrgentTick() ) and the timer text color changes (to red) when entering the final 5 seconds of the active phase. 

Phase-Based UI States: 

- idle : Shows stretch list preview with start button 
- prep | active | interval : Shows timer, phase indicator, and controls 
- finished : Shows completion message with navigation button 

Sources: src/screens/PlayerScreen.tsx 36-37 src/screens/PlayerScreen.tsx 65-163 

### Error Handling and Edge Cases 

The core systems implement several defensive patterns: 

Empty Stretch List: 

- PlayerScreen renders empty state UI if no stretches in URL src/screens/PlayerScreen.tsx 39-50 
- start() method guards against empty arrays src/hooks/useStretchTimer.ts 181 

Invalid Stretch IDs: 

- URL parsing filters out undefined results from getStretchById() src/screens/PlayerScreen.tsx 31 
- Type narrowing ensures only valid Stretch objects enter timer 

Audio Context Failures: 

- All audio playback wrapped in try-catch blocks src/hooks/useStretchTimer.ts 49-64 
- App continues functioning silently if Web Audio API unavailable 

State Inconsistencies: 

- resume() guards against resuming from terminal states src/hooks/useStretchTimer.ts 199 
- Phase transition returns current state on unexpected phase values src/hooks/useStretchTimer.ts 140-142 

Sources: src/hooks/useStretchTimer.ts 49-64 src/hooks/useStretchTimer.ts 181 src/hooks/useStretchTimer.ts 197-202 src/screens/PlayerScreen.tsx 29-50 

### Memory Management 

The timer system implements proper cleanup to prevent memory leaks: 

- Interval Cleanup: clearTimer() called in useEffect cleanup src/hooks/useStretchTimer.ts 177 
- AudioContext Lifecycle: Context persists across timer executions (reusable) 
- Ref Storage: Interval ID stored in ref (not state) to avoid re-render triggers 

The AudioContext is intentionally not cleaned up between stretches to avoid reinitialization overhead. It remains cached for the component lifecycle. 

Sources: src/hooks/useStretchTimer.ts 76-81 src/hooks/useStretchTimer.ts 147-178 

### System Extensibility Points 

The core systems provide several extension points for future features: 

Timer Duration Customization: 

- Constants PREP_DURATION , INTERVAL_DURATION can be made configurable 
- Stretch.duration_seconds already supports per-stretch customization 

Audio Customization: 

- playBeep() function can be replaced with audio file playback 
- Frequencies and durations parameterized for easy adjustment 
- Foundation for "Jugemu" audio feature described in README 

Navigation Patterns: 

- URL parameter schema supports arbitrary stretch sequences 
- Navigation functions support additional query parameters (e.g., mode=jugemu ) 

Phase Extensions: 

- State machine pattern allows adding new phases (e.g., warmup , cooldown ) 
- moveToNextPhase() function encapsulates transition logic in one place 

Sources: README.md 56-76 src/hooks/useStretchTimer.ts 24-26 src/hooks/useStretchTimer.ts 47-74 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Core Systems 
- Purpose and Scope 
- System Integration Architecture 
- System Interaction Flow 
- Timer State Machine Overview 
- State Transition Logic 
- Key State Variables 
- Audio Feedback System Overview 
- Audio Architecture 
- Audio Initialization Strategy 
- Navigation Flow Overview 
- 1. Body Map Flow (Single Stretch) 
- 2. Course Flow (Multiple Stretches) 
- 3. Exit Flow 
- URL Parameter Schema 
- Timer Control Interface 
- Timer Interval Management 
- Phase Transition Function 
- Visual Feedback Integration 
- Error Handling and Edge Cases 
- Memory Management 
- System Extensibility Points

---

# Timer State Machine | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/6.1-timer-state-machine

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Timer State Machine 

Relevant source files 
- README.md 
- src/hooks/useStretchTimer.ts 
- src/screens/PlayerScreen.tsx 

This document describes the useStretchTimer hook, which implements the core state machine logic for stretch timer execution in the PlayerScreen. The state machine controls phase transitions, countdown timing, sidedness handling, and audio feedback triggers. 

For information about the audio playback system that this state machine coordinates with, see Audio Feedback System . For details on how the PlayerScreen UI consumes this hook, see PlayerScreen . 

### Overview 

The timer state machine is implemented as a React hook that manages the complete lifecycle of stretch playback. It handles: 

- Phase transitions (preparation → active stretching → intervals → completion) 
- Countdown timing for each phase 
- Sided stretch logic (right side → interval → left side) 
- Multi-stretch sequences (courses) 
- Pause/resume/stop controls 
- Audio cue triggering 

The hook exposes a clean API to the PlayerScreen component while encapsulating all timing and transition logic internally. 

Sources: src/hooks/useStretchTimer.ts 1-229 

### State Machine Architecture 

#### Core Types and Constants 

The state machine defines several TypeScript types and constants that govern its behavior: 

Type/Constant Definition Purpose 
TimerPhase 'idle' | 'prep' | 'active' | 'interval' | 'finished' Defines all possible timer phases 
ActiveSide 'none' | 'right' | 'left' Tracks which side is being stretched for sided stretches 
PREP_DURATION 5 seconds Fixed preparation time before each stretch 
INTERVAL_DURATION 5 seconds Rest period between sides or stretches 
URGENT_THRESHOLD 5 seconds Trigger point for urgent audio/visual feedback 

Sources: src/hooks/useStretchTimer.ts 4-26 

#### State Machine Interface 

Sources: src/hooks/useStretchTimer.ts 7-22 src/hooks/useStretchTimer.ts 28-36 

### Phase Transition Logic 

#### State Transition Diagram 

The state machine follows a deterministic sequence of phase transitions based on stretch properties and completion conditions: 

Sources: src/hooks/useStretchTimer.ts 83-145 README.md 34-51 

#### Phase Transition Function 

The moveToNextPhase function implements the state transition logic: 

Sources: src/hooks/useStretchTimer.ts 83-145 

### Countdown Timing and Audio Integration 

#### Timer Interval Loop 

The hook uses a useEffect with a 1-second interval to decrement the countdown and trigger audio feedback: 

Sources: src/hooks/useStretchTimer.ts 147-178 

#### Audio Triggering Logic 

The state machine determines which audio to play based on the current countdown value: 

Condition Audio Function Frequency Duration Description 
newSeconds > URGENT_THRESHOLD playTick() 800 Hz 0.05s Standard tick sound 
newSeconds <= URGENT_THRESHOLD && newSeconds > 0 playUrgentTick() 1200 Hz 0.08s Urgent countdown warning 
newSeconds <= 0 playFinish() 523→659→784 Hz 0.15→0.15→0.3s Three-tone completion chord 

Sources: src/hooks/useStretchTimer.ts 68-74 src/hooks/useStretchTimer.ts 160-166 

### Sidedness Handling 

#### Non-Sided Stretch Flow 

For stretches with is_sided: false , the flow is straightforward: 

Sources: src/hooks/useStretchTimer.ts 89-97 README.md 41-42 

#### Sided Stretch Flow 

For stretches with is_sided: true , the state machine executes both sides in sequence: 

Sources: src/hooks/useStretchTimer.ts 100-108 src/hooks/useStretchTimer.ts 124-132 README.md 38-42 

#### Implementation Details 

The activeSide state variable tracks the current execution context: 

- During prep phase: Always 'none' 
- During active phase (sided): 'right' then 'left' 
- During active phase (non-sided): 'none' 
- During interval: Either 'none' (between stretches) or 'left' (between sides) 

This state is used both for internal logic and for UI display purposes. 

Sources: src/hooks/useStretchTimer.ts 5-6 src/screens/PlayerScreen.tsx 8-23 

### Control API 

#### Start Function 

The start() function initializes the state machine and begins playback: 

Note: The getAudioContext() call is critical—Web Audio API requires user interaction to initialize, so this must be called on button press. 

Sources: src/hooks/useStretchTimer.ts 180-191 

#### Pause and Resume Functions 

Sources: src/hooks/useStretchTimer.ts 193-202 

#### Stop Function 

The stop() function resets the entire state machine to idle: 

This is used when the user explicitly stops playback or navigates away from the PlayerScreen. 

Sources: src/hooks/useStretchTimer.ts 204-213 

### Integration with PlayerScreen 

#### Hook Invocation 

The PlayerScreen component instantiates the hook with a list of stretches parsed from URL parameters: 

Sources: src/screens/PlayerScreen.tsx 25-34 src/hooks/useStretchTimer.ts 215-226 

#### Visual Feedback Mapping 

The PlayerScreen uses timer state to determine UI appearance: 

Timer State Visual Element Condition Appearance 
phase Phase indicator badge phase === 'prep' Accent color, text "準備" 
phase Phase indicator badge phase === 'interval' Secondary color, text "休憩" 
phase Phase indicator badge phase === 'active' && activeSide='right' Primary color, text "右側" 
phase Phase indicator badge phase === 'active' && activeSide='left' Primary color, text "左側" 
phase Phase indicator badge phase === 'active' && activeSide='none' Primary color, text "実行中" 
secondsRemaining Timer text color phase='active' && secondsRemaining <= URGENT_THRESHOLD Red ( colors.timerUrgent ) 
secondsRemaining Timer text color Otherwise White ( colors.timerNormal ) 
currentStretchIndex Progress bar Always width: (currentIndex / total) * 100% 

Sources: src/screens/PlayerScreen.tsx 8-23 src/screens/PlayerScreen.tsx 36-37 src/screens/PlayerScreen.tsx 91-104 src/screens/PlayerScreen.tsx 117-121 

### State Machine Constants 

#### Timing Configuration 

All phase durations are hardcoded as constants at the top of the hook file: 

Constant Value Usage 
PREP_DURATION 5 seconds Preparation phase before each stretch begins 
INTERVAL_DURATION 5 seconds Rest period between sides or between stretches 
URGENT_THRESHOLD 5 seconds Trigger point for urgent audio (higher frequency) and visual feedback (red timer) 

The active stretch duration is not a constant—it comes from stretch.duration_seconds (default 30 seconds per the data model). 

Sources: src/hooks/useStretchTimer.ts 24-26 src/data/stretches.ts 1-100 

#### Exported Constants 

The hook exports URGENT_THRESHOLD for use by PlayerScreen to synchronize visual feedback with the audio urgency logic: 

This ensures the UI's color change happens at exactly the same countdown value as the audio switch from playTick() to playUrgentTick() . 

Sources: src/hooks/useStretchTimer.ts 228 src/screens/PlayerScreen.tsx 3 src/screens/PlayerScreen.tsx 36 

### Multi-Stretch Course Handling 

#### Index Progression 

The currentStretchIndex advances through the stretchList array: 

Sources: src/hooks/useStretchTimer.ts 109-122 

#### Current Stretch Lookup 

The hook exposes the current stretch object via a computed property: 

This allows PlayerScreen to display the stretch title, description, and other metadata for the currently active stretch. 

Sources: src/hooks/useStretchTimer.ts 215 src/screens/PlayerScreen.tsx 107-114 

### Audio Context Management 

#### Lazy Initialization 

The hook uses a ref to store the AudioContext instance and lazily initializes it: 

Important: AudioContext creation must happen during a user gesture (e.g., button click) due to browser autoplay policies. This is why getAudioContext() is called in the start() function. 

Sources: src/hooks/useStretchTimer.ts 37-45 src/hooks/useStretchTimer.ts 183 

#### Beep Synthesis 

Audio feedback is generated using Web Audio API oscillators rather than loading audio files: 

This approach avoids loading external audio files and provides precise control over audio characteristics. 

Sources: src/hooks/useStretchTimer.ts 47-66 src/hooks/useStretchTimer.ts 68-74 

### Error Handling and Edge Cases 

#### Empty Stretch List 

When stretchList.length === 0 , the hook handles it gracefully: 

- start() returns early without changing state 
- currentStretch evaluates to null 
- totalStretches is 0 

The PlayerScreen detects this condition and displays an error message instead of rendering the timer UI. 

Sources: src/hooks/useStretchTimer.ts 181 src/screens/PlayerScreen.tsx 39-50 

#### Audio Context Failures 

The playBeep() function wraps audio playback in a try-catch block: 

This prevents crashes if the browser blocks audio or the Web Audio API is unavailable. 

Sources: src/hooks/useStretchTimer.ts 49-63 

#### Pause During Finished State 

The resume() function explicitly checks for terminal states: 

This prevents resuming after completion, forcing the user to explicitly start a new session. 

Sources: src/hooks/useStretchTimer.ts 199 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Timer State Machine 
- Overview 
- State Machine Architecture 
- Core Types and Constants 
- State Machine Interface 
- Phase Transition Logic 
- State Transition Diagram 
- Phase Transition Function 
- Countdown Timing and Audio Integration 
- Timer Interval Loop 
- Audio Triggering Logic 
- Sidedness Handling 
- Non-Sided Stretch Flow 
- Sided Stretch Flow 
- Implementation Details 
- Control API 
- Start Function 
- Pause and Resume Functions 
- Stop Function 
- Integration with PlayerScreen 
- Hook Invocation 
- Visual Feedback Mapping 
- State Machine Constants 
- Timing Configuration 
- Exported Constants 
- Multi-Stretch Course Handling 
- Index Progression 
- Current Stretch Lookup 
- Audio Context Management 
- Lazy Initialization 
- Beep Synthesis 
- Error Handling and Edge Cases 
- Empty Stretch List 
- Audio Context Failures 
- Pause During Finished State

---

# Audio Feedback System | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/6.2-audio-feedback-system

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Audio Feedback System 

Relevant source files 
- README.md 
- src/hooks/useStretchTimer.ts 
- src/screens/PlayerScreen.tsx 

### Purpose and Scope 

This document describes the audio feedback system that provides auditory cues during stretch execution. The system uses the Web Audio API to generate programmatic beeps that signal timer countdowns, phase transitions, and urgent timing alerts. For information about the timer state machine that triggers these audio cues, see Timer State Machine . 

Sources: README.md 1-229 src/hooks/useStretchTimer.ts 1-229 

### Overview 

The audio feedback system is embedded within the useStretchTimer hook and provides a hands-free experience by eliminating the need for users to watch the screen continuously. The system generates three distinct audio patterns using Web Audio API oscillators rather than pre-recorded audio files. 

The primary goals of the audio system are: 

- Signal each passing second during active phases 
- Alert users to imminent phase transitions (final 5 seconds) 
- Confirm phase completions with a distinct finish sound 
- Maintain minimal latency for precise timing feedback 

Sources: README.md 43-46 src/hooks/useStretchTimer.ts 28-75 

### Web Audio API Implementation 

#### AudioContext Management 

The system uses a single AudioContext instance managed through a ref to ensure audio consistency across the component lifecycle: 

Diagram: Web Audio API Component Architecture 

The getAudioContext() function src/hooks/useStretchTimer.ts 40-45 implements lazy initialization to comply with browser autoplay policies, which require user interaction before creating an AudioContext . This function is called when the user presses the start button src/hooks/useStretchTimer.ts 183 

Sources: src/hooks/useStretchTimer.ts 38-66 

### Audio Cue Types 

The system generates three distinct audio cues, each with specific acoustic properties optimized for their purpose: 

Cue Type Function Frequency Duration Trigger Condition Code Reference 
Normal Tick playTick() 800 Hz 0.05 s Every second when secondsRemaining > 5 src/hooks/useStretchTimer.ts 68 
Urgent Tick playUrgentTick() 1200 Hz 0.08 s Every second when secondsRemaining ≤ 5 src/hooks/useStretchTimer.ts 69 
Finish Signal playFinish() 523/659/784 Hz 0.15/0.15/0.3 s Phase completion ( secondsRemaining = 0 ) src/hooks/useStretchTimer.ts 70-74 

#### Beep Generation Logic 

All audio cues are generated by the playBeep() function src/hooks/useStretchTimer.ts 47-66 which creates a sine wave oscillator with exponential gain decay: 

- Oscillator Creation : A sine wave oscillator is created with the specified frequency 
- Gain Configuration : Initial volume set to 0.3, exponentially decaying to 0.01 over the duration 
- Connection Chain : OscillatorNode → GainNode → AudioContext.destination 
- Timing Control : Oscillator starts immediately and stops after the specified duration 

The exponential gain decay ( gainNode.gain.exponentialRampToValueAtTime() ) prevents audible clicking artifacts at sound termination. 

#### Finish Signal Composition 

The finish sound is a three-tone ascending sequence that creates a pleasant completion signal: 

- Tone 1 : C5 (523 Hz) for 0.15s at t=0ms 
- Tone 2 : E5 (659 Hz) for 0.15s at t=150ms 
- Tone 3 : G5 (784 Hz) for 0.3s at t=300ms 

This creates a C major chord arpeggio that is musically consonant and easily distinguishable from the tick sounds. 

Sources: src/hooks/useStretchTimer.ts 47-74 

### Audio-Timer Phase Integration 

The audio system is tightly coupled with the timer state machine, triggering audio cues based on phase and remaining time: 

Diagram: Audio Cue Triggering Based on Timer Phase 

#### Audio Trigger Logic 

The audio triggering occurs within the timer's interval callback src/hooks/useStretchTimer.ts 153-175 : 

- Decrement Timer : secondsRemaining is decremented every second 
- Sound Selection : 
- If newSeconds > 0 and newSeconds <= URGENT_THRESHOLD : play urgent tick 
- If newSeconds > 0 and newSeconds > URGENT_THRESHOLD : play normal tick 
- If newSeconds <= 0 : play finish sound 

- Phase Transition : After finish sound, moveToNextPhase() is called 

The constant URGENT_THRESHOLD = 5 src/hooks/useStretchTimer.ts 26 defines when the audio switches to urgent mode, creating a 5-second warning before phase completion. 

Sources: src/hooks/useStretchTimer.ts 147-178 src/hooks/useStretchTimer.ts 26 

### Visual-Audio Synchronization 

The audio feedback system synchronizes with visual indicators in the PlayerScreen component: 

Diagram: Synchronization Between Audio and Visual Feedback 

The PlayerScreen imports URGENT_THRESHOLD src/screens/PlayerScreen.tsx 3 and calculates an isUrgent flag src/screens/PlayerScreen.tsx 36 that determines timer text color. This ensures that the visual red color change occurs simultaneously with the audio switch to urgent ticks. 

Sources: src/screens/PlayerScreen.tsx 3 src/screens/PlayerScreen.tsx 36-37 src/hooks/useStretchTimer.ts 26 

### The Jugemu Feature (Planned) 

According to the project README, the application has a planned premium feature called the "Jugemu" audio mode, which represents a unique approach to audio feedback. 

#### Concept 

The Jugemu feature would replace the simple beep sounds with a full recitation of "Jugemu" (寿限無), a famous Japanese name from folklore that consists of an extremely long sequence of auspicious words. The recitation would last approximately 25-30 seconds, matching one stretch set duration README.md 69 

#### Intended UX Impact 

The README describes this as an "Emotional UX" feature README.md 63-76 : 

- Default Experience : Users hear the entire Jugemu recitation during each stretch 
- Psychological Effect : The repetitive, rhythmic nature is designed to be "mildly infuriating yet oddly addictive" 
- Monetization Strategy : This creates an incentive to purchase the "Silence is Golden" pack README.md 58-61 which allows switching back to standard beep sounds 

#### Implementation Status 

Current State : Not implemented. The current codebase uses programmatic beeps via Web Audio API. 

Planned Architecture : The README references audio assets README.md 14-19 : 

- assets/sounds/tick.mp3 
- assets/sounds/tick_urgent.mp3 
- assets/sounds/finish.mp3 

These asset paths suggest the future implementation would use pre-recorded audio files loaded via HTML5 Audio or Web Audio API buffer sources, rather than the current oscillator-based beeps. 

Sources: README.md 63-76 README.md 58-61 README.md 14-19 

### Error Handling and Browser Compatibility 

The audio system includes graceful degradation for environments where audio is unavailable: 

Diagram: Audio Error Handling Flow 

The playBeep() function wraps all Web Audio API calls in a try-catch block src/hooks/useStretchTimer.ts 49-63 silently failing if: 

- The browser doesn't support Web Audio API 
- The AudioContext fails to initialize 
- Any node creation or connection fails 

In error scenarios, the application continues functioning with visual-only feedback, maintaining core usability. 

Sources: src/hooks/useStretchTimer.ts 47-66 

### Code Structure Summary 

#### Key Functions and Their Responsibilities 

Function Location Purpose Returns 
getAudioContext() src/hooks/useStretchTimer.ts 40-45 Lazy initialization of AudioContext instance AudioContext 
playBeep(frequency, duration) src/hooks/useStretchTimer.ts 47-66 Low-level oscillator creation and playback void 
playTick() src/hooks/useStretchTimer.ts 68 Normal second tick (800Hz, 0.05s) void 
playUrgentTick() src/hooks/useStretchTimer.ts 69 Urgent countdown tick (1200Hz, 0.08s) void 
playFinish() src/hooks/useStretchTimer.ts 70-74 Three-tone completion signal void 

#### State Management 

The audio system maintains no independent state. Audio triggering is determined by the timer state within useStretchTimer : 

- phase : Determines if audio should play at all (no audio in 'idle' or 'finished') 
- secondsRemaining : Determines whether to play normal or urgent tick 
- isRunning : Controls whether the interval timer fires 

#### Integration Points 

The audio system integrates with: 

- Timer Hook : src/hooks/useStretchTimer.ts 147-178 - Timer interval callback triggers audio 
- Player Screen : src/screens/PlayerScreen.tsx 36 - Imports URGENT_THRESHOLD for visual sync 
- Browser APIs : Web Audio API for sound generation 

Sources: src/hooks/useStretchTimer.ts 28-229 src/screens/PlayerScreen.tsx 1-372 

### Performance Considerations 

#### Audio Context Lifecycle 

The AudioContext persists for the lifetime of the component mounting. This avoids repeated initialization overhead but requires careful management: 

- Created lazily on first user interaction 
- Stored in a ref to survive re-renders 
- Not explicitly closed (relies on browser cleanup) 

#### Oscillator Node Lifecycle 

Each beep creates temporary nodes that are automatically garbage collected: 

- Oscillator and GainNode created 
- Started and scheduled to stop 
- Disconnected automatically when stopped 
- Eligible for garbage collection 

The system creates approximately 30-60 oscillator nodes per minute during active stretching, which is well within browser performance limits. 

#### Timing Precision 

Audio cues are triggered within the 1-second interval timer src/hooks/useStretchTimer.ts 153 which uses window.setInterval() . This provides approximately ±10ms precision, sufficient for audio feedback timing requirements. 

Sources: src/hooks/useStretchTimer.ts 38-45 src/hooks/useStretchTimer.ts 147-178 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Audio Feedback System 
- Purpose and Scope 
- Overview 
- Web Audio API Implementation 
- AudioContext Management 
- Audio Cue Types 
- Beep Generation Logic 
- Finish Signal Composition 
- Audio-Timer Phase Integration 
- Audio Trigger Logic 
- Visual-Audio Synchronization 
- The Jugemu Feature (Planned) 
- Concept 
- Intended UX Impact 
- Implementation Status 
- Error Handling and Browser Compatibility 
- Code Structure Summary 
- Key Functions and Their Responsibilities 
- State Management 
- Integration Points 
- Performance Considerations 
- Audio Context Lifecycle 
- Oscillator Node Lifecycle 
- Timing Precision

---

# Navigation Flow | kuniatsu/jugemu-stretch | DeepWiki
Source: https://deepwiki.com/kuniatsu/jugemu-stretch/6.3-navigation-flow

Loading... 

Index your code with Devin 
DeepWiki DeepWiki 

kuniatsu/jugemu-stretch 

Index your code with 

Devin 
Edit Wiki Share 

Loading... 

Last indexed: 8 February 2026 ( 9e1c4b ) 

- Overview 
- Getting Started 
- Development Environment 
- Build and Deployment Pipeline 
- Architecture 
- Application Structure 
- Data Architecture 
- Routing and Navigation 
- User Interface 
- Screens 
- HomeScreen 
- CourseListScreen 
- CourseDetailScreen 
- PlayerScreen 
- Reusable Components 
- BodyMap Component 
- Header Component 
- TabBar Component 
- Styling and Theme System 
- Data Layer 
- Data Models and Interfaces 
- Body Zones and Muscles 
- Stretches and Courses 
- Core Systems 
- Timer State Machine 
- Audio Feedback System 
- Navigation Flow 

Menu 

## Navigation Flow 

Relevant source files 
- README.md 
- src/navigation/AppNavigator.tsx 
- src/screens/CourseDetailScreen.tsx 
- src/screens/HomeScreen.tsx 

### Purpose and Scope 

This document describes the navigation architecture, user journey patterns, and URL routing mechanisms within the Stretch Timer App. It covers route definitions, navigation transitions between screens, state-based drill-down flows, and URL parameter passing strategies. For information about the routing system's technical setup and HashRouter configuration, see Routing and Navigation . For details about screen-specific UI components and layouts, see Screens . 

### Route Structure 

The application defines four primary routes in AppNavigator , utilizing React Router's hash-based routing strategy for GitHub Pages compatibility. 

Route Path Component Purpose Navigation Entry Points 
/ HomeScreen Body map interface and drill-down navigation App start, TabBar home button, Player exit 
/courses CourseListScreen Browse available stretch courses TabBar courses button 
/courses/:courseId CourseDetailScreen Preview course details and stretch list Course card selection 
/player PlayerScreen Execute stretch timer with audio feedback Stretch selection, course start button 

Route Definition 

Sources: src/navigation/AppNavigator.tsx 1-21 

### Primary Navigation Patterns 

#### Tab-Based Navigation 

The TabBar component provides persistent bottom navigation between the two main screens: HomeScreen and CourseListScreen . The TabBar remains visible on both screens but is hidden during stretch playback on PlayerScreen . 

TabBar Visibility Rules: 

- Visible: HomeScreen , CourseListScreen , CourseDetailScreen 
- Hidden: PlayerScreen (full-screen timer interface) 

Sources: src/navigation/AppNavigator.tsx 8-19 src/components/TabBar.tsx 

#### Body Map Flow (Drill-Down Navigation) 

The HomeScreen implements a state-based, multi-level drill-down pattern without changing routes. Navigation state is managed internally using the ViewState type union. 

ViewState Type Definition 

The navigation state is modeled as a discriminated union: 

Navigation Handlers 

Handler Trigger Action Effect 
handleZonePress User taps body zone on BodyMap Calls getMusclesByZone(zone.id) Transitions to muscleList view 
handleMusclePress User taps muscle in list Calls getStretchesByMuscle(muscle.id) Transitions to stretchList view 
handleStretchPress User taps stretch card Calls navigate(/player?stretches=${stretch.id}) Navigates to PlayerScreen 
handleBack User taps back link Reverts to previous ViewState Navigates up one level 

Sources: src/screens/HomeScreen.tsx 12-46 

#### Course Flow (Sequential Navigation) 

The course browsing flow uses traditional route-based navigation through three screens. 

Key Implementation Details: 

- CourseListScreen → CourseDetailScreen: Uses route parameters via :courseId 
- CourseDetailScreen → PlayerScreen: Uses query string to pass multiple stretch IDs 
- Exit path: PlayerScreen completion returns to CourseListScreen (implicit via back navigation) 

Sources: src/screens/CourseListScreen.tsx src/screens/CourseDetailScreen.tsx 10-42 

### URL Parameter Handling 

#### Route Parameters ( :courseId ) 

The CourseDetailScreen extracts the courseId from the URL path using React Router's useParams hook. 

Implementation: 

src/screens/CourseDetailScreen.tsx 10-13 extracts the courseId parameter: 

Sources: src/screens/CourseDetailScreen.tsx 10-13 

#### Query String Parameters ( ?stretches= ) 

The PlayerScreen receives stretch IDs via query string parameters. This pattern supports both single-stretch playback and multi-stretch course sequences. 

Single Stretch Navigation: 

src/screens/HomeScreen.tsx 33-35 constructs the query string for individual stretches: 

Course Sequence Navigation: 

src/screens/CourseDetailScreen.tsx 39-42 joins multiple IDs into a comma-separated list: 

URL Examples: 

Navigation Source URL Pattern Example 
Single stretch from body map /player?stretches={id} /player?stretches=quad_stand 
Course sequence /player?stretches={id1},{id2},{id3} /player?stretches=neck_tilt,shoulder_roll,chest_doorway 

Sources: src/screens/HomeScreen.tsx 33-35 src/screens/CourseDetailScreen.tsx 39-42 

### Navigation Implementation Patterns 

#### useNavigate Hook 

All programmatic navigation uses React Router's useNavigate hook rather than direct link elements. This provides type-safe, imperative navigation control. 

Usage Pattern: 

Screens Using Navigation: 

Screen Navigation Targets 
HomeScreen PlayerScreen (single stretch) 
CourseListScreen CourseDetailScreen (course preview) 
CourseDetailScreen PlayerScreen (course sequence) 

Sources: src/screens/HomeScreen.tsx 18-34 src/screens/CourseDetailScreen.tsx 11-41 

#### Back Navigation Handling 

The application implements two distinct back navigation patterns: 

##### Header Back Button (Route-Based) 

The Header component displays a back button on screens that require route-level navigation: 

Screens with Header Back Button: 

- CourseDetailScreen : Returns to /courses 
- Any screen with <Header showBack /> prop 

Sources: src/components/Header.tsx src/screens/CourseDetailScreen.tsx 46 

##### State-Based Back Navigation 

The HomeScreen implements custom back button logic for its drill-down views: 

src/screens/HomeScreen.tsx 37-46 handles internal state transitions: 

Sources: src/screens/HomeScreen.tsx 37-46 

### Exit Paths and Return Navigation 

#### PlayerScreen Exit Behavior 

The PlayerScreen does not have an explicit back button in the UI. Users exit through completion or browser back button. The expected return destinations are: 

Entry Source Expected Return Destination 
HomeScreen single stretch HomeScreen (route: / ) 
CourseDetailScreen course CourseDetailScreen (route: /courses/:courseId ) 

Note: The actual return navigation relies on browser history stack. When the user completes a stretch or uses browser back, React Router's history management returns to the previous route. 

Sources: README.md 21-76 

### Complete Navigation Graph 

This diagram shows all navigation paths, including both route-based and state-based transitions: 

Sources: src/navigation/AppNavigator.tsx 1-21 src/screens/HomeScreen.tsx 12-46 src/screens/CourseDetailScreen.tsx 10-42 

### Technical Considerations 

#### HashRouter Strategy 

The application uses HashRouter rather than BrowserRouter to support GitHub Pages deployment without server-side routing configuration. All routes are prefixed with # in the browser URL bar: 

- Development: http://localhost:5173/#/courses 
- Production: https://kuniatsu.github.io/stretch_app/docs/#/courses 

Sources: README.md 124-186 

#### Navigation State Persistence 

Navigation state is not persisted across page refreshes: 

- Route-based navigation: Browser history is preserved via HashRouter 
- HomeScreen drill-down state: Resets to bodyMap view on page reload 
- PlayerScreen progress: Lost on page refresh (no session storage) 

Sources: src/screens/HomeScreen.tsx 20 

Dismiss 

Refresh this wiki 

This wiki was recently refreshed. Please wait 7 day s to refresh again. 

#### On this page 

- Navigation Flow 
- Purpose and Scope 
- Route Structure 
- Primary Navigation Patterns 
- Tab-Based Navigation 
- Body Map Flow (Drill-Down Navigation) 
- Course Flow (Sequential Navigation) 
- URL Parameter Handling 
- Route Parameters (`:courseId`) 
- Query String Parameters (`?stretches=`) 
- Navigation Implementation Patterns 
- useNavigate Hook 
- Back Navigation Handling 
- Header Back Button (Route-Based) 
- State-Based Back Navigation 
- Exit Paths and Return Navigation 
- PlayerScreen Exit Behavior 
- Complete Navigation Graph 
- Technical Considerations 
- HashRouter Strategy 
- Navigation State Persistence

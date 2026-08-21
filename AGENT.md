# Agent Guide

This repository is an Expo SDK 57 React Native app using Expo Router, strict TypeScript, and React Compiler. Treat this file as the source of truth for agent work in this project.

## Required Context

- Read the exact Expo SDK 57 docs before changing code: https://docs.expo.dev/versions/v57.0.0/
- SDK 57 targets React Native 0.86, React 19.2.3, React Native Web 0.21, and Node.js 22.13.x or newer.
- Install Expo SDK packages with `npx expo install <package>` so versions stay aligned with SDK 57.
- Avoid canary, beta, or unversioned Expo packages unless the user explicitly asks for that risk.

## Project Facts

- App entry: `expo-router/entry`.
- Routes live under `src/app`.
- Shared components live under `src/components`.
- Shared hooks live under `src/hooks`.
- Shared constants and design tokens live under `src/constants`.
- Path aliases are configured as `@/* -> src/*` and `@/assets/* -> assets/*`.
- App config is `app.json`; avoid editing generated native `ios/` or `android/` folders unless the task requires native project work.

## Architecture Rules

- Keep route files in `src/app` thin. A route should compose providers, read route params, and render a feature screen.
- Put new product functionality under `src/features/<feature-name>/` when it grows beyond one route-local component.
- Use this feature shape when applicable:

```text
src/features/<feature-name>/
  screens/
  components/
  hooks/
  services/
  types.ts
  constants.ts
  index.ts
```

- Dependency direction must stay one-way:
  - `src/app` may import features and shared modules.
  - features may import shared modules.
  - shared modules must not import from `src/app` or `src/features`.
  - one feature must not import another feature directly; move shared behavior to `src/components`, `src/hooks`, `src/lib`, or a domain module.
- Keep UI components mostly presentational. Put side effects, async calls, storage, and permission checks in hooks or services.
- Prefer local state first. Add global state only when multiple unrelated screens need the same mutable state.
- Keep network, storage, analytics, and native permission logic behind typed service functions.
- Type public feature inputs and outputs explicitly. Avoid `any`; use narrow unions and typed route params.
- Use platform-specific files (`.ios.tsx`, `.android.tsx`, `.web.tsx`) only for real platform differences.

## UI Rules

- Use shared design tokens from `src/constants/theme.ts` for color, spacing, and fonts.
- Support light and dark mode for new screens.
- Do not hard-code colors that should be theme tokens.
- Respect safe areas, keyboard behavior, reduced motion, and touch target sizes.
- Add accessibility labels, roles, and states for interactive controls.
- Use `expo-image` for image-heavy UI when it improves loading, caching, or transitions.
- For long lists, prefer proven virtualized list components and avoid rendering large arrays directly inside `ScrollView`.

## Expo Rules

- Keep Expo Router route paths typed and colocated under `src/app`.
- Add permissions through Expo config/plugins rather than ad hoc native edits.
- Prefer Expo SDK APIs already compatible with SDK 57 before adding third-party native modules.
- After adding or changing native-capability packages, verify whether `npx expo prebuild` or a development build is required.

## Quality Gates

Run the smallest useful checks before finishing:

```bash
npm run lint
npx tsc --noEmit
```

For UI changes, also run the relevant app target when practical:

```bash
npm run ios
npm run android
npm run web
```

If tests are added later, run the test command that covers the touched feature.

## Git And PR Rules

- Default feature branch format: `codex/feat/<feature-name>`.
- Use kebab-case for branch feature names, for example `codex/feat/home-dashboard`.
- Use PR titles in this exact format:

```text
feat(feature_name): Verb concise title
```

- `feature_name` is the changed screen or feature scope, for example `home`, `auth`, `profile`, or `checkout`.
- After `:` the first word must be an imperative verb, for example `Add`, `Update`, `Refactor`, `Introduce`, or `Improve`.
- Good examples:
  - `feat(home): Add recent activity section`
  - `feat(auth): Update sign-in validation`
  - `feat(profile): Improve avatar upload flow`
- Commit messages should follow the same convention when the change is feature work.

## Before Finishing

- Re-read `git status --short`.
- Confirm generated, local, and cache folders are not staged.
- Mention any check that could not be run and why.

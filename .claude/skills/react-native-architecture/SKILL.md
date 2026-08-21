---
name: react-native-architecture
description: Use when implementing, modifying, or reviewing React Native or Expo code in this repository to preserve architecture boundaries, Expo SDK 57 compatibility, and TypeScript quality.
---

# React Native Architecture

Use this skill before changing app code, adding dependencies, or reviewing implementation quality.

## Required Reading

1. Read `AGENTS.md`.
2. Read `AGENT.md`.
3. Read the exact Expo SDK 57 docs at https://docs.expo.dev/versions/v57.0.0/ when code or dependency behavior depends on Expo.
4. Read the relevant Vietnamese guide under `docs/`:
   - architecture or ownership: `docs/01-kien-truc-tong-quan.md`
   - UI placement or assets: `docs/06-ui-component-va-assets.md`
   - quality or performance: `docs/08-chat-luong-va-hieu-nang.md`

## Architecture Checklist

- Keep `src/app` route files thin. Move feature behavior into `src/features/<feature-name>/`.
- Keep dependency direction one-way: app -> features -> shared.
- Do not import one feature directly from another feature.
- Put shared visual primitives in `src/components`; put shared hooks in `src/hooks`.
- Put side effects in hooks or services, not presentational components.
- Keep services typed and deterministic at the boundary: API input, API output, storage shape, and permission results.
- Use `@/*` imports for source modules when it improves readability.
- Avoid adding global state until the same mutable state is needed by unrelated screens.
- Decide state ownership before adding a dependency: local UI state, URL state, server state, or shared client state.
- Do not duplicate TanStack Query data in Zustand.
- Validate external data at the feature boundary and map DTOs to domain models before UI usage.

## Expo SDK 57 Checklist

- Prefer Expo SDK packages that match SDK 57.
- Install Expo packages with `npx expo install`.
- Confirm native-capability changes are represented in `app.json` or a config plugin.
- Do not edit generated `ios/` or `android/` folders unless the task is explicitly native.
- Treat React Compiler as enabled; keep components pure and avoid render-time side effects.

## UI Checklist

- Use design tokens from `src/constants/theme.ts`.
- Support light and dark mode.
- Respect safe areas, keyboard overlap, and platform differences.
- Add accessibility labels and state for interactive UI.
- Use platform-specific files only when behavior truly differs.
- Avoid large unvirtualized lists and unnecessary re-renders in frequently updated screens.

## Verification

Run the smallest checks that prove the change:

```bash
npm run lint
npx tsc --noEmit
npx expo-doctor
```

For UI work, also run the relevant app target when practical.

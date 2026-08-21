---
name: react-native-feature
description: Use when adding or changing a React Native screen, Expo Router route, or product feature in this repository.
---

# React Native Feature Workflow

Use this skill for screen work, route changes, navigation updates, and feature implementation.

## Steps

1. Identify the feature scope from the changed screen or capability, for example `home`, `auth`, `profile`, or `settings`.
2. Check the existing route in `src/app` or create the new route there.
3. Keep the route file thin:

```tsx
import { FeatureScreen } from '@/features/feature-name';

export default function Route() {
  return <FeatureScreen />;
}
```

4. Put feature-owned implementation under `src/features/<feature-name>/`.
5. Export only the feature surface from `src/features/<feature-name>/index.ts`.
6. Keep reusable UI, hooks, and utilities outside the feature only when at least two features need them.

## Feature Folder Shape

```text
src/features/<feature-name>/
  screens/<FeatureScreen>.tsx
  components/
  hooks/
  services/
  types.ts
  constants.ts
  index.ts
```

Create only the folders that are needed for the current change.

## Screen Rules

- A screen coordinates layout, state hooks, navigation, and feature components.
- Feature components should be presentational unless they own a small local interaction.
- Use typed route params and avoid loosely shaped navigation payloads.
- Keep copy and labels close to the UI unless localization is introduced.
- Keep async loading, errors, empty states, and permission-denied states explicit.

## Done Checklist

- The feature has a clear boundary.
- The route file is thin.
- No feature-to-feature imports were introduced.
- Light and dark mode are handled.
- Accessibility was considered for every new control.
- `npm run lint` and `npx tsc --noEmit` pass, or the failure is documented.

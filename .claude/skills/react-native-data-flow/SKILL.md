---
name: react-native-data-flow
description: Use when adding API calls, TanStack Query hooks, Zustand state, persistence, or data mapping in this Expo React Native repository.
---

# React Native Data Flow

Apply this skill before changing how data enters, moves through, or persists in the app.

## Required Reading

Read only the guides relevant to the task:

- State ownership or Zustand: `docs/02-state-va-zustand.md`
- Server state or cache: `docs/03-tanstack-query.md`
- HTTP, DTO mapping, or Zod: `docs/04-api-va-zod.md`
- Network/offline behavior: `docs/08-chat-luong-va-hieu-nang.md`

## Ownership Decision

- Keep ephemeral screen interaction in local React state.
- Keep route identity and shareable navigation state in Expo Router params.
- Keep remote data in TanStack Query; never mirror it into Zustand.
- Use Zustand only for mutable client-owned state shared beyond a local component tree.
- Persist only fields that must survive restart, and never put secrets in AsyncStorage.

## API Boundary

- Put HTTP transport concerns in `src/lib/http` and feature contracts/mappers in `src/features/<feature>/services`.
- Treat response JSON as `unknown`; validate with Zod before mapping it to a domain type.
- Pass TanStack Query's `AbortSignal` to `fetch`.
- Keep query keys deterministic and include all response inputs.
- Preserve stale data during background refetch when the product can safely show it; distinguish errors from valid empty results.

## Verification

Run:

```bash
npm run lint
npx tsc --noEmit
npx expo-doctor
```

For boundary changes, also verify malformed, missing, nullable, offline, and retry behavior at the narrowest useful level.

# Architecture Guide

## Purpose

This guide defines architectural rules for code organization, module boundaries, and dependency direction.

---

## General rules

- Prefer small, composable modules.
- Keep feature logic close to the feature.
- Reuse existing abstractions before introducing new ones.
- Avoid broad refactors unless explicitly requested.
- Preserve public APIs unless change is required.

---

## Suggested structure

Follow the real repository first, but prefer these responsibilities:

- `app/`: route entrypoints and screen composition
- `components/`: shared reusable UI
- `features/`: domain-specific logic and UI
- `hooks/`: reusable hooks
- `services/` or `lib/`: API clients, storage, integrations
- `types/`: shared types
- `constants/`: tokens and stable configuration values

---

## Dependency direction

Prefer this direction:

- routes depend on features/shared UI
- features depend on shared UI, hooks, services, and types
- shared UI should not depend on feature-specific modules
- services should not depend on route files
- utility modules should stay framework-light where practical

Do not create circular dependencies.

---

## Route boundaries

When using Expo Router:
- treat folder and file names in `app/` as stable API
- do not move or rename routes casually
- preserve `_layout.tsx` boundaries
- keep route files thin
- move domain logic out of route files when possible

---

## Shared code decisions

Create shared abstractions only when:
- duplication is real and recurring
- the abstraction is easier to understand than the repeated code
- it improves consistency without increasing indirection too much

Do not extract helpers prematurely.

---

## Types

- Prefer explicit exported types
- Keep shared types narrow
- Avoid broad generic "common" models unless truly shared
- Keep feature-specific types inside the feature unless reused elsewhere

---

## Refactoring policy

Allowed:
- small local refactors that make the requested change safer
- small naming cleanups in touched code only
- extracting a helper/component when it clearly improves the change

Avoid:
- repo-wide reorganization
- pattern migrations not required by the task
- changing all modules to match personal preferences
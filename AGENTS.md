# AGENTS.md

## Purpose

This file is the top-level operating guide for AI coding agents working in this repository.

Agents must follow this file first, then the referenced area-specific guides, then the local code conventions found near the edited code.

If a more specific guide conflicts with a more general one, the more specific guide wins.

---

## Core priorities

Always optimize for:
- correctness
- small, reviewable diffs
- consistency with existing patterns
- platform safety
- maintainability over cleverness

Preserve existing behavior unless the task explicitly requires behavior changes.

---

## Project baseline

This repository is an Expo application.

Assume the following unless the repository clearly shows otherwise:
- TypeScript is the source of truth
- Expo managed workflow is preferred
- Expo Router drives navigation
- configuration-sensitive changes must be treated carefully
- lint and type safety are mandatory
- existing repository conventions override generic preferences

---

## How to work

Before making changes:
1. Read the relevant files fully.
2. Identify the smallest safe implementation.
3. Reuse existing patterns, components, hooks, services, and tokens.
4. Check whether there is a more specific guide for the area being edited.

Do not:
- refactor unrelated code
- rename routes casually
- introduce dependencies without clear need
- edit native folders unless explicitly required
- change deployment or update behavior silently

When uncertain:
- choose the most conservative implementation
- keep APIs backward compatible
- document assumptions in the final summary

---

## Area-specific guides

Use these guides depending on the type of change:

- Architecture and module boundaries: `docs/agents/architecture.md`
- UI, styling, accessibility, and component behavior: `docs/agents/ui.md`
- Testing and validation expectations: `docs/agents/testing.md`
- API calls, storage, persistence, and external data handling: `docs/agents/data-access.md`
- Local and global state decisions: `docs/agents/state-management.md`
- Expo, routing, config, EAS, and platform-sensitive changes: `docs/agents/expo-platform.md`
- Final summaries, delivery expectations, and change hygiene: `docs/agents/delivery.md`

If a task spans multiple areas, apply all relevant guides.

---

## File and change safety

Safe to edit:
- route files related to the task
- nearby components, hooks, services, and tests
- localized feature code directly involved in the task

Edit carefully:
- `app.config.ts`
- `package.json`
- `tsconfig.json`
- `babel.config.js`
- `metro.config.js`
- `eas.json`
- root providers
- navigation layout files
- shared UI primitives
- environment loading code

Do not edit unless required:
- `ios/`
- `android/`
- CI/CD files
- signing or credential-related files
- unrelated build/release configuration

---

## Completion bar

A task is not complete unless the agent has:
- kept the change scoped
- preserved route/import integrity
- avoided unrelated edits
- maintained type safety
- followed the relevant area guides
- provided a concise final summary including:
  - what changed
  - why
  - validation performed
  - assumptions or risks
  - commands run

End of file.
# State Management Guide

## Purpose

This guide defines how to make state decisions consistently.

---

## Principles

- Prefer local state first.
- Lift state only when necessary.
- Use the repository’s existing global state solution if one exists.
- Avoid creating new global state surfaces without strong need.

---

## Choosing state location

Prefer:
- component-local state for local UI concerns
- feature-level hooks for reusable feature behavior
- shared/global state only for truly cross-cutting data

Do not move state upward unless it clearly reduces duplication or fixes coordination problems.

---

## Global state rules

- Keep the store shape minimal.
- Avoid mixing server state and UI state unless that is already the project pattern.
- Avoid putting transient presentation state into global stores.

---

## Derived state

- Derive where practical instead of duplicating state.
- Avoid redundant mirrored values.
- Memoize derived state only when it solves a real problem.

---

## Async state

- Keep loading and error states explicit.
- Handle cancellation or cleanup when appropriate.
- Preserve existing patterns for fetching and invalidation.
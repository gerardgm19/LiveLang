# UI Guide

## Purpose

This guide defines rules for UI changes, styling, accessibility, and component design.

---

## General UI principles

- Preserve existing UX unless improvement is requested.
- Prefer consistency over novelty.
- Reuse existing components, tokens, and patterns.
- Keep interactions simple and predictable.
- Do not redesign unrelated screens during a focused task.

---

## Component design

- Prefer small functional components.
- Keep presentation and domain logic reasonably separated.
- Extract subcomponents when it improves readability, not just to reduce line count.
- Avoid deeply nested JSX when a clear extraction helps.

---

## Styling

Follow the repository’s existing styling system.

- Reuse theme tokens for color, spacing, radius, typography, and sizing.
- Do not hardcode values if tokens already exist.
- Prefer consistent spacing and alignment with nearby screens.
- Be careful with platform-specific styling differences.

---

## Accessibility

- Ensure interactive elements have meaningful labels.
- Add accessibility labels when icon-only controls are used.
- Avoid relying only on color to communicate state.
- Prefer touch targets that are comfortable on mobile.
- Preserve text readability and contrast.

---

## UI state behavior

- Handle loading, empty, error, and success states intentionally.
- Avoid blank screens when a state can be represented clearly.
- Show errors in a user-meaningful way when appropriate.
- Avoid noisy spinners or blocking patterns unless necessary.

---

## Lists and performance-sensitive UI

- Use stable keys.
- Prefer appropriate React Native list primitives for larger datasets.
- Avoid expensive work in render.
- Memoize only when there is a real rerender issue or strong justification.

---

## Shared UI primitives

Edit shared components carefully.
Before changing a shared primitive:
- inspect likely usages
- consider cross-screen effects
- keep backward compatibility unless the task requires otherwise

Prefer additive APIs over breaking changes.
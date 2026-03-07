# Data Access Guide

## Purpose

This guide defines rules for API usage, persistence, storage, caching, and external data handling.

---

## General rules

- Keep network and persistence logic out of route files where possible.
- Reuse existing API clients, request helpers, and storage abstractions.
- Preserve existing request/response contracts unless a migration is required.
- Validate external data at boundaries when appropriate.

---

## API changes

- Do not silently change endpoint behavior assumptions.
- Keep error handling explicit.
- Avoid swallowing failures.
- Prefer returning structured, typed results when patterns exist for that.

---

## Storage and persistence

- Treat persistence changes as behavior changes.
- Be careful with key names, migration assumptions, and cache invalidation.
- Do not rename storage keys casually.
- Document migration risk when changing persisted state structure.

---

## Offline and retry behavior

If the app already has patterns for retry, caching, optimistic updates, or offline states:
- follow them
- do not invent parallel mechanisms

---

## Sensitive areas

Treat these as high risk:
- auth/session handling
- tokens
- payment flows
- user profile writes
- destructive mutations
- release/update-related configuration fetched remotely

Be conservative and explicit.
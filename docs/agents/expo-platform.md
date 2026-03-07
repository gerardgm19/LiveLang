# Expo Platform Guide

## Purpose

This guide defines rules for Expo-specific, routing, build, and platform-sensitive changes.

---

## Expo workflow

- Prefer staying in Expo managed workflow.
- Do not introduce native changes unless explicitly required.
- Prefer Expo-supported libraries and config plugins.

---

## Expo Router

- Treat `app/` structure as part of the navigation API.
- Preserve `_layout.tsx` behavior.
- Keep route files focused on screen composition.
- Move non-routing logic into features, hooks, services, or components.

---

## App config

Edit `app.config.ts` carefully.

Do not change casually:
- app name
- slug
- scheme
- bundle identifier
- package name
- runtime version
- update configuration
- plugins
- permissions

Any such change must be called out explicitly in the final summary.

---

## EAS

Treat these as deployment-sensitive:
- `eas.json`
- channels
- branches
- build profiles
- update behavior
- runtime version

Do not modify them unless requested.

---

## Dependencies

When adding packages:
- prefer Expo-compatible packages
- prefer existing repo dependencies first
- avoid overlapping libraries
- call out any prebuild/native implication clearly

---

## Platform support

Unless scoped otherwise, preserve behavior across:
- iOS
- Android
- web

If a change is platform-specific, isolate it clearly and avoid unintended impact on the others.
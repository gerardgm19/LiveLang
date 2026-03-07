# Testing Guide

## Purpose

This guide defines how agents should validate changes and when to add or update tests.

---

## Validation order

Use the smallest relevant validation first:

1. type checks
2. lint
3. targeted tests
4. local smoke validation for affected routes/screens
5. broader validation only if the change touches shared infrastructure or config

---

## Expectations by change type

### Small UI copy or layout changes
- lint if needed
- typecheck if affected files are typed
- describe manual validation briefly

### Logic changes
- add or update targeted tests when the repo already has testing patterns
- validate edge cases
- do not leave behavior unverified if it is easy to test

### Shared utilities or hooks
- prefer adding focused tests
- be careful with regressions in downstream consumers

### Config/platform changes
- run the most relevant checks available
- explicitly mention anything that could not be validated locally

---

## Testing philosophy

- Prefer targeted tests over large speculative suites.
- Follow existing test patterns in the repository.
- Do not introduce a testing framework unless explicitly requested.
- Do not create brittle snapshot-heavy tests unless the repo already relies on them.

---

## Manual validation

When automated validation is not available, document:
- what was checked
- where it was checked
- what remains unverified

Be honest about gaps.
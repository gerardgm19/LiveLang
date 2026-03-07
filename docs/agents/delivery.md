# Delivery Guide

## Purpose

This guide defines how changes should be finished and summarized.

---

## Change hygiene

- Keep diffs small.
- Avoid unrelated formatting churn.
- Do not update lockfiles unless dependencies changed.
- Do not leave debug code behind unless intentionally useful.

---

## Final response format

Use this structure:

1. What changed
2. Why it changed
3. Validation performed
4. Assumptions or risks
5. Commands run
6. Optional next steps

Keep it concise and concrete.

---

## Honesty requirements

- State clearly what was validated and what was not.
- Mention assumptions.
- Mention deployment/config risk when present.
- Do not imply broader testing than was actually performed.
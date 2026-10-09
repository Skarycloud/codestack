# Coding standards

<!-- Rules a linter can't enforce. Show a real example from this repo for each. -->

## Naming

- [Rule] Example: [path]

## Structure

- Functions do one thing; [size guideline].
- [Module boundary rules]

## Types and validation

- [e.g. strict TypeScript, no any]
- Validate external input at the boundary with [library].

## Errors and logging

- [Pattern, see docs/ERROR_HANDLING.md]
- Log context, never secrets or personal data.

## Tests

- [Where tests live, naming, what each test covers]

## Comments

- Explain why, not what. No commented-out code.

## Changes

- Small diffs. No unrelated refactors or formatting changes in feature work.
- Update docs affected by the change in the same commit.

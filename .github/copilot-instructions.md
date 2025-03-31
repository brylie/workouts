This project uses pnpm for package management.

The project code is in the app/ directory, so make sure to run commands like installation and tests from within that directory.

When improving unit test coverage, run only the unit tests since running e2e tests may be unnecessary.

This project uses Svelte 5. Use the Svelte 5 runes syntax instead of the older `$:` syntax.

Always add semantic classes or IDs to important DOM elements, so our unit test and user interface can be self-documenting.

Prefer absolute imports like `$lib/types` instead of relative imports. Don't mix absolute and relative imports. Relative imports in the same directory are alright.

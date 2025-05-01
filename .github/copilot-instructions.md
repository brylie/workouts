# Copilot Instructions

## Package Management

This project uses pnpm for package management.

## Testing

When improving unit test coverage, run only the unit tests since running e2e tests may be unnecessary.

## Svelte 5

This project uses Svelte 5. Use the Svelte 5 runes syntax instead of the older `$:` syntax.


## Semantic Classes

Always add semantic classes or IDs to important DOM elements, so our unit test and user interface can be self-documenting.


## Imports

Prefer absolute imports like `$lib/types` instead of relative imports. Don't mix absolute and relative imports. Relative imports in the same directory are alright.


## UI Components

We use Tailwind CSS for styles and daisyUI for semantic components. Where possible, prefer daisyUI components for clean template code.

## Project Structure

Business logic should reside mainly in the lib folder (service layer) so our templates can be very thin.

## Working directory

The project code is in the app/ directory. All commands should be run from this directory.

Console commands will automaticlly be run in the app/ directory, so you don't need to prefix them with `pnpm --filter @workouts/app` or `cd app/`. Just run them as is.

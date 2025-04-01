# Workouts App

A SvelteKit-based personal training application using pnpm for package management.

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've cloned the project, install dependencies with pnpm:

```bash
pnpm install
```

Then start the development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev --open
```

## Testing

Run unit tests:

```bash
pnpm test:unit
```

Generate test coverage reports:

```bash
pnpm test:coverage
```

Run end-to-end tests:

```bash
pnpm test:e2e
```

## Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with:

```bash
pnpm preview
```

## Project Structure

- `src/lib/` - Contains core functionality:

  - `enums.ts` - Enumeration types
  - `types.ts` - TypeScript type definitions
  - `equipmentData.ts` - Available equipment data
  - `exerciseData.ts` - Exercise definitions
  - `components/` - Reusable Svelte components

- `src/routes/` - SvelteKit routes:
  - `/` - Home page
  - `/exercises/` - Exercise catalog
  - `/workout/` - Workout planning and tracking

## TypeScript Conventions

When importing types, follow this pattern:

```typescript
// Import types separately
import type { EquipmentDetails } from "./types";

// Import regular exports
import { Equipment } from "./enums";
```

## Adding Dependencies

To add a new dependency:

```bash
pnpm add <package-name>
```

Example:

```bash
pnpm add -D @vitest/coverage-v8@3.0.8
```

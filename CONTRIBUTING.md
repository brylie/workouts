# Contributing to Workouts

This document provides guidelines and instructions for contributing to the Workouts project.

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [pnpm](https://pnpm.io/) (for package management)

### Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/brylie/workouts.git
   cd workouts/app
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Start the development server
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:5173` by default.

## Project Structure

- `src/lib/` - Contains core functionality:

  - `types.ts` - TypeScript type definitions
  - `database.ts` - IndexedDB database interactions via Dexie
  - `exercises.ts` - Exercise filtering and workout generation
  - `muscles.ts` - Muscle group enums
  - `joints.ts` - Joint definitions
  - `equipment.ts` - Equipment enums
  - `components/` - Reusable Svelte components
  - `exercise_data/` - Exercise definitions by category

- `src/routes/` - SvelteKit routes:
  - `/` - Home page
  - `/exercises/` - Exercise catalog
  - `/workout/` - Workout planning and tracking
  - `/history/` - Exercise history and reporting
  - `/guidelines/` - Training guidelines

## Coding Standards

### Svelte 5 Runes

This project uses Svelte 5 with the new runes syntax. Use `$state()`, `$derived()`, etc. instead of the older `$:` reactive syntax:

```svelte
<script>
  // Use this (Svelte 5 runes)
  let count = $state(0);
  let doubled = $derived(count * 2);

  // Instead of this (Svelte < 5)
  // let count = 0;
  // $: doubled = count * 2;
</script>
```

### Imports

- Prefer absolute imports from `$lib` over relative imports
- Use consistent import ordering (built-ins, then external packages, then internal modules)

```ts
// Correct
import { browser } from "$app/environment";
import type { WorkoutItem } from "$lib/types";
import { saveCompletedExercise } from "$lib/database";

// Avoid mixing styles
import { browser } from "$app/environment";
import type { WorkoutItem } from "../lib/types"; // Bad: relative import
import { saveCompletedExercise } from "$lib/database";
```

### Semantic Element Naming

Add semantic classes or IDs to important DOM elements for testing and self-documentation:

```html
<!-- Good -->
<div class="workout-item">
  <h3 class="exercise-title">{item.exercise.title}</h3>
  <div class="exercise-metrics">...</div>
</div>

<!-- Avoid -->
<div>
  <h3>{item.exercise.title}</h3>
  <div>...</div>
</div>
```

## Testing

### Unit Tests

Run only unit tests during development (faster than running all tests):

```bash
cd app
pnpm test:unit
```

### End-to-End Tests

Run end-to-end tests when needed:

```bash
cd app
pnpm test:e2e
```

### All Tests

Run all tests before submitting PRs:

```bash
cd app
pnpm test
```

## Adding Dependencies

To add a new dependency:

```bash
cd app
pnpm add <package-name>
```

For dev dependencies:

```bash
cd app
pnpm add -D <package-name>
```

## Build and Deploy

```bash
cd app
pnpm build
```

The output will be in the `app/build` directory.

## Submitting Changes

1. Create a new branch for your feature or fix
2. Make your changes
3. Run tests to ensure everything works
4. Submit a pull request

## Ways to Contribute

We follow the [All Contributors](https://allcontributors.org/) philosophy and recognize various types of contributions. You don't need to be a developer to make a significant impact! Here are different ways you can contribute:

### Code Contributions 💻

- Implement new features
- Fix bugs
- Improve performance
- Write tests

### Documentation 📝

- Improve the README
- Document new features
- Create tutorials or how-to guides
- Fix typos or clarify existing documentation

### Design 🎨

- Improve UI/UX
- Create assets (icons, illustrations)
- Design mockups for new features
- Suggest visual improvements

### Testing and QA 🧪

- Report bugs
- Create test plans
- Perform manual testing
- Suggest quality improvements

### Content Creation 📊

- Add new exercises to the database
- Verify exercise descriptions
- Create workout routines
- Suggest improvements to exercise categorization

### Community Support 🙋‍♀️

- Answer questions in discussions
- Help users troubleshoot issues
- Review pull requests
- Mentor new contributors

### Feedback and Ideas 💡

- Suggest new features
- Participate in discussions
- Share your experience using the app
- Provide feedback on proposed changes

### Promotion 📣

- Write about the project
- Share on social media
- Create videos or demos
- Speak about the project at events

Every contribution matters, no matter how small! We appreciate all forms of help and are committed to recognizing all contributors.

Thank you for contributing to Workouts!

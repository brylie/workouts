# Contributing to Workouts

This document provides guidelines and instructions for contributing to the Workouts project.

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [pnpm](https://pnpm.io/) (for package management)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (for database migrations)

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

3. Set up Supabase (optional, for backend development)
   
   If you're working with the Supabase backend, you'll need to set up your local environment:
   
   ```bash
   # Install Supabase CLI if you haven't already
   npm install -g supabase
   
   # Login to Supabase
   supabase login
   
   # Link to your Supabase project (get the reference ID from the project settings)
   supabase link --project-ref your-project-ref
   ```

4. Start the development server
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:5173` by default.

## Working with Supabase

### Database Migrations

The project uses Supabase migrations to manage database schema changes. Migrations are stored in the `supabase/migrations/` directory.

#### Creating a New Migration

To create a new migration:

```bash
cd app
supabase migration new name_of_migration
```

This will create a new SQL file in the `supabase/migrations/` directory with a timestamp prefix.

#### Checking Migration Status

To see which migrations have been applied locally and remotely:

```bash
supabase migration list
```

#### Applying Migrations

To apply pending migrations to your local database:

```bash
supabase migration up
```

To push migrations to the remote Supabase instance:

```bash
supabase db push
```

#### Troubleshooting Migrations

If you encounter issues with migration synchronization between local and remote databases:

1. List the current migration status:
   ```bash
   supabase migration list
   ```

2. Repair migration history if needed:
   ```bash
   # Mark a migration as reverted
   supabase migration repair --status reverted <migration_version>
   
   # Mark a migration as applied
   supabase migration repair --status applied <migration_version>
   ```

3. Pull the current database schema:
   ```bash
   supabase db pull
   ```

### Environment Variables for Supabase

Create a `.env` file in the `app` directory with your Supabase credentials:

```bash
# Supabase connection
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# For subscription functionality
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

See `STRIPE_SETUP.md` for more details on setting up the subscription system.

## Project Structure

The project code is in the `app/` directory. All commands should be run from this directory. Console commands will automatically be run in the app/ directory.

- `src/lib/` - Contains core functionality (service layer):

  - `types.ts` - TypeScript type definitions
  - `database.ts` - IndexedDB database interactions via Dexie
  - `exercises.ts` - Exercise filtering and workout generation
  - `muscles.ts` - Muscle group enums
  - `joints.ts` - Joint definitions
  - `equipment.ts` - Equipment enums
  - `components/` - Reusable Svelte components
  - `exercise_data/` - Exercise definitions by category
  - `server/` - Server-side code for API endpoints

- `src/routes/` - SvelteKit routes:
  - `/` - Home page
  - `/exercises/` - Exercise catalog
  - `/workout/` - Workout planning and tracking
  - `/history/` - Exercise history and reporting
  - `/guidelines/` - Training guidelines
  - `/api/` - Server API endpoints

Business logic should reside mainly in the lib folder (service layer) so templates can remain thin.

## Coding Standards

### Package Management

This project uses pnpm for package management. Always use pnpm commands for installing, updating, or removing dependencies:

```bash
# Install dependencies
pnpm install

# Add a new dependency
pnpm add <package-name>

# Add a dev dependency
pnpm add -D <package-name>
```

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
- Don't mix absolute and relative imports
- Relative imports in the same directory are acceptable
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

### UI Components

We use Tailwind CSS for styles and daisyUI for semantic components. Where possible, prefer daisyUI components for clean template code.

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
pnpm test:unit
```

When improving unit test coverage, run only the unit tests since running e2e tests may be unnecessary.

### End-to-End Tests

Run end-to-end tests when needed:

```bash
pnpm test:e2e
```

### All Tests

Run all tests before submitting PRs:

```bash
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

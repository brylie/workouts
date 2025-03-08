This project uses pnpm for package management.

The project code is in the app/ directory, so make sure to run commands like installation and tests from within that directory.

TypeScript requires types to be imported explictly, and separately from other imports. For example:

import type { EquipmentDetails } from './types';
import { Equipment } from './enums';

When improving unit test coverage, run only the unit tests since running e2e tests may be unnecessary.

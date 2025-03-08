This project uses pnpm for package management.

TypeScript requires types to be imported explictly, and separately from other imports. For example:

import type { EquipmentDetails } from './types';
import { Equipment } from './enums';

When improving unit test coverage, run only the unit tests since running e2e tests may be unnecessary.

This project uses Deno for package management. For example:

deno install npm:@vitest/coverage-v8@3.0.8

TypeScript requires types to be imported explictly, and separately from other imports. For example:

import type { EquipmentDetails } from './types';
import { Equipment } from './enums';

When improving unit test coverage, run only the unit tests since running e2e tests may be unnecessary.

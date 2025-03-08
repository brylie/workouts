// Core database implementation
export * from './database';
export * from './errors';
export * from './types';

// Repositories
export * from './repositories/exercise-repository';
export * from './repositories/workout-repository';
export * from './repositories/workout-item-repository';

// Main service
export * from './database-service';

// Re-export the singleton instance for convenience
import { WorkoutDatabaseService } from './database-service';
export const db = WorkoutDatabaseService.getInstance();
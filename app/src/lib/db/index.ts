// Core database implementation
export * from './database';
export * from './types';

// Explicitly export error types and functions
import { DatabaseError, handleDatabaseError } from './errors';
export { DatabaseError, handleDatabaseError };

// Repositories
export * from './repositories/exercise-repository';
export * from './repositories/workout-repository';
export * from './repositories/workout-item-repository';

// Main service
export * from './database-service';

// Re-export the singleton instance for convenience
import { WorkoutDatabaseService } from './database-service';
export const db = WorkoutDatabaseService.getInstance();
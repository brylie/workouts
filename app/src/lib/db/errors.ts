import type { DBErrorType } from './types';

/**
 * Custom error class for database operations
 */
export class DatabaseError extends Error {
  type: DBErrorType;
  originalError?: Error;
  
  constructor(type: DBErrorType, message: string, originalError?: Error) {
    super(message);
    this.type = type;
    this.name = 'DatabaseError';
    this.originalError = originalError;
  }
}

/**
 * Error handler for database operations
 */
export const handleDatabaseError = (error: unknown, context?: string): never => {
  // If it's already our DatabaseError, just throw it
  if (error instanceof DatabaseError) {
    throw error;
  }
  
  let dbError: DatabaseError;
  
  if (error instanceof DOMException) {
    // Handle specific IndexedDB errors
    if (error.name === 'VersionError') {
      dbError = new DatabaseError(
        'CONNECTION_FAILED' as DBErrorType,
        `Database version error${context ? ` during ${context}` : ''}: ${error.message}`,
        error
      );
    } else if (error.name === 'ConstraintError') {
      dbError = new DatabaseError(
        'CONSTRAINT_ERROR' as DBErrorType,
        `Constraint error${context ? ` during ${context}` : ''}: ${error.message}`,
        error
      );
    } else if (error.name === 'NotFoundError') {
      dbError = new DatabaseError(
        'NOT_FOUND' as DBErrorType,
        `Not found error${context ? ` during ${context}` : ''}: ${error.message}`,
        error
      );
    } else if (error.name === 'TransactionInactiveError') {
      dbError = new DatabaseError(
        'TRANSACTION_FAILED' as DBErrorType,
        `Transaction failed${context ? ` during ${context}` : ''}: ${error.message}`,
        error
      );
    } else {
      dbError = new DatabaseError(
        'UNKNOWN_ERROR' as DBErrorType,
        `Unknown database error${context ? ` during ${context}` : ''}: ${error.message}`,
        error
      );
    }
  } else if (error instanceof Error) {
    dbError = new DatabaseError(
      'UNKNOWN_ERROR' as DBErrorType,
      `Error${context ? ` during ${context}` : ''}: ${error.message}`,
      error
    );
  } else {
    // For non-Error objects
    dbError = new DatabaseError(
      'UNKNOWN_ERROR' as DBErrorType,
      `Unknown error${context ? ` during ${context}` : ''}: ${String(error)}`,
      new Error(String(error))
    );
  }
  
  throw dbError;
};
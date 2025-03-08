import type { Equipment, Muscles } from '../enums';

/**
 * Database schema configuration
 */
export interface DBSchema {
  version: number;
  stores: Record<string, DBStoreSchema>;
}

/**
 * Database store schema configuration
 */
export interface DBStoreSchema {
  keyPath: string;
  indexes?: Record<string, DBIndexSchema>;
  autoIncrement?: boolean;
}

/**
 * Database index schema configuration
 */
export interface DBIndexSchema {
  unique?: boolean;
  multiEntry?: boolean;
}

/**
 * Configuration for database version migrations
 */
export interface DBMigrationConfig {
  version: number;
  migrate: (db: IDBDatabase) => void;
}

/**
 * Base entity interface for database objects
 */
export interface BaseEntity {
  id?: string | number;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Exercise entity stored in the database
 */
export interface ExerciseEntity extends BaseEntity {
  title: string;
  muscles: Muscles[];
  equipment?: Equipment[];
  description?: string;
}

/**
 * Workout entity stored in the database
 */
export interface WorkoutEntity extends BaseEntity {
  title: string;
  date: Date;
  notes?: string;
}

/**
 * WorkoutItem entity stored in the database
 */
export interface WorkoutItemEntity extends BaseEntity {
  workoutId: string | number;
  exerciseId: string | number;
  sets: number;
  reps?: number;
  weight?: number;
  time?: string;
  notes?: string;
}

/**
 * Repository query options
 */
export interface QueryOptions {
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  filters?: Record<string, unknown>;
}

/**
 * Database transaction modes
 */
export type TransactionMode = 'readonly' | 'readwrite';

/**
 * Repository interface for CRUD operations
 */
export interface Repository<T extends BaseEntity> {
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: string | number): Promise<void>;
  getById(id: string | number): Promise<T | null>;
  getAll(options?: QueryOptions): Promise<T[]>;
}

/**
 * Error types for IndexedDB operations
 */
export enum DBErrorType {
  CONNECTION_FAILED = 'CONNECTION_FAILED',
  TRANSACTION_FAILED = 'TRANSACTION_FAILED',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  CONSTRAINT_ERROR = 'CONSTRAINT_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}
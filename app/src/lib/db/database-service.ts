import { Database } from './database';
import { ExerciseRepository } from './repositories/exercise-repository';
import { WorkoutRepository } from './repositories/workout-repository';
import { WorkoutItemRepository } from './repositories/workout-item-repository';
import type { DBMigrationConfig, DBSchema, ExerciseEntity, WorkoutEntity, WorkoutItemEntity } from './types';
import { handleDatabaseError } from './errors';
import type { Muscles } from '../enums';

/**
 * Configuration for the workout database
 */
const DB_CONFIG = {
  name: 'workout-tracker',
  version: 1,
  schema: {
    version: 1,
    stores: {
      exercises: {
        keyPath: 'id',
        autoIncrement: true,
        indexes: {
          title: { unique: true }
        }
      },
      workouts: {
        keyPath: 'id',
        autoIncrement: true,
        indexes: {
          date: { unique: false }
        }
      },
      workoutItems: {
        keyPath: 'id',
        autoIncrement: true,
        indexes: {
          workoutId: { unique: false },
          exerciseId: { unique: false }
        }
      }
    }
  } as DBSchema,
  migrations: [] as DBMigrationConfig[]
};

/**
 * Service for interacting with the workout database
 */
export class WorkoutDatabaseService {
  private database: Database;
  private exerciseRepo: ExerciseRepository;
  private workoutRepo: WorkoutRepository;
  private workoutItemRepo: WorkoutItemRepository;
  private static instance: WorkoutDatabaseService;

  /**
   * Create a new WorkoutDatabaseService
   * @param config Optional configuration, defaults to DB_CONFIG
   */
  private constructor({ name, schema, migrations } = DB_CONFIG) {
    this.database = new Database(name, schema, migrations);
    this.exerciseRepo = new ExerciseRepository(this.database);
    this.workoutRepo = new WorkoutRepository(this.database);
    this.workoutItemRepo = new WorkoutItemRepository(this.database);
  }

  /**
   * Get the singleton instance of the WorkoutDatabaseService
   */
  public static getInstance(): WorkoutDatabaseService {
    if (!WorkoutDatabaseService.instance) {
      WorkoutDatabaseService.instance = new WorkoutDatabaseService();
    }
    return WorkoutDatabaseService.instance;
  }

  /**
   * Initialize the database connection
   */
  public async initialize(): Promise<void> {
    try {
      await this.database.connect();
    } catch (error) {
      handleDatabaseError(error, 'database initialization');
    }
  }

  /**
   * Close the database connection
   */
  public close(): void {
    this.database.close();
  }

  /**
   * Reset the database (for testing and development)
   */
  public async resetDatabase(): Promise<void> {
    await this.database.delete();
    // Create a new instance
    WorkoutDatabaseService.instance = new WorkoutDatabaseService();
    await this.initialize();
  }

  // Exercise operations

  /**
   * Create a new exercise
   * @param exercise Exercise to create
   */
  public async createExercise(exercise: ExerciseEntity): Promise<ExerciseEntity> {
    return this.exerciseRepo.create(exercise);
  }

  /**
   * Update an exercise
   * @param exercise Exercise to update
   */
  public async updateExercise(exercise: ExerciseEntity): Promise<ExerciseEntity> {
    return this.exerciseRepo.update(exercise);
  }

  /**
   * Delete an exercise
   * @param id ID of the exercise to delete
   */
  public async deleteExercise(id: string | number): Promise<void> {
    return this.exerciseRepo.delete(id);
  }

  /**
   * Get an exercise by ID
   * @param id ID of the exercise
   */
  public async getExerciseById(id: string | number): Promise<ExerciseEntity | null> {
    return this.exerciseRepo.getById(id);
  }

  /**
   * Get all exercises
   */
  public async getAllExercises(): Promise<ExerciseEntity[]> {
    return this.exerciseRepo.getAll();
  }

  /**
   * Find exercises by muscle group
   * @param muscle Muscle group
   */
  public async findExercisesByMuscle(muscle: Muscles): Promise<ExerciseEntity[]> {
    return this.exerciseRepo.findByMuscle(muscle);
  }

  /**
   * Find exercises by equipment
   * @param equipmentId Equipment ID
   */
  public async findExercisesByEquipment(equipmentId: string | number): Promise<ExerciseEntity[]> {
    return this.exerciseRepo.findByEquipment(equipmentId);
  }

  /**
   * Search exercises by title or description
   * @param query Search query
   */
  public async searchExercises(query: string): Promise<ExerciseEntity[]> {
    return this.exerciseRepo.search(query);
  }

  // Workout operations

  /**
   * Create a new workout
   * @param workout Workout to create
   */
  public async createWorkout(workout: WorkoutEntity): Promise<WorkoutEntity> {
    return this.workoutRepo.create(workout);
  }

  /**
   * Update a workout
   * @param workout Workout to update
   */
  public async updateWorkout(workout: WorkoutEntity): Promise<WorkoutEntity> {
    return this.workoutRepo.update(workout);
  }

  /**
   * Delete a workout and all its items
   * @param id ID of the workout to delete
   */
  public async deleteWorkout(id: string | number): Promise<void> {
    // First delete all items associated with this workout
    await this.workoutItemRepo.deleteByWorkoutId(id);
    // Then delete the workout itself
    return this.workoutRepo.delete(id);
  }

  /**
   * Get a workout by ID
   * @param id ID of the workout
   */
  public async getWorkoutById(id: string | number): Promise<WorkoutEntity | null> {
    return this.workoutRepo.getById(id);
  }

  /**
   * Get all workouts
   */
  public async getAllWorkouts(): Promise<WorkoutEntity[]> {
    return this.workoutRepo.getAll();
  }

  /**
   * Get recent workouts
   * @param limit Maximum number of workouts
   */
  public async getRecentWorkouts(limit: number = 10): Promise<WorkoutEntity[]> {
    return this.workoutRepo.getRecent(limit);
  }

  /**
   * Find workouts by date range
   * @param startDate Start date
   * @param endDate End date
   */
  public async findWorkoutsByDateRange(startDate: Date, endDate: Date): Promise<WorkoutEntity[]> {
    return this.workoutRepo.findByDateRange(startDate, endDate);
  }

  /**
   * Search workouts by title or notes
   * @param query Search query
   */
  public async searchWorkouts(query: string): Promise<WorkoutEntity[]> {
    return this.workoutRepo.search(query);
  }

  // Workout item operations

  /**
   * Create a workout item
   * @param item Workout item to create
   */
  public async createWorkoutItem(item: WorkoutItemEntity): Promise<WorkoutItemEntity> {
    return this.workoutItemRepo.create(item);
  }

  /**
   * Create multiple workout items at once
   * @param items Workout items to create
   */
  public async createWorkoutItems(items: WorkoutItemEntity[]): Promise<WorkoutItemEntity[]> {
    return this.workoutItemRepo.bulkCreate(items);
  }

  /**
   * Update a workout item
   * @param item Workout item to update
   */
  public async updateWorkoutItem(item: WorkoutItemEntity): Promise<WorkoutItemEntity> {
    return this.workoutItemRepo.update(item);
  }

  /**
   * Delete a workout item
   * @param id ID of the workout item to delete
   */
  public async deleteWorkoutItem(id: string | number): Promise<void> {
    return this.workoutItemRepo.delete(id);
  }

  /**
   * Get a workout item by ID
   * @param id ID of the workout item
   */
  public async getWorkoutItemById(id: string | number): Promise<WorkoutItemEntity | null> {
    return this.workoutItemRepo.getById(id);
  }

  /**
   * Get all workout items for a workout
   * @param workoutId ID of the workout
   */
  public async getWorkoutItemsByWorkoutId(workoutId: string | number): Promise<WorkoutItemEntity[]> {
    return this.workoutItemRepo.getByWorkoutId(workoutId);
  }

  /**
   * Get all workout items for an exercise
   * @param exerciseId ID of the exercise
   */
  public async getWorkoutItemsByExerciseId(exerciseId: string | number): Promise<WorkoutItemEntity[]> {
    return this.workoutItemRepo.getByExerciseId(exerciseId);
  }

  /**
   * Get complete workout with all items
   * @param workoutId ID of the workout
   */
  public async getCompleteWorkout(workoutId: string | number): Promise<{ workout: WorkoutEntity, items: WorkoutItemEntity[] } | null> {
    try {
      const workout = await this.getWorkoutById(workoutId);
      
      if (!workout) {
        return null;
      }
      
      const items = await this.getWorkoutItemsByWorkoutId(workoutId);
      
      return {
        workout,
        items
      };
    } catch (error) {
      return handleDatabaseError(error, 'complete workout retrieval');
    }
  }
}
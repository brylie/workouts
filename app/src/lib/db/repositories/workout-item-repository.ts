import type { Database } from '../database';
import { BaseRepository } from '../repository';
import { handleDatabaseError } from '../errors';
import type { WorkoutItemEntity } from '../types';

/**
 * Repository for managing workout item entities
 */
export class WorkoutItemRepository extends BaseRepository<WorkoutItemEntity> {
  /**
   * Create a new WorkoutItemRepository instance
   * @param database Database connection
   */
  constructor(database: Database) {
    super(database, 'workoutItems');
  }

  /**
   * Get workout items for a specific workout
   * @param workoutId ID of the workout
   * @returns Workout items for the given workout
   */
  async getByWorkoutId(workoutId: string | number): Promise<WorkoutItemEntity[]> {
    try {
      const store = await this.database.getObjectStore(this.storeName);
      
      return new Promise<WorkoutItemEntity[]>((resolve, reject) => {
        const request = store.openCursor();
        const results: WorkoutItemEntity[] = [];
        
        request.onsuccess = () => {
          const cursor = request.result;
          
          if (cursor) {
            const item = cursor.value;
            
            if (item.workoutId === workoutId) {
              results.push(item);
            }
            cursor.continue();
          } else {
            resolve(results);
          }
        };
        
        request.onerror = () => {
          reject(request.error);
        };
      });
    } catch (error) {
      return handleDatabaseError(error, 'workout items retrieval');
    }
  }

  /**
   * Delete all items for a specific workout
   * @param workoutId ID of the workout
   */
  async deleteByWorkoutId(workoutId: string | number): Promise<void> {
    try {
      // First get all items for this workout
      const items = await this.getByWorkoutId(workoutId);
      
      if (items.length === 0) {
        return;
      }
      
      const store = await this.database.getObjectStore(this.storeName, 'readwrite');
      
      // Delete each item in a transaction
      return new Promise<void>((resolve, reject) => {
        let completed = 0;
        let hasError = false;
        
        const checkComplete = () => {
          if (hasError) return;
          
          completed++;
          if (completed === items.length) {
            resolve();
          }
        };
        
        items.forEach(item => {
          const request = store.delete(item.id as IDBValidKey);
          
          request.onsuccess = checkComplete;
          
          request.onerror = () => {
            hasError = true;
            reject(request.error);
          };
        });
      });
    } catch (error) {
      return handleDatabaseError(error, 'workout items deletion');
    }
  }

  /**
   * Get workout items for a specific exercise
   * @param exerciseId ID of the exercise
   * @returns Workout items for the given exercise
   */
  async getByExerciseId(exerciseId: string | number): Promise<WorkoutItemEntity[]> {
    try {
      const store = await this.database.getObjectStore(this.storeName);
      
      return new Promise<WorkoutItemEntity[]>((resolve, reject) => {
        const request = store.openCursor();
        const results: WorkoutItemEntity[] = [];
        
        request.onsuccess = () => {
          const cursor = request.result;
          
          if (cursor) {
            const item = cursor.value;
            
            if (item.exerciseId === exerciseId) {
              results.push(item);
            }
            cursor.continue();
          } else {
            resolve(results);
          }
        };
        
        request.onerror = () => {
          reject(request.error);
        };
      });
    } catch (error) {
      return handleDatabaseError(error, 'exercise workout items retrieval');
    }
  }

  /**
   * Bulk create workout items
   * @param items Array of workout items to create
   * @returns Created workout items
   */
  async bulkCreate(items: WorkoutItemEntity[]): Promise<WorkoutItemEntity[]> {
    try {
      if (items.length === 0) {
        return [];
      }
      
      const store = await this.database.getObjectStore(this.storeName, 'readwrite');
      const now = new Date();
      const createdItems: WorkoutItemEntity[] = [];
      
      return new Promise<WorkoutItemEntity[]>((resolve, reject) => {
        let completed = 0;
        let hasError = false;
        
        const checkComplete = (item: WorkoutItemEntity, id: IDBValidKey) => {
          if (hasError) return;
          
          createdItems.push({
            ...item,
            id: id as string | number
          });
          
          completed++;
          if (completed === items.length) {
            resolve(createdItems);
          }
        };
        
        items.forEach(item => {
          const newItem = {
            ...item,
            createdAt: item.createdAt || now,
            updatedAt: now
          };
          
          const request = store.add(newItem);
          
          request.onsuccess = () => checkComplete(newItem, request.result);
          
          request.onerror = () => {
            hasError = true;
            reject(request.error);
          };
        });
      });
    } catch (error) {
      return handleDatabaseError(error, 'bulk workout items creation');
    }
  }
}
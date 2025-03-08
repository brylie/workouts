import type { Database } from '../database';
import { BaseRepository } from '../repository';
import type { ExerciseEntity } from '../types';
import type { Muscles } from '../../enums';

/**
 * Repository for managing exercise entities
 */
export class ExerciseRepository extends BaseRepository<ExerciseEntity> {
  /**
   * Create a new ExerciseRepository instance
   * @param database Database connection
   */
  constructor(database: Database) {
    super(database, 'exercises');
  }

  /**
   * Find exercises by muscle group
   * @param muscle Muscle group to search for
   * @returns Exercises that target the given muscle group
   */
  async findByMuscle(muscle: Muscles): Promise<ExerciseEntity[]> {
    const store = await this.database.getObjectStore(this.storeName);
    
    return new Promise<ExerciseEntity[]>((resolve, reject) => {
      const request = store.openCursor();
      const results: ExerciseEntity[] = [];
      
      request.onsuccess = () => {
        const cursor = request.result;
        
        if (cursor) {
          // Check if the exercise targets the given muscle
          if (cursor.value.muscles.includes(muscle)) {
            results.push(cursor.value);
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
  }

  /**
   * Find exercises by equipment type
   * @param equipmentId Equipment type to search for
   * @returns Exercises that use the given equipment
   */
  async findByEquipment(equipmentId: number | string): Promise<ExerciseEntity[]> {
    const store = await this.database.getObjectStore(this.storeName);
    
    return new Promise<ExerciseEntity[]>((resolve, reject) => {
      const request = store.openCursor();
      const results: ExerciseEntity[] = [];
      
      request.onsuccess = () => {
        const cursor = request.result;
        
        if (cursor) {
          // Check if the exercise uses the given equipment
          if (cursor.value.equipment?.includes(equipmentId)) {
            results.push(cursor.value);
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
  }

  /**
   * Search exercises by title or description
   * @param query Search query string
   * @returns Exercises matching the search query
   */
  async search(query: string): Promise<ExerciseEntity[]> {
    const store = await this.database.getObjectStore(this.storeName);
    const searchTerm = query.toLowerCase();
    
    return new Promise<ExerciseEntity[]>((resolve, reject) => {
      const request = store.openCursor();
      const results: ExerciseEntity[] = [];
      
      request.onsuccess = () => {
        const cursor = request.result;
        
        if (cursor) {
          const exercise = cursor.value;
          // Search in title and description
          if (
            exercise.title.toLowerCase().includes(searchTerm) ||
            (exercise.description && exercise.description.toLowerCase().includes(searchTerm))
          ) {
            results.push(exercise);
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
  }
}
import type { Database } from '../database';
import { BaseRepository } from '../repository';
import { handleDatabaseError } from '../errors';
import type { WorkoutEntity } from '../types';

/**
 * Repository for managing workout entities
 */
export class WorkoutRepository extends BaseRepository<WorkoutEntity> {
  /**
   * Create a new WorkoutRepository instance
   * @param database Database connection
   */
  constructor(database: Database) {
    super(database, 'workouts');
  }

  /**
   * Find workouts by date range
   * @param startDate Start date of range
   * @param endDate End date of range
   * @returns Workouts within the date range
   */
  async findByDateRange(startDate: Date, endDate: Date): Promise<WorkoutEntity[]> {
    try {
      const store = await this.database.getObjectStore(this.storeName);
      
      return new Promise<WorkoutEntity[]>((resolve, reject) => {
        const request = store.openCursor();
        const results: WorkoutEntity[] = [];
        
        request.onsuccess = () => {
          const cursor = request.result;
          
          if (cursor) {
            const workout = cursor.value;
            const workoutDate = new Date(workout.date);
            
            if (workoutDate >= startDate && workoutDate <= endDate) {
              results.push(workout);
            }
            cursor.continue();
          } else {
            // Sort results by date, newest first
            results.sort((a, b) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            resolve(results);
          }
        };
        
        request.onerror = () => {
          reject(request.error);
        };
      });
    } catch (error) {
      return handleDatabaseError(error, 'workout date range search');
    }
  }

  /**
   * Get recent workouts
   * @param limit Maximum number of workouts to return
   * @returns Recent workouts, ordered by date (newest first)
   */
  async getRecent(limit: number = 10): Promise<WorkoutEntity[]> {
    try {
      const store = await this.database.getObjectStore(this.storeName);
      
      return new Promise<WorkoutEntity[]>((resolve, reject) => {
        const request = store.openCursor();
        const results: WorkoutEntity[] = [];
        
        request.onsuccess = () => {
          const cursor = request.result;
          
          if (cursor) {
            results.push(cursor.value);
            cursor.continue();
          } else {
            // Sort results by date, newest first
            results.sort((a, b) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            
            // Limit results
            resolve(results.slice(0, limit));
          }
        };
        
        request.onerror = () => {
          reject(request.error);
        };
      });
    } catch (error) {
      return handleDatabaseError(error, 'recent workouts retrieval');
    }
  }

  /**
   * Search workouts by title or notes
   * @param query Search query
   * @returns Matching workouts
   */
  async search(query: string): Promise<WorkoutEntity[]> {
    try {
      const store = await this.database.getObjectStore(this.storeName);
      const searchTerm = query.toLowerCase();
      
      return new Promise<WorkoutEntity[]>((resolve, reject) => {
        const request = store.openCursor();
        const results: WorkoutEntity[] = [];
        
        request.onsuccess = () => {
          const cursor = request.result;
          
          if (cursor) {
            const workout = cursor.value;
            
            if (
              workout.title.toLowerCase().includes(searchTerm) ||
              (workout.notes && workout.notes.toLowerCase().includes(searchTerm))
            ) {
              results.push(workout);
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
      return handleDatabaseError(error, 'workout search');
    }
  }
}
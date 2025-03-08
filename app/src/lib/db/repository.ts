import { Database } from './index';
import { DatabaseError, handleDatabaseError } from './index';
import type { BaseEntity, QueryOptions, Repository as IRepository, TransactionMode } from './index';

/**
 * Base repository class implementing common CRUD operations
 */
export abstract class BaseRepository<T extends BaseEntity> implements IRepository<T> {
  protected readonly database: Database;
  protected readonly storeName: string;

  constructor(database: Database, storeName: string) {
    this.database = database;
    this.storeName = storeName;
  }

  /**
   * Create a new entity
   * @param entity Entity to create
   * @returns Created entity with ID
   */
  async create(entity: T): Promise<T> {
    try {
      const now = new Date();
      const newEntity = {
        ...entity,
        createdAt: entity.createdAt || now,
        updatedAt: now
      };

      const store = await this.database.getObjectStore(this.storeName, 'readwrite');
      
      return new Promise<T>((resolve, reject) => {
        const request = store.add(newEntity);
        
        request.onsuccess = () => {
          // Return the entity with the generated ID
          resolve({
            ...newEntity,
            id: request.result
          } as T);
        };
        
        request.onerror = () => {
          reject(request.error);
        };
      });
    } catch (error) {
      return handleDatabaseError(error, 'entity creation');
    }
  }

  /**
   * Update an entity
   * @param entity Entity to update
   * @returns Updated entity
   */
  async update(entity: T): Promise<T> {
    try {
      if (entity.id === undefined) {
        throw new DatabaseError(
          'VALIDATION_ERROR',
          'Cannot update entity without ID',
          new Error('Entity ID is required for update operation')
        );
      }

      const existingEntity = await this.getById(entity.id);
      
      if (!existingEntity) {
        throw new DatabaseError(
          'NOT_FOUND',
          `Entity with ID ${entity.id} not found`,
          new Error(`No entity found with ID ${entity.id}`)
        );
      }

      const updatedEntity = {
        ...entity,
        createdAt: existingEntity.createdAt,
        updatedAt: new Date()
      };

      const store = await this.database.getObjectStore(this.storeName, 'readwrite');
      
      return new Promise<T>((resolve, reject) => {
        const request = store.put(updatedEntity);
        
        request.onsuccess = () => {
          resolve(updatedEntity);
        };
        
        request.onerror = () => {
          reject(request.error);
        };
      });
    } catch (error) {
      return handleDatabaseError(error, 'entity update');
    }
  }

  /**
   * Delete an entity by ID
   * @param id ID of the entity to delete
   */
  async delete(id: string | number): Promise<void> {
    try {
      const store = await this.database.getObjectStore(this.storeName, 'readwrite');
      
      return new Promise<void>((resolve, reject) => {
        const request = store.delete(id);
        
        request.onsuccess = () => {
          resolve();
        };
        
        request.onerror = () => {
          reject(request.error);
        };
      });
    } catch (error) {
      return handleDatabaseError(error, 'entity deletion');
    }
  }

  /**
   * Get an entity by ID
   * @param id ID of the entity to retrieve
   * @returns Entity or null if not found
   */
  async getById(id: string | number): Promise<T | null> {
    try {
      const store = await this.database.getObjectStore(this.storeName);
      
      return new Promise<T | null>((resolve, reject) => {
        const request = store.get(id);
        
        request.onsuccess = () => {
          resolve(request.result || null);
        };
        
        request.onerror = () => {
          reject(request.error);
        };
      });
    } catch (error) {
      return handleDatabaseError(error, 'entity retrieval');
    }
  }

  /**
   * Get all entities with optional filters, sorting and pagination
   * @param options Query options
   * @returns Array of entities
   */
  async getAll(options?: QueryOptions): Promise<T[]> {
    try {
      const store = await this.database.getObjectStore(this.storeName);
      
      return new Promise<T[]>((resolve, reject) => {
        const request = store.openCursor();
        const results: T[] = [];
        let skipCount = 0;
        const offset = options?.offset || 0;
        const limit = options?.limit;
        
        request.onsuccess = () => {
          const cursor = request.result;
          
          if (cursor) {
            // Handle offset by skipping records
            if (skipCount < offset) {
              skipCount++;
              cursor.continue();
              return;
            }

            // Handle filtering if provided
            let includeItem = true;
            if (options?.filters) {
              for (const [key, value] of Object.entries(options.filters)) {
                if (cursor.value[key] !== value) {
                  includeItem = false;
                  break;
                }
              }
            }

            if (includeItem) {
              results.push(cursor.value);
            }

            // Check if we've reached the limit
            if (limit && results.length >= limit) {
              resolve(results);
              return;
            }

            cursor.continue();
          } else {
            // Apply sorting if needed
            if (options?.sortBy) {
              const direction = options.sortDirection === 'desc' ? -1 : 1;
              results.sort((a, b) => {
                const aValue = a[options.sortBy as keyof T];
                const bValue = b[options.sortBy as keyof T];

                if (aValue < bValue) return -1 * direction;
                if (aValue > bValue) return 1 * direction;
                return 0;
              });
            }

            resolve(results);
          }
        };
        
        request.onerror = () => {
          reject(request.error);
        };
      });
    } catch (error) {
      return handleDatabaseError(error, 'entity listing');
    }
  }

  /**
   * Helper method to work with transactions
   * @param mode Transaction mode
   * @param callback Function to execute within transaction
   * @returns Result of callback
   */
  protected async withTransaction<R>(
    mode: TransactionMode, 
    callback: (store: IDBObjectStore) => Promise<R>
  ): Promise<R> {
    const store = await this.database.getObjectStore(this.storeName, mode);
    const transaction = store.transaction;
    
    try {
      const result = await callback(store);
      return result;
    } catch (error) {
      transaction.abort();
      return handleDatabaseError(error, 'transaction');
    }
  }
}
import { handleDatabaseError } from './errors';
import type { DBMigrationConfig, DBSchema } from './types';

/**
 * Database manager class for handling IndexedDB connection and migrations
 */
export class Database {
  private readonly name: string;
  private readonly schema: DBSchema;
  private readonly migrations: DBMigrationConfig[];
  private db: IDBDatabase | null = null;
  private connectionPromise: Promise<IDBDatabase> | null = null;

  /**
   * Create a new Database instance
   * @param name The name of the database
   * @param schema The database schema
   * @param migrations Array of migration configurations
   */
  constructor(name: string, schema: DBSchema, migrations: DBMigrationConfig[] = []) {
    this.name = name;
    this.schema = schema;
    this.migrations = migrations.sort((a, b) => a.version - b.version);
  }

  /**
   * Connect to the database or return existing connection
   */
  async connect(): Promise<IDBDatabase> {
    // If we already have a connection, return it
    if (this.db) {
      return this.db;
    }

    // If we're in the process of connecting, return that promise
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    // Otherwise, create a new connection
    this.connectionPromise = new Promise<IDBDatabase>((resolve, reject) => {
      try {
        const request = indexedDB.open(this.name, this.schema.version);

        request.onupgradeneeded = (event) => {
          try {
            const db = request.result;
            const oldVersion = event.oldVersion;
            const newVersion = event.newVersion || this.schema.version;

            this.setupSchema(db);
            this.runMigrations(db, oldVersion, newVersion);
          } catch (error) {
            reject(error);
          }
        };

        request.onsuccess = () => {
          this.db = request.result;

          // Handle connection closing
          this.db.onclose = () => {
            this.db = null;
            this.connectionPromise = null;
          };

          // Handle version change
          this.db.onversionchange = () => {
            if (this.db) {
              this.db.close();
              this.db = null;
              this.connectionPromise = null;
            }
          };

          resolve(this.db);
        };

        request.onerror = () => {
          reject(request.error);
        };
      } catch (error) {
        reject(error);
      }
    }).catch((error) => {
      this.connectionPromise = null;
      return handleDatabaseError(error, 'database connection');
    });

    return this.connectionPromise;
  }

  /**
   * Close the database connection
   */
  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
      this.connectionPromise = null;
    }
  }

  /**
   * Delete the database
   */
  async delete(): Promise<void> {
    this.close();

    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.deleteDatabase(this.name);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    }).catch((error) => {
      handleDatabaseError(error, 'database deletion');
      return Promise.resolve();
    });
  }

  /**
   * Create a transaction
   * @param storeNames Names of object stores to include in transaction
   * @param mode Transaction mode (readonly or readwrite)
   */
  async createTransaction(
    storeNames: string | string[],
    mode: IDBTransactionMode = 'readonly'
  ): Promise<IDBTransaction> {
    const db = await this.connect();
    return db.transaction(storeNames, mode);
  }

  /**
   * Get an object store
   * @param storeName Name of the object store
   * @param mode Transaction mode
   */
  async getObjectStore(
    storeName: string,
    mode: IDBTransactionMode = 'readonly'
  ): Promise<IDBObjectStore> {
    const transaction = await this.createTransaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  /**
   * Setup database schema
   * @param db IDBDatabase instance
   */
  private setupSchema(db: IDBDatabase): void {
    // Create object stores and indexes based on schema
    for (const [storeName, storeSchema] of Object.entries(this.schema.stores)) {
      // Skip if object store already exists
      if (db.objectStoreNames.contains(storeName)) {
        continue;
      }

      // Create object store
      const objectStore = db.createObjectStore(storeName, {
        keyPath: storeSchema.keyPath,
        autoIncrement: storeSchema.autoIncrement ?? false
      });

      // Create indexes
      if (storeSchema.indexes) {
        for (const [indexName, indexSchema] of Object.entries(storeSchema.indexes)) {
          objectStore.createIndex(indexName, indexName, {
            unique: indexSchema.unique ?? false,
            multiEntry: indexSchema.multiEntry ?? false
          });
        }
      }
    }
  }

  /**
   * Run migrations
   * @param db IDBDatabase instance
   * @param oldVersion Old database version
   * @param newVersion New database version
   */
  private runMigrations(db: IDBDatabase, oldVersion: number, newVersion: number): void {
    // Run each migration if its version is greater than the old version
    // and less than or equal to the new version
    for (const migration of this.migrations) {
      if (migration.version > oldVersion && migration.version <= newVersion) {
        migration.migrate(db);
      }
    }
  }
}
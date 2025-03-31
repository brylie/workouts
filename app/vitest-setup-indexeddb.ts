// Import fake-indexeddb to provide a complete in-memory implementation
import 'fake-indexeddb/auto';
import { IDBFactory, IDBKeyRange } from 'fake-indexeddb';

// Make sure indexedDB is globally available
if (!global.indexedDB) {
	global.indexedDB = new IDBFactory();
}

// Add other IndexedDB-related globals if needed
if (!global.IDBKeyRange) {
	global.IDBKeyRange = IDBKeyRange;
}

// Permanent Storage Manager using IndexedDB
// This provides reliable, permanent storage for portfolio data

const StorageManager = {
    dbName: 'PortfolioDB',
    dbVersion: 1,
    storeName: 'portfolioStore',
    db: null,

    // Initialize IndexedDB
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => {
                console.error('IndexedDB error:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log('✅ IndexedDB initialized successfully');
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'id' });
                    console.log('📦 Object store created');
                }
            };
        });
    },

    // Save data to IndexedDB
    async save(data) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);

            // Store with a fixed ID so we always update the same record
            const dataWithId = { ...data, id: 'portfolio_data' };
            const request = store.put(dataWithId);

            request.onsuccess = () => {
                console.log('💾 Data saved to IndexedDB');
                // Also backup to localStorage as fallback
                try {
                    localStorage.setItem('portfolioData', JSON.stringify(data));
                    localStorage.setItem('portfolioData_backup', JSON.stringify(data));
                    localStorage.setItem('portfolioData_timestamp', new Date().toISOString());
                } catch (e) {
                    console.warn('localStorage backup failed:', e);
                }
                resolve(true);
            };

            request.onerror = () => {
                console.error('Save error:', request.error);
                reject(request.error);
            };
        });
    },

    // Load data from IndexedDB
    async load() {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get('portfolio_data');

            request.onsuccess = () => {
                if (request.result) {
                    const data = { ...request.result };
                    delete data.id; // Remove the internal ID
                    console.log('📂 Data loaded from IndexedDB');
                    resolve(data);
                } else {
                    // Try localStorage as fallback
                    const localData = this.loadFromLocalStorage();
                    resolve(localData);
                }
            };

            request.onerror = () => {
                console.error('Load error:', request.error);
                // Fallback to localStorage
                resolve(this.loadFromLocalStorage());
            };
        });
    },

    // Load from localStorage (fallback)
    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('portfolioData');
            if (saved) {
                console.log('📂 Data loaded from localStorage (fallback)');
                return JSON.parse(saved);
            }
        } catch (e) {
            console.error('localStorage load error:', e);
        }
        return null;
    },

    // Check if data exists
    async hasData() {
        if (!this.db) await this.init();

        return new Promise((resolve) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get('portfolio_data');

            request.onsuccess = () => {
                resolve(!!request.result);
            };

            request.onerror = () => {
                resolve(false);
            };
        });
    },

    // Clear all data
    async clear() {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.clear();

            request.onsuccess = () => {
                localStorage.removeItem('portfolioData');
                localStorage.removeItem('portfolioData_backup');
                localStorage.removeItem('portfolioData_timestamp');
                console.log('🗑️ All data cleared');
                resolve(true);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    },

    // Export data as downloadable JSON
    exportToFile(data) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log('📥 Data exported to file');
    },

    // Get storage info
    async getStorageInfo() {
        const timestamp = localStorage.getItem('portfolioData_timestamp');
        const hasData = await this.hasData();
        return {
            hasData,
            lastSaved: timestamp ? new Date(timestamp).toLocaleString() : 'Never',
            storageType: 'IndexedDB + localStorage backup'
        };
    }
};

// Initialize storage on load
StorageManager.init().catch(console.error);

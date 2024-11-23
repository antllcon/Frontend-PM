export class IndexedDB {
    // Приватные поля
    private readonly dbName: string;
    private readonly version: number;

    // Конструктор
    constructor(dbName: string, version: number) {
        this.dbName = dbName;
        this.version = version;
    }

    // Инициализация базы данных
    init(objectStores: Array<{name: string; keyPath: string}>): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onupgradeneeded = () => {
                const db = request.result;
                objectStores.forEach((store) => {
                    if (!db.objectStoreNames.contains(store.name)) {
                        db.createObjectStore(store.name, {keyPath: store.keyPath});
                    }
                });
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Добавление данных
    addData(storeName: string, data: { id: string; src: string }): Promise<void> {
        return new Promise((resolve, reject) => {
            const dbRequest = indexedDB.open(this.dbName, this.version);

            dbRequest.onsuccess = () => {
                const db = dbRequest.result;
                const transaction = db.transaction(storeName, "readwrite");
                const store = transaction.objectStore(storeName);

                store.put(data);

                transaction.oncomplete = () => resolve();
                transaction.onerror = () => reject(transaction.error);
            };

            dbRequest.onerror = () => reject(dbRequest.error);
        });
    }

    // Получение данных
    getData(storeName: string, id: string): Promise<{ id: string; src: string } | null> {
        return new Promise((resolve, reject) => {
            const dbRequest = indexedDB.open(this.dbName, this.version);

            dbRequest.onsuccess = () => {
                const db = dbRequest.result;
                const transaction = db.transaction(storeName, "readonly");
                const store = transaction.objectStore(storeName);

                const getRequest = store.get(id); // Передаём только ключ (ID)
                getRequest.onsuccess = () => resolve(getRequest.result || null); // Возвращаем результат
                getRequest.onerror = () => reject(getRequest.error);
            };

            dbRequest.onerror = () => reject(dbRequest.error);
        });
    }

    // Удаление данных
    deleteData(storeName: string, key: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const dbRequest = indexedDB.open(this.dbName, this.version);

            dbRequest.onsuccess = () => {
                const db = dbRequest.result;
                const transaction = db.transaction(storeName, "readwrite");
                const store = transaction.objectStore(storeName);

                store.delete(key);

                transaction.oncomplete = () => resolve();
                transaction.onerror = () => reject(transaction.error);
            };

            dbRequest.onerror = () => reject(dbRequest.error);
        });
    }
}

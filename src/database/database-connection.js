import * as SQLite from 'expo-sqlite';
const dbName = 'database.db';

const DatabaseConnection = {
    getConnection: () => {
        return SQLite.openDatabase(dbName);
    }
};

export default DatabaseConnection;

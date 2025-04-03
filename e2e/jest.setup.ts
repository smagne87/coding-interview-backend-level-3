import { AppDataSource } from "../src/config/dbDataSource";

const clearDatabase = async () => {
    if (AppDataSource.isInitialized) {
        const entities = AppDataSource.entityMetadatas;
        for (const entity of entities) {
            const repository = AppDataSource.getRepository(entity.name);
            await repository.clear(); // Elimina todos los registros de la tabla
        }
    }
};

// Ejecutar la limpieza antes de correr los tests
beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    await clearDatabase();
});

afterAll(async () => {
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
    }
});

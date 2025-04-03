import "reflect-metadata";
import { DataSource } from "typeorm";
import { configDotenv } from "dotenv";

import { Item } from "../entities/item.entity";

configDotenv();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "itemsdb",
  entities: [Item],
  migrations: ["src/migrations/**/*.ts"],
  migrationsTableName: "migrations",
  synchronize: process.env.NODE_ENV !== "production",
  logging: process.env.NODE_ENV !== "production",
});

export const initializeDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
};

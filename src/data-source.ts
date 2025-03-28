import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

// Initialize TypeORM DataSource
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'superuser',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'mydb',
    entities: [__dirname + '/entities/*.ts'],
    synchronize: true, // Auto-create tables (Avoid in Production)
    logging: false,
});


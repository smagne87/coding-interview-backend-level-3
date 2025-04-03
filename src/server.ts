import * as Hapi from '@hapi/hapi'
import { initializeDatabase } from './config/dbDataSource';
import { itemRoutes } from './routes/item.routes';
import { configDotenv } from 'dotenv';

configDotenv();

const getServer = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: "0.0.0.0",
    })

    server.route({
        method: 'GET',
        path: '/ping',
        handler: async (request, h) => {
            return { ok: true };
        },
    });

    server.route(itemRoutes);

    await initializeDatabase();;

    return server
}

export const initializeServer = async () => {
    const server = await getServer()
    await server.initialize()
    return server
}

export const startServer = async () => {
    const server = await getServer()
    await server.start()
    console.log(`Server running on ${server.info.uri}`)
    return server
};
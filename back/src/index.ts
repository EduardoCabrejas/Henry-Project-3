import dotenv from 'dotenv';
dotenv.config();
import { PORT } from "./config/envs";
import server from "./server";
import "reflect-metadata"
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
.then(() => {
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
});
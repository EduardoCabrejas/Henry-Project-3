import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Credentials } from "../entities/Credentials";
import { Turns } from "../entities/Turns";
import { DB_HOST ,DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } from "./envs";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: [User, Credentials, Turns],
    subscribers: [],
    migrations: [],
});

export const UserModel = AppDataSource.getRepository(User);
export const CredentialsModel = AppDataSource.getRepository(Credentials);
export const TurnsModel = AppDataSource.getRepository(Turns);

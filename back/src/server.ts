import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import uRouter from "./routes/usersRouter";
import TRouter from "./routes/turnsRouter";
import eRouter from "./routes/emailRouter"

const server = express();

server.use(morgan('dev'))
server.use(cors());
server.use(express.json());
server.use(uRouter);
server.use(TRouter);
server.use(eRouter);

export default server;
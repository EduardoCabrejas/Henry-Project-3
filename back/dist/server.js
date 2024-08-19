"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const usersRouter_1 = __importDefault(require("./routes/usersRouter"));
const turnsRouter_1 = __importDefault(require("./routes/turnsRouter"));
const emailRouter_1 = __importDefault(require("./routes/emailRouter"));
const server = (0, express_1.default)();
server.use((0, morgan_1.default)('dev'));
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(usersRouter_1.default);
server.use(turnsRouter_1.default);
server.use(emailRouter_1.default);
exports.default = server;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCredentials = exports.registerUserService = void 0;
const data_source_1 = require("../config/data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUserService = (userDTO, credentialDTO) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield data_source_1.UserModel.findOne({ where: [{ email: userDTO.email }, { nDni: userDTO.nDni }] });
    const existingCredentials = yield data_source_1.CredentialsModel.findOne({ where: { username: credentialDTO.username } });
    if (existingUser) {
        throw new Error(`El usuario con email ${userDTO.email} o N.DNI ${userDTO.nDni} ya existe`);
    }
    if (existingCredentials) {
        throw new Error(`El nombre de usuario ${credentialDTO.username} ya está en uso`);
    }
    const hashedPassword = yield bcrypt_1.default.hash(credentialDTO.password, 10);
    const newUser = data_source_1.UserModel.create({
        name: userDTO.name,
        email: userDTO.email,
        birthdate: userDTO.birthdate,
        nDni: userDTO.nDni,
    });
    yield data_source_1.UserModel.save(newUser);
    const newCredentials = data_source_1.CredentialsModel.create({
        username: credentialDTO.username,
        password: hashedPassword
    });
    newCredentials.userId = newUser.id;
    yield data_source_1.CredentialsModel.save(newCredentials);
    return newCredentials;
});
exports.registerUserService = registerUserService;
const validateCredentials = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCredentials = yield data_source_1.CredentialsModel.findOne({ where: { username: username } });
    if (!existingCredentials) {
        throw new Error("Credenciales inválidas");
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, existingCredentials.password);
    if (!passwordMatch) {
        throw new Error("Credenciales inválidas");
    }
    return existingCredentials.userId;
});
exports.validateCredentials = validateCredentials;

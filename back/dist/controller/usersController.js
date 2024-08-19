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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.getUserByIdController = exports.getAllUsersController = exports.registerUserController = void 0;
const usersService_1 = require("../service/usersService");
const credentialsService_1 = require("../service/credentialsService");
const credentialsService_2 = require("../service/credentialsService");
const usersService_2 = require("../service/usersService");
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userDTO = {
        name: req.body.name,
        email: req.body.email,
        birthdate: req.body.birthdate,
        nDni: req.body.nDni,
    };
    const credentialDTO = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        yield (0, credentialsService_1.registerUserService)(userDTO, credentialDTO);
        res.status(201).json({ message: `Usuario registrado exitosamente`, user: userDTO });
        console.log("Usuario Creado:", userDTO);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(`Error al registrar usuario: ${error.message}`);
            console.log(error);
        }
        else {
            res.status(400).send("Error al registrar usuario: error desconocido");
            console.log(error);
        }
    }
});
exports.registerUserController = registerUserController;
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usersService_1.getUserService)();
        res.status(200).json(users);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).send(`Error al obtener todos los usuarios: ${error.message}`);
    }
});
exports.getAllUsersController = getAllUsersController;
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    try {
        const user = yield (0, usersService_1.getUserByIdService)(userId);
        if (!user) {
            res.status(404).send("Usuario no encontrado");
            return;
        }
        res.status(200).json({ message: `Usuario con ID ${userId} encontrado:`, user });
    }
    catch (error) {
        res.status(400).send("Error al obtener usuario por ID");
    }
});
exports.getUserByIdController = getUserByIdController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const credential = yield (0, credentialsService_2.validateCredentials)(username, password);
        const user = yield (0, usersService_2.findUserByCredentialId)(credential);
        res.status(200).json({
            login: true,
            message: "Iniciando sesión del Usuario",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                birthdate: user.birthdate,
                nDni: user.nDni,
                profilePicture: user.profilePicture,
            }
        });
    }
    catch (error) {
        res.status(400).send("Los datos de inicio de sesión son incorrectos");
    }
});
exports.loginController = loginController;

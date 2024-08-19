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
exports.login = void 0;
const credentialsService_1 = require("../service/credentialsService");
const usersService_1 = require("./usersService");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const credential = yield (0, credentialsService_1.validateCredentials)(username, password);
        const user = yield (0, usersService_1.findUserByCredentialId)(credential);
        res.status(200).json({
            login: true,
            message: "Iniciando sesión del Usuario",
            user,
        });
    }
    catch (error) {
        res.status(400).send("Los datos de inicio de sesión son incorrectos");
    }
});
exports.login = login;

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
exports.findUserByCredentialId = exports.getUserByIdService = exports.getUserService = void 0;
const data_source_1 = require("../config/data-source");
const getUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield data_source_1.UserModel.find();
    for (const user of allUsers) {
        const turns = yield data_source_1.TurnsModel.find({ where: { userId: user.id } });
        user.turns = turns;
    }
    return allUsers;
});
exports.getUserService = getUserService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.UserModel.findOne({
        where: { id },
        relations: { turns: true }
    });
    if (!user)
        throw new Error("User not found");
    return user;
});
exports.getUserByIdService = getUserByIdService;
const findUserByCredentialId = (credentialId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.UserModel.findOneBy({
        credentials: { id: credentialId }
    });
    if (!user)
        throw new Error("User not found");
    return user;
});
exports.findUserByCredentialId = findUserByCredentialId;

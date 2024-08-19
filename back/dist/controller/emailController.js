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
exports.emailController = void 0;
const emailService_1 = require("../service/emailService");
const emailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, turnId } = req.body;
    try {
        yield (0, emailService_1.emailService)(userId, turnId);
        res.status(200).json({ message: 'Correo enviado exitosamente' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error al enviar correo electrónico', error: error.message });
        }
    }
});
exports.emailController = emailController;

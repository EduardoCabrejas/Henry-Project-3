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
exports.emailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const data_source_1 = require("../config/data-source");
const envs_1 = require("../config/envs");
// Configuración del transporter de nodemailer
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: envs_1.EMUS,
        pass: envs_1.EMPS,
    },
});
const emailService = (userId, turnId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.UserModel.findOne({
        where: { id: userId },
        relations: ['turns']
    });
    if (!user) {
        throw new Error("Usuario no encontrado");
    }
    const turn = yield data_source_1.TurnsModel.findOne({ where: { id: turnId } });
    if (!turn) {
        throw new Error("Turno no encontrado");
    }
    // Configurar opciones del correo
    const mailOptions = {
        from: envs_1.EMUS,
        to: user.email,
        subject: 'Confirmación de Turno',
        text: `Hola ${user.name}, tu turno ha sido creado exitosamente. Detalles del turno: ${turn}`,
    };
    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error al enviar el correo electrónico:", error);
            throw error; // Lanzar error si falla el envío
        }
        else {
            return info.response;
        }
    });
});
exports.emailService = emailService;

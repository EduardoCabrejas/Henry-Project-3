import nodemailer from 'nodemailer';
import { UserModel, TurnsModel } from "../config/data-source";
import {EMUS, EMPS} from '../config/envs'

// Configuración del transporter de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMUS,
        pass: EMPS,
    },
});

export const emailService = async (userId: number, turnId: number) => {

        const user = await UserModel.findOne({ 
            where: { id: userId },
            relations: ['turns']
        });

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        const turn = await TurnsModel.findOne({ where: { id: turnId } });
        if (!turn) {
            throw new Error("Turno no encontrado");
        }

        // Configurar opciones del correo
        const mailOptions = {
            from: EMUS,
            to: user.email,
            subject: 'Confirmación de Turno',
            text: `Hola ${user.name}, tu turno ha sido creado exitosamente. Detalles del turno: ${turn}`,
        };

        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error al enviar el correo electrónico:", error);
                throw error; // Lanzar error si falla el envío
            } else {
                return info.response;
            }
        });
};

import { Request, Response } from "express";
import { emailService } from "../service/emailService";

export const emailController = async (req: Request, res: Response) => {
    const { userId, turnId } = req.body;
    try {
        await emailService(userId, turnId);
        res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error al enviar correo electrónico', error: error.message });
        }
    }
};

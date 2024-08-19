import { Request, Response } from "express";
import {createTurn, getTurns, getTurnById, cancelTurn, checkAvailability} from "../service/turnsService";

export const getUserTurnsController = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    try {
        const turns = await getTurns(userId);
        res.status(200).json({ message: `Turnos encontrados`, turns});
    } catch (error) {
        res.status(404).json({ message: "No se encontraron turnos", error});
    }
};

export const getTurnByIdController = async (req: Request, res: Response) => {
    try {
        const turnId = parseInt(req.params.id);
        if (isNaN(turnId)) {
            res.status(400).json({ message: 'ID de turno inválido' });
            return;
        }

        const turn = await getTurnById(turnId);
        if (turn) {
            res.status(200).json({ message: `Turno con ID ${turnId} encontrado`, turn });
        } else {
            res.status(404).json({ message: `Turno con ID ${turnId} no encontrado` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const createTurnController = async (req: Request, res: Response) => {
    const { date, time, activity, userId } = req.body;
    if (!date || !time || !userId) {
        return res.status(400).json({ message: 'Faltan campos obligatorios para crear un turno.' });
    }
    const turnData = {
        date,
        time,
        activity,
        userId,
    };
    try {
        const newTurn = await createTurn(turnData);
        res.status(201).json({ message: 'Turno creado exitosamente.', newTurn });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Este día y horario de turno se encuentra ocupado.') {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'Error al crear el turno:', error: error.message });
            }
        }
    }
};

export const cancelTurnController = async (req: Request, res: Response) => {
    const turnId = parseInt(req.params.id);
    const success = await cancelTurn(turnId);
    if (success) {
        res.status(200).json({ success: true, message: `Turno con ID ${turnId} cancelado correctamente` });
    } else {
        res.status(404).json({ success: false, message: `Turno con ID ${turnId} no encontrado o ya cancelado` });
    }
};

export const checkAvailabilityController = async (req: Request, res: Response): Promise<void> => {
    const { date, time } = req.body;
    try {
        const isAvailable = await checkAvailability(date, time);
        if (isAvailable) {
            res.status(200).json({ message: 'Disponible' });
        } else {
            res.status(409).json({ message: 'Este horario ya está ocupado, por favor, elija otro.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al verificar disponibilidad' });
    }
};

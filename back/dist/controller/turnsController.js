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
exports.checkAvailabilityController = exports.cancelTurnController = exports.createTurnController = exports.getTurnByIdController = exports.getUserTurnsController = void 0;
const turnsService_1 = require("../service/turnsService");
const getUserTurnsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    try {
        const turns = yield (0, turnsService_1.getTurns)(userId);
        res.status(200).json({ message: `Turnos encontrados`, turns });
    }
    catch (error) {
        res.status(404).json({ message: "No se encontraron turnos", error });
    }
});
exports.getUserTurnsController = getUserTurnsController;
const getTurnByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const turnId = parseInt(req.params.id);
        if (isNaN(turnId)) {
            res.status(400).json({ message: 'ID de turno inválido' });
            return;
        }
        const turn = yield (0, turnsService_1.getTurnById)(turnId);
        if (turn) {
            res.status(200).json({ message: `Turno con ID ${turnId} encontrado`, turn });
        }
        else {
            res.status(404).json({ message: `Turno con ID ${turnId} no encontrado` });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
});
exports.getTurnByIdController = getTurnByIdController;
const createTurnController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const newTurn = yield (0, turnsService_1.createTurn)(turnData);
        res.status(201).json({ message: 'Turno creado exitosamente.', newTurn });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Este día y horario de turno se encuentra ocupado.') {
                res.status(400).json({ message: error.message });
            }
            else {
                res.status(400).json({ message: 'Error al crear el turno:', error: error.message });
            }
        }
    }
});
exports.createTurnController = createTurnController;
const cancelTurnController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const turnId = parseInt(req.params.id);
    const success = yield (0, turnsService_1.cancelTurn)(turnId);
    if (success) {
        res.status(200).json({ success: true, message: `Turno con ID ${turnId} cancelado correctamente` });
    }
    else {
        res.status(404).json({ success: false, message: `Turno con ID ${turnId} no encontrado o ya cancelado` });
    }
});
exports.cancelTurnController = cancelTurnController;
const checkAvailabilityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time } = req.body;
    try {
        const isAvailable = yield (0, turnsService_1.checkAvailability)(date, time);
        if (isAvailable) {
            res.status(200).json({ message: 'Disponible' });
        }
        else {
            res.status(409).json({ message: 'Este horario ya está ocupado, por favor, elija otro.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al verificar disponibilidad' });
    }
});
exports.checkAvailabilityController = checkAvailabilityController;

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
exports.checkAvailability = exports.cancelTurn = exports.createTurn = exports.getTurnById = exports.getTurns = void 0;
const data_source_1 = require("../config/data-source");
const getTurns = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const turns = yield data_source_1.TurnsModel.find({ where: { userId }, relations: ["user"] });
    return turns;
});
exports.getTurns = getTurns;
const getTurnById = (turnId) => __awaiter(void 0, void 0, void 0, function* () {
    if (turnId <= 0) {
        return undefined;
    }
    const turn = yield data_source_1.TurnsModel.findOne({ where: { id: turnId } });
    return turn || undefined;
});
exports.getTurnById = getTurnById;
const createTurn = (turnData) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTurn = yield data_source_1.TurnsModel.findOne({
        where: {
            date: turnData.date,
            time: turnData.time,
            status: true
        }
    });
    if (existingTurn)
        throw new Error('Este día y horario de turno se encuentra ocupado.');
    const newTurn = data_source_1.TurnsModel.create({
        date: turnData.date,
        time: turnData.time,
        activity: turnData.activity,
        userId: turnData.userId,
        status: true,
    });
    yield data_source_1.TurnsModel.save(newTurn);
    return newTurn;
});
exports.createTurn = createTurn;
const cancelTurn = (turnId) => __awaiter(void 0, void 0, void 0, function* () {
    const turn = yield data_source_1.TurnsModel.findOneBy({ id: turnId });
    if (!turn)
        throw new Error("Turno no encontrado");
    turn.status = false;
    yield data_source_1.TurnsModel.save(turn);
    return turn;
});
exports.cancelTurn = cancelTurn;
const checkAvailability = (date, time) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingTurn = yield data_source_1.TurnsModel.findOne({ where: { date, time } });
        if (existingTurn) {
            return false;
        }
        else {
            return true;
        }
    }
    catch (error) {
        throw new Error('Error al verificar disponibilidad');
    }
});
exports.checkAvailability = checkAvailability;

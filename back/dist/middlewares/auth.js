"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTurnMiddle = exports.loginMiddle = exports.registerMiddle = void 0;
const date_fns_1 = require("date-fns"); // Importar funciones de date-fns
const registerMiddle = (req, res, next) => {
    const { name, email, birthdate, nDni, username, password } = req.body;
    const required = { name, email, birthdate, nDni, username, password };
    const alert = [];
    for (const key in required) {
        if (!required[key]) {
            alert.push(key);
        }
    }
    if (alert.length > 0) {
        return res.status(400).send(`Faltan los siguientes campos: ${alert.join(', ')}`);
    }
    try {
        const parsedDate = (0, date_fns_1.parseISO)(birthdate);
        if (!(0, date_fns_1.isValid)(parsedDate)) {
            return res.status(400).send('Formato de fecha no válido. Use año-mes-día (yyyy-MM-dd).');
        }
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
        if ((0, date_fns_1.differenceInYears)(new Date(), parsedDate) < 18) {
            return res.status(400).send('Debes tener al menos 18 años para registrarte.');
        }
        req.body.birthdate = birthdate;
    }
    catch (error) {
        console.error('Error al analizar la fecha de nacimiento:', error);
        return res.status(400).send('Error al analizar la fecha de nacimiento.');
    }
    next();
};
exports.registerMiddle = registerMiddle;
const loginMiddle = (req, res, next) => {
    const { username, password } = req.body;
    if (!username) {
        return res.status(400).send("Faltan los siguientes campos: UserName.");
    }
    else if (!password) {
        return res.status(400).send("Faltan los siguientes campos: Password.");
    }
    next();
};
exports.loginMiddle = loginMiddle;
const createTurnMiddle = (req, res, next) => {
    const { date, time } = req.body;
    if (!date || !time) {
        return res.status(400).send({ error: "Faltan campos obligatorios para crear un turno." });
    }
    // Parsear la fecha
    const turnDate = (0, date_fns_1.parse)(date, 'yyyy-MM-dd', new Date());
    // Verificar si el día seleccionado es laborable
    const dayOfWeek = turnDate.getUTCDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        return res.status(400).json({ error: "Solo se pueden crear turnos de lunes a viernes." });
    }
    // Continuar con el siguiente middleware si todo está bien
    next();
};
exports.createTurnMiddle = createTurnMiddle;

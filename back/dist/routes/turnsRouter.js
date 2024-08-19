"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const turnsController_1 = require("../controller/turnsController");
const router = (0, express_1.Router)();
router.get('/turns/:userId', turnsController_1.getUserTurnsController);
router.get('/turns/:userId/:id', turnsController_1.getTurnByIdController);
router.post("/turns/create", auth_1.createTurnMiddle, turnsController_1.createTurnController);
router.put("/turns/:userId/:id/cancel", turnsController_1.cancelTurnController);
router.post('/turns/check-availability', turnsController_1.checkAvailabilityController);
exports.default = router;

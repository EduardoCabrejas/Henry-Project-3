import { Router } from "express";
import { createTurnMiddle } from "../middlewares/auth";
import {
    getUserTurnsController,
    getTurnByIdController,
    createTurnController,
    cancelTurnController,
    checkAvailabilityController,
} from "../controller/turnsController";

const router: Router = Router();

router.get('/turns/:userId', getUserTurnsController);
router.get('/turns/:userId/:id', getTurnByIdController);
router.post("/turns/create", createTurnMiddle, createTurnController); 
router.put("/turns/:userId/:id/cancel", cancelTurnController); 
router.post('/turns/check-availability', checkAvailabilityController);
export default router;
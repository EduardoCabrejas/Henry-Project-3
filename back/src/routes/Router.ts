import { Router } from "express";
import userRoutes from "./usersRouter";
import turnsRoutes from "./turnsRouter";
import emailRouter from "./emailRouter"

const router = Router();
router.use('/users', userRoutes);
router.use('/turns', turnsRoutes);
router.use('/email', emailRouter);

export default router;
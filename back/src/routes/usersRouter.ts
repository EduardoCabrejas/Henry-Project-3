import { Router } from "express";
import { registerMiddle } from "../middlewares/auth";
import { loginMiddle } from "../middlewares/auth";
import {
    getAllUsersController,
    getUserByIdController,
    registerUserController,
    loginController,
} from "../controller/usersController";

const router: Router = Router();

router.get("/users", getAllUsersController); 
router.get("/users/:id", getUserByIdController); 
router.post("/users/register", registerMiddle, registerUserController); 
router.post("/users/login", loginMiddle,loginController);
export default router;
import { Request, Response } from "express";
import { getUserService, getUserByIdService } from "../service/usersService";
import { registerUserService } from "../service/credentialsService";
import { validateCredentials } from "../service/credentialsService";
import { findUserByCredentialId } from "../service/usersService";

export const registerUserController = async (req: Request, res: Response) => {
    const userDTO = {
        name: req.body.name,
        email: req.body.email,
        birthdate: req.body.birthdate,
        nDni: req.body.nDni,
    };
    const credentialDTO = {
        username: req.body.username,
        password: req.body.password,
    };

    try {
        await registerUserService(userDTO, credentialDTO);
        res.status(201).json({ message: `Usuario registrado exitosamente`, user: userDTO });
        } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(`Error al registrar usuario: ${error.message}`);
        } else {
            res.status(400).send("Error al registrar usuario: error desconocido");
        }
    }
};

export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getUserService();
        res.status(200).json(users);
    } catch (error) {
        if (error instanceof Error) res.status(400).send(`Error al obtener todos los usuarios: ${error.message}`);
    }
}

export const getUserByIdController = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    try {
        const user = await getUserByIdService(userId);
        if (!user) {
            res.status(404).send("Usuario no encontrado");
            return;
        }
        res.status(200).json({ message: `Usuario con ID ${userId} encontrado:`, user});
    } catch (error) {
        res.status(400).send("Error al obtener usuario por ID");
    }
}

export const loginController = async (req: Request, res: Response) => {
    try { 
        const { username, password } = req.body;
        const credential = await validateCredentials (username, password);
        const user = await findUserByCredentialId(credential);
        res.status(200).json({
            login: true,
            message: "Iniciando sesión del Usuario",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                birthdate: user.birthdate,
                nDni: user.nDni,}
        });
    } catch (error) {
        res.status(400).send("Los datos de inicio de sesión son incorrectos");
    }
};
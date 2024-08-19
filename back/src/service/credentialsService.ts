import { UserModel, CredentialsModel } from "../config/data-source";
import { CredentialDTO } from "../dto/credential";
import { UserDTO } from "../dto/user";
import { Credentials } from "../entities/Credentials";
import bcrypt from "bcrypt";

export const registerUserService = async (userDTO: UserDTO, credentialDTO: CredentialDTO): Promise<Credentials> => {
    const existingUser = await UserModel.findOne({ where: [{ email: userDTO.email }, { nDni: userDTO.nDni }] });
    const existingCredentials = await CredentialsModel.findOne({ where: { username: credentialDTO.username } });

    if (existingUser) {
        throw new Error(`El usuario con email ${userDTO.email} o N.DNI ${userDTO.nDni} ya existe`);
    }

    if (existingCredentials) {
        throw new Error (`El nombre de usuario ${credentialDTO.username} ya está en uso`);
    }

    const hashedPassword = await bcrypt.hash(credentialDTO.password, 10);

    const newUser = UserModel.create({
        name: userDTO.name,
        email: userDTO.email,
        birthdate: userDTO.birthdate,
        nDni: userDTO.nDni,
    });
    await UserModel.save(newUser);

    const newCredentials = CredentialsModel.create({
        username: credentialDTO.username,
        password: hashedPassword
    });
    newCredentials.userId = newUser.id;
    await CredentialsModel.save(newCredentials);

    return newCredentials;
};


export const validateCredentials = async (username: string, password: string): Promise<number> => {
    const existingCredentials = await CredentialsModel.findOne({ where: { username: username } });
    if (!existingCredentials) {
        throw new Error ("Credenciales inválidas");
    }
    
    const passwordMatch = await bcrypt.compare(password, existingCredentials.password);
    if (!passwordMatch) {
        throw new Error ("Credenciales inválidas");
    }

    return existingCredentials.userId;
};
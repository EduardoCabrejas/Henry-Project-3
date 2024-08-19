import { User } from "../entities/User";
import { TurnsModel, UserModel } from "../config/data-source";

export const getUserService = async (): Promise<User[]> => {
    const allUsers: User[] = await UserModel.find();
    for (const user of allUsers) {
        const turns = await TurnsModel.find({ where: { userId: user.id } });
        user.turns = turns;
    }
    return allUsers;
};

export const getUserByIdService = async (id: number): Promise<User> => {
    const user: User | null = await UserModel.findOne({ 
        where: {id},
        relations: {turns: true}
    });
    if (!user) throw new Error("User not found");
    return user;
};

export const findUserByCredentialId = async (credentialId: number) => {
    const user: User | null = await UserModel.findOneBy({
    credentials: { id: credentialId }
    })
    if (!user) throw new Error("User not found");
    return user
}
import { Turns } from "../entities/Turns";
import { TurnsModel } from "../config/data-source";
import { TurnDTO } from "../dto/turn";

export const getTurns = async (userId: number): Promise<Turns[]> => {
    const turns = await TurnsModel.find({ where: { userId }, relations: ["user"] });
    return turns;
};

export const getTurnById = async (turnId: number): Promise<Turns | undefined> => {
    if (turnId <= 0) {
        return undefined;
    }
    const turn = await TurnsModel.findOne({ where: { id: turnId }}); 
    return turn || undefined;
};

export const createTurn = async (turnData: TurnDTO): Promise<Turns> => {

    const existingTurn = await TurnsModel.findOne({
        where: {
            date: turnData.date,
            time: turnData.time,
            status: true 
        }
    });

    if (existingTurn) throw new Error('Este día y horario de turno se encuentra ocupado.');
    
    const newTurn = TurnsModel.create({
        date: turnData.date,
        time: turnData.time,
        activity: turnData.activity,
        userId: turnData.userId,
        status: true,
    });

    await TurnsModel.save(newTurn);
    return newTurn;
};

export const cancelTurn = async (turnId: number) => {
    const turn = await TurnsModel.findOneBy({id: turnId });
    if (!turn) throw new Error("Turno no encontrado");
    turn.status = false;
    await TurnsModel.save(turn);
    return turn;
}

export const checkAvailability = async (date: Date, time: string): Promise<boolean> => {
    try {
        const existingTurn = await TurnsModel.findOne({ where: { date, time } });
        if (existingTurn) {
                return false;
        } else {
            return true;
        }
    } catch (error) {
        throw new Error('Error al verificar disponibilidad');
    }
};

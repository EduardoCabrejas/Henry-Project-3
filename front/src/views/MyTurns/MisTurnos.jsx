import { useState } from 'react';
import { useSelector } from 'react-redux';
import MyAppointments from "../../components/Appointments/myAppointments";
import Appointment from "../../components/Appointments/Appointment";
import styles from "./MisTurnos.module.css";
import axios from 'axios';

const MisTurnos = () => {
    const [selectedTurnId, setSelectedTurnId] = useState();
    const [isAppointmentVisible, setIsAppointmentVisible] = useState(false);
    const [cancelMessage, setCancelMessage] = useState('');
    const userId = useSelector(state => state.auth.user?.id); 

    const handleSelectTurn = (turnId) => {
        setSelectedTurnId(turnId);
        setIsAppointmentVisible(true);
    };

    const handleHideAppointment = () => {
        setSelectedTurnId(null);
        setIsAppointmentVisible(false);
        setCancelMessage('');
    };

    const handleCancel = async (turnId) => {
        try {
            const response = await axios.put(`http://localhost:3000/turns/${userId}/${turnId}/cancel`);
            if (response.data.success) {
                setCancelMessage(`Turno Nro. ${turnId} cancelado.`);
            } else {
                setCancelMessage('Error al cancelar el turno');
            }
        } catch (error) {
            console.error('Error al cancelar el turno:', error);
            setCancelMessage('Error al cancelar el turno');
        }
    };

    return (
        <div>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Turnos del Usuario</h1>
            </div>
            <div className={styles.turnsContainer}>
            <div className={styles.appointmentsContainer}>
                    {selectedTurnId ? (
                        <MyAppointments
                            selectedTurnId={selectedTurnId}
                            onHide={handleHideAppointment}
                            onSelectTurn={handleSelectTurn}
                        />
                    ) : (
                        <MyAppointments onSelectTurn={handleSelectTurn} />
                    )}
                    </div>
                    {isAppointmentVisible && selectedTurnId && (
                        <Appointment
                            onCancel={handleCancel}
                            selectedTurnId={selectedTurnId}
                            userId={userId}
                            onHide={handleHideAppointment}
                        />
                    )}
                    {cancelMessage && <div className={styles.alert}>{cancelMessage}</div>}
            </div>
        </div>
    );
};

export default MisTurnos;

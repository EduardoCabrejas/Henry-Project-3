import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { fetchTurns } from '../../actions/turnsActions';
import axios from "axios";
import PropTypes from 'prop-types';
import styles from "../Appointments/Appointments.module.css";

const Appointment = ({ onCancel, selectedTurnId, userId, onHide }) => {   
    const dispatch = useDispatch();
    const [turn, setTurn] = useState({});
    const [user, setUser] = useState({});
    const [isCancelling, setIsCancelling] = useState(false);
    const [setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchTurn = async () => {
            if (selectedTurnId && userId) {
                try {
                    const response = await axios.get(`http://localhost:3000/turns/${userId}/${selectedTurnId}`);
                    const turnData = response.data.turn; 
                    setTurn(turnData);
                } catch (error) {
                    console.error("Error al obtener el turno:", error);
                }
            }
        };

        fetchTurn();
    }, [selectedTurnId, userId]);

    useEffect(() => {
        const fetchUser = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:3000/users/${userId}`);
                    const userData = response.data.user; 
                    setUser(userData);
                } catch (error) {
                    console.error("Error al obtener el usuario:", error);
                }
            }
        };

        fetchUser();
    }, [userId]);

    const handleCancel = async () => {
        const confirmed = window.confirm("¿Desea cancelar su turno?");
        if (confirmed) {
            setIsCancelling(true);
            try {
                await axios.put(`http://localhost:3000/turns/${userId}/${turn.id}/cancel`);
                setTurn(prevTurn => ({ ...prevTurn, status: false })); 
                onCancel(turn.id);
            } catch (error) {
                console.error('Error al cancelar el turno:', error);
                setErrorMessage("Error al cancelar turno, por favor intente nuevamente.");
            } finally {
                setIsCancelling(false);
            }
        }
        dispatch(fetchTurns());
    };

    const formatDate = (dateString) => {
        if (!dateString) return ''; 
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    return (
        <div className={styles.appContainer}>
            <h2>Turno pendiente:</h2>
            <div className={styles.allApps}>
                <p><strong>Número de Turno:</strong> {turn.id}</p>
                <p><strong>Nombre:</strong> {user.name}</p>
                <p><strong>Fecha:</strong> {formatDate(turn.date)}</p>
                <p><strong>Hora:</strong> {turn.time}</p>
                <p><strong>Actividad:</strong> {turn.activity}</p>
                <p style={{ color: turn.status ? 'green' : 'red' }}><strong>Estado: </strong>{turn.status ? 'Activo' : 'Cancelado'}</p>
                </div>
            <div className={styles.buttonContainer}>
            <button onClick={handleCancel} disabled={isCancelling || !turn.status}>Cancelar Turno</button>   
            <button onClick={onHide}>Ocultar Detalles</button>
            </div>
        </div>
    );
};

Appointment.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    selectedTurnId: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
};

export default Appointment;

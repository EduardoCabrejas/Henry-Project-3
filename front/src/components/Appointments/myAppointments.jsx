import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTurns } from '../../actions/turnsActions'; 
import styles from "./MyAppointments.module.css";
import PropTypes from 'prop-types';

const MyAppointments = ({ onSelectTurn }) => {
    const dispatch = useDispatch();
    const { turns, loading } = useSelector(state => state.turns.turns);

    const userId = useSelector(state => state.userId);

    useEffect(() => {
    console.log('userId actualizado:', userId);
    }, [userId]); 

    useEffect(() => {
        dispatch(fetchTurns());
    }, [dispatch]);

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    return (
        <div className={styles.allAppsContainer}>
            <h2>Todos los turnos:</h2>
            {loading && <p>Loading...</p>}
            {Array.isArray(turns) && turns.length > 0 ? (
                turns.map((turn, index) => (
                    <div key={index} className={styles.appCard}>
                        <div>
                            <h3>Número</h3>
                            <p>{turn.id}</p>
                        </div>
                        <div>
                            <h3>Fecha</h3>
                            <p>{formatDate(turn.date)}</p>
                        </div>
                        <div>
                            <h3>Hora</h3>
                            <p>{turn.time}</p>
                        </div>
                        <div>
                            <h3>Actividad</h3>
                            <p>{turn.activity}</p>
                        </div>
                        <div>
                            <h3>Estado</h3>
                            <p style={{ color: turn.status ? 'green' : 'red' }}>{turn.status ? 'Activo' : 'Cancelado'}</p>
                        </div>
                        <button onClick={() => onSelectTurn(turn.id)}>Ver Detalles</button>
                    </div>
                ))
            ) : (
                <p>No se han encontrado turnos registrados aún. Por favor, cree uno.</p>
            )}
        </div>
    );
};

MyAppointments.propTypes = {
    onSelectTurn: PropTypes.func.isRequired,
};

export default MyAppointments;

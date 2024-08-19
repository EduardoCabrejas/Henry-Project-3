import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
    validateDate,
    validateTime,
    validateActivity,
} from "../../helpers/CreateTurnFormValidation";
import { useNavigate } from "react-router-dom";
import styles from "./CreateTurnForm.module.css";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const CreateTurnForm = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const [errorMessage, setErrorMessage] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        date: "",
        time: "",
        activity: "",
        errors: {
            date: "",
            time: "",
            activity: "",
        },
    });

    useEffect(() => {
        console.log("Usuario autenticado:", user);
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        let errorMessage = "";
        switch (name) {
            case "date":
                errorMessage = validateDate(value)
                    ? ""
                    : "Los días de atención son de Lunes a Viernes futuros.";
                break;
            case "time":
                errorMessage = validateTime(value)
                    ? ""
                    : "El horario de atención es de 10:00 a 20:00; la última hora son las 19:00 horas.";
                break;
            case "activity":
                errorMessage = validateActivity(value)
                    ? ""
                    : "Por favor, seleccione una actividad.";
                break;
            default:
                break;
        }
        setState((prevstate) => ({
            ...prevstate,
            [name]: value,
            errors: { ...prevstate.errors, [name]: errorMessage },
        }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setLoading(true);
        const { date, time, activity} = state;
        const isValidDate = validateDate(date);
        const isValidTime = validateTime(time);
        const isValidActivity = validateActivity(activity);

        if (!isValidDate || !isValidTime || !isValidActivity) {
            setState((prevstate) => ({
                ...prevstate,
                errors: {
                    ...prevstate.errors,
                },
            }));
            setErrorMessage("Por favor, complete correctamente todos los campos del formulario.");
            setLoading(false);
            return;
        }

        const userId = user?.id;
        if (!userId) {
            setErrorMessage("Error de autenticación. Por favor, inicie sesión nuevamente.");
            setLoading(false);
            return;
        }

        const dataToCheck = { date, time, activity };

        const isAvailable = await checkAvailability(dataToCheck);
        if (!isAvailable) {
            setLoading(false);
            return;
        }

        const dataToSend = { ...state, userId };
        try {
            const response = await axios.post("http://localhost:3000/turns/create", dataToSend);
            if (response.status === 201) {
                alert("¡Turno creado con éxito!");
                setState({
                    date: "",
                    time: "",
                    activity: "",
                    errors: { date: "", time: "", activity: "" },
                });
                setErrorMessage(null);
            } else {
                setErrorMessage("Error al crear turno");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Error al crear turno");
        } finally {
            setLoading(false);
        }
    }, [state, user]);

    const checkAvailability = async (data) => {
        try {
            const response = await axios.post("http://localhost:3000/turns/check-availability", data);
            return response.status === 200;
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Error al verificar disponibilidad");
            }
            return false;
        }
    };

    const timeOptions = [
        "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
    ];

    const getMinDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1); 
        return today.toISOString().split("T")[0];
    };

    return (
        <div>
            <div className={styles.titleContainer}>
                <h2 className={styles.title}>Crea tu Turno</h2>
            </div>
            <div className={styles.container}>
                <h2>Crea tu Turno</h2>
                {errorMessage && <span className={styles.error}>{errorMessage}</span>}
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="date">Fecha:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={state.date}
                            onChange={handleChange}
                            required
                            min={getMinDate()}
                        />
                    </div>
                    <div>
                        <label htmlFor="time">Hora:</label>
                        <select
                            id="time"
                            name="time"
                            value={state.time}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una hora</option>
                            {timeOptions.map((time) => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                        {formSubmitted && state.errors.time && (
                            <span className={styles.error}>{state.errors.time}</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="activity">Actividad:</label>
                        <select
                            id="activity"
                            name="activity"
                            value={state.activity}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccionar Actividad</option>
                            <option value="Sesión Personal">Sesión Personal</option>
                            <option value="Chi-Kung">Chi-Kung</option>
                            <option value="Talleres Grupales">Talleres Grupales</option>
                        </select>
                        {formSubmitted && state.errors.activity && (
                            <span className={styles.error}>{state.errors.activity}</span>
                        )}
                    </div>
                    <button type="submit" disabled={loading}>
                        Crear Turno
                    </button>
                </form>
                {formSubmitted && state.errors.date && (
                    <span className={styles.error}>{state.errors.date}</span>
                )}
                {loading && (
                    <div className={styles.spinnerContainer}>
                        <TailSpin
                            height="50"
                            width="50"
                            color="#4fa94d"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateTurnForm;

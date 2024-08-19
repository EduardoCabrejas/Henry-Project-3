import { useState, useEffect } from "react";
import axios from "axios";
import {
    validateName,
    validateBirthdate,
    validateEmail,
    validateNDni,
    validateUsername,
    validatePassword,
} from "../../helpers/registerValidation";
import styles from "./Register.module.css";
import eyeO from "../../assets/eyeV.png";
import eyeC from "../../assets/eyeNv.png";

function Register() {
const [formSubmitted, setFormSubmitted] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [minBirthdate, setMinBirthdate] = useState("");
const [maxBirthdate, setMaxBirthdate] = useState("");
const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
});

useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const minYear = currentYear - 80;
    const maxYear = currentYear - 18;
    const minDate = new Date(
    minYear,
    currentDate.getMonth(),
    currentDate.getDate()
    )
    .toISOString()
    .split("T")[0];
    const maxDate = new Date(
    maxYear,
    currentDate.getMonth(),
    currentDate.getDate()
    )
    .toISOString()
    .split("T")[0];
    setMinBirthdate(minDate);
    setMaxBirthdate(maxDate);
    setFormData((prevFormData) => ({
    ...prevFormData,
    birthdate: minDate,
    }));
}, []);

const [errors, setErrors] = useState({
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
});

const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
    ...formData,
    [name]: value,
    });
    let error = "";
    switch (name) {
    case "name":
        error = validateName(value);
        break;
    case "email":
        error = validateEmail(value);
        break;
    case "birthdate":
        error = validateBirthdate(value);
        break;
    case "nDni":
        error = validateNDni(value);
        break;
    case "username":
        error = validateUsername(value);
        break;
    case "password":
        error = validatePassword(value);
        break;
    default:
        break;
    }
    setErrors({
    ...errors,
    [name]: error,
    });
};

const isFormFilled = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
};

const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).every((error) => error === "")) {
    try {
        await axios.post("http://localhost:3000/users/register", formData);
        alert("Usuario registrado exitosamente");
        setFormData({
        name: "",
        email: "",
        birthdate: "",
        nDni: "",
        username: "",
        password: "",
        });
        setFormSubmitted(false);
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        if (error.response && error.response.data) {
        alert(error.response.data);
        } else {
        alert("Error al registrar usuario");
        }
    }
    } else {
    setFormSubmitted(true);
    }
};

return (
    <div>
        <div className={styles.titleContainer}>
            <h1 className={styles.title}>Registrate en A.P.I.S.</h1>
        </div>
        <div className={styles.container}>
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div>
                <label htmlFor="name">Nombre:</label>
                <input
                type="text"
                id="name"
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
                required
                />
            </div>
            {formSubmitted && errors.name && (
                <span className={styles.error}>{errors.name}</span>
            )}
            <div>
                <label htmlFor="email">Correo Electrónico:</label>
                <input
                type="email"
                id="email"
                name="email"
                placeholder="Correo Electrónico"
                value={formData.email}
                onChange={handleChange}
                required
                />
            </div>
            {formSubmitted && errors.email && (
                <span className={styles.error}>{errors.email}</span>
            )}
            <div>
                <label htmlFor="birthdate">Fecha de Nacimiento:</label>
                <input
                type="date"
                id="birthdate"
                name="birthdate"
                placeholder="Fecha de Nacimiento"
                value={formData.birthdate}
                onChange={handleChange}
                min={minBirthdate}
                max={maxBirthdate}
                required
                />
            </div>
            {formSubmitted && errors.birthdate && (
                <span className={styles.error}>{errors.birthdate}</span>
            )}
            <div>
                <label htmlFor="nDni">Número de Documento:</label>
                <input
                type="text"
                id="nDni"
                name="nDni"
                placeholder="Nro. de DNI"
                value={formData.nDni}
                onChange={handleChange}
                required
                />
            </div>
            {formSubmitted && errors.nDni && (
                <span className={styles.error}>{errors.nDni}</span>
            )}
            <div>
                <label htmlFor="username">Nombre de Usuario:</label>
                <input
                type="text"
                id="username"
                name="username"
                placeholder="Nombre de Usuario"
                value={formData.username}
                onChange={handleChange}
                required
                />
            </div>
            {formSubmitted && errors.username && (
                <span className={styles.error}>{errors.username}</span>
            )}
            <div>
                <label htmlFor="password">Contraseña:</label>
                <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
                />
                <img
                src={showPassword ? eyeO : eyeC}
                alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                onClick={togglePasswordVisibility}
                />
            </div>
            {formSubmitted && errors.password && (
                <span className={styles.error}>{errors.password}</span>
            )}
            <button
                type="submit"
                disabled={!isFormFilled()}
                className={
                isFormFilled() ? styles.buttonEnabled : styles.buttonDisabled
                }
            >
                Registrarse
            </button>
            </form>
        </div>
    </div>
    );
}

export default Register;

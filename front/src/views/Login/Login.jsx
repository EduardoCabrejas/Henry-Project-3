import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../actions/authActions';
import { validateUsername, validatePassword } from '../../helpers/loginValidation';
import styles from './Login.module.css';
import eyeO from "../../assets/eyeV.png";
import eyeC from "../../assets/eyeNv.png";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({ username: '', password: '' });
    const [setErrorMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const usernameError = validateUsername(credentials.username);
        const passwordError = validatePassword(credentials.password);
        setErrors({
            username: usernameError,
            password: passwordError,
        });
        return !usernameError && !passwordError;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            setErrorMessage('Por favor, corrija los errores en el formulario.');
            return;
        }
        try {
            await dispatch(loginUser(credentials));
            alert('Sesión iniciada exitosamente');
            navigate('/home');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    password: 'Nombre de usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.'
                }));
            } else {
                setErrorMessage('Error de autenticación. Por favor, inténtelo de nuevo.');
            }
        }
    };

    return (
        <div className={styles.container}>
            <h2>Iniciar Sesión</h2>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder='Nombre de Usuario'
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                    {errors.username && <span className={styles.error}>{errors.username}</span>}
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type={showPassword ? "text" : "password"} 
                        id="password"
                        name="password"
                        placeholder='********'
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                    <img
                        src={showPassword ? eyeO : eyeC} 
                        alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        onClick={togglePasswordVisibility}
                    />
                </div>
                    {errors.password && <span className={styles.error}>{errors.password}</span>}
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;

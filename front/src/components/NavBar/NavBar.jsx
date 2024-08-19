import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import apisLogo from "../../assets/apis_logo.png";
import styles from "./NavBar.module.css";

const NavBar = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        const confirm = window.confirm("¿Desea cerrar sesión?");
        if(confirm){
            dispatch({ type: 'LOGOUT' });
        }
    navigate('/home')
    }

    
    return (
        <div className={styles.navbar}>
            <img src={apisLogo} alt="logo" className={styles.logo} />
            <Link to="/home" className={styles.button}>Inicio</Link>
            {isLoggedIn && <Link to="/turns" className={styles.button}>Mis Turnos</Link>}
            {isLoggedIn && <Link to="/turns/create" className={styles.button}>Crear Turno</Link>}              
            {!isLoggedIn && <Link to="/register" className={styles.button}>Registrarse</Link>}
            {!isLoggedIn && <Link to="/login" className={styles.button}>Iniciar Sesión</Link>}
            {isLoggedIn && <Link to="/profile" className={styles.button}>Perfil</Link>}
            {isLoggedIn && <button className={styles.button} onClick={handleLogout}>Cerrar Sesión</button>}
        </div>
    );
};

export default NavBar;

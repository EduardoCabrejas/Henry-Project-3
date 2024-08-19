import { useSelector } from 'react-redux';
import styles from './Profile.module.css';
import profilePic from '../../assets/usuario.png'; 

const Profile = () => {
    const user = useSelector((state) => state.auth.user); 
    const profile = useSelector((state) => state.profile);

    return (
        <div className={styles.headerContainer}>
            <h1 className={styles.header}>Bienvenido/a, {user.name}</h1>
        <div className={styles.profileContainer}>
            <h1 className={styles.title}>Mi Perfil</h1>
            <img
                src={profilePic}
                alt="Foto de perfil"
                className={styles.profilePicture}
            />
            <h2 className={styles.info}>Nombre</h2>
            <p>{user.name}</p>
            <h2 className={styles.info}>Correo Electrónico</h2>
            <p>{user.email}</p>
            <h2 className={styles.info}>Fecha de Nacimiento</h2>
            <p>{user.birthdate}</p>
            <h2 className={styles.info}>Nro. de DNI.</h2>
            <p>{user.nDni}</p>
            {profile.error && <p>Error: {profile.error}</p>}
        </div>
        </div>
    );
};

export default Profile;

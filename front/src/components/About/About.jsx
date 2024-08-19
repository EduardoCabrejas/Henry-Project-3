import styles from "./About.module.css";

import InstagramIcon from '../../assets/Instagram.png';
import FacebookIcon from '../../assets/Facebook.png';
import WhatsappIcon from '../../assets/Whatsapp.png';

function About() {
    return (
        <div className={styles.container}>
        <div className={styles.text}>
            <h1 className={styles.title}>Contacto</h1>
            <p className={styles.description}>Aún nuestro conocimiento y expansión dentro del mundo virtual sigue en desarrollo, por lo que de momento, les brindamos nuestros métodos de contacto actuales y presentes.</p>
        </div>
            <div className={styles.card}>
                <a href="https://www.instagram.com/equipoapis/" className={`${styles.socialContainer} ${styles.containerOne}`}>
                    <img src={InstagramIcon} alt="Instagram" className={styles.socialPNG} />
                </a>
                
                <a href="https://www.facebook.com/APIS.asistencia.optimizacion" className={`${styles.socialContainer} ${styles.containerTwo}`}>
                    <img src={FacebookIcon} alt="Facebook" className={styles.socialPNG} />
                </a>
                    
                <a href="https://api.whatsapp.com/send/?phone=542266545426&text&type=phone_number&app_absent=0" className={`${styles.socialContainer} ${styles.containerThree}`}>
                    <img src={WhatsappIcon} alt="Whatsapp" className={styles.socialPNG} />
                </a>
            </div> 
        </div>
    )
}

export default About;

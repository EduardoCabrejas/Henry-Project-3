import { useState } from 'react';
import styles from './Activities.module.css';
import CK1 from '../../assets/CK.jpg';
import CK2 from '../../assets/CK 1.jpg';
import CK3 from '../../assets/CK 2.jpg';
import TG1 from '../../assets/TG.jpg';
import TG2 from '../../assets/TG 1.jpg';
import TG3 from '../../assets/TG 2.jpg';
import CG1 from '../../assets/CG 1.jpg';
import CG2 from '../../assets/CG 2.png';
import CG3 from '../../assets/CG 3.jpg';

const Activities = () => {
    const [zoomed, setZoomed] = useState(false);

    const handleZoom = (event) => {
        if (event.target.tagName === 'IMG') {
            event.target.classList.toggle(styles.zoomed);
            setZoomed(!zoomed);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Actividades</h1>
            </div>
            <div>
                <h2>Sesiones Personales</h2>
                <p>
                    Las Sesiones Personales son atender al cliente, de manera tanto virtual como presencial, para acompañar y ayudar a optimizar su estado mental presente, con diferentes métodos como <strong>Atención Plena (Mindfullness), Bienestar Plano (Wellfulness), Aromaterapia, Meditación, Desprogramación mental, emocional y espiritual</strong>, entre otros. Nuestro objetivo es acompañarte en nuestro momento de atención a liberarte de lo que te puede estar limitando, generando malestar o presentando inquietudes en tu presente. 
                </p>
                <div className={styles.imgContainer}>
                    <img src={CG1} className={styles.img} onClick={handleZoom} />
                    <img src={CG2} className={styles.img} onClick={handleZoom} />
                    <img src={CG3} className={styles.img} onClick={handleZoom} />
                </div>
            </div>
            <div>
                <h2>Chi Kung</h2>
                <p>El <strong>Chi Kung (o Qigong) </strong> es una práctica que combina movimientos físicos, técnicas de respiración y meditación para cultivar y equilibrar el chi (o qi). Es una gimnasia terapéutica proveniente de China, donde la palabra Qigong se compone de <strong>qi (energía vital), y gong (trabajo o cultivo)</strong>. Era utilizada sobre todo para los trabajadores del campo, para preparar su cuerpo ante el trabajo de cosecha de cultivo antiguo. Esta compuesto principalmente por movimientos suaves, respiración controlada, meditación y control mental. Brinda beneficios a la salud en su práctica tales como: <strong>mejora la flexibilidad, la fuerza y el equilibrio, reduce el dolor, el estrés y la tensión muscular, promueve la relajación y mejora la concentración, ayuda a equilibrar y aumentar la energía vital; lo cual mejora la salud general y la vitalidad</strong>.</p>
                <div className={styles.imgContainer}>
                    <img src={CK1} className={styles.img} onClick={handleZoom} />
                    <img src={CK2} className={styles.img} onClick={handleZoom} />
                    <img src={CK3} className={styles.img} onClick={handleZoom} />
                </div>
            </div>
            <div>
                <h2>Talleres Grupales</h2>
                <p>Son <strong>momentos presenciales de manera grupal</strong> en las que se comparten y emplean diferentes actividades, provenientes del equipo de A.P.I.S. y <strong>de quienes participen si gustan de acompañar también</strong>. Es un espacio en donde ofrecemos una oportunidad al <strong>libre albedrío</strong> para compartir distintas situaciones, aplicando diversas herramientas para mejorar nuestro presente; con ideas, opiniones y actividades. <strong>El objetivo es que mediante estos trabajos compartidos durante el momento podamos optimizar grupalmente nuestra situación vital</strong>; incluyendo todos los escenarios que manejamos día a día, como el laboral, el familiar y el personal.</p>
                <div className={styles.imgContainer}>
                    <img src={TG1} className={styles.img1} onClick={handleZoom} />
                    <img src={TG2} className={styles.img1} onClick={handleZoom} />
                    <img src={TG3} className={styles.img1} onClick={handleZoom} />
                </div>
            </div>
            {zoomed && <div className={styles.overlay} onClick={handleZoom}></div>}
        </div>
    );
};

export default Activities;

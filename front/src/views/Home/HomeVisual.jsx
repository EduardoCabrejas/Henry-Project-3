import { useSelector } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Home.module.css";
import HomeFunctional from "./HomeFunc.jsx";
import PropTypes from "prop-types";

const HomeVisual = ({ content }) => {
    const { handleZoom, zoomed } = HomeFunctional({
        content,
        styles,
    });
    const user = useSelector(state => state.auth.user); 
    
    return (
        <>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>
                    <strong>A.P.I.S.</strong> <span>Desprogramación</span>
                </h1>
            </div>

            {user && (
                <div>
                    <p className={styles.userDescription}>Bienvenido/a, {user.name}.</p>
                </div>
            )}

            <section className={`${styles.container} ${zoomed ? styles.zoomed : ""}`}>
                {zoomed && <div className={styles.overlay}></div>}
                {content.map((item, itemIndex) => (
                    <div key={item.id}>
                        <div className={styles.contentItem}>
                            <h2 className={styles.contentTitle}>{item.name}</h2>
                            <div className={styles.divider}>
                                <p
                                    className={styles.contentDescription}
                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                ></p>
                                <div className={styles.imgContainer}>
                                    {item.images.map((image, imageIndex) =>
                                        itemIndex === 1 && imageIndex === 0 ? (
                                            <div key={imageIndex} className={styles.specialContainer}>
                                                <img
                                                    src={image}
                                                    className={`${styles.specialImage}`}
                                                    alt={`Image ${imageIndex + 1}`}
                                                    onClick={handleZoom}
                                                />
                                            </div>
                                        ) :
                                        itemIndex === 2 && imageIndex === 0 ? (
                                            <div key={imageIndex} className={styles.specialContainer}>
                                                <img
                                                    src={image}
                                                    className={`${styles.specialImage2}`}
                                                    alt={`Image ${imageIndex + 1}`}
                                                    onClick={handleZoom}
                                                />
                                            </div>
                                        ) :
                                        itemIndex === 2 && imageIndex === 3 ? (
                                            <div key={imageIndex} className={styles.specialContainer}>
                                                <img
                                                    src={image}
                                                    className={`${styles.specialImage2}`}
                                                    alt={`Image ${imageIndex + 1}`}
                                                    onClick={handleZoom}
                                                />
                                            </div>
                                        ) : (
                                            <img
                                                key={imageIndex}
                                                src={image}
                                                className={styles.contentImage}
                                                alt={`Image ${imageIndex + 1}`}
                                                onClick={handleZoom}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
};

HomeVisual.propTypes = {
    content: PropTypes.array.isRequired,
};

export default HomeVisual;

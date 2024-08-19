import { useState } from 'react';

const HomeFunctional = ({ styles }) => {    const [activeContentIds] = useState([]);
    const [zoomed, setZoomed] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(false);

    const handleZoom = (event) => {
        if (event.target.tagName === 'IMG') {
            event.target.classList.toggle(styles.zoomed);
            setZoomed(!zoomed);
            setOverlayVisible(!overlayVisible);
        }
    }

    return { handleZoom, activeContentIds, zoomed, overlayVisible };
}

export default HomeFunctional;

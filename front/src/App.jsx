import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import About from './components/About/About';
import CreateTurnFormView from "./views/CreateTurn/CreateTurnFormView";
import HomeVisual from "./views/Home/HomeVisual";
import MisTurnos from "./views/MyTurns/MisTurnos";
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import Profile from './views/MyProfile/Profile';
import APIST from "./assets/APIS Team.jpg";
import Poster from "./assets/portada.png";
import Caminata from "./assets/caminata.jpg";
import Taller from "./assets/Taller.jpg";
import ChiK from "./assets/Chi-Kung.jpg";
import Acomp from "./assets/Acompañamiento.jpg";
import LP from "./assets/LP.jpg";
import SA from "./assets/SA.jpg";
import BC from "./assets/BC.jpg";
import INST from "./assets/Inst.jpg"

const content = [
    {
        id: 1,
        name: "A.P.I.S.",
        description: "Somos un equipo que de diferentes formas facilitamos <strong> RECURSOS INTEGRALES y SOSTENIBLES de Asesoría Personal y Optimización Grupal</strong>, para que logren auto-liderarse de manera proactiva en cualquier ámbito e instancias de su Vida.",
        images: [APIST, Poster]
    },
    {
        id: 2,
        name: "Actividades",
        description: "Hacemos diversas actividades. Tales como: <strong>Caminatas</strong>, <strong>Talleres Grupales</strong>, <strong>Sesiones Personales con Atención Plena</strong>, <strong>Gimnasia Terapéutica China (Chi-Kung)</strong> y <strong>Sesiones de Acompañamiento Grupal</strong>.",
        images: [Caminata, Taller, ChiK, Acomp]
    },
    {
        id: 3,
        name: "Ubicación",
        description: "Nos encontramos en <strong>Los Pinos, partido de Balcarce, provincia de Buenos Aires</strong>. Según la actividad y las personas dispuestas a participar, solemos movernos por la zona; como por ejemplo, <strong> la Cantera de Los Pinos en la imagen 1, el Parque Idoyaga Molina de San Agustin en la imagen 2, y en La Casa Del Fondo de Balcarce en la imagen 3 </strong>",
        images: [LP, SA, BC, INST]
    },
];

function App() {
    return (
        <div id="root">
            <NavBar/>
            <main>
                <Routes>
                    <Route path="/home" element={<HomeVisual content={content}/>} />
                    <Route path="/turns" element={<MisTurnos/>} />
                    <Route path="/turns/create" element={<CreateTurnFormView/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </Routes>
            </main>
            <footer id="about-container">
                <About/>
            </footer>
        </div>
    );
}

export default App;

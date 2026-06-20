import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Departamento from "./pages/Departamento";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import PreguntasFrecuentes from "./pages/PreguntasFrecuentes";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/departamento/:id" element={<Departamento />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
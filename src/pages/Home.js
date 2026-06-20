import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, BedDouble, Bath, Maximize2, ArrowRight, Star } from "lucide-react";
import HeroCarrusel from "../components/HeroCarrusel";

function Home() {
  const [depas, setDepas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("Todos");

  useEffect(() => {
    fetch("http://localhost:5000/departamentos")
      .then((r) => r.json())
      .then((data) => { setDepas(data); setCargando(false); })
      .catch(() => { setError("No se pudo cargar los departamentos"); setCargando(false); });
  }, []);

  const distritos = ["Todos", ...new Set(depas.map((d) => d.distrito))];
  const depasFiltrados = filtro === "Todos" ? depas : depas.filter((d) => d.distrito === filtro);

  return (
    <>
      <HeroCarrusel />

      {/* Stats */}
      <div className="confianza">
        <div className="confianza-item">
          <h3>+150</h3>
          <p>Familias atendidas</p>
        </div>
        <div className="confianza-item">
          <h3>12</h3>
          <p>Distritos disponibles</p>
        </div>
        <div className="confianza-item">
          <h3>98%</h3>
          <p>Clientes satisfechos</p>
        </div>
        <div className="confianza-item">
          <h3>8 años</h3>
          <p>En el mercado</p>
        </div>
      </div>

      {/* Departamentos */}
      <section className="departamentos" id="departamentos">
  {/* Decoración hojas */}
  <svg className="deco-hoja deco-hoja-izq" width="220" height="400" viewBox="0 0 220 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M180 10 C80 60, 10 150, 30 280 C50 380, 140 390, 180 390 C160 300, 170 200, 180 10Z" fill="#1a2e45"/>
    <path d="M160 40 C100 90, 50 180, 60 290 C70 360, 140 370, 160 370 C148 280, 155 160, 160 40Z" fill="#1a2e45" opacity="0.5"/>
    <path d="M30 280 Q100 240 180 200" stroke="#1a2e45" strokeWidth="1.5" fill="none"/>
    <path d="M35 300 Q105 265 175 230" stroke="#1a2e45" strokeWidth="1" fill="none" opacity="0.6"/>
    <path d="M45 320 Q110 290 170 255" stroke="#1a2e45" strokeWidth="1" fill="none" opacity="0.4"/>
  </svg>

  <svg className="deco-hoja deco-hoja-der" width="220" height="400" viewBox="0 0 220 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M180 10 C80 60, 10 150, 30 280 C50 380, 140 390, 180 390 C160 300, 170 200, 180 10Z" fill="#1a2e45"/>
    <path d="M160 40 C100 90, 50 180, 60 290 C70 360, 140 370, 160 370 C148 280, 155 160, 160 40Z" fill="#1a2e45" opacity="0.5"/>
    <path d="M30 280 Q100 240 180 200" stroke="#1a2e45" strokeWidth="1.5" fill="none"/>
    <path d="M35 300 Q105 265 175 230" stroke="#1a2e45" strokeWidth="1" fill="none" opacity="0.6"/>
    <path d="M45 320 Q110 290 170 255" stroke="#1a2e45" strokeWidth="1" fill="none" opacity="0.4"/>
  </svg>

        {/* Encabezado mejorado */}
        <div className="depas-encabezado">
          <div className="depas-encabezado-texto">
            <span className="section-eyebrow">Nuestros proyectos</span>
            <h2>Departamentos <em>hechos para ti</em></h2>
            <p>Cada proyecto está pensado en detalle — ubicación, diseño y comodidad en perfecta armonía.</p>
          </div>
          <div className="depas-encabezado-badge">
            <Star size={16} fill="currentColor" />
            <span>Proyectos verificados y de alta calidad</span>
          </div>
        </div>

        {/* Filtros */}
        <div className="filtros-distrito">
          {distritos.map((d) => (
            <button
              key={d}
              className={`filtro-chip ${filtro === d ? "filtro-chip-activo" : ""}`}
              onClick={() => setFiltro(d)}
            >
              {d}
            </button>
          ))}
        </div>

        {cargando && <p className="estado-mensaje">Cargando departamentos...</p>}
        {error && <p className="estado-mensaje estado-error">{error}</p>}

        <div className="cards-container">
          {depasFiltrados.map((depa, index) => (
            <div className="card-depa" key={depa.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="card-depa-imagen">
                <img src={depa.imagen} alt={depa.nombre} />
                <span className="card-depa-distrito">
                  <MapPin size={12} /> {depa.distrito}
                </span>
                <div className="card-depa-overlay">
                  <Link to={`/departamento/${depa.id}`} className="card-depa-overlay-btn">
                    Ver detalle <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
              <div className="card-depa-info">
                <h3>{depa.nombre}</h3>
                <p className="card-depa-descripcion">{depa.descripcion}</p>
                <div className="card-depa-specs">
                  <span><BedDouble size={14} /> {depa.habitaciones} hab.</span>
                  <span><Bath size={14} /> {depa.banos} baños</span>
                  <span><Maximize2 size={14} /> {depa.m2} m²</span>
                </div>
                <div className="card-depa-footer">
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "var(--texto-suave)", marginBottom: "0.2rem" }}>Precio desde</p>
                    <span className="precio">$ {depa.precio.toLocaleString()}</span>
                  </div>
                  <Link to={`/departamento/${depa.id}`} className="btn-primary" style={{ padding: "0.55rem 1.2rem", fontSize: "0.85rem" }}>
                    Cotizar <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA final */}
        <div className="depas-cta">
          <p>¿No encontraste lo que buscas?</p>
          <Link to="/contacto" className="btn-primary">
            Habla con un asesor <ArrowRight size={16} />
          </Link>
        </div>

      </section>
    </>
  );
}

export default Home;
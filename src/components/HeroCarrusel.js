import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    imagen: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600",
    frase: "Encuentra el hogar que siempre soñaste",
    subtitulo: "Departamentos premium en los mejores distritos de Lima",
  },
  {
    imagen: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600",
    frase: "Vive con estilo y comodidad",
    subtitulo: "Diseños modernos con acabados de lujo para ti y tu familia",
  },
  {
    imagen: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600",
    frase: "Tu inversión más inteligente",
    subtitulo: "Propiedades en zonas de alto valor con proyección de crecimiento",
  },
  {
    imagen: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600",
    frase: "Espacios que inspiran",
    subtitulo: "Cada detalle pensado para que te sientas en casa desde el primer día",
  },
];

function HeroCarrusel() {
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, []);

  const anterior = () => setActual((prev) => (prev - 1 + slides.length) % slides.length);
  const siguiente = () => setActual((prev) => (prev + 1) % slides.length);

  return (
    <section className="hero">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`hero-slide ${i === actual ? "hero-slide-activo" : ""}`}
          style={{ backgroundImage: `url(${slide.imagen})` }}
        />
      ))}

      <div className="hero-overlay" />

      <button className="hero-flecha hero-flecha-izq" onClick={anterior}>
        <ChevronLeft size={28} />
      </button>

      <button className="hero-flecha hero-flecha-der" onClick={siguiente}>
        <ChevronRight size={28} />
      </button>

      <div className="hero-content">
        <span className="hero-eyebrow">HomeIQ — Inmobiliaria de confianza</span>
        <h1 className="hero-frase" key={actual}>
          {slides[actual].frase}
        </h1>
        <p>{slides[actual].subtitulo}</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#departamentos" className="btn-primary">Ver departamentos</a>
          <Link to="/contacto" className="btn-secondary" style={{ color: "white", borderColor: "white" }}>
            Cotizar ahora
          </Link>
        </div>
      </div>

      <div className="hero-indicadores">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-indicador ${i === actual ? "hero-indicador-activo" : ""}`}
            onClick={() => setActual(i)}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroCarrusel;
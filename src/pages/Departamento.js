import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, BedDouble, Bath, Maximize2, ArrowLeft } from "lucide-react";
import FormularioContacto from "../components/FormularioContacto";

function Departamento() {
  const { id } = useParams();
  const [depa, setDepa] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/departamentos/${id}`)
      .then((r) => r.json())
      .then((data) => { setDepa(data); setCargando(false); })
      .catch(() => { setError("No se pudo cargar el departamento"); setCargando(false); });
  }, [id]);

  if (cargando) return <p className="estado-mensaje pagina-mensaje">Cargando...</p>;
  if (error) return <p className="estado-mensaje estado-error pagina-mensaje">{error}</p>;
  if (!depa) return null;

  return (
    <div className="detalle-page">
      <Link to="/" className="btn-secondary" style={{ marginBottom: "2rem", display: "inline-flex" }}>
        <ArrowLeft size={16} /> Volver
      </Link>

      <img src={depa.imagen} alt={depa.nombre} className="detalle-imagen" />

      <div className="detalle-header">
        <h1>{depa.nombre}</h1>
        <p className="detalle-distrito">
          <MapPin size={16} /> {depa.distrito}
        </p>
      </div>

      <div className="detalle-specs">
        <div className="detalle-spec"><BedDouble size={18} /> {depa.habitaciones} habitaciones</div>
        <div className="detalle-spec"><Bath size={18} /> {depa.banos} baños</div>
        <div className="detalle-spec"><Maximize2 size={18} /> {depa.m2} m²</div>
      </div>

      <p className="detalle-descripcion">{depa.descripcion}</p>
      <p className="precio precio-grande">$ {depa.precio.toLocaleString()}</p>

      <div className="formulario-card" style={{ marginTop: "3rem" }}>
        <h2>Cotiza este departamento</h2>
        <p className="subtitulo">Completa el formulario y nos contactaremos contigo a la brevedad.</p>
        <FormularioContacto departamentoPreseleccionado={depa.id} />
      </div>
    </div>
  );
}

export default Departamento;
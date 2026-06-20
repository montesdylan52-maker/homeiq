import FormularioContacto from "../components/FormularioContacto";
import { Mail, Phone, MapPin } from "lucide-react";

function Contacto() {
  return (
    <div style={{ paddingTop: "7rem", paddingBottom: "5rem" }}>
      <div className="section-header" style={{ marginBottom: "3rem" }}>
        <span className="section-eyebrow">Estamos para ayudarte</span>
        <h2>Cotiza tu departamento</h2>
        <p>Completa el formulario y un asesor se comunicará contigo en menos de 24 horas.</p>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "3rem", alignItems: "start" }}>
        
        {/* Info lateral */}
        <div>
          <h3 style={{ marginBottom: "1.5rem", fontSize: "1.3rem" }}>Información de contacto</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ background: "var(--azul-noche)", color: "var(--dorado)", width: "44px", height: "44px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Phone size={18} />
              </div>
              <div>
                <p style={{ fontWeight: "600", fontSize: "0.85rem" }}>Teléfono</p>
                <p style={{ color: "var(--texto-suave)", fontSize: "0.9rem" }}>+51 987 654 321</p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ background: "var(--azul-noche)", color: "var(--dorado)", width: "44px", height: "44px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Mail size={18} />
              </div>
              <div>
                <p style={{ fontWeight: "600", fontSize: "0.85rem" }}>Correo</p>
                <p style={{ color: "var(--texto-suave)", fontSize: "0.9rem" }}>contacto@homeiq.pe</p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ background: "var(--azul-noche)", color: "var(--dorado)", width: "44px", height: "44px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MapPin size={18} />
              </div>
              <div>
                <p style={{ fontWeight: "600", fontSize: "0.85rem" }}>Oficina</p>
                <p style={{ color: "var(--texto-suave)", fontSize: "0.9rem" }}>Av. Larco 1301, Miraflores, Lima</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "2.5rem", background: "var(--azul-noche)", borderRadius: "var(--radio)", padding: "1.5rem", color: "white" }}>
            <p style={{ color: "var(--dorado)", fontWeight: "600", marginBottom: "0.5rem" }}>Horario de atención</p>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.8)" }}>Lunes a Viernes: 9am — 6pm</p>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.8)" }}>Sábados: 9am — 1pm</p>
          </div>
        </div>

        {/* Formulario */}
        <div className="formulario-card">
          <h3 style={{ marginBottom: "0.5rem" }}>Solicitud de cotización</h3>
          <p className="subtitulo">Todos los campos marcados con * son obligatorios.</p>
          <FormularioContacto />
        </div>
      </div>
    </div>
  );
}

export default Contacto;
import { useState, useEffect } from "react";

function FormularioContacto({ departamentoPreseleccionado = null }) {
  const [depas, setDepas] = useState([]);
  const [form, setForm] = useState({
    departamento_id: departamentoPreseleccionado || "",
    dni: "",
    nombre_contacto: "",
    email_contacto: "",
    telefono: "",
    mensaje: "",
  });
  const [estado, setEstado] = useState(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/departamentos")
      .then((r) => r.json())
      .then(setDepas)
      .catch(() => {});
  }, []);

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setEstado(null);
    try {
      const res = await fetch("http://localhost:5000/cotizaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setEstado("ok");
        setForm({
          departamento_id: departamentoPreseleccionado || "",
          dni: "",
          nombre_contacto: "",
          email_contacto: "",
          telefono: "",
          mensaje: "",
        });
      } else {
        setEstado(data.error || "Error al enviar");
      }
    } catch {
      setEstado("No se pudo conectar con el servidor");
    }
    setEnviando(false);
  };

  return (
    <form onSubmit={manejarEnvio}>
      <div className="form-grid">

        {!departamentoPreseleccionado && (
          <div className="form-grupo full">
            <label>Proyecto de interés</label>
            <select name="departamento_id" value={form.departamento_id} onChange={manejarCambio}>
              <option value="">— Selecciona un departamento —</option>
              {depas.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nombre} — {d.distrito}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-grupo">
          <label>DNI *</label>
          <input
            type="text"
            name="dni"
            value={form.dni}
            onChange={manejarCambio}
            placeholder="12345678"
            maxLength={8}
            required
          />
        </div>

        <div className="form-grupo">
          <label>Nombre completo *</label>
          <input
            type="text"
            name="nombre_contacto"
            value={form.nombre_contacto}
            onChange={manejarCambio}
            placeholder="Juan Pérez"
            required
          />
        </div>

        <div className="form-grupo">
          <label>Correo electrónico *</label>
          <input
            type="email"
            name="email_contacto"
            value={form.email_contacto}
            onChange={manejarCambio}
            placeholder="juan@email.com"
            required
          />
        </div>

        <div className="form-grupo">
          <label>Teléfono celular *</label>
          <input
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={manejarCambio}
            placeholder="987654321"
            required
          />
        </div>

        <div className="form-grupo full">
          <label>Mensaje</label>
          <textarea
            name="mensaje"
            value={form.mensaje}
            onChange={manejarCambio}
            placeholder="¿Tienes alguna pregunta o comentario adicional?"
          />
        </div>
      </div>

      {estado === "ok" && (
        <p className="form-mensaje-ok">✅ ¡Mensaje enviado! Nos contactaremos contigo pronto.</p>
      )}
      {estado && estado !== "ok" && (
        <p className="form-mensaje-error">❌ {estado}</p>
      )}

      <button
        type="submit"
        className="btn-primary"
        style={{ marginTop: "1.5rem", width: "100%" }}
        disabled={enviando}
      >
        {enviando ? "Enviando..." : "Enviar solicitud"}
      </button>
    </form>
  );
}

export default FormularioContacto;
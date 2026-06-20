import { useState } from "react";

const preguntas = [
  {
    pregunta: "¿Cómo puedo cotizar un departamento?",
    respuesta:
      "Puedes cotizar directamente desde la página de cada departamento haciendo clic en 'Ver detalle', o también desde nuestra página de Contacto. Un asesor se comunicará contigo en menos de 24 horas.",
  },
  {
    pregunta: "¿Qué documentos necesito para iniciar el proceso de compra?",
    respuesta:
      "Para iniciar necesitas tu DNI, comprobante de ingresos de los últimos 3 meses y una carta de trabajo o declaración jurada si eres independiente. Nuestros asesores te guiarán en cada paso.",
  },
  {
    pregunta: "¿Los precios incluyen estacionamiento?",
    respuesta:
      "Depende del proyecto. Algunos departamentos incluyen uno o dos estacionamientos en el precio base. Puedes consultarlo en el detalle de cada departamento o preguntarlo al momento de cotizar.",
  },
  {
    pregunta: "¿Puedo financiar la compra con un banco?",
    respuesta:
      "Sí, trabajamos con los principales bancos del país (BCP, Scotiabank, Interbank, BBVA) y también con el programa MiVivienda. Nuestros asesores te ayudan a evaluar la mejor opción para ti.",
  },
  {
    pregunta: "¿Cuánto tiempo toma el proceso de compra?",
    respuesta:
      "En promedio entre 30 y 60 días desde la reserva hasta la firma de escritura, dependiendo del financiamiento elegido y la disponibilidad notarial.",
  },
  {
    pregunta: "¿Puedo visitar el departamento antes de comprarlo?",
    respuesta:
      "Por supuesto. Coordinamos visitas presenciales de lunes a sábado. Contáctanos por el formulario y agendaremos una visita en el horario que mejor te convenga.",
  },
];

function PreguntasFrecuentes() {
  const [abierta, setAbierta] = useState(null);

  return (
    <div className="faq-page">
      <h1>Preguntas frecuentes</h1>
      <p className="subtitulo">
        Resolvemos tus dudas más comunes sobre el proceso de compra y nuestros departamentos.
      </p>

      {preguntas.map((item, i) => (
        <div className="faq-item" key={i}>
          <div className="faq-pregunta" onClick={() => setAbierta(abierta === i ? null : i)}>
            <span>{item.pregunta}</span>
            <span>{abierta === i ? "−" : "+"}</span>
          </div>
          {abierta === i && (
            <p className="faq-respuesta">{item.respuesta}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default PreguntasFrecuentes;
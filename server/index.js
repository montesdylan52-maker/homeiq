const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const db = new Database(path.join(__dirname, "homeiq.db"));

app.use(cors());
app.use(express.json());

// Crear tablas
db.exec(`
  CREATE TABLE IF NOT EXISTS departamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    distrito TEXT NOT NULL,
    precio REAL NOT NULL,
    m2 REAL NOT NULL,
    habitaciones INTEGER NOT NULL,
    banos INTEGER NOT NULL,
    imagen TEXT,
    descripcion TEXT
  );

  CREATE TABLE IF NOT EXISTS cotizaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    departamento_id INTEGER,
    dni TEXT NOT NULL,
    nombre_contacto TEXT NOT NULL,
    email_contacto TEXT NOT NULL,
    telefono TEXT NOT NULL,
    mensaje TEXT,
    estado TEXT DEFAULT 'pendiente',
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id)
  );
`);

// Insertar departamentos de ejemplo si la tabla está vacía
const total = db.prepare("SELECT COUNT(*) as total FROM departamentos").get();
if (total.total === 0) {
  const insertar = db.prepare(`
    INSERT INTO departamentos (nombre, distrito, precio, m2, habitaciones, banos, imagen, descripcion)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertar.run("Residencial Las Palmas", "Miraflores", 285000, 85, 3, 2, "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", "Moderno departamento con vista al mar, acabados de lujo y amplia terraza.");
  insertar.run("Torre Azul 402", "San Isidro", 320000, 95, 3, 2, "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", "Ubicado en el corazón financiero de Lima, con seguridad 24/7 y estacionamiento.");
  insertar.run("Loft Moderno 201", "Barranco", 195000, 60, 1, 1, "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", "Perfecto para jóvenes profesionales. Diseño contemporáneo en el distrito cultural.");
  insertar.run("Penthouse Carrión", "San Borja", 450000, 140, 4, 3, "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", "Penthouse exclusivo con terraza privada, jacuzzi y vista panorámica de la ciudad.");
  insertar.run("Apto familiar Monterrico", "Surco", 230000, 110, 3, 2, "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800", "Amplio departamento familiar cerca de colegios y centros comerciales.");
}

// Rutas
app.get("/departamentos", (req, res) => {
  const depas = db.prepare("SELECT * FROM departamentos").all();
  res.json(depas);
});

app.get("/departamentos/:id", (req, res) => {
  const depa = db.prepare("SELECT * FROM departamentos WHERE id = ?").get(req.params.id);
  if (!depa) return res.status(404).json({ error: "No encontrado" });
  res.json(depa);
});

app.post("/cotizaciones", (req, res) => {
  const { departamento_id, dni, nombre_contacto, email_contacto, telefono, mensaje } = req.body;
  if (!dni || !nombre_contacto || !email_contacto || !telefono) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }
  const insertar = db.prepare(`
    INSERT INTO cotizaciones (departamento_id, dni, nombre_contacto, email_contacto, telefono, mensaje)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const result = insertar.run(departamento_id || null, dni, nombre_contacto, email_contacto, telefono, mensaje || "");
  res.json({ ok: true, id: result.lastInsertRowid });
});

app.get("/cotizaciones", (req, res) => {
  const lista = db.prepare(`
    SELECT c.*, d.nombre as departamento_nombre
    FROM cotizaciones c
    LEFT JOIN departamentos d ON c.departamento_id = d.id
    ORDER BY c.fecha DESC
  `).all();
  res.json(lista);
});

app.listen(5000, () => console.log("Servidor corriendo en puerto 5000"));
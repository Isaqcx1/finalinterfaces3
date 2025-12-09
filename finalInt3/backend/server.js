const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuid } = require("uuid");
const { v4: uuidv4 } = require("uuid"); 

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "CLAVE_SUPER_SECRETA_JWT";

// Base de datos falsa temporal (luego migramos)
const usuarios = [
  { id: uuid(), nombre: "admin", password: bcrypt.hashSync("123", 10), role: "admin" },

  { id: uuid(), nombre: "juan", password: bcrypt.hashSync("111", 10), role: "usuario" },
  { id: uuid(), nombre: "maria", password: bcrypt.hashSync("222", 10), role: "usuario" },
  { id: uuid(), nombre: "carlos", password: bcrypt.hashSync("333", 10), role: "usuario" },
  { id: uuid(), nombre: "ana", password: bcrypt.hashSync("444", 10), role: "usuario" },
  { id: uuid(), nombre: "pedro", password: bcrypt.hashSync("555", 10), role: "usuario" },
  { id: uuid(), nombre: "luisa", password: bcrypt.hashSync("666", 10), role: "usuario" },
  { id: uuid(), nombre: "jose", password: bcrypt.hashSync("777", 10), role: "usuario" },
  { id: uuid(), nombre: "sofia", password: bcrypt.hashSync("888", 10), role: "usuario" },
  { id: uuid(), nombre: "miguel", password: bcrypt.hashSync("999", 10), role: "usuario" },
  { id: uuid(), nombre: "elena", password: bcrypt.hashSync("1234", 10), role: "usuario" },
  { id: uuid(), nombre: "diego", password: bcrypt.hashSync("5678", 10), role: "usuario" }
];


let cursos = [
  // TECNOLOGÍA (6)
  { id: uuid(), nombre: "Angular", duracion: 40, precio: 180, descripcion: "Angular completo", categoria: "Tecnología", estado: "activo" },
  { id: uuid(), nombre: "React", duracion: 35, precio: 170, descripcion: "React profesional", categoria: "Tecnología", estado: "activo" },
  { id: uuid(), nombre: "Java", duracion: 30, precio: 150, descripcion: "Java desde cero", categoria: "Tecnología", estado: "activo" },
  { id: uuid(), nombre: "Python", duracion: 25, precio: 140, descripcion: "Python práctico", categoria: "Tecnología", estado: "activo" },
  { id: uuid(), nombre: "NodeJS", duracion: 28, precio: 160, descripcion: "Backend con Node", categoria: "Tecnología", estado: "activo" },
  { id: uuid(), nombre: "SQL", duracion: 20, precio: 120, descripcion: "Base de datos", categoria: "Tecnología", estado: "activo" },

  // IDIOMAS (6)
  { id: uuid(), nombre: "Inglés Básico", duracion: 30, precio: 130, descripcion: "Inglés inicial", categoria: "Idiomas", estado: "activo" },
  { id: uuid(), nombre: "Inglés Intermedio", duracion: 35, precio: 150, descripcion: "Inglés intermedio", categoria: "Idiomas", estado: "activo" },
  { id: uuid(), nombre: "Francés", duracion: 28, precio: 140, descripcion: "Francés básico", categoria: "Idiomas", estado: "activo" },
  { id: uuid(), nombre: "Portugués", duracion: 25, precio: 135, descripcion: "Portugués básico", categoria: "Idiomas", estado: "activo" },
  { id: uuid(), nombre: "Alemán", duracion: 30, precio: 160, descripcion: "Alemán", categoria: "Idiomas", estado: "activo" },
  { id: uuid(), nombre: "Italiano", duracion: 24, precio: 130, descripcion: "Italiano", categoria: "Idiomas", estado: "activo" },

  // NEGOCIOS (6)
  { id: uuid(), nombre: "Marketing Digital", duracion: 22, precio: 110, descripcion: "Marketing", categoria: "Negocios", estado: "activo" },
  { id: uuid(), nombre: "Ventas", duracion: 20, precio: 100, descripcion: "Técnicas de venta", categoria: "Negocios", estado: "activo" },
  { id: uuid(), nombre: "Emprendimiento", duracion: 25, precio: 120, descripcion: "Negocios propios", categoria: "Negocios", estado: "activo" },
  { id: uuid(), nombre: "Finanzas", duracion: 30, precio: 150, descripcion: "Finanzas personales", categoria: "Negocios", estado: "activo" },
  { id: uuid(), nombre: "Contabilidad", duracion: 28, precio: 140, descripcion: "Contabilidad", categoria: "Negocios", estado: "activo" },
  { id: uuid(), nombre: "Gestión Empresarial", duracion: 35, precio: 170, descripcion: "Gestión", categoria: "Negocios", estado: "activo" },

  // DESARROLLO PERSONAL (6)
  { id: uuid(), nombre: "Liderazgo", duracion: 20, precio: 90, descripcion: "Liderazgo", categoria: "Desarrollo Personal", estado: "activo" },
  { id: uuid(), nombre: "Oratoria", duracion: 18, precio: 80, descripcion: "Hablar en público", categoria: "Desarrollo Personal", estado: "activo" },
  { id: uuid(), nombre: "Inteligencia Emocional", duracion: 22, precio: 100, descripcion: "Emociones", categoria: "Desarrollo Personal", estado: "activo" },
  { id: uuid(), nombre: "Autoestima", duracion: 15, precio: 70, descripcion: "Crecimiento", categoria: "Desarrollo Personal", estado: "activo" },
  { id: uuid(), nombre: "Productividad", duracion: 25, precio: 110, descripcion: "Organización", categoria: "Desarrollo Personal", estado: "activo" },
  { id: uuid(), nombre: "Mindfulness", duracion: 20, precio: 95, descripcion: "Atención plena", categoria: "Desarrollo Personal", estado: "activo" }
];

let inscripciones = [
  { idUsuario: usuarios[1].id, nombreCurso: "Angular", duracion: 40, descripcion: "Angular completo", estado: "En progreso", fecha: "2025-01-01" },
  { idUsuario: usuarios[1].id, nombreCurso: "Inglés Básico", duracion: 30, descripcion: "Idioma", estado: "En progreso", fecha: "2025-01-02" },

  { idUsuario: usuarios[2].id, nombreCurso: "React", duracion: 35, descripcion: "React", estado: "En progreso", fecha: "2025-01-03" },
  { idUsuario: usuarios[2].id, nombreCurso: "Marketing Digital", duracion: 22, descripcion: "Marketing", estado: "En progreso", fecha: "2025-01-04" },

  { idUsuario: usuarios[3].id, nombreCurso: "Python", duracion: 25, descripcion: "Python", estado: "En progreso", fecha: "2025-01-05" },
  { idUsuario: usuarios[3].id, nombreCurso: "Liderazgo", duracion: 20, descripcion: "Liderazgo", estado: "En progreso", fecha: "2025-01-06" },

  { idUsuario: usuarios[4].id, nombreCurso: "Java", duracion: 30, descripcion: "Java", estado: "En progreso", fecha: "2025-01-07" },
  { idUsuario: usuarios[4].id, nombreCurso: "Finanzas", duracion: 30, descripcion: "Finanzas", estado: "En progreso", fecha: "2025-01-08" },

  { idUsuario: usuarios[5].id, nombreCurso: "SQL", duracion: 20, descripcion: "BD", estado: "En progreso", fecha: "2025-01-09" },
  { idUsuario: usuarios[5].id, nombreCurso: "Productividad", duracion: 25, descripcion: "Productividad", estado: "En progreso", fecha: "2025-01-10" }
];

// LOGIN → Devuelve JWT
app.post("/api/login", (req, res) => {
  const { nombre, password } = req.body;

  const user = usuarios.find(u => u.nombre === nombre);

  if (!user) return res.status(400).json({ message: "Usuario no existe" });

  const ok = bcrypt.compareSync(password, user.password);
  if (!ok) return res.status(400).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      nombre: user.nombre
    },
    SECRET,
    { expiresIn: "6h" }
  );

  res.json({ token });
});

// Registrar usuario
app.post("/api/usuarios", (req, res) => {
  const { nombre, password } = req.body;

  const existe = usuarios.find(u => u.nombre === nombre);
  if (existe) return res.status(400).json({ message: "Ya existe" });

  usuarios.push({
    id: uuid(),
    nombre,
    password: bcrypt.hashSync(password, 10),
    role: "usuario"
  });

  res.json({ message: "Usuario registrado" });
});

// Obtener usuarios (SOLO ADMIN)
app.get("/api/usuarios", (req, res) => {
  res.json(usuarios);
});

// Listar cursos
app.get("/api/cursos", (req, res) => {
  res.json(cursos);
});

// ✅ ELIMINAR USUARIO (ADMIN)
app.delete("/api/usuarios/:id", (req, res) => {
  const { id } = req.params;

  const antes = usuarios.length;

  // 1. Eliminar usuario
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === id) {
      usuarios.splice(i, 1);
      break;
    }
  }

  if (usuarios.length === antes) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  // 2. Eliminar también sus inscripciones
  inscripciones = inscripciones.filter(i => i.idUsuario !== id);

  res.json({ message: "Usuario eliminado correctamente" });
});




app.post("/api/cursos", (req, res) => {
  const curso = {
    ...req.body,
    id: uuidv4()
  };

  cursos.push(curso);
  res.json(curso);
});



// ✅ EDITAR
app.put("/api/cursos/:id", (req, res) => {
  const { id } = req.params;

  const index = cursos.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Curso no encontrado" });
  }

  cursos[index] = { ...cursos[index], ...req.body };
  res.json(cursos[index]);
});

// ✅ ELIMINAR
app.delete("/api/cursos/:id", (req, res) => {
  const { id } = req.params;

  const antes = cursos.length;
  cursos = cursos.filter(c => c.id !== id);

  if (cursos.length === antes) {
    return res.status(404).json({ message: "Curso no encontrado" });
  }

  res.json({ message: "Curso eliminado" });
});








// Inscribir
app.post("/api/inscripciones", (req, res) => {
  const { idUsuario, nombreCurso, duracion, descripcion } = req.body;

  const yaExiste = inscripciones.find(
    i => i.idUsuario === idUsuario && i.nombreCurso === nombreCurso
  );

  if (yaExiste) {
    return res.status(400).json({ message: "Ya estás inscrito" });
  }

  inscripciones.push({
    idUsuario,
    nombreCurso,
    duracion,
    descripcion,
    estado: "En progreso",
    fecha: new Date().toISOString().split("T")[0]
  });

  res.json({ message: "Inscripción exitosa" });
});


// Obtener cursos de un usuario
app.get("/api/inscripciones/:idUsuario", (req, res) => {
  const { idUsuario } = req.params;
  const data = inscripciones.filter(i => i.idUsuario === idUsuario);
  res.json(data);
});

//Eliminar inscripcion 
app.delete("/api/inscripciones/:idUsuario/:nombreCurso", (req, res) => {
  const { idUsuario, nombreCurso } = req.params;

  const antes = inscripciones.length;

  inscripciones = inscripciones.filter(
    i => !(i.idUsuario == idUsuario && i.nombreCurso == nombreCurso)
  );

  if (inscripciones.length === antes) {
    return res.status(404).json({ message: "Inscripción no encontrada" });
  }

  res.json({ message: "Inscripción eliminada" });
});




app.listen(3000, () => console.log("API funcionando en http://localhost:3000"));

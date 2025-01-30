// server.js
const express = require('express');
const app = express();
const cors = require('cors'); // Para permitir solicitudes desde tu frontend
const port = 3000; // Cambia el puerto si es necesario

app.use(cors()); // Asegura que tu frontend pueda acceder a la API
app.use(express.json()); // Para poder recibir datos en formato JSON

// Array para almacenar los comentarios (en memoria, puedes conectarlo a una base de datos)
let comments = [];

// Ruta para obtener los comentarios
app.get('/api/comments', (req, res) => {
  res.status(200).json(comments);
});

// Ruta para enviar un nuevo comentario
app.post('/api/comments', (req, res) => {
  const { name, text } = req.body;

  // Validación de los datos
  if (!name || !text) {
    return res.status(400).json({ message: 'El nombre y el comentario son obligatorios' });
  }

  // Crear el nuevo comentario
  const newComment = {
    name,
    text,
    date: new Date().toLocaleString(),
  };

  // Almacenar el comentario (en memoria por ahora)
  comments.push(newComment);

  // Devolver el comentario recién creado
  return res.status(201).json(newComment);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});

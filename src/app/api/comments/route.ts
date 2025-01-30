import express from 'express';
import { Request, Response } from 'express';

// Crear un router de Express
const router = express.Router();

// Array para almacenar los comentarios (en memoria)
let comments: { name: string; text: string; date: string }[] = [];

// Ruta GET para obtener comentarios
router.get('/api/comments', (req: Request, res: Response) => {
  res.status(200).json(comments);
});

// Ruta POST para enviar un comentario
router.post('/api/comments', (req: Request, res: Response) => {
  const { name, text } = req.body;

  // Validar que se haya proporcionado un nombre y comentario
  if (!name || !text) {
    return res.status(400).json({ message: 'El nombre y el comentario son obligatorios' });
  }

  // Crear un nuevo comentario
  const newComment = {
    name,
    text,
    date: new Date().toLocaleString(),
  };

  // Agregar el comentario a la lista (en memoria)
  comments.push(newComment);

  // Enviar el comentario recién creado
  res.status(201).json(newComment);
});

export default router;

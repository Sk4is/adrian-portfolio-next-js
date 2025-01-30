"use client"; // Marca este archivo como Client Component

import { useState, useEffect } from "react";
import { Flex, Button, Textarea, Input } from "@/once-ui/components";  // Asumo que tienes Input
import { baseURL } from "@/app/resources";  // Si tienes baseURL, de lo contrario usa 'http://localhost:3000'

export default function Reviews() {
  const [comments, setComments] = useState<{ name: string; text: string; date: string }[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [name, setName] = useState<string>("");

  // Cargar comentarios desde la API
  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`${baseURL}/api/comments`);
      const data = await response.json();
      setComments(data);
    };

    fetchComments();
  }, []);

  // Enviar comentario a la API
  const handleSubmitComment = async () => {
    if (newComment.trim() && name.trim()) {
      const newCommentData = {
        name,
        text: newComment,
      };

      try {
        const response = await fetch(`${baseURL}/api/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCommentData),
        });

        if (!response.ok) {
          throw new Error('Hubo un error al enviar el comentario');
        }

        const savedComment = await response.json();
        setComments([...comments, savedComment]); // Agregar el nuevo comentario
        setNewComment(""); // Limpiar el campo de texto
        setName(""); // Limpiar el campo de nombre
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <Flex direction="column" alignItems="center" gap={4}>
      <h1>Deja tu Comentario</h1>

      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tu nombre"
        style={{ width: "100%", maxWidth: "600px" }}
      />

      <Textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Escribe tu comentario aquí"
        rows={4}
        style={{ width: "100%", maxWidth: "600px" }}
      />

      <Button onClick={handleSubmitComment}>Enviar Comentario</Button>

      <h2>Comentarios Anteriores</h2>
      <div>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
              <p><strong>{comment.name}</strong> ({comment.date})</p>
              <p>{comment.text}</p>
            </div>
          ))
        ) : (
          <p>No hay comentarios aún.</p>
        )}
      </div>
    </Flex>
  );
}

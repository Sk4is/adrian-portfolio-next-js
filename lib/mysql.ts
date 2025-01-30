import mysql from 'mysql2';

// Configura la conexión a tu base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost', // Cambia por la URL de tu servidor de base de datos (si es remoto)
  user: 'root', // Tu usuario de base de datos
  password: 'yourpassword', // Tu contraseña
  database: 'comments_db', // El nombre de la base de datos
});

export default connection;

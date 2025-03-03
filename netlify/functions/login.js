const jwt = require('jsonwebtoken');
const connectDB = require('./db');
const User = require('./userModel');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    console.log("Método no permitido:", event.httpMethod);
    return { statusCode: 405, body: 'Método no permitido' };
  }

  const { user, password } = JSON.parse(event.body);
  console.log("Datos recibidos:", { user, password });

  try {
    await connectDB();
  } catch (error) {
    console.error("Error de conexión:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al conectar a la base de datos' }),
    };
  }

  // Buscamos el usuario
  const foundUser = await User.findOne({ user });
  console.log("Usuario encontrado:", foundUser);

  if (!foundUser) {
    console.log("Usuario no encontrado:", user);
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Usuario no encontrado' }),
    };
  }

  // Comparamos la contraseña en texto plano (solo para pruebas)
  if (foundUser.password !== password) {
    console.log("Contraseña incorrecta para el usuario:", user);
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Contraseña incorrecta' }),
    };
  }

  const token = jwt.sign(
    { id: foundUser._id, user: foundUser.user },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  console.log("Token generado para", user);

  return {
    statusCode: 200,
    body: JSON.stringify({ token }),
  };
};
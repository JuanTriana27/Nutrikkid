const connectDB = require('./db');
const User = require('./userModel');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Método no permitido' }) };
  }
  
  // Intentamos conectar a la base de datos
  try {
    await connectDB();
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error de conexión a MongoDB: " + error.message })
    };
  }
  
  // Obtenemos los datos del usuario enviados en la petición
  const { user, password } = JSON.parse(event.body);
  
  try {
    const newUser = new User({ user, password });
    await newUser.save();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Usuario registrado correctamente" })
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message })
    };
  }
};

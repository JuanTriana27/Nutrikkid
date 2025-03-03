const bcrypt = require('bcryptjs');
const connectDB = require('./db');
const User = require('./userModel');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST')
    return { statusCode: 405, body: 'Método no permitido' };

  const { user, password } = JSON.parse(event.body);
  await connectDB();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ user, password: hashedPassword });
    await newUser.save();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Usuario registrado correctamente' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'El usuario ya existe o error al registrar' }),
    };
  }
};

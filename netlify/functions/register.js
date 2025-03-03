// register.js (Backend - Netlify Function)
const bcrypt = require("bcryptjs");
const connectDB = require("./db");
const User = require("./userModel");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST")
    return { statusCode: 405, body: JSON.stringify({ error: "Método no permitido" }) };

  const { user, password } = JSON.parse(event.body);
  await connectDB();

  try {
    const existingUser = await User.findOne({ user });
    if (existingUser) {
      return { statusCode: 400, body: JSON.stringify({ error: "El usuario ya existe" }) };
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ user, password: hashedPassword });
    await newUser.save();
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Usuario registrado correctamente" })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno del servidor" })
    };
  }
};
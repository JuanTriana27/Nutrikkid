const bcrypt = require("bcryptjs");
const connectDB = require("./db");
const User = require("./userModel");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Método no permitido" };

  const { user, password } = JSON.parse(event.body);
  await connectDB();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({ user, password: hashedPassword });
    return { statusCode: 200, body: JSON.stringify({ message: "Usuario registrado" }) };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify({ error: "El usuario ya existe" }) };
  }
};
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDB = require("./db");
const User = require("./userModel");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Método no permitido" };

  const { user, password } = JSON.parse(event.body);
  await connectDB();

  const userFound = await User.findOne({ user });

  if (!userFound || !(await bcrypt.compare(password, userFound.password))) {
    return { statusCode: 401, body: JSON.stringify({ error: "Credenciales inválidas" }) };
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1h" });

  return { statusCode: 200, body: JSON.stringify({ token }) };
};

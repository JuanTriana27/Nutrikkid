const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("Conectado a MongoDB");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    throw error;
  }
};

module.exports = connectDB;

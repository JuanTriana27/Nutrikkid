const mongoose = require('mongoose'); // Esta línea debe estar al inicio

const UserSchema = new mongoose.Schema({
  user: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  }
});

// Exportar correctamente el modelo
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
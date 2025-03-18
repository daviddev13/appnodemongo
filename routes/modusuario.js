//modelo de Usuario para Bd

const mongoose = require('mongoose');

// Definir esquema de direcciones
const direccionSchema = new mongoose.Schema({
    calle: { type: String, required: true },
    ciudad: { type: String, required: true },
    pais: { type: String, required: true },
    codigo_postal: { type: String, required: true }
});

// Definir esquema de usuario
const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    edad: { type: Number, required: false },
    fecha_creacion: { type: Date, default: Date.now },
    direcciones: [direccionSchema]
});

// Crear el modelo de Usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
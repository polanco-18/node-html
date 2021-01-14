const mongoose = require('mongoose');
const { Schema } = mongoose;

const PersonSchema = new Schema({
    nombre: { type: String, required: true },
    tipo: { type: String, required: true },
    celular: { type: String, required: true },
    email: { type: String, required: true }
});

module.exports = mongoose.model('persona', PersonSchema);
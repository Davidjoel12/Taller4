const mongoose = require('mongoose');

//Definir el esquema del usuario
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    age:{
        type: Number,
        required: true
    }
});

//Crear el modelo

const User = mongoose.model('User', userSchema);

module.exports = User;
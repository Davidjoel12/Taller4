const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');


//Crear la app de Express
const app = express();

//Middleware
app.use(bodyParser.json()); //Parsear JSON en as solicitudes

//Conectar a MongoDB
mongoose.connect('mongo://', {          //Corregir la url de MongoDB <---------------
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then (() => console.log('Conectado a MongoDB'))
.catch(() => console.log('Error al conectar a MongoDB:', error));

//Rutas
app.use('/api', userRoutes);

//Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Servidor corriendo en puerto ${PORT}');
});
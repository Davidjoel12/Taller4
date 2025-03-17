const express = required('express');

const router = express.Router();

const User = require('../models/User');

//Crear un nuevo usuario (Insertar)
router.post('/users', async (req, res) =>{
    const {name, email, age } = req.body;

    const newUser = new User({
        name,
        email,
        age
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

//Obtener todo los usuarios (Consulta o Leer)
router.get('/users', async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

//Obtener un usuario por ID (Leer)
router.get('/users/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user) {
            return res.status(404).json({ message: 'Usuario no encontrado'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//Actualizar un usuario (Update)
router.put('/users/:id', async (req, res) => {
    const {name , email, age } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate (
            req.params.id,
            {name, email, age },
            {new: true }//Retorna el documento actualizado
        );

        if(!updatedUser) {
            return res.status(400).json({ message: 'Usuario no encontrado'});
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//Eliminar un usuario(Delete)
router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if(!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado'});
        }

        res.status(200).json({message: 'Usuario eliminado'});
    } catch (error) {
        res.status(500).json({error: error.message });
    }
});


module.exports = router;
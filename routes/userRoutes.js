const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, updateUser, deleteUser, getUserById } = require('../controllers/userController');

//crear usuario
router.post('/', createUser);

//obtener todos los usuarios
router.get('/', getAllUsers);

//obtener usuario por id
router.get('/:id', getUserById);

// actualizar usuario
router.put('/:id', updateUser);

// eliminar usuario
router.delete('/:id', deleteUser);

//registrar usuario
router.post('/register', registerUser);

module.exports = router;

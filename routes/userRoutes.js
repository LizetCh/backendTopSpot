const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, updateUser, deleteUser, getUserById, registerUser, loginUser, uploadProfile } = require('../controllers/userController');
const upload = require('../middleware/upload');

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

//login user
router.post('/login', loginUser);

// subir foto de perfil
router.post('/uploadProfile', upload.single('profilePic'), uploadProfile);

module.exports = router;

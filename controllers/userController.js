const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// crear usuario
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Todos los campos son obligatorios');
  }

  const userExists = await User.findOne({ $or: [{ username }, { email }] });
  if (userExists) {
    res.status(400);
    throw new Error('El nombre de usuario o correo ya está en uso');
  }

  const user = await User.create({ username, email, password });
  res.status(201).json(user);
});

// obtener todos los usuarios
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// obtener usuario por ID
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
  res.status(200).json(user);
});

// actualizar usuario
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, 
      runValidators: true 
    }
  );
  res.status(200).json(updatedUser);
});

// eliminar usuario
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }

  await User.findByIdAndDelete();
  res.status(200).json({"mensaje": `Usuario con id ${req.params.id} eliminado`});
});

// register user
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Todos los campos son obligatorios');
  }

  try {
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      res.status(400);
      throw new Error('El usuario o email ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({message: 'Usuario creado correctamente' });
  }
  catch (error) {
    res.status(500);
    throw new Error('Error al registrar usuario');
  }
  
});

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  registerUser
};

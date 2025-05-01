const asyncHandler = require('express-async-handler');
const Song = require('../models/songModel');

// crear una canción 
const createSong = asyncHandler( async (req, res) => {
  if (!req.body.spotifyId || !req.body.title || !req.body.artist) {
    res.status(400);
    throw new Error('Faltan campos obligatorios');
  }
  const song = await Song.create({
    spotifyId: req.body.spotifyId,
    title: req.body.title,
    artist: req.body.artist,
    coverUrl: req.body.coverUrl
  })
  res.status(201).json(song);
});

// obtener todas las canciones
const getAllSongs = asyncHandler(async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
});

// obtener una canción por id
const getSongById = asyncHandler(async (req, res) => {
  const song = await Song.findById(req.params.id);
  if (!song) {
    res.status(404);
    throw new Error('Canción no encontrada');
  }
  res.json(song);
});

// actualizar una canción
const updateSong = asyncHandler(async (req,res) => {
  const song = await Song.findById(req.params.id);
  if (!song) {
    res.status(404);
    throw new Error('Canción no encontrada');
  }
  const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, { 
    new: true 
  })
  res.status(200).json(updatedSong);
})

// eliminar una canción
const deleteSong = asyncHandler( async (req,res) => {
  const song = await Song.findById(req.params.id);
  if (!song) {
    res.status(404);
    throw new Error('Canción no encontrada');
  }
  await Song.findByIdAndDelete(req.params.id);
  res.status(200).json({ "mensaje": `Canción con id ${req.params.id} eliminada`});
})

module.exports = {
  createSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong
};
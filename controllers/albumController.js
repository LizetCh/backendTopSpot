const asyncHandler = require('express-async-handler');
const Album = require('../models/albumModel');

// crear album
const createAlbum = asyncHandler(async (req, res) => {

  if (!req.body.spotifyId || !req.body.title || !req.body.artist) {
    res.status(400);
    throw new Error('Faltan campos obligatorios');
  }

  const album = await Album.create({
    spotifyId: req.body.spotifyId,
    title: req.body.title,
    artist: req.body.artist,
    coverUrl: req.body.coverUrl,
    songs: req.body.songs
  });
  res.status(201).json(album);
});

// obtener todos los albums
const getAllAlbums = asyncHandler(async (req, res) => {
  const albums = await Album.find(); 
  res.status(200).json(albums); 
});

// obtener un album por id
const getAlbumById = asyncHandler(async (req, res) => {
  const album = await Album.findById(req.params.id); 

  if (!album) {
    res.status(404);
    throw new Error('Álbum no encontrado');
  }
  res.status(200).json(album); 
});

// actualizar un album
const updateAlbum = asyncHandler(async (req, res) => {
  const album = await Album.findById(req.params.id);

  if (!album) {
    res.status(404);
    throw new Error('Álbum no encontrado');
  }

  const updatedAlbum = await Album.findByIdAndUpdate(req.params.id, req.body, { 
    new: true 
  });

  res.status(200).json(updatedAlbum); 
});

// eliminar un album
const deleteAlbum = asyncHandler(async (req, res) => {
  const album = await Album.findById(req.params.id);

  if (!album) {
    res.status(404);
    throw new Error('Álbum no encontrado');
  }

  // Elimina el álbum
  await Album.findByIdAndDelete();

  res.status(200).json({"mensaje": `Album con id ${req.params.id} eliminado`});
});

module.exports = {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum
};
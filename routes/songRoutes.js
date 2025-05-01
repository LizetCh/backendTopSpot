const express = require('express');
const router = express.Router();
const { createSong, getAllSongs, getSongById, updateSong, deleteSong} = require('../controllers/songController');

// crear cancion
router.post('/', createSong);

// obtener todas las canciones
router.get('/', getAllSongs);

// obtener cancion por id
router.get('/:id', getSongById);

// actualizar canción
router.put('/:id', updateSong);

// eliminar canción
router.delete('/:id', deleteSong);

module.exports = router;

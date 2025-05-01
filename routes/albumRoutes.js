const express = require('express');
const router = express.Router();
const { createAlbum, getAllAlbums, getAlbumById, updateAlbum, deleteAlbum} = require('../controllers/albumController');

//crear album
router.post('/', createAlbum);

//obtener albums
router.get('/', getAllAlbums);

//obtener album por id
router.get('/:id', getAlbumById);

//actualizar álbum
router.put('/:id', updateAlbum);

//eliminar álbum
router.delete('/:id', deleteAlbum);

module.exports = router;

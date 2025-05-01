const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  spotifyId: String,
  title: String,
  artist: String,
  coverUrl: String,
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
});

module.exports = mongoose.model('Album', albumSchema);

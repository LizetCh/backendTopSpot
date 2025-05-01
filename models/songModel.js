const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
  spotifyId: {
    type: String,
    required: true,
  },
  title: String,
  artist: String,
  coverUrl: String
});

module.exports = mongoose.model('Song', songSchema);

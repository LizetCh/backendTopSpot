const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  itemId: {
    type: String,
    required: true,
  },
  itemType: {
    type: String,
    enum: ['song', 'album'],
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);

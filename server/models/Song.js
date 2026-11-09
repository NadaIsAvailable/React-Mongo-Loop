const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  artist: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const SongModel = mongoose.model('Song', SongSchema);
module.exports = SongModel;

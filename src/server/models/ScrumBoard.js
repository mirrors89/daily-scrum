const mongoose = require('mongoose');

const ScrumBoardSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('ScrumBoard', ScrumBoardSchema);
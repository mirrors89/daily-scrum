const mongoose = require('mongoose');

const ScrumSchema = new mongoose.Schema({

  scrumBoardId: { type: String, default: '' },
  userId: { type: String, default: '' },
  content1: { type: String, default: '' },
  content2: { type: String, default: '' },
  content3: { type: String, default: '' },
  
  createDate: { type: Date, default: Date.now() },
  updateDate: { type: Date, default: Date.now() }
});


module.exports = mongoose.model('Scrum', ScrumSchema);
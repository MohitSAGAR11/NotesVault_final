const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    maxlength: 10000
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }]
} , {
    timestamps: true
});


// Index for better search performance
noteSchema.index({ userId: 1, tags: 1 });
noteSchema.index({ userId: 1, title: 'text', content: 'text' });

module.exports = mongoose.model('Note', noteSchema);
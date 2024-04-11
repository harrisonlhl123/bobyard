const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    type: String,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);
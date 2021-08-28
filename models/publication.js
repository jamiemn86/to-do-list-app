const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 80
  },
  task: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  }
});

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;

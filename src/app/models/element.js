var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var elementSchema = new Schema({
  type: String,
  style: String,
  class: String,
  url: String,
  src: String,
  content: String
});

module.exports = mongoose.model('Element', elementSchema);

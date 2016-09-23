var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var campaignSchema = new Schema({
  name: String,
  utm: String,
});

module.exports = mongoose.model('Campaign', campaignSchema);

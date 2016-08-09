var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var campaignSchema = new Schema({
  name: String,
  utm_campaign: String,
  startDate: Date
});

module.exports = mongoose.model('Campaign', campaignSchema);

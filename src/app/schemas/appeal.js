var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appealSchema = new Schema({
  info: {
    name: String,
    sender: String,
    senderAddress: String,
    subjectLine: String,
    campaign: String,
    sendDate: Date,
    scheduled: Boolean
  },
  emailContent: {
    headline: {type:String, default: ''},
    url: String,
    body: String,
    ps: String,
    image: {
      url: String,
      code: String,
      utm: String
    },
  },
  codes: {
    utm_medium: {type:String , default: 'email'},
    utm_source: {type:String, default: 'eappeal'},
    audience: String,
    resend: Number,
    series: Number,
    s_subsrc: String
  },
  signoffs: [{
    name: String,
    signature: Boolean,
    department: String
  }]
});
module.exports = mongoose.model('Appeal', appealSchema);

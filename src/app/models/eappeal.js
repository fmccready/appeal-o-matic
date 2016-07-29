var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eappealSchema = new Schema({
  info: {
    name: String,
    sender: String,
    senderAddress: String,
    subjectLine: String,
    campaign: String,
    sendDate: Date,
    scheduled: Boolean
  },
  content: {
    headline: String,
    url: String,
    body: [{
      contnet: {
        type: Schema.Types.ObjectId,
        ref: 'Element'
      }
    }],
    image: String,
  },
  codes: {
    utm_medium: {type:String , default: 'email'},
    utm_source: {type:String, default: 'eappeal'},
    sustainer: Boolean,
    resend: Number,
    s_src: String,
    s_subsrc: String
  },
  signoffs: [{
    name: String,
    signature: Boolean,
    department: String
  }]
});
module.exports = mongoose.model('Eappeal', eappealSchema);

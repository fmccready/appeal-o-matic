var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appealSchema = new Schema({
  info: {
    name: {type: String, default: ''},
    sender: {type: String, default: ''},
    senderAddress: {type: String, default: ''},
    subjectLine: {type: String, default: ''},
    campaign: {
      name: { type: String, default: ''},
      utm: { type: String, default: ''}
    },
    sendDate: {type: String, default: new Date()},
    scheduled: {type: Boolean, default: false}
  },
  content: {
    headline: {type:String, default: ''},
    url: {type: String, default: ''},
    body: {type: String, default: ''},
    ps: {type: String, default: ''},
    image: {
      url: {type: String, default: ''},
      code: {type: String, default: ''},
      utm: {type: String, default: ''}
    },
  },
  codes: {
    utm_medium: {type:String , default: 'email'},
    utm_source: {type:String, default: 'eappeal'},
    audience: {type: String, default: ''},
    resend: {type: Number, default: 0},
    series: {type: Number, default: 0},
    s_subsrc: {type: String, default: ''}
  },
  signoffs: {
    web: {type: String, default: ''},
    funDev: {type: String, default: ''},
    editor: {type: String, default: ''}
  }
});
module.exports = mongoose.model('Appeal', appealSchema);

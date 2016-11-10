var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Campaign = require('./campaign.js');
var Group = require('./group.js');

var appealSchema = new Schema({
  info: {
    name: {type: String, default: ''},
    template: {type: String, default: ''},
    sender: {type: String, default: ''},
    senderAddress: {type: String, default: ''},
    subjectLine: {type: String, default: ''},
    campaign: {
      _id: {type: Schema.Types.ObjectId, ref: 'Campaign'},
      name: String,
      utm: String,
      __v: Number 
    },
    sendDate: {type: Date, default: new Date()},
    scheduled: {type: Boolean, default: false},
    group: {type: String, default: ''},
    groupName: {type: String, default: ''}
  },
  content: {
    headline: {type:String, default: ''},
    url: {type: String, default: ''},
    body: {type: String, default: ''},
    ps: {type: String, default: ''},
    image: {
      url: {type: String, default: ''},
      code: {type: String, default: ''},
      utm: {type: String, default: ''},
      merlinId: {type: String, default: ''},
      brightcoveId: {type: String, default: ''},
      caption: {type: String},
      credit: {type: String},
      creditPlacement: {type: String},
      treatment: {type: String}
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
  },
  notes: {type: String, default: ''}
});
module.exports = mongoose.model('Appeal', appealSchema);

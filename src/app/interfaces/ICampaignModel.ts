import mongoose = require('mongoose');
import ICampaign = require('./ICampaign');
interface ICampaignModel extends ICampaign, mongoose.Document { }

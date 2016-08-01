var express = require('express');
var path = require('path');
var fs = require('fs');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');

//Express Setup
var app = express();
app.use('/public', express.static(__dirname + '/public'));
app.use('/vendor', express.static(__dirname + '/vendor'));
//app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/app/lib', express.static(__dirname + '/lib'));

//app.use('/public/scripts', express.static(__dirname + '/node_modules'));
//app.use('/app', express.static(__dirname + '/app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

// Mongoose Connection
mongoose.connect('mongodb://localhost:27017');
var db = mongoose.connection;
var Campaign = require('./app/models/campaign');
var Eappeal = require('./app/models/eappeal');
var Element = require('./app/models/element');

//restify.serve(app, Campaign, {});

var router = express.Router();
router.get('/campaigns', function(req, res){
  Campaign.find({}, function(err, docs){
    if (err) {
      console.log('some error in campaigns');
      return console.error(err);
    }
    console.log('something happeing in campaigns');
    res.json(docs);
  });
});
router.post('/campaigns', function(req, res){
  var obj = new Campaign(req.body);
  obj.save(function(err, obj){
    if (err){
      return console.error(err);
    }
    console.dir(res);
    res.status(200).json(obj);
    console.log(res.status);
  });
});
router.get('/', function(req, res){
  res.json({ message: 'API routes'});
});

app.use('/api', router);

// All other routes
app.get('/', function(req, res){
  console.log(__dirname);
  res.sendFile(path.join(__dirname, '/index.html'));
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected to MongoDB');
  // Set listen port
  app.listen(3000, function(){
    console.log('Listening on port 3000');
  });
});
// /app.use('/', express.static(__dirname + '/'));
module.exports = app;

var express = require('express');
var path = require('path');
var fs = require('fs');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Express Setup
var app = express();
app.use('/public', express.static(__dirname + '/dist/public'));
app.use('/vendor', express.static(__dirname + '/dist/vendor'));
//app.use('/scripts', express.static(__dirname + '/dist/scripts'));
app.use('/app/lib', express.static(__dirname + '/dist/lib'));
app.use('/', express.static(__dirname + '/dist/'));
//app.use('/public/scripts', express.static(__dirname + '/node_modules'));
app.use('/app', express.static(__dirname + '/dist/app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

// Mongoose Connection
mongoose.connect('mongodb://localhost:27017');
var db = mongoose.connection;
var Campaign = require('./dist/app/models/campaign');
var Eappeal = require('./dist/app/models/eappeal');
var Element = require('./dist/app/models/element');


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected to MongoDB');

  // REST API for mongoose
  app.get('/api/campaigns', function(req, res){
    Campaign.find({}, function(err, docs){
      if (err) {
        return console.error(err);
      }
      res.json(docs);
    });
  });
  app.post('/api/campaigns', function(req, res){
    var obj = new Campaign(req.body);
    obj.save(function(err, obj){
      if (err){
        return console.error(err);
      }
      res.status(200).json(obj);
    });
  });

  // All other routes
  app.get('/', function(req, res){
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '/index.html'));
  });

  // Set listen port
  app.listen(3000, function(){
    console.log('Listening on port 3000');
  });

});

module.exports = app;

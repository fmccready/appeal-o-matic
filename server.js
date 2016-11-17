var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var restify = require('express-restify-mongoose');
var router = express.Router();
var methodOverride = require('method-override');
var gulp = require('gulp');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Client = require('ftp');
var creds = require('./ftp-options.js');

//Express Setup
var app = express();
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};
app.use(allowCrossDomain);


// Socket.io Setup
io.on('connection', function(socket){
  console.log('Client connected');
  socket.emit('connected', 'Connected');
  socket.on('addAppeal', function(data){
    socket.broadcast.emit('addAppeal', data);
  });
  socket.on('removeAppeal', function(data){
    socket.broadcast.emit('removeAppeal', data);
  });
  socket.on('updateAppeal', function(data){
    socket.broadcast.emit('updateAppeal', data);
  })
  socket.on('disconnect', function(){
    console.log('A client disconnected');
  });
});
http.listen(5000, () => {
  console.log('started on port 5000');
});

// Mongoose Connection
mongoose.connect('mongodb://127.0.0.1:27017');
var db = mongoose.connection;
var Campaign = require('./src/app/schemas/campaign');
var Appeal = require('./src/app/schemas/appeal');
var Group = require('./src/app/schemas/group');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected to MongoDB');
  restify.serve(router, Campaign);
  restify.serve(router, Appeal);

  app.use(router);
/*
  // REST API for mongoose
  // Campaigns
  app.get('/api/campaigns', function(req, res){
    Campaign.find({}, function(err, docs){
      if (err) {
        return console.error(err);
      }
      res.json(docs);
    });
  });
  app.get('/api/campaigns/:id', function(req, res){
    Campaign.find({ _id: req.params.id }, function(err, docs){
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
  app.delete('/api/campaigns/:id', function(req, res){
    Campaign.find({ _id: req.params.id }).remove().exec();
    res.status(200).send(req.params.id + ' deleted');
  });
  // Appeals
  app.get('/api/appeals', function(req, res){
    Appeal.find({}, function(err, docs){
      if (err) {
        return console.error(err);
      }
      res.json(docs);
    });
  });
  app.post('/api/appeals', function(req, res){
    var obj = new Appeal(req.body);
    obj.save(function(err, obj){
      if (err){
        return console.error(err);
      }
      res.status(200).json(obj);
    });
  });
  app.delete('/api/appeals/:id', function(req, res){
    Appeal.find({ _id: req.params.id }).remove().exec();
    res.status(200).send(req.params.id + ' deleted');
  });
  */
  // All other routes
  app.use('/lib', express.static(__dirname + '/src/lib'));

  app.post('/image-upload', function(req, res){
    var base64Data = req.body.data.replace(/^data:image\/png;base64,/, "");
    
    fs.writeFile(`dist/assets/images/${req.body.id}.png`, base64Data, 'base64', function(err){
      if (err){
        res.send(err);
      }
      else {
        
        var c = new Client();
        c.on('ready', function(){
          c.put(`dist/assets/images/${req.body.id}.png`, `digital.ifcj.org/appeal-images/${req.body.id}.png`, function(err){
            if(err) throw err;
            c.end();
            res.send('finished');
            fs.unlink(`dist/assets/images/${req.body.id}.png`, (err) => {
              if(err) throw err;
              console.log(`deleted image ${req.body.id}.png`);
            });
          });
        });

        c.connect(creds.options);
      }
    });
  });
  app.use(express.static('/assets/images'));
  //app.get('/images/*', express.static(__dirname + '/dist/images'));
  app.get('/*', express.static(__dirname + '/dist'));
  app.get('/', function(req, res){
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '/dist/index.html'));
  });
  // Set listen port
  app.listen(3000, function(){
    console.log('Listening on port 3000');
  });

});

module.exports = app;

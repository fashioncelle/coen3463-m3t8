var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var db;

var tedtalksCollection = require('./models/tedtalks');
var mongoose = require('mongoose');
var mdbUrl ="mongodb://admin:Alexandra09@ds161018.mlab.com:61018/coen3463-t8"
mongoose.Promise = global.Promise;
mongoose.connect(mdbUrl);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.get('/index', function(req, res){
  res.render('index')
});
app.get('/gallery', function(req, res){
  res.render('gallery')
});
app.get('/list:listId', function(req, res){
  res.render('list')
});

app.get('/login', function(req, res, next) {
    res.render('login', {
            
        });
});


app.get('/tedtalks', function(req, res) {
  tedtalksCollection.find()
    .then(function(tedtalks) {
        res.render('tedtalks', {
            tedtalks: tedtalks
        });
    });
});


app.get('/tedtalkslist', function(req, res) {
    tedtalksCollection.find()
    .then(function(tedtalks) {
        res.render('tedtalkslist', {
          lists: tedtalks
      });
    });
});

app.post('/tedtalks', function(req, res) {
  console.log(req.body);
  var dataToSave = {
      title: req.body.title,
      uploader_name: req.body.uploader_name,
      youtube_page: req.body.youtube_page,
      youtube_link: req.body.youtube_link,
      description: req.body.description,
      pub_date: req.body.pub_date,
      category: req.body.category,
      views: req.body.views,
      likes: req.body.likes,
      embedded: req.body.embedded,
      creation_date: Date.now(),
      last_update: Date.now()
  };
  var tedtalks = new tedtalksCollection(dataToSave);
  tedtalks.save(function(err){
      if(!err){
        console.log("Saving Data Successfull!");
        res.redirect('/tedtalks');
      }
      else
      {
        console.log('Saving Data Failed!');
        return;
      }
  });
});    

app.get('/list/:listId', function(req, res) {
  var listId = req.params.listId;
  tedtalksCollection.findOne({_id: listId}, function (err, tedtalks){
    if (!err) {
      res.render('list', {
          list: list
      });
    }
  });
});

app.get('/tedtalks/:listId/edit', function(req, res) {
  var listId = req.params.listId;
  tedtalksCollection.findOne({_id: listId}, function (err, tedtalks){
    if (!err) {
      console.log('tedtalks loaded', tedtalks);
      res.render('update', {
          list: tedtalks
      });
    }
    else {
      res.end(err);
    }
  });
});

app.post('/tedtalks/:listId', function(req, res, next) {

  var listId = req.params.listId;

  var dataToSave = {
    title: req.body.title,
    uploader_name: req.body.uploader_name,
    youtube_page: req.body.youtube_page,
    youtube_link: req.body.youtube_link,
    description: req.body.description,
    pub_date: req.body.pub_date,
    category: req.body.category,
    views: req.body.views,
    likes: req.body.likes,
    embedded: req.body.embedded,
    creation_date: Date.now(),
    last_update: Date.now()
  };
  var tedtalks = new tedtalksCollection(dataToSave);
  tedtalks.save(function(err){
      if(!err){
        console.log("Saving Data Successfull!");
        res.redirect('/list/' + listId);
      }
      else
      {
        console.log('Saving Data Failed!');
        return;
      }
  });
});

app.get('/tedtalks/:listId/delete', function(req, res) {
  var listId = req.params.listId;
  tedtalksCollection.remove({_id: listId}, function(err){
    if(!err){
      console.log('Item Deleted!');
      res.redirect('/tedtalkslist')
    }
    else {
      console.log('Item not deleted!');
    }
  });
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
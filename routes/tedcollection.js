var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;

var Entry = require('../models/tedtalks');

var date = new Date();
var getDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/users/login')
  }
  next();
});

router.get('/tedtalks', function(req, res) {
        var tedtalksCollection = db.collection('tedtalks');
        tedtalksCollection.find().toArray(function(err, tedtalks) {
           console.log('tedtalks loaded', tedtalks);
          res.render('tedtalks', {
            tedtalks: tedtalks
          });
        });
    });


router.get('/tedtalkslist', function(req, res) {
    var tedtalksCollection = db.collection('tedtalks');
    tedtalksCollection.find().toArray(function(err, tedtalks) {
      console.log('Tedtalks list!');
      res.render('tedtalkslist', {
        lists: tedtalks
      });
    })
  });

    router.post('/tedtalks', function(req, res) {
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
        };

        db.collection('tedtalks')
          .save(dataToSave, function(err, list) {
            if (err) {
                console.log('Saving Data Failed!');
                return;
            }
            console.log("Saving Data Successfull!");
            res.redirect('/tedtalks');
        });
    });

    router.get('/list/:listId', function(req, res) {
        var listId = req.params.listId;
        var listCollection = db.collection('tedtalks');
        listCollection.findOne({ _id: new ObjectId(listId)}, function(err, list) {
            res.render('list', {
                list: list
            });
        });
    });

    router.get('/tedtalks/:listId/edit', function(req, res) {
        var listId = req.params.listId;
        var tedtalksCollection = db.collection('tedtalks');
        tedtalksCollection.findOne({_id: new ObjectId(listId)}, function(err, tedtalks) {
           console.log('tedtalks loaded', tedtalks);
          res.render('update', {
            list: tedtalks
          });
        });
    });

    router.post('/tedtalks/:listId', function(req, res, next) {

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
      };
        db.collection('tedtalks').updateOne({_id: new ObjectId(listId)}, {$set: dataToSave}, function(err, result) {
          if (err) {
                console.log('Saving Data Failed!');
                return;
            }
            console.log("Saving Data Successfull!");
            res.redirect('/list/' + listId);
        });
      });

    router.get('/tedtalks/:listId/delete', function(req, res) {
        var listId = req.params.listId;
        var tedtalksCollection = db.collection('tedtalks');
        tedtalksCollection.deleteOne({_id: new ObjectId(listId)}, function(err, tedtalks) {
           if (err) {
            console.log('Item not deleted!');
           }
           else {
            console.log('Item Deleted!');
            res.redirect('/tedtalkslist')
           }
          
    });
  });

module.exports = router;
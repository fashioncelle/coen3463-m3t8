var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tedtalksSchema = new Schema
(
    {
        title: {type: String, required: true},
        uploader_name: {type: String, required: true},
        youtube_page: {type: String, required: true},
        youtube_link: {type: String, required: true},
        description: {type: String},
        pub_date: {type: Date},
        category: {type: String},
        likes: {type: Number},
        created: {type: String},
        updated: {type: String},
        embedded: {type: String},
    },
    {
        collection: 'tedtalks'
    }
);

module.exports = mongoose.model('tedtalks', tedtalksSchema);
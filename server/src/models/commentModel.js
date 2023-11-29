var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    contents: { type: String, required: true },
    userName: { type: String, required: true },
    comment_date: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('board', commentSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var boardSchema = new Schema({
    categoryId : { type : String, required : true},
    title : { type: String, required: true },
    content: { type: String, required: true },
    userName: { type: String, required: true },
    boardDate: {type: Date, default: Date.now()},
    // comments: [commentSchema]
});

module.exports = mongoose.model('boards', boardSchema);

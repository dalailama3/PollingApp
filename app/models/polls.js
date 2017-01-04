'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    question: String,
    options: [String],
    votes: [{_id: false,idx: Number, count: Number}]
    // votes: { Number: {type: Number, default: 0, required: true} }
    
    
})


module.exports = mongoose.model('Poll', Poll)
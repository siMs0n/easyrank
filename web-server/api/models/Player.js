'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PlayerSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the player'
    },
    rank: {
        type: Number,
        required: 'Kindly enter the name of the player'
    }
});

module.exports = mongoose.model('Players', PlayerSchema);

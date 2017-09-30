'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
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

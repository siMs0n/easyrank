'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
    winner: {
        player: { type: Schema.Types.ObjectId, ref: 'Players' },
        score: Number
    },
    loser: {
        player: { type: Schema.Types.ObjectId, ref: 'Players' },
        score: Number
    }
});

module.exports = mongoose.model('Matches', MatchSchema);

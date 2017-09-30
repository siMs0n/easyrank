'use strict';

const mongoose = require('mongoose');
const Match = mongoose.model('Matches');

exports.getMatches = function(req, res) {
    Match.find({}, function(err, match) {
        if (err)
            res.send(err);
        res.json(match);
    });
};

exports.getMatch = function (req, res) {
    Match.findById(req.params.matchId)
        .populate('winner.player')
        .populate('loser.player')
        .exec(function (err, match) {
            if (err)
                res.send(err);
            res.json(match);
        });
};

exports.createMatch = function(req, res) {
    const match = new Match(req.body);
    match.save(function(err, match) {
        if (err)
            res.send(err);
        res.json(match);
    });
};

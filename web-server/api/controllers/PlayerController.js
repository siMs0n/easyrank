'use strict';

const mongoose = require('mongoose');
const Player = mongoose.model('Players');

exports.getPlayers = function(req, res) {
    Player.find({}, function(err, player) {
        if (err)
            res.send(err);
        res.json(player);
    });
};

exports.createPlayer = function(req, res) {
    const player = new Player(req.body);
    player.save(function(err, player) {
        if (err)
            res.send(err);
        res.json(player);
    });
};
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
    const name = req.body.name;
    const rank = 1000;
    const player = new Player({name: name, rank: rank});
    player.save(function(err, player) {
        if (err)
            res.send(err);
        res.json(player);
    });
};

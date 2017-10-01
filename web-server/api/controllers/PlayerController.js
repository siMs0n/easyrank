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

exports.getPlayer = function(playerId) {
    return new Promise(function (resolve, reject) {
        Player.findById(playerId, function(err, player) {
            if (err) {
                reject(err);
            } else {
                resolve(player);
            }
        });
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

exports.updatePlayerRank = function (playerId, updatedRank) {
    Player.findById(playerId, function (err, player) {
        player.rank = updatedRank;
        player.save();
    });
};

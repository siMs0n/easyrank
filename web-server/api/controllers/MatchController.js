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
        updateRanking(match);
    });
};

function updateRanking (match) {
    const playerController = require('../controllers/PlayerController');

    Promise.all([playerController.getPlayer(match.winner.player), playerController.getPlayer(match.loser.player)])
        .then(function(players) {
            const winner = players[0];
            const loser = players[1];

            const expectedScoreWinner = expectedScore(winner.rank, loser.rank);
            const updatedWinnerRank = calculateUpdatedRank(winner.rank, expectedScoreWinner, 1);

            const expectedScoreLoser = expectedScore(loser.rank, winner.rank);
            const updatedLoserRank = calculateUpdatedRank(loser.rank, expectedScoreLoser, 0);

            playerController.updatePlayerRank(winner._id, updatedWinnerRank);
            playerController.updatePlayerRank(loser._id, updatedLoserRank);
        });
}

function expectedScore (playerRank, opponentRank) {
    const rankDifference = opponentRank - playerRank;
    return 1/(1 + Math.pow(10, rankDifference/400));
}

function calculateUpdatedRank(rank, expectedScore, actualScore) {
    const K = getK(rank);
    return rank + K * (actualScore - expectedScore)
}

function getK(rank) {
    switch (true) {
        case rank < 1400:
            return 40;
        case rank < 1800:
            return 30;
        case rank < 2000:
            return 20;
        default:
            return 10;
    }
}
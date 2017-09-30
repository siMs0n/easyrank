'use strict';
module.exports = function(app) {
    const matchController = require('../controllers/MatchController');

    app.route('/api/matches')
        .get(matchController.getMatches)
        .post(matchController.createMatch);

    app.route('/api/matches/:matchId')
        .get(matchController.getMatch)

};

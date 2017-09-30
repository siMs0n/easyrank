'use strict';
module.exports = function(app) {
    const playerController = require('../controllers/playerController');

    app.route('/players')
        .get(playerController.getPlayers)
        .post(playerController.createPlayer);

};
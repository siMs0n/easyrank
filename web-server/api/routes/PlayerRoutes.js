'use strict';
module.exports = function(app) {
    const playerController = require('../controllers/PlayerController');

    app.route('/api/players')
        .get(playerController.getPlayers)
        .post(playerController.createPlayer);

};

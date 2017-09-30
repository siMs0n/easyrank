'use strict';
module.exports = function(app) {
    const playerRoutes = require('./PlayerRoutes');
    const matchRoutes = require('./MatchRoutes');

    playerRoutes(app);
    matchRoutes(app);

};
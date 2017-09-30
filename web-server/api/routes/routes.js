'use strict';
module.exports = function(app) {
    const playerRoutes = require('./PlayerRoutes');

    playerRoutes(app);

};
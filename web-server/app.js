const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/EasyRank');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Player = require('./api/models/Player');
const Match = require('./api/models/Match');

const routes = require('./api/routes/routes');
routes(app);

app.listen(8000, function () {
    console.log('Started web server on port 8000')
});

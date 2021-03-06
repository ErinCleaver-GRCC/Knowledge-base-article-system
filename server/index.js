require("dotenv").config({
});
const express = require('express');
const app = express();

const config = require('./config');

//update
const routes = require('./routes');
require('./config/express')(app)
require('./config/mongoose')(app)

app.use(routes)


app.listen(config.development.port, () => console.log("Running server"));
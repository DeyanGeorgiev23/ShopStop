const port = 3000;
const Config = require('./config/config');
const database = require('./config/database.config');
const express = require('express');

let app = express();
let env = process.env.NODE_ENV || 'development';

database(Config[env]);
require('./config/express')(app, Config[env]);
require('./config/routes')(app);
require('./config/passport')();

app.listen(port);
console.log(`Server listen on port ${port}...`);
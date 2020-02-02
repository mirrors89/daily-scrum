const express = require('express');
const mongoose = require('mongoose');

const config = require('./config/config');

const isDev = process.env.NODE_ENV !== 'production';
const port  = process.env.PORT || 8080;

// Set up Mongoose
mongoose.connect(isDev ? config.db_dev : config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    autoCreate: true
});
mongoose.Promise = global.Promise;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('dist'));

// API routes
require('./routes')(app);

app.listen(port, () => console.log(`Listening on port ${port}!`));

require('dotenv').config();

const express = require('express');//express is frame work based on node
const logger  = require('morgan');//terminal error logger
const path = require('path');//
const body = require('body-parser');
const port = process.env.PORT || process.argv[2] || 3000;

const homeRoute = require('./routes/index');

const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(body.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));

app.use('/', homeRoute);


app.listen(port, console.log('listen to port'),port);







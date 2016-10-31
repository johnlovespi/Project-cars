require('dotenv').config();

const express = require('express');//express is frame work based on node
const logger  = require('morgan');//terminal error logger
const path = require('path');//
const bodyParser = require('body-parser');
const favorites = require('./models/vehicle');
const routes = require('./routes/index');
const methodOverride = require('method-override');
// npm coookieparser
// npm express session


const homeRoute = require('./routes/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine','ejs');
app.set('views','views');


app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));
app.use(express.static(path.join(__dirname,'public')));

app.use('/', homeRoute);

// middleware to receive form inputs


// middleware for method override
app.use(methodOverride('_method'));

app.get('/', favorites.getFavorites, (req, res) => {
  console.log(res.favorites);
  res.render('show', {
    results: res.results || [],
    favorites: res.favorites || []
  });
});

app.get('/show', favorites.getFavorites, routes.search, (req, res) => {
  res.render('index', {
    results: res.results || [],
    favorites: res.favorites || []
  });
});

app.post('/favorites', favorites.saveFavorite, (req, res) => {
  res.redirect('/');
});

app.delete('/favorites/:id', favorites.deleteFavorite, (req, res) => {
  res.redirect('/');
});





const port = process.env.PORT || process.argv[2] || 3000;

app.listen(port, console.log('listen to port'),port);







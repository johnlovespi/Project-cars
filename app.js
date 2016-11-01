require('dotenv').config();

const express        = require('express');//express is frame work based on node
const logger         = require('morgan');//terminal error logger
const path           = require('path');
const bodyParser     = require('body-parser');
const favorites      = require('./models/vehicle');
const homeRoute      = require('./routes/index');
const userRoutes     = require('./routes/users');
const methodOverride = require('method-override');
const authRoute      = require('./routes/auth');
const session        = require('express-session')
const cookieParser   = require('cookie-parser');
const SECRET         = 'taco3000'

const app = express();

app.set('view engine','ejs');
app.set('views','views');


app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SECRET
}));




app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));
app.use(express.static(path.join(__dirname,'public')));

app.use('/', homeRoute);
app.use('/users', userRoutes);
app.use('/auth', authRoute);

// middleware to receive form inputs


// middleware for method override
app.use(methodOverride('_method'));



const port = process.env.PORT || process.argv[2] || 3000;


app.listen(port, console.log('listen to port'),port);







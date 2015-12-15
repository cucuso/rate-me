// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var passport = require('passport');
var configDB = require('./app/database.js');
var session   = require('express-session');

// configuration =================
mongoose.connect(configDB.url);     // connect to mongoDB database
require('./app/passport')(passport);

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/');// set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use(session({secret: 'suckerMentality'}));
app.use(passport.initialize());
app.use(passport.session());
// set the view engine to ejs
app.set('view engine', 'ejs');

require('./app/routes.js')(app,passport);






// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

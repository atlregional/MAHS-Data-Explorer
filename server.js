require('dotenv').config();
const express = require('express');
const compression = require('compression');
// var path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const session = require('express-session');
const mongoose = require('mongoose');
const routes = require('./routes');
// const passport = require('passport');
// const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const app = express();
const PORT = process.env.PORT || 3001;

// require('./config/passport');


// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());
app.use(cookieParser());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

//using the store: new MongoStore creates a new colection in our dB to store the sessions info (cookie)
//this way the web browser refresh will not delete it



// app.use(session({
//   secret: process.env.SessionSecret || 'sessionsecret',
//   resave: true,
//   saveUninitialized: true,
//   // resave: false,
//   store: new MongoStore({ mongooseConnection: mongoose.connection })
// }));

app.use(flash());

// // Incorporate PASSPORT

//   app.use(passport.initialize());
//   app.use(passport.session());


// Add routes, both API and view
app.use(routes);

const MONGODB_URI = process.env.MONGODB_URI;

// Connect to the Mongo DB
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("DB Connected")
}).catch(err => {
    console.log('DB Connection ERROR: ', err)
});

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://eviction-tracker:99gCLs6d62gB43V3@arcsafe0-wqosp.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
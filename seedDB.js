require('dotenv').config();
const mongoose = require("mongoose");
const db = require("./models");
const MONGODB_URI = process.env.MONGODB_URI;

const tractDataSeed = require('');
const tractInfoSeed = require('');
const cityCrossWalkSeed = require('');
const dataInfoSeed = require('');

const collection = 'tractinfo';

const content = 
  collection === 'tractinfo' ? 
    tractInfoSeed
  : null; // ternary for other collections here

mongoose.connect(MONGODB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true
  }
); 

// Use insertMany 

db[collection]
  .remove()
  .then(() => 
  db[collection].insertMany(content))
    .then(data => {
      console.log(data.length + " records inserted!");
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });


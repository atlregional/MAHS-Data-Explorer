require('dotenv').config();
const mongoose = require("mongoose");
const db = require("./models");
const MONGODB_URI = process.env.MONGODB_URI;
const contentSeed = require('');
const content = contentSeed;


mongoose.connect(MONGODB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true
  }
); 

db.content
  .remove()
  .then(() => 
  db.content.insertMany(content))
    .then(data => {
      console.log(data.length + " records inserted!");
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });


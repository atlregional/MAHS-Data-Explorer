require('dotenv').config();
const mongoose = require("mongoose");
const db = require("./models");
const MONGODB_URI = process.env.MONGODB_URI;

const tractDataSeed = require('./data/tractData.json');
const tractInfoSeed = require('./data/tractInfo.json');
const cityCrossWalkSeed = require('./data/tractToCityCrosswalk.json');
const dataInfoSeed = require('./data/dataLabelManifests.json');
const configSeed = require('./data/config.json');

const collection = 'config';

const tractInfoWCityArray = collection === 'tractinfo' ? 
  tractInfoSeed.map(tract => {
    const tractObj = {...tract};
    tractObj.Cities = [];
    cityCrossWalkSeed.forEach(tractWCity => 
      tractWCity.GEOID === tractObj.geoID ?
        tractObj.Cities.push(tractWCity.Cities) 
      : null);
    tractDataSeed.forEach(tractData =>
      tractData.GEOID.toString() === tract.GEOID ?
        tractObj.Data = tractData
      : null
    )
    return tractObj;
    }
  ) : null;

const content = 
// ternary for each collection here
  collection === 'tractinfo' ? 
    tractInfoWCityArray
  // :collection === 'tractdata' ? 
  //   tractDataSeed
  :collection === 'datainfo' ? 
    dataInfoSeed
  : collection === 'config' ?
    configSeed
  : null; 



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


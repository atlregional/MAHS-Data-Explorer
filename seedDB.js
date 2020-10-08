require('dotenv').config();
const mongoose = require("mongoose");
const db = require("./models");
const MONGODB_URI = process.env.MONGODB_URI;

// const tractDataSeed = require('./data/tractData.json');
const tractInfoSeed = require('./data/tractInfo.json');
const cityCrossWalkSeed = require('./data/tractToCityCrosswalk.json');
// const dataInfoSeed = require('./data/dataLabelManifests.json');

// const collection = 'tractinfo';
const infoSeed = () => {
tractInfoSeed.map(tract => {
  const tractObj = { ...tract };
  tractObj.cities = [];

  cityCrossWalkSeed.forEach(tractWCity =>
    tractWCity.GEOID === tractObj.GEOID ?
      tractObj.cities.push(tractWCity.Cities)
      : null)
      return tractObj;
})

}

const seedConfig = {
  datainfo: {
    active: true,
    filepath: "../data/datainfo.json",
    overwrite: true
  },
  tractdata: {
    active: true,
    filepath: "../data/tractdata.json",
    overwrite: true
  },
  tractinfo: {
    active: true,
    filepath: infoSeed(),
    overwrite: true
  },
}

// const tractInfoWCityArray = collection === 'tractinfo' ? 
//   tractInfoSeed.map(tract => {
//     const tractObj = {...tract};
//     tractObj.cities = [];
//     cityCrossWalkSeed.forEach(tractWCity => 
//       tractWCity.GEOID === tractObj.GEOID ?
//         tractObj.cities.push(tractWCity.Cities) 
//       : null);
//       console.log(tractObj)
//     return tractObj;
//     }
//   ) : null;


mongoose.connect(MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);


Object.entries(seedConfig).forEach(([key, value]) => {
  const seed = require(value.filepath);

    value.overwrite && db[key] ?
      // then remove and insert
      db[key]
        .remove()
        .then(() =>
          db[key].insertMany(seed))
        .then(data => {
          console.log(data.length + " records inserted!");
          process.exit(0);
        })
        .catch(err => {
          console.error(err);
          process.exit(1);
        })
      : // or else if not true then just insert without removing
      db[key].insertMany(seed)
        .then(data => {
          console.log(data.length + " records inserted!");
          process.exit(0);
        })
        .catch(err => {
          console.error(err);
          process.exit(1);
        })





});




















// const content = 
// // ternary for each collection here
//   collection === 'tractinfo' ? 
//     tractInfoWCityArray
//   :collection === 'tractdata' ? 
//     tractDataSeed
//   :collection === 'datainfoseed' ? 
//     dataInfoSeed
//   : null; 





// Use insertMany 

// db[collection]
//   .remove()
//   .then(() => 
//   db[collection].insertMany(content))
//     .then(data => {
//       console.log(data.length + " records inserted!");
//       process.exit(0);
//     })
//     .catch(err => {
//       console.error(err);
//       process.exit(1);
//     });
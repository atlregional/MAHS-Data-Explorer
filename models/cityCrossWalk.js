const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tractInfoSchema = new Schema({
    geoID : {type: String, required: true},
    county : {type: String, required: true},
    subarea : {type: String, required: true}
    // cities : {type: Array, required: true},
    // data : {type: Array, required: true}
    
});

const tractInfo = mongoose.model('tractinfo', tractInfoSchema);

module.exports = tractInfo;
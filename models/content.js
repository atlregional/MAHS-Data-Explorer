const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentSchema = new Schema({
    geoID : {type: String, required: true},
    county : {type: String, required: true},
    cities : {type: Array, required: true},
    data : {type: Array, required: true}
    
});

const content = mongoose.model('content', contentSchema);

module.exports = content;
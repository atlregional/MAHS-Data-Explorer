const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const stringAttributes = [
    'GEOID',
    'ID001',
    'ID002',
    "ID003",
    "ID004",
    "ID005", 
    "ID006",
    "ID007",
    "ID008",
    "ID009",
    "ID0010",
    "ID011",
    "ID012",
    "ID013",
    "ID014",
    "ID015",
    "ID016",
    "ID017",
    "ID018",
    "ID019",
    "ID020",
    "ID021",
    "ID022",
    "ID023",
    "ID024",
    "ID025",
    "ID026",
    "ID027",
    "ID028",
    "ID029",
    "ID030",
    "ID031",
    "ID032",
    "ID033",
    "ID034",
    "ID035",
    "ID036",
    "ID037",
    "ID038",
    "ID039",
    "ID040",
    "ID041",
    "ID042",
    "ID043",
    "ID044",
    "ID045",
    "ID046",
    "ID047",
    "ID048",
    "ID049",
    "ID050",
    "ID051",
    "ID052",
    "ID053",
    "ID054",
    "ID055",
    "ID056",
    "ID057",
    "ID058",
    "ID059",
    "ID060",
    "ID061",
    "ID062",
    "ID063",
    "ID064",
    "ID065",
    "ID066",
    "ID067",
    "ID068",
    "ID069",
    "ID070",
    "ID071",
    "ID072",
    "ID073",
    "ID074",
    "ID075",
    "ID076",
    "ID077",
    "ID078",
    "ID079",
    "ID080",
    "ID081",
    "ID082",
    "ID083",
    "ID084",
    "ID085",
    "ID086",
    "ID087",
    "ID088",
    "ID089",
    "ID090",
    "ID091",
    "ID092",
    "ID093",
    "ID094",
    "ID095",
    "ID096",
    "ID097",
    "ID098",
    "ID099",
    "ID0100",
    "ID101",
    "ID102",
    "ID103",
    "ID104",
    "ID105",
    "ID106",
    "ID107",
    "ID108",
    "ID109",
    "ID110"
 
];

const tractDataSchemaObj = new Object;

stringAttributes.forEach(attribute => 
    tractDataSchemaObj[attribute] = {type: Number});

const tractDataSchema = new Schema(tractDataSchemaObj)

const tractData = mongoose.model('tractdata', tractDataSchema);

module.exports = tractData;
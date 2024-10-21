import React, { useState, useEffect } from 'react';
import globalUtils from './globalUtils';
import queryString from 'query-string';
import HomePage from './View/HomePage';
import RingLoader from 'react-spinners/RingLoader';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

const App = () => {
  const queryObj = queryString.parse(document.location.search);
  const [tractInfo, setTractInfo] = useState();
  const [indicators, setIndicators] = useState();
  const [config, setConfig] = useState();

  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  };
  window.addEventListener('resize', appHeight);
  appHeight();


  const testTractInfo = [
    {
      "GEOID": "13089020100",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121006602",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13089021416",
      "Cities": [
        "Brookhaven"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050536",
      "Cities": [],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121011000",
      "Cities": [
        "East Point"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13121000700",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13067031507",
      "Cities": [
        "Powder Springs"
      ],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13089023101",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121006400",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121001001",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13089020400",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089021703",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089021305",
      "Cities": [
        "Dunwoody"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121003700",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13097080508",
      "Cities": [
        "Douglasville"
      ],
      "Subarea": "Subarea 7",
      "County": "Douglas"
    },
    {
      "GEOID": "13121006900",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13121010120",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050729",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13117130103",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Forsyth"
    },
    {
      "GEOID": "13135050537",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121003500",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13117130604",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13089022007",
      "Cities": [
        "Clarkston"
      ],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050317",
      "Cities": [
        "Peachtree Corners"
      ],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121004200",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13121003100",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030414",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Cobb"
    },
    {
      "GEOID": "13067031212",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "Cobb"
    },
    {
      "GEOID": "13121004400",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121007400",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13063040615",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13089023425",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121003800",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13121007500",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13089021813",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067031114",
      "Cities": [
        "Smyrna"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121008301",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13121003900",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13151070310",
      "Cities": [
        "McDonough"
      ],
      "Subarea": "Subarea 8",
      "County": "Henry"
    },
    {
      "GEOID": "13121011612",
      "Cities": [
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13117130602",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13089020200",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13063040617",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13121007603",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030344",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Cobb"
    },
    {
      "GEOID": "13121011100",
      "Cities": [
        "East Point"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13089021417",
      "Cities": [
        "Brookhaven"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121010128",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050225",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089021225",
      "Cities": [
        "Dunwoody"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067030363",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13089023332",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13063040530",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13135050440",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13057090907",
      "Cities": [
        "Woodstock"
      ],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13247060314",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Rockdale"
    },
    {
      "GEOID": "13067030250",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121001101",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050567",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089023327",
      "Cities": [
        "Stonecrest"
      ],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050228",
      "Cities": [
        "Duluth"
      ],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121011628",
      "Cities": [
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030246",
      "Cities": [
        "Kennesaw"
      ],
      "Subarea": "Subarea 2",
      "County": "Cobb"
    },
    {
      "GEOID": "13121010305",
      "Cities": [
        "Atlanta",
        "South Fulton"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13089021223",
      "Cities": [
        "Dunwoody"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067030248",
      "Cities": [],
      "Subarea": "Subarea 5",
      "County": "Cobb"
    },
    {
      "GEOID": "13067030275",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13121010524",
      "Cities": [
        "Union City"
      ],
      "Subarea": "Subarea 8",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030908",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13067030245",
      "Cities": [
        "Kennesaw"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050456",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13151070213",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Henry"
    },
    {
      "GEOID": "13151070122",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13121011802",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13063040527",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13135050453",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050455",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13063040630",
      "Cities": [
        "Jonesboro"
      ],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13089023217",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121001502",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050624",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121011645",
      "Cities": [
        "Milton"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030362",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121009410",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13057090707",
      "Cities": [
        "Canton",
        "Holly Springs"
      ],
      "Subarea": "Subarea 7",
      "County": "Cherokee"
    },
    {
      "GEOID": "13135050560",
      "Cities": [],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121009202",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13089021609",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121011513",
      "Cities": [
        "Roswell"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030249",
      "Cities": [
        "Kennesaw"
      ],
      "Subarea": "Subarea 5",
      "County": "Cobb"
    },
    {
      "GEOID": "13121001801",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13089021815",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121007810",
      "Cities": [
        "Atlanta",
        "South Fulton"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011630",
      "Cities": [
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13121009201",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050451",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067031514",
      "Cities": [
        "Powder Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13067031512",
      "Cities": [
        "Austell",
        "Powder Springs"
      ],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050556",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050732",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089022206",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13063040422",
      "Cities": [],
      "Subarea": "Subarea 8",
      "County": "Clayton"
    },
    {
      "GEOID": "13121011639",
      "Cities": [
        "Alpharetta"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050445",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121008909",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13067031122",
      "Cities": [
        "Smyrna"
      ],
      "Subarea": "Subarea 5",
      "County": "Cobb"
    },
    {
      "GEOID": "13067031120",
      "Cities": [
        "Mableton"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050632",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067030247",
      "Cities": [],
      "Subarea": "Subarea 5",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050462",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067031121",
      "Cities": [
        "Smyrna"
      ],
      "Subarea": "Subarea 3",
      "County": "Cobb"
    },
    {
      "GEOID": "13089023441",
      "Cities": [
        "Stonecrest"
      ],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121010006",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13121008801",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121009607",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011634",
      "Cities": [
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011307",
      "Cities": [
        "East Point"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13067031221",
      "Cities": [
        "Smyrna"
      ],
      "Subarea": "Subarea 4",
      "County": "Cobb"
    },
    {
      "GEOID": "13067030369",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121010124",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011435",
      "Cities": [
        "Roswell"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13089022405",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050579",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121006500",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13089021410",
      "Cities": [
        "Chamblee"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121002900",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121003600",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121006300",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050321",
      "Cities": [
        "Peachtree Corners"
      ],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121008903",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13089021411",
      "Cities": [
        "Brookhaven"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13117130607",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13121005300",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13063040519",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13121002100",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050541",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089021213",
      "Cities": [
        "Dunwoody"
      ],
      "Subarea": "Subarea 5",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067030412",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 1",
      "County": "Cobb"
    },
    {
      "GEOID": "13089021308",
      "Cities": [
        "Chamblee"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050433",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13117130406",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13089023213",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089021208",
      "Cities": [
        "Chamblee"
      ],
      "Subarea": "Subarea 2",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067031111",
      "Cities": [
        "Smyrna"
      ],
      "Subarea": "Subarea 5",
      "County": "Cobb"
    },
    {
      "GEOID": "13089023505",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121005200",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13117130302",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13121002400",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13067031207",
      "Cities": [],
      "Subarea": "Subarea 2",
      "County": "Cobb"
    },
    {
      "GEOID": "13089023000",
      "Cities": [
        "Avondale Estates"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121003200",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011624",
      "Cities": [
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030342",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13117130606",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13121006802",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023113",
      "Cities": [
        "Avondale Estates"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121005000",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121010127",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023322",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089020902",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121009001",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13151070127",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13063040623",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13089021419",
      "Cities": [
        "Brookhaven"
      ],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050458",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089023218",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121009203",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030270",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13089021227",
      "Cities": [
        "Dunwoody"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121009103",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011640",
      "Cities": [
        "Alpharetta"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050576",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121009302",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121010525",
      "Cities": [
        "South Fulton"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030261",
      "Cities": [
        "Kennesaw"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050591",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121005503",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050561",
      "Cities": [],
      "Subarea": "Subarea 8",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089021230",
      "Cities": [
        "Dunwoody"
      ],
      "Subarea": "Subarea 2",
      "County": "DeKalb"
    },
    {
      "GEOID": "13247060312",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Rockdale"
    },
    {
      "GEOID": "13067030269",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13089023431",
      "Cities": [
        "Stonecrest"
      ],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121011432",
      "Cities": [
        "Roswell"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050582",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121011627",
      "Cities": [
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050580",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121001702",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13057090908",
      "Cities": [
        "Woodstock"
      ],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13121009804",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13089021219",
      "Cities": [
        "Brookhaven"
      ],
      "Subarea": "Subarea 2",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121010538",
      "Cities": [
        "South Fulton",
        "Union City"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13089021228",
      "Cities": [
        "Dunwoody"
      ],
      "Subarea": "Subarea 6",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121010007",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050620",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067031216",
      "Cities": [],
      "Subarea": "Subarea 5",
      "County": "Cobb"
    },
    {
      "GEOID": "13151070125",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13121007710",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13121001802",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023321",
      "Cities": [
        "Stonecrest"
      ],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067030108",
      "Cities": [
        "Acworth"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050328",
      "Cities": [
        "Norcross"
      ],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121011656",
      "Cities": [
        "Alpharetta",
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030355",
      "Cities": [],
      "Subarea": "Subarea 2",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050442",
      "Cities": [
        "Lilburn"
      ],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050553",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121001302",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030910",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050459",
      "Cities": [
        "Lilburn"
      ],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067030365",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13089022012",
      "Cities": [
        "Clarkston"
      ],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089021418",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121009605",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023324",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121010214",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023445",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089022502",
      "Cities": [
        "Decatur"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067030259",
      "Cities": [
        "Kennesaw"
      ],
      "Subarea": "Subarea 3",
      "County": "Cobb"
    },
    {
      "GEOID": "13121010216",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13121001501",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030509",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13089023701",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050614",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13151070128",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13067030277",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13063040534",
      "Cities": [
        "Riverdale"
      ],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13067030510",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050555",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121010130",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030346",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13067030109",
      "Cities": [
        "Acworth"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121010219",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121009405",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13121001701",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13151070408",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Henry"
    },
    {
      "GEOID": "13067031413",
      "Cities": [
        "Mableton"
      ],
      "Subarea": "Subarea 4",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050570",
      "Cities": [
        "Lawrenceville"
      ],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121010314",
      "Cities": [
        "South Fulton"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13063040528",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13057090905",
      "Cities": [
        "Woodstock"
      ],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13067031113",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13089020600",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089021911",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121002300",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050539",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121010601",
      "Cities": [
        "College Park"
      ],
      "Subarea": "Subarea 4",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023504",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067030409",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121007703",
      "Cities": [
        "Atlanta",
        "South Fulton"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050219",
      "Cities": [
        "Duluth"
      ],
      "Subarea": "Subarea 4",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089020500",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121002500",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13121010117",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13121006200",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13089020300",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121006601",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050520",
      "Cities": [
        "Lawrenceville"
      ],
      "Subarea": "Subarea 8",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089023114",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121011301",
      "Cities": [
        "East Point"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011426",
      "Cities": [
        "Alpharetta",
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13121010604",
      "Cities": [
        "College Park",
        "South Fulton"
      ],
      "Subarea": "Subarea 4",
      "County": "Fulton"
    },
    {
      "GEOID": "13121005700",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13121004000",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023501",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089021412",
      "Cities": [
        "Brookhaven",
        "Chamblee"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121011423",
      "Cities": [
        "Roswell"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13089020801",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067030331",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121008202",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13117130611",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13089021405",
      "Cities": [
        "Brookhaven"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13117130507",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13121011419",
      "Cities": [
        "Roswell"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030408",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13089021306",
      "Cities": [
        "Doraville"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089021101",
      "Cities": [
        "Brookhaven"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050218",
      "Cities": [
        "Duluth"
      ],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067031118",
      "Cities": [
        "Smyrna"
      ],
      "Subarea": "Subarea 1",
      "County": "Cobb"
    },
    {
      "GEOID": "13067030405",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13117130503",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13089021910",
      "Cities": [
        "Tucker"
      ],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121007808",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050105",
      "Cities": [
        "Sugar Hill"
      ],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121005501",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050521",
      "Cities": [
        "Lawrenceville"
      ],
      "Subarea": "Subarea 8",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13113140206",
      "Cities": [
        "Peachtree City",
        "Tyrone town"
      ],
      "Subarea": "Subarea 6",
      "County": "Fayette"
    },
    {
      "GEOID": "13089022800",
      "Cities": [
        "Decatur"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121006000",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13067031506",
      "Cities": [
        "Powder Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050722",
      "Cities": [
        "Snellville"
      ],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067030233",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13067030334",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050315",
      "Cities": [
        "Peachtree Corners"
      ],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089023507",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089023424",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121010121",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023411",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13057091101",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13089022005",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089023601",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13117130205",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13067030341",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121007001",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030602",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 5",
      "County": "Cobb"
    },
    {
      "GEOID": "13089023410",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13063040416",
      "Cities": [
        "Morrow"
      ],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13089023102",
      "Cities": [
        "Avondale Estates"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121002600",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030319",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050425",
      "Cities": [
        "Lilburn"
      ],
      "Subarea": "Subarea 8",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13063040204",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Clayton"
    },
    {
      "GEOID": "13067031001",
      "Cities": [
        "Smyrna"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13067030700",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 2",
      "County": "Cobb"
    },
    {
      "GEOID": "13113140408",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Fayette"
    },
    {
      "GEOID": "13121007900",
      "Cities": [
        "Atlanta",
        "South Fulton"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13089022302",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121009501",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13113140207",
      "Cities": [
        "Peachtree City"
      ],
      "Subarea": "Subarea 6",
      "County": "Fayette"
    },
    {
      "GEOID": "13113140501",
      "Cities": [
        "Woolsey town"
      ],
      "Subarea": "Subarea 10",
      "County": "Fayette"
    },
    {
      "GEOID": "13121003000",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13117130303",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13135050719",
      "Cities": [
        "Snellville"
      ],
      "Subarea": "Subarea 8",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13117130204",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13117130605",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13089021913",
      "Cities": [
        "Tucker"
      ],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067030324",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13089023801",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13063040307",
      "Cities": [
        "Forest Park"
      ],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13057091006",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Cherokee"
    },
    {
      "GEOID": "13089021204",
      "Cities": [
        "Chamblee"
      ],
      "Subarea": "Subarea 2",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089023602",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089021602",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13117130410",
      "Cities": [
        "Cumming"
      ],
      "Subarea": "Subarea 5",
      "County": "Forsyth"
    },
    {
      "GEOID": "13089022001",
      "Cities": [
        "Tucker"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121004100",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13247060306",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Rockdale"
    },
    {
      "GEOID": "13067030235",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13089023802",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050311",
      "Cities": [
        "Norcross",
        "Peachtree Corners"
      ],
      "Subarea": "Subarea 1",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067030220",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13117130609",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13113140405",
      "Cities": [
        "Fayetteville"
      ],
      "Subarea": "Subarea 7",
      "County": "Fayette"
    },
    {
      "GEOID": "13121007604",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 4",
      "County": "Fulton"
    },
    {
      "GEOID": "13117130105",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13089021415",
      "Cities": [
        "Brookhaven"
      ],
      "Subarea": "Subarea 2",
      "County": "DeKalb"
    },
    {
      "GEOID": "13063040525",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13067030351",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121010135",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011801",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030267",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13089021421",
      "Cities": [
        "Brookhaven"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050618",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050461",
      "Cities": [
        "Lilburn"
      ],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089021608",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067030268",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13067030254",
      "Cities": [
        "Kennesaw"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121010310",
      "Cities": [
        "South Fulton"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050557",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121011659",
      "Cities": [
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050117",
      "Cities": [
        "Sugar Hill"
      ],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067030909",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121010213",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13247060316",
      "Cities": [
        "Conyers"
      ],
      "Subarea": "Subarea 8",
      "County": "Rockdale"
    },
    {
      "GEOID": "13121001102",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13121010534",
      "Cities": [
        "Fairburn",
        "South Fulton"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13063040633",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13135050554",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13057090710",
      "Cities": [
        "Holly Springs"
      ],
      "Subarea": "Subarea 7",
      "County": "Cherokee"
    },
    {
      "GEOID": "13135050581",
      "Cities": [
        "Lawrenceville"
      ],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089022016",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13151070317",
      "Cities": [
        "McDonough"
      ],
      "Subarea": "Subarea 8",
      "County": "Henry"
    },
    {
      "GEOID": "13135050449",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13097080606",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Douglas"
    },
    {
      "GEOID": "13135050745",
      "Cities": [
        "Grayson"
      ],
      "Subarea": "Subarea 8",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067031318",
      "Cities": [
        "Mableton"
      ],
      "Subarea": "Subarea 3",
      "County": "Cobb"
    },
    {
      "GEOID": "13057091011",
      "Cities": [
        "Woodstock"
      ],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13135050749",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121011652",
      "Cities": [
        "Alpharetta"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023330",
      "Cities": [
        "Stonecrest"
      ],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050736",
      "Cities": [
        "Snellville"
      ],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089021707",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121011436",
      "Cities": [
        "Roswell"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050744",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067030271",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13121010517",
      "Cities": [
        "South Fulton"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050630",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050757",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050466",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13063040309",
      "Cities": [
        "Forest Park"
      ],
      "Subarea": "Subarea 3",
      "County": "Clayton"
    },
    {
      "GEOID": "13135050464",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121010518",
      "Cities": [
        "South Fulton"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050324",
      "Cities": [
        "Peachtree Corners"
      ],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050234",
      "Cities": [
        "Duluth"
      ],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067031323",
      "Cities": [
        "Austell",
        "Mableton"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050559",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13117130415",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13067030240",
      "Cities": [
        "Acworth"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13089023702",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13151070312",
      "Cities": [
        "McDonough"
      ],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13151070508",
      "Cities": [
        "Hampton"
      ],
      "Subarea": "Subarea 9",
      "County": "Henry"
    },
    {
      "GEOID": "13121011441",
      "Cities": [
        "Roswell"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050755",
      "Cities": [
        "Snellville"
      ],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050578",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067031119",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121010313",
      "Cities": [
        "South Fulton"
      ],
      "Subarea": "Subarea 8",
      "County": "Fulton"
    },
    {
      "GEOID": "13121010126",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13089022304",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050569",
      "Cities": [
        "Lawrenceville"
      ],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121008905",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13063040638",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13151070208",
      "Cities": [
        "McDonough"
      ],
      "Subarea": "Subarea 9",
      "County": "Henry"
    },
    {
      "GEOID": "13135050448",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13057090605",
      "Cities": [
        "Canton"
      ],
      "Subarea": "Subarea 7",
      "County": "Cherokee"
    },
    {
      "GEOID": "13121009411",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13097080406",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Douglas"
    },
    {
      "GEOID": "13151070214",
      "Cities": [],
      "Subarea": "Subarea 9",
      "County": "Henry"
    },
    {
      "GEOID": "13247060103",
      "Cities": [],
      "Subarea": "Subarea 9",
      "County": "Rockdale"
    },
    {
      "GEOID": "13135050221",
      "Cities": [
        "Duluth"
      ],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067030364",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13067030272",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13067030255",
      "Cities": [
        "Kennesaw"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13057091107",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13135050235",
      "Cities": [
        "Duluth",
        "Suwanee"
      ],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121010215",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13063040419",
      "Cities": [
        "Morrow"
      ],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13135050551",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089021711",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067030907",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050613",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13247060310",
      "Cities": [
        "Conyers"
      ],
      "Subarea": "Subarea 8",
      "County": "Rockdale"
    },
    {
      "GEOID": "13135050756",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13063040635",
      "Cities": [
        "Jonesboro"
      ],
      "Subarea": "Subarea 8",
      "County": "Clayton"
    },
    {
      "GEOID": "13067030347",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13063040537",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13089021708",
      "Cities": [
        "Tucker"
      ],
      "Subarea": "Subarea 2",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067030366",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13063040529",
      "Cities": [
        "Riverdale"
      ],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13089023329",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121011203",
      "Cities": [
        "East Point"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13121010132",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050229",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13097080513",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Douglas"
    },
    {
      "GEOID": "13089023429",
      "Cities": [
        "Stonecrest"
      ],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13063040636",
      "Cities": [
        "Lovejoy"
      ],
      "Subarea": "Subarea 9",
      "County": "Clayton"
    },
    {
      "GEOID": "13089021816",
      "Cities": [
        "Tucker"
      ],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121010535",
      "Cities": [
        "Fairburn",
        "South Fulton"
      ],
      "Subarea": "Subarea 8",
      "County": "Fulton"
    },
    {
      "GEOID": "13121008701",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13121010217",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011433",
      "Cities": [
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050323",
      "Cities": [
        "Berkeley Lake",
        "Peachtree Corners"
      ],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13151070507",
      "Cities": [
        "Hampton"
      ],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13089021222",
      "Cities": [
        "Brookhaven",
        "Chamblee"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050754",
      "Cities": [
        "Snellville"
      ],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050738",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067030511",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121011654",
      "Cities": [
        "Alpharetta"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050622",
      "Cities": [
        "Dacula"
      ],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13151070121",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13089022303",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13151070506",
      "Cities": [
        "Hampton"
      ],
      "Subarea": "Subarea 9",
      "County": "Henry"
    },
    {
      "GEOID": "13089020901",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050741",
      "Cities": [
        "Grayson"
      ],
      "Subarea": "Subarea 8",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13063040629",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13121000502",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13117130411",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13089023319",
      "Cities": [
        "Stonecrest"
      ],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067031219",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "Cobb"
    },
    {
      "GEOID": "13089021220",
      "Cities": [
        "Brookhaven",
        "Chamblee"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050334",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089021221",
      "Cities": [
        "Brookhaven",
        "Chamblee"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067031007",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13089022404",
      "Cities": [],
      "Subarea": "Subarea 2",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050751",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13247060204",
      "Cities": [
        "Conyers"
      ],
      "Subarea": "Subarea 7",
      "County": "Rockdale"
    },
    {
      "GEOID": "13135050761",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121009406",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121009504",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13089021606",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121010311",
      "Cities": [
        "South Fulton"
      ],
      "Subarea": "Subarea 9",
      "County": "Fulton"
    },
    {
      "GEOID": "13057091010",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Cherokee"
    },
    {
      "GEOID": "13121010218",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13121010527",
      "Cities": [
        "Fairburn",
        "Union City"
      ],
      "Subarea": "Subarea 8",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011442",
      "Cities": [
        "Roswell"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13151070123",
      "Cities": [
        "Stockbridge"
      ],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13121011508",
      "Cities": [
        "Milton"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13121000501",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13121009606",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13067031417",
      "Cities": [
        "Austell",
        "Mableton"
      ],
      "Subarea": "Subarea 8",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050743",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067031412",
      "Cities": [
        "Mableton"
      ],
      "Subarea": "Subarea 8",
      "County": "Cobb"
    },
    {
      "GEOID": "13057090301",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Cherokee"
    },
    {
      "GEOID": "13121011660",
      "Cities": [
        "Alpharetta",
        "Milton"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13057090704",
      "Cities": [
        "Holly Springs"
      ],
      "Subarea": "Subarea 5",
      "County": "Cherokee"
    },
    {
      "GEOID": "13089021914",
      "Cities": [
        "Stone Mountain"
      ],
      "Subarea": "Subarea 8",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089023448",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050441",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121010536",
      "Cities": [
        "South Fulton",
        "Union City"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011204",
      "Cities": [
        "East Point"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050115",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089021823",
      "Cities": [
        "Tucker"
      ],
      "Subarea": "Subarea 8",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050116",
      "Cities": [
        "Sugar Hill"
      ],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13057090909",
      "Cities": [
        "Woodstock"
      ],
      "Subarea": "Subarea 5",
      "County": "Cherokee"
    },
    {
      "GEOID": "13089021506",
      "Cities": [],
      "Subarea": "Subarea 2",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121010131",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050631",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121010220",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13151070325",
      "Cities": [
        "McDonough"
      ],
      "Subarea": "Subarea 8",
      "County": "Henry"
    },
    {
      "GEOID": "13063040531",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Clayton"
    },
    {
      "GEOID": "13067030358",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050619",
      "Cities": [],
      "Subarea": "Subarea 8",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089021819",
      "Cities": [
        "Tucker"
      ],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121010402",
      "Cities": [
        "South Fulton"
      ],
      "Subarea": "Subarea 10",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030266",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13057090103",
      "Cities": [
        "Ball Ground"
      ],
      "Subarea": "Subarea 10",
      "County": "Cherokee"
    },
    {
      "GEOID": "13089023439",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067030354",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050583",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089023432",
      "Cities": [
        "Stonecrest"
      ],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121010004",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030244",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121008104",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050224",
      "Cities": [
        "Suwanee"
      ],
      "Subarea": "Subarea 4",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067031215",
      "Cities": [
        "Smyrna"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050222",
      "Cities": [
        "Duluth"
      ],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13247060315",
      "Cities": [
        "Conyers"
      ],
      "Subarea": "Subarea 7",
      "County": "Rockdale"
    },
    {
      "GEOID": "13151070117",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13057090807",
      "Cities": [
        "Holly Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13089021710",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121010005",
      "Cities": [
        "Atlanta",
        "Sandy Springs"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121007809",
      "Cities": [
        "Atlanta",
        "South Fulton"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13121005504",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13151070118",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13063040418",
      "Cities": [
        "Morrow"
      ],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13067030370",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13063040532",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Clayton"
    },
    {
      "GEOID": "13135050762",
      "Cities": [
        "Snellville"
      ],
      "Subarea": "Subarea 8",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050244",
      "Cities": [
        "Suwanee"
      ],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121010531",
      "Cities": [
        "South Fulton"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050627",
      "Cities": [
        "Dacula"
      ],
      "Subarea": "Subarea 8",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121009104",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023446",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121011437",
      "Cities": [
        "Roswell"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13067031319",
      "Cities": [
        "Mableton"
      ],
      "Subarea": "Subarea 3",
      "County": "Cobb"
    },
    {
      "GEOID": "13089023219",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067031415",
      "Cities": [
        "Austell",
        "Mableton"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13057091013",
      "Cities": [
        "Woodstock"
      ],
      "Subarea": "Subarea 7",
      "County": "Cherokee"
    },
    {
      "GEOID": "13135050330",
      "Cities": [
        "Norcross"
      ],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121010136",
      "Cities": [
        "Atlanta",
        "Sandy Springs"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023427",
      "Cities": [
        "Stonecrest"
      ],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067030329",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121011422",
      "Cities": [
        "Roswell"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13151070109",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13113140303",
      "Cities": [
        "Peachtree City"
      ],
      "Subarea": "Subarea 5",
      "County": "Fayette"
    },
    {
      "GEOID": "13089023214",
      "Cities": [
        "Stonecrest"
      ],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13063040510",
      "Cities": [
        "Riverdale"
      ],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13121011421",
      "Cities": [
        "Alpharetta",
        "Roswell"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13121000400",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030407",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050427",
      "Cities": [
        "Lilburn"
      ],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13151070113",
      "Cities": [
        "Stockbridge"
      ],
      "Subarea": "Subarea 8",
      "County": "Henry"
    },
    {
      "GEOID": "13089021908",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067030107",
      "Cities": [
        "Acworth"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13117130608",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13067030343",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13067031308",
      "Cities": [
        "Mableton"
      ],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13113140102",
      "Cities": [
        "Fayetteville"
      ],
      "Subarea": "Subarea 7",
      "County": "Fayette"
    },
    {
      "GEOID": "13089023313",
      "Cities": [
        "Stonecrest"
      ],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067031101",
      "Cities": [
        "Smyrna"
      ],
      "Subarea": "Subarea 1",
      "County": "Cobb"
    },
    {
      "GEOID": "13121009802",
      "Cities": [
        "Atlanta",
        "Sandy Springs"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121007602",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023426",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13117130508",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13089023422",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121011416",
      "Cities": [
        "Alpharetta",
        "Roswell"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13117130203",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Forsyth"
    },
    {
      "GEOID": "13113140403",
      "Cities": [
        "Fayetteville"
      ],
      "Subarea": "Subarea 8",
      "County": "Fayette"
    },
    {
      "GEOID": "13097080602",
      "Cities": [
        "Douglasville"
      ],
      "Subarea": "Subarea 9",
      "County": "Douglas"
    },
    {
      "GEOID": "13063040522",
      "Cities": [
        "Riverdale"
      ],
      "Subarea": "Subarea 8",
      "County": "Clayton"
    },
    {
      "GEOID": "13113140305",
      "Cities": [
        "Fayetteville"
      ],
      "Subarea": "Subarea 10",
      "County": "Fayette"
    },
    {
      "GEOID": "13121000100",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050205",
      "Cities": [
        "Duluth"
      ],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121010115",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13113140304",
      "Cities": [
        "Peachtree City"
      ],
      "Subarea": "Subarea 6",
      "County": "Fayette"
    },
    {
      "GEOID": "13089022100",
      "Cities": [
        "Clarkston"
      ],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121007705",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13063040518",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13063040509",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13089023413",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13097080304",
      "Cities": [
        "Douglasville"
      ],
      "Subarea": "Subarea 8",
      "County": "Douglas"
    },
    {
      "GEOID": "13121007807",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13117130305",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13089020802",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121008000",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13117130201",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Forsyth"
    },
    {
      "GEOID": "13089022700",
      "Cities": [
        "Decatur"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050725",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089021217",
      "Cities": [
        "Dunwoody"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121010603",
      "Cities": [
        "College Park"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13117130506",
      "Cities": [
        "Cumming"
      ],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13089022010",
      "Cities": [
        "Clarkston"
      ],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121008302",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050215",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13113140307",
      "Cities": [
        "Peachtree City"
      ],
      "Subarea": "Subarea 6",
      "County": "Fayette"
    },
    {
      "GEOID": "13067031117",
      "Cities": [
        "Mableton",
        "Smyrna"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13117130613",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13121011202",
      "Cities": [
        "East Point"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13089021808",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13117130104",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13067030236",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050416",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089023315",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121008601",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050306",
      "Cities": [
        "Norcross"
      ],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089023803",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121010508",
      "Cities": [
        "South Fulton"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13247060101",
      "Cities": [],
      "Subarea": "Subarea 9",
      "County": "Rockdale"
    },
    {
      "GEOID": "13117130504",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13089023211",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050435",
      "Cities": [
        "Lilburn"
      ],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13057091007",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13067030326",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13063040609",
      "Cities": [
        "Jonesboro"
      ],
      "Subarea": "Subarea 8",
      "County": "Clayton"
    },
    {
      "GEOID": "13067030322",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13089021912",
      "Cities": [
        "Tucker"
      ],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067031115",
      "Cities": [
        "Smyrna"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121009900",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13089021906",
      "Cities": [
        "Stone Mountain"
      ],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121011505",
      "Cities": [
        "Milton",
        "Roswell"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13117130102",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Forsyth"
    },
    {
      "GEOID": "13063040414",
      "Cities": [],
      "Subarea": "Subarea 8",
      "County": "Clayton"
    },
    {
      "GEOID": "13121007805",
      "Cities": [
        "Atlanta",
        "South Fulton"
      ],
      "Subarea": "Subarea 4",
      "County": "Fulton"
    },
    {
      "GEOID": "13117130304",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13063040606",
      "Cities": [
        "Lovejoy"
      ],
      "Subarea": "Subarea 9",
      "County": "Clayton"
    },
    {
      "GEOID": "13121010108",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13097080506",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Douglas"
    },
    {
      "GEOID": "13063040417",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13089023506",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121010315",
      "Cities": [
        "South Fulton",
        "Union City"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13121001204",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13057091014",
      "Cities": [
        "Woodstock"
      ],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13067031321",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "Cobb"
    },
    {
      "GEOID": "13067030253",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13067030260",
      "Cities": [
        "Acworth",
        "Kennesaw"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13057090201",
      "Cities": [
        "Waleska"
      ],
      "Subarea": "Subarea 10",
      "County": "Cherokee"
    },
    {
      "GEOID": "13121010125",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 4",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050443",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089023436",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121010537",
      "Cities": [
        "South Fulton"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050231",
      "Cities": [
        "Suwanee"
      ],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050241",
      "Cities": [
        "Sugar Hill",
        "Suwanee"
      ],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121010540",
      "Cities": [
        "Fairburn",
        "South Fulton"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050438",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121011515",
      "Cities": [
        "Milton"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050121",
      "Cities": [
        "Sugar Hill"
      ],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067030360",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050587",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13057090102",
      "Cities": [
        "Canton"
      ],
      "Subarea": "Subarea 10",
      "County": "Cherokee"
    },
    {
      "GEOID": "13067030367",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13117130412",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13151070207",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13121011512",
      "Cities": [
        "Milton",
        "Mountain Park",
        "Roswell"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011901",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13057090708",
      "Cities": [
        "Canton"
      ],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13089023430",
      "Cities": [
        "Stonecrest"
      ],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050335",
      "Cities": [
        "Peachtree Corners"
      ],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121011309",
      "Cities": [
        "East Point"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050327",
      "Cities": [
        "Norcross"
      ],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050236",
      "Cities": [],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121011510",
      "Cities": [
        "Alpharetta",
        "Milton",
        "Roswell"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13121007711",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13063040420",
      "Cities": [],
      "Subarea": "Subarea 8",
      "County": "Clayton"
    },
    {
      "GEOID": "13089021821",
      "Cities": [
        "Tucker"
      ],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121001301",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13117130414",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13135050572",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13151070120",
      "Cities": [
        "Stockbridge"
      ],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13113140210",
      "Cities": [
        "Peachtree City",
        "Tyrone town"
      ],
      "Subarea": "Subarea 6",
      "County": "Fayette"
    },
    {
      "GEOID": "13097080405",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Douglas"
    },
    {
      "GEOID": "13121000601",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13067031518",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050460",
      "Cities": [
        "Lilburn"
      ],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050447",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050233",
      "Cities": [
        "Duluth"
      ],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13057090806",
      "Cities": [
        "Holly Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13117130615",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13067031316",
      "Cities": [
        "Mableton"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13113140409",
      "Cities": [
        "Fayetteville"
      ],
      "Subarea": "Subarea 8",
      "County": "Fayette"
    },
    {
      "GEOID": "13089021226",
      "Cities": [
        "Dunwoody"
      ],
      "Subarea": "Subarea 2",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050120",
      "Cities": [
        "Sugar Hill"
      ],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050625",
      "Cities": [],
      "Subarea": "Subarea 9",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050589",
      "Cities": [
        "Lawrenceville"
      ],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067031214",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "Cobb"
    },
    {
      "GEOID": "13089023317",
      "Cities": [
        "Lithonia",
        "Stonecrest"
      ],
      "Subarea": "Subarea 8",
      "County": "DeKalb"
    },
    {
      "GEOID": "13097080408",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Douglas"
    },
    {
      "GEOID": "13135050336",
      "Cities": [
        "Norcross",
        "Peachtree Corners"
      ],
      "Subarea": "Subarea 4",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121010222",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13121008702",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030111",
      "Cities": [
        "Acworth",
        "Kennesaw"
      ],
      "Subarea": "Subarea 5",
      "County": "Cobb"
    },
    {
      "GEOID": "13067031516",
      "Cities": [
        "Powder Springs"
      ],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050240",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089021709",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13097080407",
      "Cities": [],
      "Subarea": "Subarea 9",
      "County": "Douglas"
    },
    {
      "GEOID": "13121010801",
      "Cities": [
        "Hapeville"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13121010003",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050586",
      "Cities": [
        "Lawrenceville"
      ],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050331",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067030256",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121010520",
      "Cities": [
        "Fairburn",
        "South Fulton"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13063040639",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13151070322",
      "Cities": [
        "McDonough"
      ],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13121011439",
      "Cities": [
        "Roswell"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011902",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13063040628",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13121011651",
      "Cities": [
        "Alpharetta"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011638",
      "Cities": [
        "Alpharetta",
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050623",
      "Cities": [
        "Dacula"
      ],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13113140309",
      "Cities": [
        "Peachtree City"
      ],
      "Subarea": "Subarea 6",
      "County": "Fayette"
    },
    {
      "GEOID": "13135050617",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067030112",
      "Cities": [
        "Acworth"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121008908",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050450",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067031416",
      "Cities": [
        "Austell"
      ],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13121011310",
      "Cities": [
        "East Point"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13097080204",
      "Cities": [],
      "Subarea": "Subarea 8",
      "County": "Douglas"
    },
    {
      "GEOID": "13113140209",
      "Cities": [
        "Peachtree City"
      ],
      "Subarea": "Subarea 5",
      "County": "Fayette"
    },
    {
      "GEOID": "13057090709",
      "Cities": [
        "Holly Springs",
        "Woodstock"
      ],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13089021712",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13247060317",
      "Cities": [
        "Conyers"
      ],
      "Subarea": "Subarea 7",
      "County": "Rockdale"
    },
    {
      "GEOID": "13057091009",
      "Cities": [
        "Woodstock"
      ],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13067030361",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13151070206",
      "Cities": [],
      "Subarea": "Subarea 9",
      "County": "Henry"
    },
    {
      "GEOID": "13151070324",
      "Cities": [
        "McDonough"
      ],
      "Subarea": "Subarea 8",
      "County": "Henry"
    },
    {
      "GEOID": "13135050552",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089022013",
      "Cities": [
        "Clarkston"
      ],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050747",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13117130413",
      "Cities": [
        "Cumming"
      ],
      "Subarea": "Subarea 5",
      "County": "Forsyth"
    },
    {
      "GEOID": "13117130614",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13135050444",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050118",
      "Cities": [
        "Sugar Hill"
      ],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050563",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13097080107",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Douglas"
    },
    {
      "GEOID": "13063040421",
      "Cities": [],
      "Subarea": "Subarea 8",
      "County": "Clayton"
    },
    {
      "GEOID": "13113140103",
      "Cities": [],
      "Subarea": "Subarea 9",
      "County": "Fayette"
    },
    {
      "GEOID": "13247060411",
      "Cities": [],
      "Subarea": "Subarea 9",
      "County": "Rockdale"
    },
    {
      "GEOID": "13121009503",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13151070210",
      "Cities": [
        "McDonough"
      ],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13057091105",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13089021310",
      "Cities": [
        "Doraville"
      ],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13057090402",
      "Cities": [
        "Canton"
      ],
      "Subarea": "Subarea 10",
      "County": "Cherokee"
    },
    {
      "GEOID": "13067030264",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13097080305",
      "Cities": [
        "Douglasville"
      ],
      "Subarea": "Subarea 8",
      "County": "Douglas"
    },
    {
      "GEOID": "13057090503",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Cherokee"
    },
    {
      "GEOID": "13135050628",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067030356",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "Cobb"
    },
    {
      "GEOID": "13121001206",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050633",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089021917",
      "Cities": [
        "Pine Lake"
      ],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067031513",
      "Cities": [
        "Powder Springs"
      ],
      "Subarea": "Subarea 5",
      "County": "Cobb"
    },
    {
      "GEOID": "13121011444",
      "Cities": [
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13089021505",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121008906",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13097080608",
      "Cities": [
        "Douglasville"
      ],
      "Subarea": "Subarea 7",
      "County": "Douglas"
    },
    {
      "GEOID": "13067030911",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121009106",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13121002802",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13151070211",
      "Cities": [
        "Stockbridge"
      ],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13151070320",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13089023438",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121000202",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13151070318",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13135050111",
      "Cities": [],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050636",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050585",
      "Cities": [
        "Lawrenceville"
      ],
      "Subarea": "Subarea 8",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067030265",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050733",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067031220",
      "Cities": [
        "Smyrna"
      ],
      "Subarea": "Subarea 4",
      "County": "Cobb"
    },
    {
      "GEOID": "13057090810",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Cherokee"
    },
    {
      "GEOID": "13121011443",
      "Cities": [
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030350",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121011511",
      "Cities": [
        "Alpharetta",
        "Milton"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13151070315",
      "Cities": [
        "Stockbridge"
      ],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13135050566",
      "Cities": [
        "Lawrenceville"
      ],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050454",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13057090101",
      "Cities": [
        "Ball Ground"
      ],
      "Subarea": "Subarea 10",
      "County": "Cherokee"
    },
    {
      "GEOID": "13121008907",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13247060408",
      "Cities": [],
      "Subarea": "Subarea 9",
      "County": "Rockdale"
    },
    {
      "GEOID": "13063040535",
      "Cities": [
        "Riverdale"
      ],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13067030357",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121011446",
      "Cities": [
        "Roswell"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011644",
      "Cities": [
        "Milton"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13057090202",
      "Cities": [
        "Waleska"
      ],
      "Subarea": "Subarea 10",
      "County": "Cherokee"
    },
    {
      "GEOID": "13121007708",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030257",
      "Cities": [
        "Kennesaw"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13151070215",
      "Cities": [],
      "Subarea": "Subarea 9",
      "County": "Henry"
    },
    {
      "GEOID": "13121006702",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13063040625",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13113140410",
      "Cities": [
        "Fayetteville"
      ],
      "Subarea": "Subarea 8",
      "County": "Fayette"
    },
    {
      "GEOID": "13063040536",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13135050226",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050740",
      "Cities": [
        "Lawrenceville"
      ],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121011509",
      "Cities": [
        "Milton",
        "Roswell"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13063040538",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13121011646",
      "Cities": [
        "Alpharetta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011507",
      "Cities": [
        "Milton"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13057090906",
      "Cities": [
        "Woodstock"
      ],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13067030251",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13057090303",
      "Cities": [
        "Canton"
      ],
      "Subarea": "Subarea 10",
      "County": "Cherokee"
    },
    {
      "GEOID": "13089023447",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121011514",
      "Cities": [
        "Milton"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050242",
      "Cities": [
        "Sugar Hill",
        "Suwanee"
      ],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121010137",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13089021309",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067031320",
      "Cities": [
        "Mableton"
      ],
      "Subarea": "Subarea 4",
      "County": "Cobb"
    },
    {
      "GEOID": "13121011636",
      "Cities": [
        "Alpharetta"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023331",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067031213",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "Cobb"
    },
    {
      "GEOID": "13121010539",
      "Cities": [
        "Fairburn",
        "South Fulton",
        "Union City"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030263",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050227",
      "Cities": [
        "Berkeley Lake",
        "Duluth"
      ],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089021817",
      "Cities": [
        "Tucker"
      ],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089022014",
      "Cities": [
        "Clarkston"
      ],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121010529",
      "Cities": [
        "South Fulton"
      ],
      "Subarea": "Subarea 8",
      "County": "Fulton"
    },
    {
      "GEOID": "13057091104",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Cherokee"
    },
    {
      "GEOID": "13089023444",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089022403",
      "Cities": [
        "Decatur"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121005800",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121010204",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13067031116",
      "Cities": [
        "Smyrna"
      ],
      "Subarea": "Subarea 1",
      "County": "Cobb"
    },
    {
      "GEOID": "13089021409",
      "Cities": [
        "Chamblee"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13113140502",
      "Cities": [
        "Brooks town"
      ],
      "Subarea": "Subarea 10",
      "County": "Fayette"
    },
    {
      "GEOID": "13089021301",
      "Cities": [
        "Chamblee"
      ],
      "Subarea": "Subarea 2",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050526",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13063040521",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13135050415",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089023603",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13151070307",
      "Cities": [
        "McDonough"
      ],
      "Subarea": "Subarea 8",
      "County": "Henry"
    },
    {
      "GEOID": "13121007002",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13247060403",
      "Cities": [],
      "Subarea": "Subarea 9",
      "County": "Rockdale"
    },
    {
      "GEOID": "13121010212",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13247060407",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Rockdale"
    },
    {
      "GEOID": "13063040523",
      "Cities": [
        "Riverdale"
      ],
      "Subarea": "Subarea 8",
      "County": "Clayton"
    },
    {
      "GEOID": "13067030505",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13117130101",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Forsyth"
    },
    {
      "GEOID": "13063040409",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13117130610",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13135050549",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121007806",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13121008500",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13063040306",
      "Cities": [
        "Forest Park"
      ],
      "Subarea": "Subarea 3",
      "County": "Clayton"
    },
    {
      "GEOID": "13247060201",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Rockdale"
    },
    {
      "GEOID": "13067031306",
      "Cities": [
        "Mableton"
      ],
      "Subarea": "Subarea 8",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050529",
      "Cities": [],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13063040512",
      "Cities": [
        "Riverdale"
      ],
      "Subarea": "Subarea 8",
      "County": "Clayton"
    },
    {
      "GEOID": "13121010107",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050322",
      "Cities": [
        "Peachtree Corners"
      ],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089022900",
      "Cities": [
        "Decatur"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089021210",
      "Cities": [
        "Dunwoody"
      ],
      "Subarea": "Subarea 5",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121012300",
      "Cities": [
        "College Park",
        "East Point"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030411",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 3",
      "County": "Cobb"
    },
    {
      "GEOID": "13067030800",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 2",
      "County": "Cobb"
    },
    {
      "GEOID": "13057091001",
      "Cities": [
        "Woodstock"
      ],
      "Subarea": "Subarea 5",
      "County": "Cherokee"
    },
    {
      "GEOID": "13089023108",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089021211",
      "Cities": [
        "Dunwoody"
      ],
      "Subarea": "Subarea 6",
      "County": "DeKalb"
    },
    {
      "GEOID": "13117130601",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13067030507",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121011618",
      "Cities": [
        "Alpharetta"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13097080507",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Douglas"
    },
    {
      "GEOID": "13247060406",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Rockdale"
    },
    {
      "GEOID": "13097080505",
      "Cities": [
        "Douglasville"
      ],
      "Subarea": "Subarea 7",
      "County": "Douglas"
    },
    {
      "GEOID": "13089022203",
      "Cities": [
        "Decatur"
      ],
      "Subarea": "Subarea 2",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067031110",
      "Cities": [
        "Smyrna"
      ],
      "Subarea": "Subarea 1",
      "County": "Cobb"
    },
    {
      "GEOID": "13089021812",
      "Cities": [
        "Tucker"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067030345",
      "Cities": [],
      "Subarea": "Subarea 2",
      "County": "Cobb"
    },
    {
      "GEOID": "13063040302",
      "Cities": [
        "Forest Park"
      ],
      "Subarea": "Subarea 3",
      "County": "Clayton"
    },
    {
      "GEOID": "13247060305",
      "Cities": [
        "Conyers"
      ],
      "Subarea": "Subarea 8",
      "County": "Rockdale"
    },
    {
      "GEOID": "13121011417",
      "Cities": [
        "Roswell"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13089020700",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067031112",
      "Cities": [
        "Smyrna"
      ],
      "Subarea": "Subarea 5",
      "County": "Cobb"
    },
    {
      "GEOID": "13067030335",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13097080403",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Douglas"
    },
    {
      "GEOID": "13135050430",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089023311",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13063040614",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13113140404",
      "Cities": [
        "Fayetteville"
      ],
      "Subarea": "Subarea 8",
      "County": "Fayette"
    },
    {
      "GEOID": "13097080303",
      "Cities": [
        "Douglasville"
      ],
      "Subarea": "Subarea 8",
      "County": "Douglas"
    },
    {
      "GEOID": "13121007200",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023112",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121001600",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050528",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089021604",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067030327",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13113140203",
      "Cities": [
        "Tyrone town"
      ],
      "Subarea": "Subarea 5",
      "County": "Fayette"
    },
    {
      "GEOID": "13117130301",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13067030413",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Cobb"
    },
    {
      "GEOID": "13063040513",
      "Cities": [
        "Riverdale"
      ],
      "Subarea": "Subarea 8",
      "County": "Clayton"
    },
    {
      "GEOID": "13089021503",
      "Cities": [],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13117130409",
      "Cities": [
        "Cumming"
      ],
      "Subarea": "Subarea 5",
      "County": "Forsyth"
    },
    {
      "GEOID": "13151070114",
      "Cities": [
        "Stockbridge"
      ],
      "Subarea": "Subarea 8",
      "County": "Henry"
    },
    {
      "GEOID": "13135050542",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13113140406",
      "Cities": [
        "Fayetteville"
      ],
      "Subarea": "Subarea 8",
      "County": "Fayette"
    },
    {
      "GEOID": "13089023209",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089023212",
      "Cities": [
        "Stonecrest"
      ],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121004900",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13117130505",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13067031409",
      "Cities": [
        "Austell",
        "Mableton"
      ],
      "Subarea": "Subarea 8",
      "County": "Cobb"
    },
    {
      "GEOID": "13121012000",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13121004300",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13117130603",
      "Cities": [],
      "Subarea": "Subarea 5",
      "County": "Forsyth"
    },
    {
      "GEOID": "13089023107",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13097080509",
      "Cities": [
        "Douglasville"
      ],
      "Subarea": "Subarea 7",
      "County": "Douglas"
    },
    {
      "GEOID": "13063040410",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Clayton"
    },
    {
      "GEOID": "13067031005",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13089021502",
      "Cities": [
        "Brookhaven"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121007100",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13117130307",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13067030332",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13067030604",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121010522",
      "Cities": [
        "College Park",
        "South Fulton"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13151070503",
      "Cities": [
        "Hampton"
      ],
      "Subarea": "Subarea 9",
      "County": "Henry"
    },
    {
      "GEOID": "13089023435",
      "Cities": [
        "Stonecrest"
      ],
      "Subarea": "Subarea 6",
      "County": "DeKalb"
    },
    {
      "GEOID": "13063040624",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13135050550",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050239",
      "Cities": [
        "Sugar Hill"
      ],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089021822",
      "Cities": [
        "Tucker"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121010532",
      "Cities": [
        "South Fulton",
        "Union City"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13057091108",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Cherokee"
    },
    {
      "GEOID": "13247060311",
      "Cities": [
        "Conyers"
      ],
      "Subarea": "Subarea 8",
      "County": "Rockdale"
    },
    {
      "GEOID": "13121010802",
      "Cities": [
        "Hapeville"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13089021103",
      "Cities": [
        "Brookhaven"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067030276",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050243",
      "Cities": [
        "Suwanee"
      ],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050763",
      "Cities": [
        "Snellville"
      ],
      "Subarea": "Subarea 8",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121010134",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050571",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121000602",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050446",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089021824",
      "Cities": [
        "Tucker"
      ],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067031315",
      "Cities": [
        "Mableton",
        "Smyrna"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13089023215",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067031218",
      "Cities": [],
      "Subarea": "Subarea 2",
      "County": "Cobb"
    },
    {
      "GEOID": "13121010526",
      "Cities": [
        "Fairburn",
        "South Fulton",
        "Union City"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011658",
      "Cities": [
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13151070321",
      "Cities": [],
      "Subarea": "Subarea 9",
      "County": "Henry"
    },
    {
      "GEOID": "13057090705",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Cherokee"
    },
    {
      "GEOID": "13121011438",
      "Cities": [
        "Roswell"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023222",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13097080104",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Douglas"
    },
    {
      "GEOID": "13089023320",
      "Cities": [
        "Stonecrest"
      ],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121009105",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13063040632",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13067031324",
      "Cities": [
        "Mableton",
        "Smyrna"
      ],
      "Subarea": "Subarea 5",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050112",
      "Cities": [
        "Sugar Hill"
      ],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13151070313",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13135050568",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13057090505",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Cherokee"
    },
    {
      "GEOID": "13121001901",
      "Cities": [],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023323",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13247060104",
      "Cities": [
        "Conyers"
      ],
      "Subarea": "Subarea 9",
      "County": "Rockdale"
    },
    {
      "GEOID": "13151070319",
      "Cities": [
        "McDonough"
      ],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13151070212",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13089022501",
      "Cities": [
        "Decatur"
      ],
      "Subarea": "Subarea 2",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089021607",
      "Cities": [
        "Brookhaven"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121006701",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121010133",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 4",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050758",
      "Cities": [
        "Snellville"
      ],
      "Subarea": "Subarea 8",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121008103",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13117130511",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13121010308",
      "Cities": [
        "South Fulton"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13089022011",
      "Cities": [
        "Clarkston"
      ],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089023434",
      "Cities": [
        "Stonecrest"
      ],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050333",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050329",
      "Cities": [
        "Norcross"
      ],
      "Subarea": "Subarea 8",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13057090809",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Cherokee"
    },
    {
      "GEOID": "13135050765",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067030352",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050113",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121011440",
      "Cities": [
        "Roswell"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050325",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067031317",
      "Cities": [
        "Mableton"
      ],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050750",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13151070316",
      "Cities": [
        "Stockbridge"
      ],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13121007709",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13089021916",
      "Cities": [
        "Pine Lake"
      ],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067030368",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121011431",
      "Cities": [
        "Roswell"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13151070116",
      "Cities": [
        "Stockbridge"
      ],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13151070411",
      "Cities": [
        "Locust Grove"
      ],
      "Subarea": "Subarea 9",
      "County": "Henry"
    },
    {
      "GEOID": "13121010528",
      "Cities": [
        "Fairburn",
        "Union City"
      ],
      "Subarea": "Subarea 8",
      "County": "Fulton"
    },
    {
      "GEOID": "13067031217",
      "Cities": [
        "Smyrna"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13067030241",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121011429",
      "Cities": [
        "Alpharetta",
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011430",
      "Cities": [
        "Roswell"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13151070409",
      "Cities": [],
      "Subarea": "Subarea 9",
      "County": "Henry"
    },
    {
      "GEOID": "13067030278",
      "Cities": [
        "Kennesaw"
      ],
      "Subarea": "Subarea 3",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050439",
      "Cities": [],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050629",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067030258",
      "Cities": [
        "Kennesaw"
      ],
      "Subarea": "Subarea 1",
      "County": "Cobb"
    },
    {
      "GEOID": "13151070124",
      "Cities": [
        "Stockbridge"
      ],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13121011657",
      "Cities": [
        "Alpharetta",
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13057090808",
      "Cities": [
        "Holly Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13057090912",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13057090504",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Cherokee"
    },
    {
      "GEOID": "13151070126",
      "Cities": [
        "Stockbridge"
      ],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13121011653",
      "Cities": [
        "Alpharetta"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13121001902",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13089022015",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050634",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050573",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121011308",
      "Cities": [
        "East Point"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011633",
      "Cities": [
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023433",
      "Cities": [
        "Stonecrest"
      ],
      "Subarea": "Subarea 9",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121011428",
      "Cities": [
        "Alpharetta",
        "Johns Creek",
        "Roswell"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13247060318",
      "Cities": [
        "Conyers"
      ],
      "Subarea": "Subarea 8",
      "County": "Rockdale"
    },
    {
      "GEOID": "13135050230",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121008204",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050584",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121009604",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121008203",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023220",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121009803",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050565",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067031510",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13063040626",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13135050621",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050753",
      "Cities": [
        "Snellville"
      ],
      "Subarea": "Subarea 8",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067031325",
      "Cities": [
        "Mableton",
        "Smyrna"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121011649",
      "Cities": [
        "Johns Creek"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13121007707",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13151070407",
      "Cities": [],
      "Subarea": "Subarea 9",
      "County": "Henry"
    },
    {
      "GEOID": "13067030262",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050590",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121010306",
      "Cities": [
        "South Fulton"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023318",
      "Cities": [
        "Lithonia"
      ],
      "Subarea": "Subarea 8",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050558",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050110",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050742",
      "Cities": [
        "Grayson"
      ],
      "Subarea": "Subarea 8",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121011648",
      "Cities": [
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13067031517",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13067031411",
      "Cities": [
        "Mableton"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13057090910",
      "Cities": [
        "Woodstock"
      ],
      "Subarea": "Subarea 5",
      "County": "Cherokee"
    },
    {
      "GEOID": "13089023216",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050734",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13063040310",
      "Cities": [
        "Forest Park"
      ],
      "Subarea": "Subarea 3",
      "County": "Clayton"
    },
    {
      "GEOID": "13121011631",
      "Cities": [
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050612",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13063040423",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13067030359",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050746",
      "Cities": [
        "Grayson",
        "Snellville"
      ],
      "Subarea": "Subarea 8",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067031314",
      "Cities": [
        "Mableton",
        "Smyrna"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13089022601",
      "Cities": [
        "Decatur"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13057090506",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Cherokee"
    },
    {
      "GEOID": "13057090706",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Cherokee"
    },
    {
      "GEOID": "13121011434",
      "Cities": [
        "Roswell"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023328",
      "Cities": [
        "Stonecrest"
      ],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050463",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121007302",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13247060313",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Rockdale"
    },
    {
      "GEOID": "13063040637",
      "Cities": [
        "Lovejoy"
      ],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13135050564",
      "Cities": [
        "Lawrenceville"
      ],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13113140104",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Fayette"
    },
    {
      "GEOID": "13135050764",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13247060203",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Rockdale"
    },
    {
      "GEOID": "13135050119",
      "Cities": [
        "Sugar Hill"
      ],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13117130512",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13097080512",
      "Cities": [
        "Douglasville"
      ],
      "Subarea": "Subarea 7",
      "County": "Douglas"
    },
    {
      "GEOID": "13089023443",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13063040425",
      "Cities": [
        "Morrow"
      ],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13135050635",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121011632",
      "Cities": [
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13121010533",
      "Cities": [
        "South Fulton",
        "Union City"
      ],
      "Subarea": "Subarea 8",
      "County": "Fulton"
    },
    {
      "GEOID": "13063040631",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13121008802",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023326",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089023442",
      "Cities": [
        "Stonecrest"
      ],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050437",
      "Cities": [],
      "Subarea": "Subarea 8",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13247060409",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Rockdale"
    },
    {
      "GEOID": "13135050238",
      "Cities": [],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050326",
      "Cities": [
        "Norcross"
      ],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13097080515",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Douglas"
    },
    {
      "GEOID": "13067030603",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13121010223",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13151070115",
      "Cities": [
        "Stockbridge"
      ],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13067030273",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13089021229",
      "Cities": [
        "Dunwoody"
      ],
      "Subarea": "Subarea 5",
      "County": "DeKalb"
    },
    {
      "GEOID": "13151070410",
      "Cities": [],
      "Subarea": "Subarea 9",
      "County": "Henry"
    },
    {
      "GEOID": "13057090911",
      "Cities": [
        "Woodstock"
      ],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13135050588",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050223",
      "Cities": [
        "Suwanee"
      ],
      "Subarea": "Subarea 1",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121010221",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13121010519",
      "Cities": [
        "Fairburn"
      ],
      "Subarea": "Subarea 8",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050452",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13151070406",
      "Cities": [
        "Locust Grove"
      ],
      "Subarea": "Subarea 9",
      "County": "Henry"
    },
    {
      "GEOID": "13067030252",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13063040424",
      "Cities": [],
      "Subarea": "Subarea 8",
      "County": "Clayton"
    },
    {
      "GEOID": "13135050611",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13097080203",
      "Cities": [
        "Douglasville"
      ],
      "Subarea": "Subarea 7",
      "County": "Douglas"
    },
    {
      "GEOID": "13121010307",
      "Cities": [
        "East Point",
        "South Fulton",
        "Union City"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050232",
      "Cities": [
        "Suwanee"
      ],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050237",
      "Cities": [
        "Duluth"
      ],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13057090603",
      "Cities": [
        "Canton",
        "Holly Springs"
      ],
      "Subarea": "Subarea 10",
      "County": "Cherokee"
    },
    {
      "GEOID": "13151070323",
      "Cities": [
        "McDonough"
      ],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13121011445",
      "Cities": [
        "Roswell"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030348",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13113140308",
      "Cities": [
        "Peachtree City"
      ],
      "Subarea": "Subarea 5",
      "County": "Fayette"
    },
    {
      "GEOID": "13089021915",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121011642",
      "Cities": [
        "Alpharetta",
        "Milton"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13067031515",
      "Cities": [
        "Powder Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121011629",
      "Cities": [
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050318",
      "Cities": [
        "Peachtree Corners"
      ],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067030104",
      "Cities": [
        "Acworth"
      ],
      "Subarea": "Subarea 5",
      "County": "Cobb"
    },
    {
      "GEOID": "13067030506",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 5",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050308",
      "Cities": [
        "Peachtree Corners"
      ],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13063040308",
      "Cities": [
        "Forest Park",
        "Lake City"
      ],
      "Subarea": "Subarea 3",
      "County": "Clayton"
    },
    {
      "GEOID": "13117130202",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13067030410",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13117130509",
      "Cities": [
        "Cumming"
      ],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13067030340",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13067030337",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13113140204",
      "Cities": [
        "Fayetteville",
        "Tyrone town"
      ],
      "Subarea": "Subarea 10",
      "County": "Fayette"
    },
    {
      "GEOID": "13121010106",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13151070204",
      "Cities": [],
      "Subarea": "Subarea 9",
      "County": "Henry"
    },
    {
      "GEOID": "13121011306",
      "Cities": [
        "East Point",
        "South Fulton"
      ],
      "Subarea": "Subarea 4",
      "County": "Fulton"
    },
    {
      "GEOID": "13089021307",
      "Cities": [
        "Doraville"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067031004",
      "Cities": [
        "Smyrna"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13089023111",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13097080201",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Douglas"
    },
    {
      "GEOID": "13121001400",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050530",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050522",
      "Cities": [
        "Lawrenceville"
      ],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121006100",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13117130306",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Forsyth"
    },
    {
      "GEOID": "13063040202",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "Clayton"
    },
    {
      "GEOID": "13089022401",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121009700",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121010211",
      "Cities": [
        "Atlanta",
        "Sandy Springs"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121008400",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13063040407",
      "Cities": [
        "Forest Park",
        "Lake City"
      ],
      "Subarea": "Subarea 3",
      "County": "Clayton"
    },
    {
      "GEOID": "13063040203",
      "Cities": [
        "College Park",
        "South Fulton"
      ],
      "Subarea": "Subarea 3",
      "County": "Clayton"
    },
    {
      "GEOID": "13121008602",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011424",
      "Cities": [
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050715",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067031209",
      "Cities": [
        "Smyrna"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121009601",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023437",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13057090302",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Cherokee"
    },
    {
      "GEOID": "13067031511",
      "Cities": [
        "Powder Springs"
      ],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13057091106",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13121010401",
      "Cities": [
        "Fairburn",
        "South Fulton"
      ],
      "Subarea": "Subarea 8",
      "County": "Fulton"
    },
    {
      "GEOID": "13097080307",
      "Cities": [
        "Douglasville"
      ],
      "Subarea": "Subarea 8",
      "County": "Douglas"
    },
    {
      "GEOID": "13067030110",
      "Cities": [
        "Acworth"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050457",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089023221",
      "Cities": [],
      "Subarea": "Subarea 3",
      "County": "DeKalb"
    },
    {
      "GEOID": "13089022602",
      "Cities": [
        "Decatur"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13151070405",
      "Cities": [
        "Locust Grove"
      ],
      "Subarea": "Subarea 9",
      "County": "Henry"
    },
    {
      "GEOID": "13097080514",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Douglas"
    },
    {
      "GEOID": "13067030243",
      "Cities": [
        "Kennesaw"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13067030906",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13063040634",
      "Cities": [
        "Jonesboro"
      ],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13121011635",
      "Cities": [
        "Johns Creek"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050737",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121009301",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030353",
      "Cities": [],
      "Subarea": "Subarea 2",
      "County": "Cobb"
    },
    {
      "GEOID": "13057091012",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13121010129",
      "Cities": [
        "Sandy Springs"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13097080605",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Douglas"
    },
    {
      "GEOID": "13247060410",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Rockdale"
    },
    {
      "GEOID": "13067031322",
      "Cities": [
        "Mableton"
      ],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13121010309",
      "Cities": [
        "South Fulton"
      ],
      "Subarea": "Subarea 9",
      "County": "Fulton"
    },
    {
      "GEOID": "13089021104",
      "Cities": [
        "Brookhaven"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050575",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13097080105",
      "Cities": [
        "Douglasville"
      ],
      "Subarea": "Subarea 8",
      "County": "Douglas"
    },
    {
      "GEOID": "13121011637",
      "Cities": [
        "Alpharetta",
        "Johns Creek"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13121007301",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13057090606",
      "Cities": [
        "Canton"
      ],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13089021420",
      "Cities": [
        "Brookhaven"
      ],
      "Subarea": "Subarea 1",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050626",
      "Cities": [],
      "Subarea": "Subarea 9",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13097080607",
      "Cities": [
        "Douglasville"
      ],
      "Subarea": "Subarea 7",
      "County": "Douglas"
    },
    {
      "GEOID": "13121011661",
      "Cities": [
        "Milton"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13067031414",
      "Cities": [
        "Mableton"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121009407",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13089023440",
      "Cities": [
        "Stonecrest"
      ],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13057090703",
      "Cities": [
        "Holly Springs"
      ],
      "Subarea": "Subarea 5",
      "County": "Cherokee"
    },
    {
      "GEOID": "13097080106",
      "Cities": [],
      "Subarea": "Subarea 8",
      "County": "Douglas"
    },
    {
      "GEOID": "13057090507",
      "Cities": [],
      "Subarea": "Subarea 10",
      "County": "Cherokee"
    },
    {
      "GEOID": "13063040627",
      "Cities": [
        "Jonesboro"
      ],
      "Subarea": "Subarea 8",
      "County": "Clayton"
    },
    {
      "GEOID": "13121010530",
      "Cities": [
        "East Point",
        "South Fulton"
      ],
      "Subarea": "Subarea 7",
      "County": "Fulton"
    },
    {
      "GEOID": "13057090604",
      "Cities": [
        "Canton"
      ],
      "Subarea": "Subarea 5",
      "County": "Cherokee"
    },
    {
      "GEOID": "13067030242",
      "Cities": [
        "Kennesaw"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13063040533",
      "Cities": [
        "Riverdale"
      ],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13089021820",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13097080306",
      "Cities": [
        "Douglasville"
      ],
      "Subarea": "Subarea 8",
      "County": "Douglas"
    },
    {
      "GEOID": "13121010312",
      "Cities": [
        "Atlanta",
        "South Fulton"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13151070209",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13121009002",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011647",
      "Cities": [
        "Alpharetta",
        "Roswell"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050759",
      "Cities": [
        "Snellville"
      ],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121001203",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121011641",
      "Cities": [
        "Alpharetta",
        "Milton"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13121002801",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13121010523",
      "Cities": [
        "South Fulton",
        "Union City"
      ],
      "Subarea": "Subarea 8",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050574",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13151070505",
      "Cities": [
        "Hampton"
      ],
      "Subarea": "Subarea 9",
      "County": "Henry"
    },
    {
      "GEOID": "13067030508",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 5",
      "County": "Cobb"
    },
    {
      "GEOID": "13063040427",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13089023325",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "DeKalb"
    },
    {
      "GEOID": "13067031006",
      "Cities": [
        "Smyrna"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13151070119",
      "Cities": [
        "Stockbridge"
      ],
      "Subarea": "Subarea 8",
      "County": "Henry"
    },
    {
      "GEOID": "13089022205",
      "Cities": [],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121011650",
      "Cities": [
        "Alpharetta"
      ],
      "Subarea": "Subarea 6",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030912",
      "Cities": [
        "Marietta"
      ],
      "Subarea": "Subarea 5",
      "County": "Cobb"
    },
    {
      "GEOID": "13121010521",
      "Cities": [
        "South Fulton"
      ],
      "Subarea": "Subarea 3",
      "County": "Fulton"
    },
    {
      "GEOID": "13135050616",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13089021224",
      "Cities": [
        "Dunwoody"
      ],
      "Subarea": "Subarea 6",
      "County": "DeKalb"
    },
    {
      "GEOID": "13121011655",
      "Cities": [
        "Alpharetta"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13121001205",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 2",
      "County": "Fulton"
    },
    {
      "GEOID": "13151070216",
      "Cities": [
        "McDonough"
      ],
      "Subarea": "Subarea 9",
      "County": "Henry"
    },
    {
      "GEOID": "13135050739",
      "Cities": [
        "Snellville"
      ],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050562",
      "Cities": [],
      "Subarea": "Subarea 5",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13063040426",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Clayton"
    },
    {
      "GEOID": "13151070504",
      "Cities": [
        "Hampton"
      ],
      "Subarea": "Subarea 9",
      "County": "Henry"
    },
    {
      "GEOID": "13121009409",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13057090805",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13057090401",
      "Cities": [
        "Canton"
      ],
      "Subarea": "Subarea 6",
      "County": "Cherokee"
    },
    {
      "GEOID": "13121000201",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13089021818",
      "Cities": [
        "Tucker"
      ],
      "Subarea": "Subarea 4",
      "County": "DeKalb"
    },
    {
      "GEOID": "13135050735",
      "Cities": [],
      "Subarea": "Subarea 8",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050332",
      "Cities": [
        "Peachtree Corners"
      ],
      "Subarea": "Subarea 3",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050752",
      "Cities": [
        "Snellville"
      ],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13151070412",
      "Cities": [
        "Locust Grove"
      ],
      "Subarea": "Subarea 9",
      "County": "Henry"
    },
    {
      "GEOID": "13135050114",
      "Cities": [
        "Sugar Hill"
      ],
      "Subarea": "Subarea 6",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050748",
      "Cities": [
        "Grayson"
      ],
      "Subarea": "Subarea 8",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050615",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13121009408",
      "Cities": [
        "Atlanta"
      ],
      "Subarea": "Subarea 1",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030274",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Cobb"
    },
    {
      "GEOID": "13151070314",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Henry"
    },
    {
      "GEOID": "13067030349",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13121011643",
      "Cities": [
        "Milton"
      ],
      "Subarea": "Subarea 5",
      "County": "Fulton"
    },
    {
      "GEOID": "13067030113",
      "Cities": [
        "Acworth",
        "Kennesaw"
      ],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050577",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13067031410",
      "Cities": [],
      "Subarea": "Subarea 6",
      "County": "Cobb"
    },
    {
      "GEOID": "13135050465",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    },
    {
      "GEOID": "13135050760",
      "Cities": [],
      "Subarea": "Subarea 7",
      "County": "Gwinnett"
    }
  ];

  const handleStart = () => {
    globalUtils
      .getData('/api/tractinfo', 'mahs')
      .then(res => {
        setTractInfo(res.data);
        // setTractInfo(testTractInfo);
      })
      .catch(err => console.log(err));

    globalUtils
      .getData('/api/datainfo', 'mahs')
      .then(res =>
        setIndicators(
          res.data
            // .filter(({deactivated}) => !deactivated)
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .sort(a => (a.changeType ? -1 : 0))
            .reverse()
        )
      )
      .catch(err => console.log(err));

    globalUtils
      .getData('/api/config', 'mahs')
      .then(res =>
        queryObj.geo && queryObj.geotype
          ? setConfig({
            ...res.data[0],
            selection: {
              ...res.data[0].selection,
              geoType: queryObj.geotype,
              geo: queryObj.geo
            }
            // Remove after adding to DB
            // indicators: [...indicators],
          })
          : setConfig({
            ...res.data[0]
            // indicators: [...indicators],
          })
      )
      .catch(err => console.log(err));
  };

  useEffect(handleStart, []);

  return (
    <div className='App'>
      {tractInfo && config && indicators ? (
        <HomePage
          tractInfo={tractInfo}
          indicators={indicators}
          config={config}
        />
      ) : (
        <div id='app-loader-spinner'>
          <RingLoader
            css={{
              top: '5vh',
              margin: 'auto',
              right: '50px'
            }}
            size='100px'
          />
          <h1>Loading MAHS Data Explorer</h1>
        </div>
      )}
    </div>
  );
};

export default App;

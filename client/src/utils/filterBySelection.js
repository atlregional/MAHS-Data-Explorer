export default (tract, selection) => 
  selection.geo === '10 Counties' ? 
  true : selection.geoType === 'County' ?
    tract['County'] === selection.geo
    : selection.geoType === 'City' ?
      tract.Cities.includes(selection.geo)
  : true;
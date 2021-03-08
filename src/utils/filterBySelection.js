export default (tract, selection) => 
  selection.geo === '10-County' ? 
  true : selection.geoType === 'County' ?
    tract['County'] === selection.geo
    : selection.geoType === 'City' ?
      tract.Cities.includes(selection.geo)
  : true;
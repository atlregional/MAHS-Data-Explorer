export default (tract, selection) => 
  selection.geo === '11-County' ? 
  true : selection.geoType === 'County' ?
    tract['County'] === selection.geo
    : selection.geoType === 'City' ?
      tract.Cities.includes(selection.geo)
  : true;
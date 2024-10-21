const util = {
  handleTractData(props, globalUtils, numBins) {
    const array = [];
    const tractInfo = props.tractInfo;
    const dataObj = {};
    const tractData = tractInfo
      ? Object.values(tractInfo).filter(tract =>
        globalUtils.filterBySelection(tract, props.selection)
      )
      : null;

    const aggregatedData = tractData
      ? globalUtils.aggregate(tractData, props.selection.indicator, 'GEOID')
      : {};

    Object.entries(aggregatedData).forEach(([key, value]) =>
      key !== 'All'
        ? array.push({
          name: key,
          Subarea: parseInt(key?.replace('Subarea ', '')),
          [props.selection.indicator.name]: value
        })
        : null
    );

    const valueArray = array
      .map(item => parseFloat(item[props.selection.indicator.name]))
      .filter(item => !isNaN(item));

    const maxValue = valueArray ? Math.max(...valueArray) : null;
    const minValue = valueArray ? Math.min(...valueArray) : null;

    Object.entries(aggregatedData).forEach(([key, value]) => {
      const disFromMin = value - minValue;
      const binningRatio = disFromMin / (maxValue - minValue);
      const colorIndex = Math.floor(binningRatio * numBins) - 1;

      dataObj[key] = {
        value: value,
        colorIndex: colorIndex < 0 ? 0 : colorIndex
      };
    });

    return {
      dataObj: dataObj,
      statsObj: { max: maxValue, min: minValue, range: maxValue - minValue }
    };
  },
  handleGeoJSONs: async function (globalUtils, layerConfigs) {
    const getGeoJSON = (key, url, geosID) =>
      new Promise(resolve =>
        globalUtils
          .getData(geosID ? `/api/geo/?_id=${geosID}` : url, geosID ? 'mahs' : 'arcgis')
          .then(res => [key, res.data])
          .catch(err => console.log(err))
          .then(data => resolve(data))
          .catch(err => console.log(err))
      );

    let returnedGeoJSONs = [];

    layerConfigs
      .filter(config => !config.disabled)
      .forEach(config => returnedGeoJSONs.push(getGeoJSON(config.name, config.url, config.geosID)));

    const geoJSONsObj = {};
    await Promise.all(returnedGeoJSONs)
      .then(geoJSONS => {
        // console.log("returnedGeoJSONs: ", returnedGeoJSONs);
        [...geoJSONS].forEach(([key, value]) => (geoJSONsObj[key] = value));
      })
      .then(() => {
        return geoJSONsObj;
      })
      .catch(err => console.log(err));
    return geoJSONsObj;
  },
  tractStyle(tractInfo, props, data, colors) {
    // console.log(props)
    const viewMapData = props.viewMapData;
    const subarea = tractInfo ? parseInt(tractInfo.Subarea?.replace('Subarea ', '')) : null;
    const config = props.config;

    const colorIndex = data[tractInfo.GEOID] ? data[tractInfo.GEOID].colorIndex : null;
    const color = viewMapData
      ? colorIndex !== null
        ? colors[colorIndex]
        : 'transparent'
      : subarea
        ? config.style.colormap[subarea - 1]
        : null;
    return {
      fillColor: color,
      color: viewMapData ? 'black' : color
    };
  },
  geoJSONStyle(feature, config, tractIDField, props, data, colors, hoverFeature) {
    const geoID = feature.properties[tractIDField];
    const tractInfo = props.tractInfo[geoID];
    const hovered = hoverFeature.properties ? geoID === hoverFeature.properties.GEOID : null;
    const subarea = tractInfo['Subarea'];
    const highlight = subarea === `Subarea ${props.highlightedSubarea}`;
    const style = this.tractStyle(tractInfo, props, data, colors);
    // console.log(style);
    return {
      ...style,
      color: props.highlightedSubarea && highlight ? 'black' : config.boundaryColor,
      weight:
        props.highlightedSubarea && highlight
          ? 1
          : props.highlightedSubarea
            ? 0
            : config.boundaryWidth,
      fillOpacity: hovered
        ? 0.1
        : props.highlightedSubarea && highlight
          ? 1
          : props.highlightedSubarea
            ? 0.2
            : 1
    };
  },
  handleBounds(featureBounds) {
    return Object.keys(featureBounds).length > 0 ? featureBounds : null;
  }
};

export default util;

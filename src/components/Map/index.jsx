import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import globalUtils from '../../globalUtils';
import {
  MapContainer as LeafletMap,
  TileLayer,
  GeoJSON,
  ZoomControl,
  // useMap,
  // Tooltip,
  Popup
} from 'react-leaflet';
import MapLegend from '../MapLegend';
import polygonToLine from '@turf/polygon-to-line';
import { Icon } from 'semantic-ui-react';
import tinygradient from 'tinygradient';
import { by3Points } from 'get-parabola';

// import numeral from 'numeral';
import { Checkbox } from 'semantic-ui-react';
import RingLoader from 'react-spinners/RingLoader';
import MapTooltip from '../MapTooltip';
import LayerSelector from '../LayerSelector';
import util from './util';
import config from './config';
import './style.css';

const MapComp = props => {
  const [tile, setTile] = useState(1);
  const [stats, setStats] = useState();
  const [geoJSONs, setGeoJSONs] = useState();
  const [hoverBin, setHoverBin] = useState();
  const [hoverFeature, setHoverFeature] = useState({});
  const [openTileLayerSelector, setOpenTileLayerSelector] = useState(false);
  // const [bounds, setBounds] = useState();
  const [colors, setColors] = useState();
  const [clickFeature, setClickFeature] = useState({});
  // const [revealBaseMap, setRevealBasemap] = useState();

  const {
    mobile,
    data,
    viewMapData,
    setData,
    hidden,
    setViewMapData,
    layers: layerConfigs,
    config: { tilelayers: tileLayer },
    selection: {
      indicator: { formatter: indicatorFormatter, changeType }
    }
  } = props;

  const numBins = 40;
  const calibrateToCenter = (initPos, centerPosition) => {
    // const scaler = centerPosition / .25;
    // const rescaledPos = scaler * initPos * initPos;
    const points = [
      [0, 0],
      [0.5, centerPosition],
      [1, 1]
    ];
    const coeffs = by3Points(
      points.map(point => ({
        x: point[0],
        y: point[1]
      }))
    );
    // console.log(coeffs);
    const rescaledPos = coeffs.a * initPos * initPos + coeffs.b * initPos + coeffs.c;
    // console.log(rescaledPos);
    return rescaledPos > 1 ? 1 : rescaledPos < 0 ? 0 : rescaledPos;
  };

  const calcZeroPos = ({ max, min, range }) => {
    const pos = max > 0 && min < 0 ? (range - max) / range : max <= 0 ? -1 : null;
    return pos;
  };

  // DIVERGENT COLOR SCALE;
  const calibrateColors = statsObj => {
    const zeroPos = calcZeroPos(statsObj);
    const colorArray = tinygradient(
      changeType && zeroPos > 0
        ? config.indicatorColors1.map((color, i) => ({
          color: color,
          pos: calibrateToCenter(i / (config.indicatorColors1.length - 1), zeroPos)
        }))
        : config.indicatorColors2.map((color, i) => ({
          color: color,
          pos: i / (config.indicatorColors2.length - 1)
        }))
    )
      .rgb(numBins)
      .map(color => {
        const { _r, _g, _b } = color;
        return `rgb(${parseInt(_r)}, ${parseInt(_g)}, ${parseInt(_b)})`;
      });
    setColors(zeroPos < 0 ? colorArray.reverse() : colorArray);
  };

  const tractIDField = layerConfigs.find(info => info.name === 'tracts').geoField;
  const regionCounties = config.regionCounties;

  const asyncWrapper = async () => {
    const geoJSONs = await util.handleGeoJSONs(globalUtils, layerConfigs);
    return geoJSONs;
  };

  useEffect(() => {
    asyncWrapper().then(geoJSONs => {
      setGeoJSONs(geoJSONs);
    });
  }, []);
  useEffect(() => {
    const { dataObj, statsObj } = util.handleTractData(props, globalUtils, numBins);
    // console.log(statsObj);
    setData(dataObj);
    setStats(statsObj);
    calibrateColors(statsObj);
    // setRevealBasemap();
  }, [geoJSONs, props.selection]);

  return (
    <>
      <LeafletMap
        key={`subarea-map-${hidden}-${props.selection.geo}`}
        // animate
        boxZoom
        trackResize
        doubleClickZoom
        scrollWheelZoom
        dragging
        center={[33.753, -84.386]}
        zoom={8}
        zoomDelta={0.3}
        zoomSnap={0.3}
        maxZoom={16}
        minZoom={3}
        zoomControl={false}
      >
        {geoJSONs
          ? layerConfigs
            .filter(config =>
              config.visible && config.type === 'boundary'
                ? props.selection.geoType === 'Region' || props.selection.geoType === 'County'
                  ? config.name === 'counties'
                  : config.name === 'cities'
                : false
            )
            .map(config => {
              // console.log(config);
              const boundary = geoJSONs[config.name].features.map(feature =>
                polygonToLine(feature)
              );
              return (
                <GeoJSON
                  key={`boundary-layer-${config.name}-${props.selection.geo}`}
                  eventHandlers={{
                    add: e => {
                      e.target.bringToFront();
                      const featureBounds = e.target.getBounds();
                      const returnedBounds = util.handleBounds(featureBounds);
                      if (returnedBounds) {
                        e.target._map.fitBounds(returnedBounds);
                      }
                    }
                  }}
                  data={boundary}
                  filter={feature =>
                    props.selection.geo === '11-County'
                      ? regionCounties.includes(feature.properties[config.geoField])
                      : feature.properties[config.geoField] === props.selection.geo
                  }
                  style={{
                    color: config.boundaryColor,
                    weight: config.boundaryWidth
                  }}
                />
              );
            })
          : null}
        {geoJSONs ? (
          layerConfigs
            .filter(config => config.visible && config.type === 'data')
            .map(config => (
              <GeoJSON
                key={`data-layer-${config.name}-${props.selection.geo}-${
                  viewMapData ? 'data' : ''
                }`}
                style={feature =>
                  util.geoJSONStyle(
                    feature,
                    config,
                    tractIDField,
                    props,
                    data,
                    colors,
                    hoverFeature
                  )
                }
                eventHandlers={{
                  add: e => e.target.bringToBack(),
                  mouseout: e => {
                    setHoverBin();
                    setHoverFeature({});
                    e.target.closePopup();
                  },
                  click: e => setClickFeature(e.propagatedFrom.feature),
                  mouseover: e => {
                    setHoverBin(
                      data[e.propagatedFrom.feature.properties[tractIDField]]
                        ? data[e.propagatedFrom.feature.properties[tractIDField]].colorIndex
                        : null
                    );
                    setHoverFeature(e.propagatedFrom.feature);
                  }
                }}
                filter={feature => {
                  const geoID = feature.properties[config.geoField].toString();
                  const tractInfo = props.tractInfo[geoID];

                  return tractInfo
                    ? props.selection.geo === '11-County'
                      ? true
                      : props.selection.geoType === 'County'
                        ? feature.properties['COUNTY'] === props.selection.geo
                        : props.selection.geoType === 'City'
                          ? tractInfo.Cities.includes(props.selection.geo)
                          : true
                    : false;
                }}
                data={geoJSONs[config.name]}
              >
                <Popup
                  style={{
                    border: 'solid #808080 1px',
                    borderRadius: '5px',
                    boundaryColor: 'transparent'
                  }}
                >
                  <MapTooltip
                    {...props}
                    data={data}
                    hoverFeature={clickFeature}
                    indicatorFormatter={indicatorFormatter}
                  />
                </Popup>
              </GeoJSON>
            ))
        ) : (
          <div id='map-loading-spinner'>
            <RingLoader
              css={{
                margin: 'auto',
                zIndex: '9999999',
                top: '30vh'
              }}
              color='#4B7B90'
              size='75px'
            />
          </div>
        )}
        {geoJSONs
          ? layerConfigs
            .filter(config => config.visible && config.type === 'transportation')
            .map(config => (
              <GeoJSON
                onAdd={e => e.target.bringToFront()}
                key={`data-layer-${config.name}-${props.selection.geo}`}
                style={feature => ({
                  color:
                    config.name === 'transit'
                      ? `#${feature.properties.route_color}`
                      : config.color,
                  weight: config.weight
                })}
                data={geoJSONs[config.name]}
              />
            ))
          : null}
        <TileLayer
          key={`tile-layer-${tileLayer[tile].name}`}
          url={tileLayer[tile].url}
          attribution={tileLayer[tile].attribution}
        />
        <ZoomControl position='bottomleft' />
      </LeafletMap>
      <LayerSelector
        setLayers={props.setLayers}
        layers={props.layers}
        mobile={props.mobile}
        numberOfSubareas={props.subareaOptions.length}
      />
      {mobile ? (
        <>
          <div
            id='tile-layer-icon'
            onClick={() => setOpenTileLayerSelector(openTileLayerSelector ? false : true)}
          >
            <Icon name='map' size='big' />
            <div
              id={openTileLayerSelector ? 'tile-layer-selector-open' : 'tile-layer-selector-closed'}
            >
              {tileLayer.map((item, idx) => (
                <img
                  className='tile-layer-thumb'
                  draggable='false'
                  alt='tile layer'
                  style={{
                    border: tileLayer[tile].name === item.name ? 'solid blue 3px' : null
                  }}
                  onClick={() => {
                    setTile(tileLayer.indexOf(item));
                    setOpenTileLayerSelector(false);
                  }}
                  key={`${item.name}-thumb-${idx}`}
                  src={item.thumbUrl}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className='tile-layer-selection-box' id='tile-layer-selector'>
          {tileLayer.map((item, idx) => (
            <div key={`tile-layer-map-div${idx}`}>
              <img
                className='tile-layer-thumb'
                draggable='false'
                alt={`Tile Layer Thumbnail Selector ${item.name}`}
                style={{
                  border: tileLayer[tile].name === item.name ? 'solid blue 3px' : null
                }}
                onClick={() => {
                  setTile(tileLayer.indexOf(item));
                }}
                key={`${idx}-thumb`}
                src={item.thumbUrl}
              />
            </div>
          ))}
        </div>
      )}
      {props.selection && stats ? (
        <div id={mobile && viewMapData ? 'map-legend-box-data' : 'map-legend-box'}>
          <MapLegend
            hoverBin={hoverBin}
            viewMapData={props.viewMapData}
            selection={props.selection}
            colors={colors}
            stats={stats}
          />
          <Checkbox toggle onChange={() => setViewMapData(viewMapData === false ? true : false)} />
          <div id='map-data-toggle-label'>Show Data on Map</div>
        </div>
      ) : null}
    </>
  );
};

MapComp.propTypes = {
  config: PropTypes.object,
  data: PropTypes.object,
  hidden: PropTypes.bool,
  layers: PropTypes.array,
  mobile: PropTypes.bool,
  selection: PropTypes.object,
  setData: PropTypes.func,
  setLayers: PropTypes.func,
  subareaOptions: PropTypes.array,
  setViewMapData: PropTypes.func,
  viewMapData: PropTypes.bool,
  tractInfo: PropTypes.object
};

export default MapComp;

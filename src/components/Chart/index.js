import React, { useEffect } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import './style.css';
import numeral from 'numeral';
import utils from '../../utils';

const Chart = props => {
  const data = props.data;
  const colormap = props.colormap;
  const tractInfo = props.tractInfo;
  const selectedIndicator = props.selection.indicator;
  const indicatorType = props.selection.indicator.type;

  const handleAggregation = () => {
    const array = [];
    const tractData = Object.values(tractInfo).filter(tract =>
      utils.filterBySelection(tract, props.selection)
    );
    const aggregatedData = utils.aggregate(
      tractData,
      selectedIndicator,
      'Subarea'
    );

    Object.entries(aggregatedData)
      .filter(([key]) => key !== 'All')
      .forEach(([key, value]) =>
        array.push({
          name: key,
          Subarea: parseInt(key.replace('Subarea ', '')),
          [selectedIndicator.name]: value,
          [props.selection.geo]: aggregatedData['All'],
        })
      );

    array.sort((a, b) => (a.Subarea < b.Subarea ? -1 : 1));
    // console.log(array);
    // setData(array);
    props.setSubareaData(array);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    const geoType = props.selection.geoType;
    const geo = props.selection.geo;
    return active
      ? <div className="chart-custom-tooltip">
          <div
            className="chart-tooltip-subarea"
            style={{
              color: props.colormap[label - 1],
            }}
          >
            {`${payload[0].payload.name.replace('Subarea','Submarket')}`}
          </div>
          <div className="chart-tooltip-geography-selection">
            {geo ? (
              geoType === 'Region' ? (
                <div>
                  in the <span className="tooltip-geo">{geo} Region </span>
                </div>
              ) : geoType === 'City' ? (
                <div>
                  in 
                  <span className="tooltip-geo"> {geo}</span>
                </div>
              ) : geoType === 'County' ? (
                <div>
                  in
                  <span className="tooltip-geo"> {geo} County</span>
                  
                </div>
              ) : null
            ) : null}
          </div>
          <div className="chart-tooltip-indicator">
            {selectedIndicator.name}
          </div>
          <div id='chart-tooltip-indicator-value'>
            {numeral(payload[0].value).format(
              indicatorType === 'Percent' ? '0.0%' : '0,0'
            )}
          </div>
          
          <div className="chart-tooltip-comparison">
            <div id='tooltip-compare-header'>
              Compare to...
            </div>
            <div>
              All of <span className='tooltip-geo'>{geo}{geoType !== 'City' ? ` ${geoType}` : ''}</span> at
              {' '}<span className="chart-tooltip-percent-comparison">
                {data['All']
                  ? numeral(data['All'].value).format(
                      indicatorType === 'Percent' ? '0.0%' : '0,0'
                    )
                  : null}
              </span>
            </div>
          </div>
          <div id='tooltip-footer'>
            <div>
              Data Source : <span>{selectedIndicator.source}</span>
            </div>
            <div>
              Universe : <span>{selectedIndicator.universe}</span>
            </div>
          </div>
        </div>
      : null;
  };

  useEffect(handleAggregation, [props.selection]);

  return props.subareaData 
   ? <ResponsiveContainer
          className="chart-responsive-container"
          width="90%"
          height="100%"
        >
          <ComposedChart className="bar-chart" data={props.subareaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={'Subarea'} />
            <YAxis
              // tickSize={} 
              tickFormatter={tick => 
                numeral(tick).format(indicatorType === 'Percent'
                  ? '0.0%'
                  : '0,0'
                )
              }
            />
            <Tooltip content={<CustomTooltip />} />

            <Bar dataKey={selectedIndicator.name}>
              {props.subareaData.map((barData, idx) => (
                <Cell
                  key={selectedIndicator.name + idx}
                  fillOpacity={
                    barData.Subarea === props.highlightedSubarea
                      ? 1
                      : props.highlightedSubarea
                      ? props.clickedSubarea
                        ? 0.3
                        : 0.6
                      : 1
                  }
                  stroke={
                    barData.Subarea === props.highlightedSubarea
                      ? 'black'
                      : null
                  }
                  strokeWidth={
                    barData.Subarea === props.highlightedSubarea ? 3 : null
                  }
                  fill={colormap[barData.Subarea - 1]}
                  onMouseEnter={() =>
                    props.setHighlightedSubarea(
                      props.clickedSubarea
                        ? props.clickedSubarea
                        : barData.Subarea
                    )
                  }
                  onMouseLeave={() =>
                    props.setHighlightedSubarea(props.clickedSubarea)
                  }
                  onClick={() => {
                    props.setClickedSubarea(
                      props.clickedSubarea
                        ? barData.Subarea === props.clickedSubarea
                          ? null
                          : props.clickedSubarea
                        : barData.Subarea
                    );
                  }}
                />
              ))}
            </Bar>
            <Line
              dataKey={props.selection.geo}
              stroke="#000000"
              strokeDasharray="4 4"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
   : null;
};

export default Chart;

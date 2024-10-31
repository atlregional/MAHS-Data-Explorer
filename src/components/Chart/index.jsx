import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';
import numeral from 'numeral';
import utils from './utils';
import CustomTooltip from '../CustomTooltip';
import './style.css';

const Chart = ({
  clickedSubarea,
  colormap,
  data,
  highlightedSubarea,
  // indicators,
  mobile,
  selection,
  setClickedSubarea,
  setHighlightedSubarea,
  setSubareaData,
  subareaData,
  tractInfo
}) => {
  const [chartHover, setChartHover] = useState();

  const selectedIndicator = selection.indicator;
  console.log(selectedIndicator)

  const indicatorType = selectedIndicator.type;
  const changeType = selectedIndicator.changeType;
  const indicatorFormatter = selectedIndicator.formatter.replace(/"/g, '');

  useEffect(() => {
    const aggregatedSubareaData = utils.handleAggregation(tractInfo, selection);
    setSubareaData(aggregatedSubareaData);
  }, [selection]);

  return subareaData ? (
    <>
      <ResponsiveContainer
        className='chart-responsive-container'
        // aspect={.5}
        width={mobile ? 340 : '100%'}
        height={mobile ? 300 : '100%'}
      >
        <ComposedChart
          margin={{ bottom: 20, left: 30 }}
          // height={100}
          // width={100}
          className='bar-chart'
          data={subareaData}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey={'Subarea'} />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={tick => numeral(tick).format(indicatorFormatter)}
          />

          {/* {!mobile ? ( */}
          <Tooltip
            content={obj =>
              CustomTooltip(obj, selection, colormap, data, selectedIndicator, indicatorFormatter)
            }
          />
          {/* ) : null} */}

          <Bar dataKey={selectedIndicator.name}>
            {subareaData.map((barData, idx) => (
              <Cell
                key={selectedIndicator.name + idx}
                fillOpacity={
                  barData.Subarea === highlightedSubarea || barData.Subarea === chartHover
                    ? 1
                    : highlightedSubarea
                      ? clickedSubarea
                        ? 0.3
                        : 0.6
                      : 1
                }
                stroke={barData.Subarea === highlightedSubarea ? 'black' : null}
                strokeWidth={barData.Subarea === highlightedSubarea ? 3 : null}
                fill={colormap[barData.Subarea - 1]}
                onMouseEnter={() => {
                  setHighlightedSubarea(clickedSubarea ? clickedSubarea : barData.Subarea);
                  setChartHover(barData.Subarea);
                }}
                onMouseLeave={() => {
                  setHighlightedSubarea(clickedSubarea);
                  setChartHover();
                }}
                onClick={() => {
                  setClickedSubarea(
                    clickedSubarea
                      ? barData.Subarea === clickedSubarea
                        ? null
                        : clickedSubarea
                      : barData.Subarea
                  );
                }}
              />
            ))}
          </Bar>

          {
          (!changeType && indicatorType !== 'Sum') || 
          changeType?.match(new RegExp('percent', 'i')) ||
          indicatorType === 'Average'
          ? (
            <Line dataKey={selection.geo} stroke='#000000' strokeDasharray='4 4' dot={false} />
          ) : null}
        </ComposedChart>
      </ResponsiveContainer>
      <div></div>
    </>
  ) : null;
};

Chart.propTypes = {
  clickedSubarea: PropTypes.number,
  colormap: PropTypes.array,
  data: PropTypes.object,
  highlightedSubarea: PropTypes.number,
  // indicators: PropTypes.array,
  mobile: PropTypes.bool,
  selection: PropTypes.object,
  setClickedSubarea: PropTypes.func,
  setHighlightedSubarea: PropTypes.func,
  setSubareaData: PropTypes.func,
  subareaData: PropTypes.array,
  tractInfo: PropTypes.object
};

export default Chart;

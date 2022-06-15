import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StickyTable } from 'react-sticky-table';
import util from './util';
import './style.css';

const Table = props => {
  const tractInfo = props.tractInfo;
  const headerArray = ['indicator'];
  const [data, setData] = useState([]);
  const [header, setHeader] = useState([]);
  const indicatorInfo = props.indicators;
  const selectedIndicators = props.selection.indicators
    ? props.selection.indicators.map(indicator => indicator.name)
    : [];

  useEffect(() => {
    const aggregatedData = util.handleAggregation(headerArray, props, indicatorInfo, tractInfo);
    setHeader(aggregatedData.headerArray);
    setData(aggregatedData.data);
  }, [props.selection]);
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '4px'
      }}
    >
      <StickyTable stickyHeaderCount={1}>
        {util.handleCreateRows(indicatorInfo, selectedIndicators, props, data, header)}
      </StickyTable>
    </div>
  );
};

Table.propTypes = {
  indicators: PropTypes.array,
  selection: PropTypes.object,
  tractInfo: PropTypes.object
};

export default Table;

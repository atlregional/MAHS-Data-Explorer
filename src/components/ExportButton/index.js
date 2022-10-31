import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Popup, Button } from 'semantic-ui-react';

import { exportCSV } from './utils';
import './style.css';

const ExportButton = ({ csvFilename, csvTitle, csvHeaders, data, selection }) => (
  <Popup
    className='export-popup'
    on='click'
    closeOnPortalMouseLeave
    basic
    position='top center'
    trigger={<Icon name='download' size='large' />}
  >
    <h4 className='popup-title'>Download Data by...</h4>
    <div className='download-buttons'>
      <Button
        size='medium'
        content='Subarea'
        onClick={() => exportCSV.subarea(csvTitle, csvFilename, csvHeaders, data)}
      />
      <Button
        size='medium'
        content='Census Tracts'
        onClick={() => exportCSV.censusTracts(selection)}
      />
    </div>
  </Popup>
);

ExportButton.propTypes = {
  content: PropTypes.string,
  csvFilename: PropTypes.string,
  csvTitle: PropTypes.string,
  data: PropTypes.array,
  csvHeaders: PropTypes.array,
  selection: PropTypes.object
};

export default ExportButton;

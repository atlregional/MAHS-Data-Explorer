import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Popup, Button } from 'semantic-ui-react';

import { exportCSV } from './utils';
import './style.css';

const ExportButton = ({ csvFilename, csvTitle, csvHeaders, data, selection, mobile }) => (
  <Popup
    className='export-popup'
    on='click'
    closeOnPortalMouseLeave
    position={!mobile ? 'top center' : 'top left'}
    trigger={<Icon name='download' size='large' />}
  >
    <h4 className='popup-title'>Download Data by...</h4>
    <div className='download-buttons'>
      <Button
        size={!mobile ? 'medium' : 'mini'}
        content='Subarea'
        onClick={() => exportCSV.subarea(csvTitle, csvFilename, csvHeaders, data)}
      />
      <Button
        size={!mobile ? 'medium' : 'mini'}
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
  selection: PropTypes.object,
  mobile: PropTypes.bool
};

export default ExportButton;

import React from 'react';
import './style.css';
import { Icon } from 'semantic-ui-react';

const VizViewSelector = props => {
  const buttonParamArr = [
    {
      text: 'Map',
      value: 'map',
      icon: 'map',
    },
    {
      text: 'Chart',
      value: 'chart',
      icon: 'chart bar',
    },
    {
      text: 'Table',
      value: 'table',
      icon: 'table',
    },
  ];

  return (
    <div id="viz-view-selector">
      {buttonParamArr.map(item => (
        <div
          key={`${item.value}-viz-view-selector-button`}
          onClick={() => props.setMobileVizView(item.value)}
          className="viz-view-selector-button"
          id={
            props.mobileVizView === item.value
              ? 'selected-viz-view-button'
              : null
          }
          style={{ width: `${100 / buttonParamArr.length}%` }}
        >
          {item.text}

          <Icon
            className="viz-view-icon"
            name={item.icon}
            inverted={props.mobileVizView === item.value}
            size="large"
          />
        </div>
      ))}
    </div>
  );
};

export default VizViewSelector;
{
  /* {item => {
                  console.log('item.value', item.value);
                  switch (item.value) {
                    case 'map':
                      return <Icon name="map" size="large" />;

                    case '':
                      return <Icon name="chart bar" size="large" />;

                    case 'map':
                      return <Icon name="table" size="large" />;
                    default:
                      break;
                  }
                }} */
}

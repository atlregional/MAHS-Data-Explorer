import React, { useEffect, useState } from 'react';
import { Popup } from 'semantic-ui-react';
import { submarkets } from '../../index.js';
import './style.css';
// import { imageOverlay } from 'leaflet';

const SubAreaSelector = props => {
  const [buttonSize, setButtonSize] = useState(75);
  const windowWidth = window.innerWidth;
  const subareas = props.subareaOptions;
  const numberOfSubareas = subareas.length;
  const scaler = numberOfSubareas < 6 ? 1.25 : windowWidth > 1100 ? 2.5 : 2;
  const highlightedSubarea = props.highlightedSubarea;
  const colormap = props.colormap;
  const buttonMargin = windowWidth > 800 ? '3.75px' : '1px';

  const setHighlightedSubarea = number => props.setHighlightedSubarea(number);

  const handleButtonSize = () =>
    setButtonSize(
      windowWidth > 800 ? (windowWidth * 0.1) / scaler : windowWidth / 6.5 - 15
    );
  console.log('window width: ', windowWidth / 2 - 15);

  useEffect(handleButtonSize, [subareas]);

  return subareas ? (
    <div id="subarea-selector-container">
      {subareas.map(
        subarea => (
          // console.log(submarkets[subarea].link),
          (
            <Popup
              hoverable
              position="right center"
              key={submarkets[subarea].name}
              header={
                <div
                  className="popover-header"
                  style={{
                    color: `${colormap[subarea - 1]}`,
                    backgroundColor: '#FEFEFE',
                    marginBottom: '5px',
                  }}
                >
                  {' '}
                  {submarkets[subarea].name}
                </div>
              }
              content={
                <>
                  <div style={{ margin: '10px 0 5px 0' }}>
                    {submarkets[subarea].description}
                  </div>
                  <a href={`${submarkets[subarea].link}`} target="blank">
                    More Info
                  </a>
                </>
              }
              trigger={
                <div
                  key={`subarea-selector-button-${subarea}-${highlightedSubarea}`}
                  className="subarea-selector-button"
                  style={{
                    // height: `${buttonSize}px`,
                    // width: `${buttonSize * 1.5}px`,
                    // margin: buttonMargin,
                    // lineHeight: `${buttonSize - buttonSize * 0.05}px`,
                    backgroundColor: `${colormap[subarea - 1]}`,
                    opacity:
                      highlightedSubarea === subarea
                        ? '1'
                        : highlightedSubarea
                        ? props.clickedSubarea
                          ? '.3'
                          : '.6'
                        : '1',
                    borderColor:
                      highlightedSubarea === subarea
                        ? 'black'
                        : `${colormap[subarea - 1]}`,
                    borderWidth: '3px',
                    borderStyle: 'solid',
                  }}
                  onMouseEnter={() => {
                    setHighlightedSubarea(
                      props.clickedSubarea ? props.clickedSubarea : subarea
                    );
                  }}
                  onMouseLeave={() => {
                    setHighlightedSubarea(props.clickedSubarea);
                  }}
                  onClick={() => {
                    props.setClickedSubarea(
                      props.clickedSubarea
                        ? subarea === props.clickedSubarea
                          ? null
                          : props.clickedSubarea
                        : subarea
                    );
                  }}
                >
                  {subarea}
                </div>
              }
            />
          )
        )
      )}
    </div>
  ) : null;
};

export default SubAreaSelector;

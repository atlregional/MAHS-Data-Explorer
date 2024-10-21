import React from 'react';
import PropTypes from 'prop-types';
// import { Popup } from "semantic-ui-react";
import { submarkets } from '../../globalUtils/submarkets';
import './style.css';

const SubAreaSelector = props => {
  const subareas = props.subareaOptions;
  const highlightedSubarea = props.highlightedSubarea;
  const colormap = props.colormap;
  const setHighlightedSubarea = number => props.setHighlightedSubarea(number);

  console.log(subareas);
  return subareas ? (
    <div id='subarea-selector-container'>
      {subareas.map(subarea => (
        <div
          key={`subarea-selector-button-${subarea}-${highlightedSubarea}`}
          className='subarea-selector-button'
          style={{
            backgroundColor: `${colormap[subarea - 1]}`,
            opacity:
              highlightedSubarea === subarea
                ? '1'
                : highlightedSubarea
                  ? props.clickedSubarea
                    ? '.3'
                    : '.6'
                  : '1',
            borderColor: highlightedSubarea === subarea ? 'black' : `${colormap[subarea - 1]}`,
            borderWidth: '3px',
            borderStyle: 'solid'
          }}
          onMouseEnter={() => {
            setHighlightedSubarea(props.clickedSubarea ? props.clickedSubarea : subarea);
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
      ))}
      {props.clickedSubarea || highlightedSubarea || highlightedSubarea ? (
        !props.mobile ? (
          <div className='subarea-popup'>
            <div
              id='subarea-info-header'
              style={{
                color: `${
                  props.clickedSubarea
                    ? colormap[props.clickedSubarea - 1]
                    : colormap[highlightedSubarea - 1]
                }`,
                backgroundColor: '#FEFEFE',
                marginBottom: '5px'
              }}
            >
              {' '}
              {submarkets[props.clickedSubarea || highlightedSubarea].name}
            </div>

            <div id='subarea-info-content'>
              <div>{submarkets[props.clickedSubarea || highlightedSubarea].description}</div>
              <a
                href={`${submarkets[props.clickedSubarea || highlightedSubarea].link}`}
                target='blank'
              >
                More Info
              </a>
            </div>
          </div>
        ) : null
      ) : null}
    </div>
  ) : null;
};

SubAreaSelector.propTypes = {
  clickedSubarea: PropTypes.number,
  colormap: PropTypes.array,
  highlightedSubarea: PropTypes.number,
  mobile: PropTypes.bool,
  setClickedSubarea: PropTypes.func,
  setHighlightedSubarea: PropTypes.func,
  subareaOptions: PropTypes.array
};

export default SubAreaSelector;

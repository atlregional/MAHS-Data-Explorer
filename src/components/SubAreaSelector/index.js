import React, { useState } from "react";
// import { Popup } from "semantic-ui-react";
import { submarkets } from "../../utils/submarkets";
import "./style.css";

const SubAreaSelector = (props) => {
  const subareas = props.subareaOptions;
  const highlightedSubarea = props.highlightedSubarea;
  const colormap = props.colormap;
  const setHighlightedSubarea = (number) => props.setHighlightedSubarea(number);
  // const [ popup, setPopup ] = useState();

  return subareas ? (
    <div id="subarea-selector-container">
      {subareas.map((subarea) => (
        // <Popup
        // 	hoverable
        // 	position="right center"
        // 	header={
        // 		<div
        //       key={`popup-info-for-subarea-header-${submarkets[subarea].name}`}
        //       className="popover-header"
        // 			style={{
        // 				color: `${colormap[subarea - 1]}`,
        // 				backgroundColor: "#FEFEFE",
        // 				marginBottom: "5px",
        // 			}}
        // 		>
        // 			{" "}
        // 			{submarkets[subarea].name}
        // 		</div>
        // 	}
        // 	content={
        // 		<div
        //       key={`popup-info-for-subarea-content-${submarkets[subarea].name}`}
        //     >
        // 			<div style={{ margin: "10px 0 5px 0" }}>
        // 				{submarkets[subarea].description}
        // 			</div>
        // 			<a href={`${submarkets[subarea].link}`} target="blank">
        // 				More Info
        // 			</a>
        // 		</div>
        // 	}
        // 	trigger={
        <div
          key={`subarea-selector-button-${subarea}-${highlightedSubarea}`}
          className="subarea-selector-button"
          style={{
            backgroundColor: `${colormap[subarea - 1]}`,
            opacity:
              highlightedSubarea === subarea
                ? "1"
                : highlightedSubarea
                ? props.clickedSubarea
                  ? ".3"
                  : ".6"
                : "1",
            borderColor:
              highlightedSubarea === subarea
                ? "black"
                : `${colormap[subarea - 1]}`,
            borderWidth: "3px",
            borderStyle: "solid",
          }}
          onMouseEnter={(e) => {
            setHighlightedSubarea(
              props.clickedSubarea ? props.clickedSubarea : subarea
            );
            // console.log(e);
            // setPopup({top: e.pageY})
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
          <div
            className="subarea-popup"
            // style={{
            //   top: popup.top
            // }}
          >
            <div
              id="subarea-info-header"
              style={{
                color: `${
                  props.clickedSubarea
                    ? colormap[props.clickedSubarea - 1]
                    : colormap[highlightedSubarea - 1]
                }`,
                backgroundColor: "#FEFEFE",
                marginBottom: "5px",
              }}
            >
              {" "}
              {submarkets[props.clickedSubarea || highlightedSubarea].name}
            </div>

            <div id="subarea-info-content">
              <div>
                {
                  submarkets[props.clickedSubarea || highlightedSubarea]
                    .description
                }
              </div>
              <a
                href={`${
                  submarkets[props.clickedSubarea || highlightedSubarea].link
                }`}
                target="blank"
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

export default SubAreaSelector;

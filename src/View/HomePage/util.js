import globalUtils from "../../globalUtils";

export default {
  handleTractInfo(props) {
    const data = [...props.tractInfo];
    const dataObj = {};
    data.forEach((tract) => (dataObj[tract.GEOID] = tract));
    return dataObj;
  },

  handleSubareaOptions(props, selection) {
    const subareaArray = [];
    const data = [...props.tractInfo].filter((tract) =>
      globalUtils.filterBySelection(tract, selection)
    );
    data.forEach((tract) =>
      subareaArray.push(parseInt(tract.Subarea.replace("Subarea ", "")))
    );
    const subareaSet = [...new Set(subareaArray)].sort((a, b) =>
      a > b ? 1 : -1
    );
    return subareaSet;
  },
};

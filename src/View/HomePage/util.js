import globalUtils from '../../globalUtils';

export default {
  handleTractInfo(tractInfo) {
    const data = [...tractInfo];
    const dataObj = {};
    data.forEach(tract => (dataObj[tract.GEOID] = tract));
    return dataObj;
  },

  handleSubareaOptions(tractInfo, selection) {
    const subareaArray = [];
    const data = [...tractInfo].filter(tract =>
      globalUtils.filterBySelection(tract, selection)
    );
    data.forEach(tract =>
      subareaArray.push(parseInt(tract.Subarea?.replace('Subarea ', '')))
    );
    const subareaSet = [...new Set(subareaArray)].sort((a, b) =>
      a > b ? 1 : -1
    );
    return subareaSet;
  }
};

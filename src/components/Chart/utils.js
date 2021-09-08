import globalUtils from "../../globalUtils";

export default {
  handleAggregation(tractInfo, selectedIndicator, props) {
    const array = [];
    const tractData = Object.values(tractInfo).filter((tract) =>
      globalUtils.filterBySelection(tract, props.selection)
    );
    const aggregatedData = globalUtils.aggregate(
      tractData,
      selectedIndicator,
      "Subarea"
    );

    Object.entries(aggregatedData)
      .filter(([key]) => key !== "All")
      .forEach(([key, value]) =>
        array.push({
          name: key,
          Subarea: parseInt(key.replace("Subarea ", "")),
          [selectedIndicator.name]: value,
          [props.selection.geo]: aggregatedData["All"],
        })
      );

    array.sort((a, b) => (a.Subarea < b.Subarea ? -1 : 1));
    // console.log(array);
    // setData(array);
    return array;
  },
};

export default {
  handleGeoOptions(props, topMenu) {
    const subMenusObj = {};

    topMenu.forEach((geoType) => {
      const type = geoType;
      const options = [];
      const data = [...props.data];
      type === "City"
        ? data.forEach((tract) =>
            tract.Cities.forEach((city) => options.push(city))
          )
        : type === "County"
        ? data.forEach((tract) => options.push(tract.County))
        : options.push("11-County");
      const geoSet = [...new Set(options)].sort((a, b) => (a > b ? 1 : -1));
      subMenusObj[type] = geoSet;
    });

    return subMenusObj;
  },
};

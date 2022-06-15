export default {
  searchFilter(search, item) {
    const searchArray = search.replace(/,/g, '').split(' ');

    const searchFields = ['name', 'type', 'category', 'source'];

    const resultsString = item
      ? Object.entries(item)
        .filter(([key]) => searchFields.includes(key))
        .map(([, value]) => value)
        .join(' ')
        .toUpperCase()
        .replace(/,/g, '')
      : null;

    const booleanArray = searchArray.map(searchItem =>
      item ? resultsString.includes(searchItem.trim().toUpperCase().replace(/,/g, '')) : null
    );

    return booleanArray.includes(false) ? false : true;
  },

  handleMultipleSelection(selection, multipleSelections, options) {
    const currentIndicators = [...multipleSelections];

    currentIndicators.includes(selection.name)
      ? currentIndicators.splice(currentIndicators.indexOf(selection.name), 1)
      : currentIndicators.push(selection.name);

    const modifiedIndicators = [...options].filter(option =>
      currentIndicators.includes(option.name)
    );

    return modifiedIndicators;
  },

  handleSelectAll(multipleSelections, props, search, searchFilter, options, category) {
    const currentIndicators = [...multipleSelections].sort();
    const selectedIndicators = [...props.options]
      .filter(item => (search && item ? searchFilter(search, item) : true))
      .filter(option => (category ? option.category === category : true))
      .map(option => option.name);

    selectedIndicators.forEach(indicator =>
      !currentIndicators.includes(indicator) ? currentIndicators.push(indicator) : null
    );

    const modifiedIndicators = [...options].filter(option =>
      currentIndicators.includes(option.name)
    );

    return modifiedIndicators;
  },

  handleUnselectAll(multipleSelections, search, searchFilter, options, category) {
    const currentIndicators = [...multipleSelections].sort();
    const selectedIndicators = [...options]
      .filter(item => (search && item ? searchFilter(search, item) : true))
      .filter(option => (category ? option.category === category : true))
      .map(option => option.name)
      .reverse();

    selectedIndicators.forEach(indicator =>
      currentIndicators.includes(indicator)
        ? currentIndicators.splice(currentIndicators.indexOf(indicator), 1)
        : null
    );

    const modifiedIndicators = [...options].filter(option =>
      currentIndicators.includes(option.name)
    );

    return modifiedIndicators;
  }
};

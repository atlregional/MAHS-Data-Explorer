export default (data, indicatorInfo, aggregator) => {
  // console.log('data :', data);
  // console.log('aggregator :', aggregator);
  // console.log('indicatorInfo :', indicatorInfo);

  const aggregatorField = aggregator;
  // type options are subarea, city, or tractID
  // type options are *'percent'*, 'average', 'weighted average', 'sum'
  const numeratorId = indicatorInfo.indicator.id;
  const denominatorId = indicatorInfo.universe.id;
  const numeratorValues = {};
  const denominatorValues = {};
  const numberOfTracts = {};

  data.forEach(tract => {
    // console.log(JSON.stringify(tract))
    const aggregatorId = tract[aggregatorField];

    numberOfTracts[aggregatorId]
      ? (numberOfTracts[aggregatorId] = numberOfTracts[aggregatorId] + 1)
      : (numberOfTracts[aggregatorId] = 1);

    numberOfTracts['All']
      ? (numberOfTracts['All'] = numberOfTracts['All'] + 1)
      : (numberOfTracts['All'] = 1);
  });

  data.forEach(tract => {
    // tract => the individual subarea for each tract that the data is aggregated by;
    const aggregatorId = tract[aggregatorField];

    denominatorValues[aggregatorId]
      ? (denominatorValues[aggregatorId] =
          denominatorValues[aggregatorId] + tract.Data[denominatorId])
      : (denominatorValues[aggregatorId] = tract.Data[denominatorId]);

    denominatorValues['All']
      ? (denominatorValues['All'] =
          denominatorValues['All'] + tract.Data[denominatorId])
      : (denominatorValues['All'] = tract.Data[denominatorId]);
  });

  data.forEach(tract => {
    const aggregatorId = tract[aggregatorField];

    // console.log(JSON.stringify(denominatorValues[aggregatorId]));
    // console.log(tract.Data[denominatorId])

    const weightingFactor =
      indicatorInfo.type === 'weighted average'
        ? tract.Data[denominatorId] / denominatorValues[aggregatorId]
        : 1;

    const allWeightingFactor =
      indicatorInfo.type === 'weighted average'
        ? tract.Data[denominatorId] / denominatorValues['All']
        : 1;

    numeratorValues[aggregatorId]
      ? (numeratorValues[aggregatorId] =
          numeratorValues[aggregatorId] +
          tract.Data[numeratorId] * weightingFactor)
      : (numeratorValues[aggregatorId] =
          tract.Data[numeratorId] * weightingFactor);

    numeratorValues['All']
      ? (numeratorValues['All'] =
          numeratorValues['All'] + tract.Data[numeratorId] * allWeightingFactor)
      : (numeratorValues['All'] = tract.Data[numeratorId] * allWeightingFactor);
  });
  // console.log(numeratorValues)

  // console.log(denominatorValues)
  // numeratorValues['All'] = Object.values(numeratorValues).reduce(sumArray);

  const calcAggregation = () => {
    const aggregatedDataObj = {};

    const type = indicatorInfo.type;
    const numeratorArray = Object.entries(numeratorValues);

    type === 'average'
      ? numeratorArray.map(
          ([aggregator, numerator]) =>
            (aggregatedDataObj[aggregator] =
              numerator / numberOfTracts[aggregator])
        )
      : type === 'sum'
      ? numeratorArray.map(
          ([aggregator, numerator]) =>
            (aggregatedDataObj[aggregator] = numerator)
        )
      : type === 'percent'
      ? numeratorArray.map(
          ([aggregator, numerator]) =>
            (aggregatedDataObj[aggregator] =
              numerator / denominatorValues[aggregator])
        )
      : type === 'weighted average'
      ? numeratorArray.map(
          ([aggregator, numerator]) =>
            (aggregatedDataObj[aggregator] = numerator)
        )
      : console.log('No known calculation type define');

    return aggregatedDataObj;
  };

  // console.log(calcAggregation());

  return calcAggregation();
};

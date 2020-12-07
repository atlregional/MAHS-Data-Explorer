export default (data, indicatorInfo, aggregator) => {
  console.log('data :', data);
  console.log('aggregator :', aggregator);
  console.log('indicatorInfo :', indicatorInfo);

  const aggregatorField = aggregator;
  // type options are subarea, city, or tractID

  // type options are *'percent'*, 'average', 'weighted average', 'sum'
  const numeratorId = indicatorInfo.indicator.id;
  const denominatorId = indicatorInfo.universe.id;
  // const aggregatedDataObj = {};
  // const aggregatedDataInfo = {};
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

  // numberOfTracts['All'] = Object.values(numberOfTracts).reduce(sumArray);

  // console.log('Number of Tracts', numberOfTracts);


  data.forEach(tract => {
    // the individual subarea for each tract that the data is aggregated by;
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
        numeratorValues['All'] +
        tract.Data[numeratorId] * allWeightingFactor)
    : (numeratorValues['All'] =
        tract.Data[numeratorId] * allWeightingFactor);

    
  });
  // console.log(numeratorValues)

  // console.log(denominatorValues)
  // numeratorValues['All'] = Object.values(numeratorValues).reduce(sumArray);


  const calcAggregation = () => {
    const type = indicatorInfo.type;
    const numeratorArray = Object.entries(numeratorValues);
    // const numeratorArray2 = Object.values(denominatorValues);
    // const numSum = numeratorArray.reduce((a, b) => a + b, 0);
    // const denSum = numeratorArray2.reduce((a, b) => a + b, 0);
    // const weight = numSum / denSum;

    // console.log(numeratorArray);

    const aggregatedDataObj = {};
    console.log('aggregatedDataObj :', aggregatedDataObj);

    type === 'average'
      ? numeratorArray.map(
          ([aggregator, numerator]) =>
            (aggregatedDataObj[aggregator] = numerator / numberOfTracts[aggregator])
        )
      : type === 'sum'
      ? numeratorArray.map(
          ([aggregator, numerator]) => (aggregatedDataObj[aggregator] = numerator)
        )
      : type === 'percent'
      ? numeratorArray.map(
          ([aggregator, numerator]) =>
            (aggregatedDataObj[aggregator] =
              numerator / denominatorValues[aggregator])
        )
      : type === 'weighted average'
      ? numeratorArray.map(
          ([aggregator, numerator]) => (aggregatedDataObj[aggregator] = numerator)
        )
      : type === 'all'
      ? arr.map(
          ([subarea, numerator]) => (aggregatedDataObj[subarea] = numerator)
        )
      : console.log('No known calculation type define');

    return aggregatedDataObj;
  };

  

  // calcAggregation();

  console.log(calcAggregation())

  console.log(calcAggregation());
  return calcAggregation();
  // objects like so...
  // {
  //    "Subarea 1" : aggregated value,
  //   "Subarea 2" :  aggregated value
};

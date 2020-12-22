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

<<<<<<< HEAD
    numberOfTracts['All']
      ? (numberOfTracts['All'] = numberOfTracts['All'] + 1)
      : (numberOfTracts['All'] = 1);
=======
    
    numberOfTracts['All']
      ? (numberOfTracts['All'] = numberOfTracts['All'] + 1)
      : (numberOfTracts['All'] = 1);

>>>>>>> aad749f3eef879ed4e9cf537f399cff0659f6c64
  });

  // numberOfTracts['All'] = Object.values(numberOfTracts).reduce(sumArray);

  // console.log('Number of Tracts', numberOfTracts);


  data.forEach(tract => {
    // tract => the individual subarea for each tract that the data is aggregated by;
    const aggregatorId = tract[aggregatorField];

    denominatorValues[aggregatorId]
      ? (denominatorValues[aggregatorId] =
          denominatorValues[aggregatorId] + tract.Data[denominatorId])
      : (denominatorValues[aggregatorId] = tract.Data[denominatorId]);

<<<<<<< HEAD
    denominatorValues['All']
      ? (denominatorValues['All'] =
          denominatorValues['All'] + tract.Data[denominatorId])
      : (denominatorValues['All'] = tract.Data[denominatorId]);
=======
    denominatorValues['All'] 
      ? (denominatorValues['All'] =
        denominatorValues['All'] + tract.Data[denominatorId])
    : (denominatorValues['All'] = tract.Data[denominatorId]);
>>>>>>> aad749f3eef879ed4e9cf537f399cff0659f6c64
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
<<<<<<< HEAD
      ? (numeratorValues['All'] =
          numeratorValues['All'] + tract.Data[numeratorId] * allWeightingFactor)
      : (numeratorValues['All'] = tract.Data[numeratorId] * allWeightingFactor);
=======
    ? (numeratorValues['All'] =
        numeratorValues['All'] +
        tract.Data[numeratorId] * allWeightingFactor)
    : (numeratorValues['All'] =
        tract.Data[numeratorId] * allWeightingFactor);

    
>>>>>>> aad749f3eef879ed4e9cf537f399cff0659f6c64
  });
  // console.log(numeratorValues)

  // console.log(denominatorValues)
  // numeratorValues['All'] = Object.values(numeratorValues).reduce(sumArray);
<<<<<<< HEAD

  const calcAggregation = () => {
=======


  const calcAggregation = () => {
    const type = indicatorInfo.type;
    const numeratorArray = Object.entries(numeratorValues);
    // const numeratorArray2 = Object.values(denominatorValues);
    // const numSum = numeratorArray.reduce((a, b) => a + b, 0);
    // const denSum = numeratorArray2.reduce((a, b) => a + b, 0);
    // const weight = numSum / denSum;

    // console.log(numeratorArray);

>>>>>>> aad749f3eef879ed4e9cf537f399cff0659f6c64
    const aggregatedDataObj = {};

    const type = indicatorInfo.type;
    const numeratorArray = Object.entries(numeratorValues);

    type === 'average'
      ? numeratorArray.map(
          ([aggregator, numerator]) =>
<<<<<<< HEAD
            (aggregatedDataObj[aggregator] =
              numerator / numberOfTracts[aggregator])
        )
      : type === 'sum'
      ? numeratorArray.map(
          ([aggregator, numerator]) =>
            (aggregatedDataObj[aggregator] = numerator)
=======
            (aggregatedDataObj[aggregator] = numerator / numberOfTracts[aggregator])
        )
      : type === 'sum'
      ? numeratorArray.map(
          ([aggregator, numerator]) => (aggregatedDataObj[aggregator] = numerator)
>>>>>>> aad749f3eef879ed4e9cf537f399cff0659f6c64
        )
      : type === 'percent'
      ? numeratorArray.map(
          ([aggregator, numerator]) =>
            (aggregatedDataObj[aggregator] =
              numerator / denominatorValues[aggregator])
        )
      : type === 'weighted average'
      ? numeratorArray.map(
<<<<<<< HEAD
          ([aggregator, numerator]) =>
            (aggregatedDataObj[aggregator] = numerator)
=======
          ([aggregator, numerator]) => (aggregatedDataObj[aggregator] = numerator)
>>>>>>> aad749f3eef879ed4e9cf537f399cff0659f6c64
        )
      : console.log('No known calculation type define');

    return aggregatedDataObj;
  };

<<<<<<< HEAD
  // console.log(calcAggregation());
=======
  

  // calcAggregation();

  console.log(calcAggregation())
>>>>>>> aad749f3eef879ed4e9cf537f399cff0659f6c64

  return calcAggregation();
};

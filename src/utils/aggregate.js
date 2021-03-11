export default (data, indicatorInfo, aggregator) => {
  const aggregatorField = aggregator,
    numeratorID = indicatorInfo.numeratorID,
    denominatorID = indicatorInfo.denominatorID,
    numeratorID2 = indicatorInfo.numeratorID2,
    denominatorID2 = indicatorInfo.denominatorID2,
    changeType = indicatorInfo.changeType,
    numeratorValues = {},
    denominatorValues = {},
    numeratorValues2 = {},
    denominatorValues2 = {},
    numberOfTracts = {},
    numberOfNulls = {},
    numberOfTracts2 = {},
    numberOfNulls2 = {};


  data.forEach(tract => {
    // console.log(JSON.stringify(tract))
    const aggregatorId = tract[aggregatorField];
    const notNull = tract.Data[numeratorID] 
      ? true
      : false;
      
    const notNull2 = tract.Data[numeratorID2] 
      ? true
      : false;
    
    numberOfTracts[aggregatorId]
      ? notNull
        ? numberOfTracts[aggregatorId] = numberOfTracts[aggregatorId] + 1
        : numberOfNulls[aggregatorId] = numberOfNulls[aggregatorId] + 1
      : notNull
        ? numberOfTracts[aggregatorId] = 1
        : numberOfNulls[aggregatorId] = 1;

    numberOfTracts['All']
      ? notNull
        ? numberOfTracts['All'] = numberOfTracts['All'] + 1
        : numberOfNulls['All'] = numberOfNulls['All'] + 1
      : notNull
        ? numberOfTracts['All'] = 1
        : numberOfNulls['All'] = 1;
    
    if (changeType) {
      numberOfTracts2[aggregatorId]
      ? notNull2
        ? numberOfTracts2[aggregatorId] = numberOfTracts2[aggregatorId] + 1
        : numberOfNulls2[aggregatorId] = numberOfNulls2[aggregatorId] + 1
      : notNull2
        ? numberOfTracts2[aggregatorId] = 1
        : numberOfNulls2[aggregatorId] = 1;

      numberOfTracts2['All']
      ? notNull2
        ? numberOfTracts2['All'] = numberOfTracts2['All'] + 1
        : numberOfNulls2['All'] = numberOfNulls2['All'] + 1
      : notNull2
        ? numberOfTracts2['All'] = 1
        : numberOfNulls2['All'] = 1;    
    }  
  });


  data.forEach(tract => {
    // tract => the individual subarea for each tract that the data is aggregated by;
    const aggregatorId = tract[aggregatorField];

    denominatorValues[aggregatorId]
      ? denominatorValues[aggregatorId] = denominatorValues[aggregatorId] + tract.Data[denominatorID]
      : denominatorValues[aggregatorId] = tract.Data[denominatorID];

    denominatorValues['All']
      ? denominatorValues['All'] = denominatorValues['All'] + tract.Data[denominatorID]
      : denominatorValues['All'] = tract.Data[denominatorID];

    if (changeType) {
      denominatorValues2[aggregatorId]
      ? denominatorValues2[aggregatorId] = denominatorValues2[aggregatorId] + tract.Data[denominatorID2]
      : denominatorValues2[aggregatorId] = tract.Data[denominatorID2];

      denominatorValues2['All']
        ? denominatorValues2['All'] = denominatorValues2['All'] + tract.Data[denominatorID2]
        : denominatorValues2['All'] = tract.Data[denominatorID2];
    }
  });

  data.forEach(tract => {
    const aggregatorId = tract[aggregatorField];

    const weightingFactor =
      indicatorInfo.type === 'weighted average'
        ? tract.Data[denominatorID] / denominatorValues[aggregatorId]
        : 1;

    const allWeightingFactor =
      indicatorInfo.type === 'weighted average'
        ? tract.Data[denominatorID] / denominatorValues['All']
        : 1;

    const weightingFactor2 =
      indicatorInfo.type === 'weighted average' && changeType
        ? tract.Data[denominatorID2] / denominatorValues2[aggregatorId]
        : 1;

    const allWeightingFactor2 =
      indicatorInfo.type === 'weighted average' && changeType
        ? tract.Data[denominatorID2] / denominatorValues2['All']
        : 1;

    numeratorValues[aggregatorId]
      ? (numeratorValues[aggregatorId] =
          numeratorValues[aggregatorId] +
          tract.Data[numeratorID] * weightingFactor)
      : (numeratorValues[aggregatorId] =
          tract.Data[numeratorID] * weightingFactor);

    numeratorValues['All']
      ? (numeratorValues['All'] =
          numeratorValues['All'] + tract.Data[numeratorID] * allWeightingFactor)
      : (numeratorValues['All'] = tract.Data[numeratorID] * allWeightingFactor);

    if (changeType) {
      numeratorValues2[aggregatorId]
      ? (numeratorValues2[aggregatorId] =
          numeratorValues2[aggregatorId] +
          tract.Data[numeratorID2] * weightingFactor2)
      : (numeratorValues2[aggregatorId] =
          tract.Data[numeratorID2] * weightingFactor2);

      numeratorValues2['All']
        ? (numeratorValues2['All'] =
            numeratorValues2['All'] + tract.Data[numeratorID2] * allWeightingFactor2)
        : (numeratorValues2['All'] = tract.Data[numeratorID2] * allWeightingFactor2);
    }
  });

  const calcAggregation = () => {
    const type = indicatorInfo.type.toLowerCase();
    const numeratorArray = Object.entries(numeratorValues);
    const numeratorArray2 = changeType ? Object.entries(numeratorValues2) : [];
    const aggregatedDataObj = {};
    const aggregatedDataObj2 = {};


    type === 'average'
      ? numeratorArray.map(
          ([aggregator, numerator]) =>
            (aggregatedDataObj[aggregator] = numerator / denominatorValues[aggregator])
        )
      : type === 'sum'
      ? numeratorArray.map(
          ([aggregator, numerator]) => (aggregatedDataObj[aggregator] = numerator)
        )
      : type === 'percent' || type === 'ratio'
      ? numeratorArray.map(
          ([aggregator, numerator]) =>
            (aggregatedDataObj[aggregator] =
              numerator / denominatorValues[aggregator])
        )
      : type === 'weighted average'
      ? numeratorArray.map(
          ([aggregator, numerator]) => (aggregatedDataObj[aggregator] = numerator)
        )
      : console.log('No known calculation type define');

    if (changeType) {
      type === 'average'
        ? numeratorArray2.map(
          ([aggregator, numerator]) =>
            (aggregatedDataObj2[aggregator] = numerator / numberOfTracts2[aggregator])
        )
      : type === 'sum'
      ? numeratorArray2.map(
          ([aggregator, numerator]) => (aggregatedDataObj2[aggregator] = numerator)
        )
      : type === 'percent' || type === 'ratio'
      ? numeratorArray2.map(
          ([aggregator, numerator]) =>
            (aggregatedDataObj2[aggregator] =
              numerator / denominatorValues2[aggregator])
        )
      : type === 'weighted average'
      ? numeratorArray2.map(
          ([aggregator, numerator]) => (aggregatedDataObj2[aggregator] = numerator)
        )
      : console.log('No known calculation type define');

      changeType === 'Percent Change'
        ? Object.entries(aggregatedDataObj2).forEach(([key,value]) => 
            aggregatedDataObj[key] = (aggregatedDataObj[key] - value)/value
          )
        : Object.entries(aggregatedDataObj2).forEach(([key,value]) => 
              aggregatedDataObj[key] = aggregatedDataObj[key] - value
        )
    }


    return aggregatedDataObj;
  };

  return calcAggregation();
};

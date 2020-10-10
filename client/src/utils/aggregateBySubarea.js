export default (data, indicatorInfo, aggregator) => {
  console.log(data)
  console.log('here')
  const aggregatorField = aggregator;
  // type options are subarea, city, or tractID
  const type = indicatorInfo.type;
  // type options are *'percent'*, 'average', 'weighted average', 'sum'
  const numeratorId = indicatorInfo.indicator.id;
  const denominatorId = indicatorInfo.universe.id; 
  const aggregatedDataObj = {};

  const numeratorValues = {};
  const denominatorValues = {};

  Object.values(data).forEach(tract =>{
    console.log(JSON.stringify(tract))
    const aggregatorId = tract[aggregatorField]
    console.log(aggregatorId)
      numeratorValues[aggregatorId] ?
      numeratorValues[aggregatorId] = numeratorValues[aggregatorId] + tract.Data[numeratorId]
      :numeratorValues[aggregatorId] = tract.Data[numeratorId]
    }
    )
    
 Object.values(data).forEach(tract =>{
  console.log(JSON.stringify(tract))
  const aggregatorId = tract[aggregatorField]
  console.log(aggregatorId)
    denominatorValues[aggregatorId] ?
    denominatorValues[aggregatorId] = denominatorValues[aggregatorId] + tract.Data[denominatorId]
    :denominatorValues[aggregatorId] = tract.Data[denominatorId]
  }
  )
  

//  const calcAggregation = () => {
//   type === 'percent' ? 
  
 
//  numerator / denominator 
//  : type === 'average' ?
    

// (total += data[i]) / data.length

//  :type === 'weighted average'? 
//  }

  return aggregatedDataObj;
 // objects like so...
 // {
 //    "Subarea 1" : aggregated value,
 //   "Subarea 2 :  aggregated value
}

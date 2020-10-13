export default (data, indicatorInfo, aggregator) => {
  console.log(data)
  
  const aggregatorField = aggregator;
  // type options are subarea, city, or tractID
  
  // type options are *'percent'*, 'average', 'weighted average', 'sum'
  const numeratorId = indicatorInfo.indicator.id;
  const denominatorId = indicatorInfo.universe.id; 
  const aggregatedDataObj = {};

  const numeratorValues = {};
  const denominatorValues = {};

  Object.values(data).forEach(tract =>{
    // console.log(JSON.stringify(tract))
    // console.log(aggregatorField)
    const aggregatorId = tract[aggregatorField]
    // console.log(aggregatorId)
      numeratorValues[aggregatorId] ?
      numeratorValues[aggregatorId] = numeratorValues[aggregatorId] + tract.Data[numeratorId]
      :numeratorValues[aggregatorId] = tract.Data[numeratorId]
    }
    );
    console.log(numeratorValues)
    
 Object.values(data).forEach(tract =>{
  console.log(JSON.stringify(tract))
  const aggregatorId = tract[aggregatorField]
 
    denominatorValues[aggregatorId] ?
    denominatorValues[aggregatorId] = denominatorValues[aggregatorId] + tract.Data[denominatorId]
    :denominatorValues[aggregatorId] = tract.Data[denominatorId]
  }
  );
  console.log(denominatorValues)

  const calcAggregation = () => {
    const type = indicatorInfo.type;
    // type === 'percent' ? 
    Object.keys(numeratorValues).forEach(key => {
      aggregatedDataObj[key] = (numeratorValues[key]/ denominatorValues[key])
    }) 
      
    //  :type === 'average' ?

      

    //  :null
      
    

     
    
  
     
    
    
  };
    //  : type === 'weighted average' 
    //  console.log('weighted')
    
  
  
   calcAggregation()
   
 console.log(aggregatedDataObj)
  return aggregatedDataObj;
 // objects like so...
 // {
 //    "Subarea 1" : aggregated value,
 //   "Subarea 2 :  aggregated value
  };


    


import React from 'react';

const Header = props => {
    return (
        <>
          <div>
          {props.geoTypeOptions ?
          <select
            placeholder='Choose Geography Type'
            value={props.selection.geoType}
            className='geo-selector'
            onChange={e => props.setSelection({
              ...props.selection,
              geoType: e.target.value,
              geo: e.target.value === 'Region' ? '10 Counties' : props.selection.geo
            })}
          >
            {
              props.geoTypeOptions.map(option =>
              <option
                className='geo-option'
                value={option}
                key={option}
              >
                {option}
              </option>  
              )
            }
          </select>
          : null
          }
        </div>
        <div>
          {props.geoOptions ?
          <select
            placeholder={`Choose a ${props.selection.geoType}`}
            value={props.selection.geo}
            className='geo-selector'
            onChange={e => props.setSelection({
              ...props.selection,
              geo: e.target.value
            })}          >
            {
              props.geoOptions.map(option =>
              <option
                className='geo-option'
                value={option}
                key={option}
              >
                {option}
              </option>  
              )
            }
          </select>
          : null
          }
        </div>
        </>
    )
}
export default Header;
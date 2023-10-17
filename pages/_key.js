/* 
----------------------------------------
import React and helper functions for the key
----------------------------------------
*/
import React from 'react';
import { populationRanges, colorScheme } from '../helperFunctions/assignColor';

/* 
----------------------------------------
Create the key (simple version) with the text and the colors
----------------------------------------
*/
const Key = () => {
  return (
    <div id="map-key">
      {populationRanges.map((range, index) => {
        if (index === populationRanges.length - 1) return null;  // Ignore the last value (Infinity)

        let populationText;
        if (range === 0) {
          populationText = `Population less than ${populationRanges[index + 1].toLocaleString()}`;
        } else if (populationRanges[index + 1] === Infinity) {
          populationText = `Population ${range.toLocaleString()} or more`;
        } else {
          populationText = `Population between ${range.toLocaleString()} and ${populationRanges[index + 1].toLocaleString()}`;
        }

        //add the color of the box first, then the text
        return (
          <div key={range.toLocaleString()}>
            <span style={{ background: colorScheme[index], padding: '0 10px', margin: '0 5px' }}>&nbsp;</span>
            {populationText}
          </div>
        );
      })}
    </div>
  );
};

export default Key;

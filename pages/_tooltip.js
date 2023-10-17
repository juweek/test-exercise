import React from 'react';

/* 
----------------------------------------
Create the tooltip component, with the necessary info passed as props
----------------------------------------
*/
const Tooltip = ({ hoveredCountryData, mousePosition }) => {
    if (!hoveredCountryData) {
        return null;
    }

    //define the css rules for the tooltip; keep it simple
    const tooltipStyle = {
        position: 'absolute',
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        background: 'white',
        padding: '5px',
        color: '#333',
        border: '1px solid #333',
        pointerEvents: 'none',
    };

    //return the tooltip with the information that was passed
    return (
        <div style={tooltipStyle}>
            <p>Country: {hoveredCountryData.countryName}</p>
            <p>Population: {hoveredCountryData.countryPopulation.toLocaleString()}</p>
        </div>
    );
};

export default Tooltip;

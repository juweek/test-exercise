/*
----------------------------------------
Import necessary components and libraries (d3 stuff, mostly)
----------------------------------------
*/
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import worldGeoJSON from '../assets/custom.geo.json';
import { assignColor, populationRanges, colorScheme } from '../helperFunctions/assignColor';

/*
----------------------------------------
Organize the country data by filtering out specific fields (name, population, etc)
----------------------------------------
*/
const organizeCountryInfo = (countryData) => {
  if (!countryData || !countryData.name || !countryData.population || !countryData.continents) {
    return null;
  }
  //set variable names
  const countryName = countryData.name.common;
  const countryPopulation = countryData.population;
  const continent = countryData.continents[0];

  //check in case data is corrupted
  let populationDensity = null;
  if (countryData.area) {
    populationDensity = (countryPopulation / countryData.area).toFixed(2);
  }

  //return the results
  const organizedInfo = {
    countryName,
    countryPopulation,
    continent,
    populationDensity,
  };

  return organizedInfo;
};

/*
----------------------------------------
fetch the data from the rest api, then feed that data into an svg map using d3/geojson
----------------------------------------
*/
const CountryData = () => {
  const [data, setData] = useState(null);
  const [organizedData, setOrganizedData] = useState([]);

  //fetch and organize the data using organizeCountryInfo()
  useEffect(() => {
    const apiUrl = 'https://restcountries.com/v3.1/all';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        const organizedData = data.map((countryData) =>
          organizeCountryInfo(countryData)
        );
        setOrganizedData(organizedData);

        // Place the D3 rendering code here, after organizedData has been populated
        const svgContainer = d3.select('#map-container');
        const svg = svgContainer.select('svg');

        if (svg.empty()) {
          const svgElement = svgContainer.append('svg')
            .attr('width', '100%')
            .attr('height', '50vh');

          // Create a projection for the map
          const projection = d3.geoMercator()
            .scale(100) // Adjust the scale as needed
            .translate([400, 200]); // Adjust the translation as needed

          // Create a path generator based on the projection
          const path = d3.geoPath().projection(projection);

         // Render the map features by searching for country names and using the utility function assignColor()
        svgElement
        .selectAll('path')
        .data(worldGeoJSON.features)
        .enter()
        .append('path')
        .attr('d', path)
        .style('fill', (feature) => {
          const countryData = organizedData.find(
            (data) => data && data.countryName === feature.properties.name
          );
          return countryData ? assignColor(countryData.countryPopulation) : 'gray';
        });
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  /*
  ----------------------------------------
  Draw the map, convert the data to JSON, then write both to the html 
  ----------------------------------------
  */
  return (
    <div>
      <h2>Lorem ipsum population</h2>
      <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim</h3>
      <div id="map-container"></div>
      <p>Source: Lorem ipsum dolor</p>
      <div>{JSON.stringify(organizedData, null, 2)}</div>
    </div>
  );
};

export default CountryData;

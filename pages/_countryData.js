/*
----------------------------------------
Import necessary components and libraries (d3 stuff, mostly)
----------------------------------------
*/
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import worldGeoJSON from '../assets/custom.geo.json';
import { assignColor } from '../helperFunctions/assignColor';
import { organizeCountryInfo } from '../helperFunctions/chooseDataFields';
import Tooltip from './_tooltip';
import Key from './_key';

/*
----------------------------------------
fetch the data from the rest api, then feed that data into an svg map using d3/geojson
----------------------------------------
*/
const CountryData = () => {
  const [data, setData] = useState(null);
  const [organizedData, setOrganizedData] = useState([]);
  const [hoveredCountryData, setHoveredCountryData] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

        //choose arbitrary size; eventually, make this responsive
        if (svg.empty()) {
          const svgElement = svgContainer.append('svg')
            .attr('width', '100%')
            .attr('height', '500px');

          // Create a projection for the map
          const projection = d3.geoMercator()
            .scale(100) 
            .translate([300, 300]); // Needed this to run; not sure why

          // Create a path generator based on the projection
          const path = d3.geoPath().projection(projection);

          // Render the map features by searching for country names and using the utility function assignColor()
          svgElement
            .selectAll('path')
            .data(worldGeoJSON.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('data-country-name', (feature) => {
              //add in the current country's name as a data attribute for the SVG
              const countryData = organizedData.find(
                (data) => data && data.countryName === feature.properties.name
              );
              return countryData ? countryData.countryName : '???'
            })
            .attr('data-country-population', (feature) => {
               //add in the current country's population as a data attribute for the SVG
              const countryData = organizedData.find(
                (data) => data && data.countryName === feature.properties.name
              );
              return countryData ? countryData.countryPopulation : '???'
            })
            .style('fill', (feature) => {
               //color the country based off of the population
              const countryData = organizedData.find(
                (data) => data && data.countryName === feature.properties.name
              );
              return countryData ? assignColor(countryData.countryPopulation) : 'gray';
            })
            .style('stroke', '#000')   // Default stroke color
            .style('stroke-width', '.2') // Default stroke width
            .on('mouseover', (event, feature) => {
              //When a state is mouseovered, show the tooltip with linked info
              const countryData = organizedData.find(
                (data) => data && data.countryName === feature.properties.name
              );
              if (countryData) {
                setHoveredCountryData(countryData);
                setMousePosition({ x: event.pageX, y: event.pageY });
              }
              d3.select(event.currentTarget)
                .style('stroke-width', '2') 
            })
            .on('mouseout', () => {
              // Handle mouseout to hide the tooltip
              setHoveredCountryData(null);
              d3.select(event.currentTarget)
                .style('stroke-width', '.2') 
            })
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
      <div id="map-container" className="map-container"></div>
      <p>Source: <a href="https://restcountries.com/v3.1/all">Lorem ipsum dolor</a></p>
      <Tooltip hoveredCountryData={hoveredCountryData} mousePosition={mousePosition} />
      <Key />
    </div>
  );
};

export default CountryData;

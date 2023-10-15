import React, { useState, useEffect } from 'react';

const CountryData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Define the API URL
    const apiUrl = 'https://restcountries.com/v3.1/all';

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Set the fetched data in the state
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty array [] ensures this effect runs once, similar to componentDidMount

  /*
----------------------------------------
Convert the data to JSON
----------------------------------------
*/
  return (
    <div>
      <h1>Fetched Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default CountryData

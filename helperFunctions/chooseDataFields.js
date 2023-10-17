/*
----------------------------------------
Organize the country data you read from the API by filtering out specific fields (name, population, etc)
----------------------------------------
*/
export const organizeCountryInfo = (countryData) => {
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
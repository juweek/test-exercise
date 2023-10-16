/*
----------------------------------------
Define population ranges and colors
----------------------------------------
*/
export const populationRanges = [0, 1000000, 10000000, 50000000, 100000000, Infinity];
export const colorScheme = ['#003f5c', '#444e86', '#955196', '#dd5182', '#ff6e54', '#ffa600'];

/*
----------------------------------------
Take in the population of choice and return the necessary color
----------------------------------------
*/
export const assignColor = (population) => {
  for (let i = 0; i < populationRanges.length - 1; i++) {
    const rangeStart = populationRanges[i];
    const rangeEnd = populationRanges[i + 1];
    if (population >= rangeStart && population < rangeEnd) {
      return colorScheme[i];
    }
  }
  return 'gray';
};

import { pick } from 'ramda';

const getOnlyNeededFields = (fields) =>
  pick(['date', 'total_cases', 'new_cases', 'total_deaths', 'new_deaths'], fields);

export const getCountriesList = (dataset) => {
  const countries = [];

  for (const region in dataset) {
    if (!region.startsWith('OWID')) {
      countries.push({ text: dataset[region].location, value: region.toLowerCase() });
    }
  }

  return countries;
};

const getCountriesData = (dataset) => {
  return Object.keys(dataset)
    .filter((region) => !region.startsWith('OWID'))
    .reduce(
      (countriesData, region) => ({
        ...countriesData,
        [region.toLowerCase()]: dataset[region].data?.map(getOnlyNeededFields) || [],
      }),
      {},
    );
};

const getWorldData = (dataset) => {
  return dataset.OWID_WRL?.data?.map(getOnlyNeededFields) || [];
};

export const formatDataset = (dataset) => {
  const world = getWorldData(dataset);
  const countries = getCountriesData(dataset);

  return {
    world,
    countries,
  };
};

export const generateNumbers = (amount) => Array.from({ length: amount }, (_, i) => i + 1);

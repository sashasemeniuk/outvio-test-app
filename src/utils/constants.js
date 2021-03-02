export const chartTypes = {
  REPORTED_CASES: 'reported_cases',
  RANKED: 'ranked',
};

export const valueTypes = {
  CASES: 'cases',
  DEATHS: 'deaths',
};

export const valueRanges = {
  TOTAL: 'total',
  NEW: 'new',
};

export const defaultChartOptions = {
  [chartTypes.REPORTED_CASES]: {
    valueType: valueTypes.CASES,
    valueRange: valueRanges.NEW,
  },
  [chartTypes.RANKED]: {
    valueType: valueTypes.CASES,
    valueRange: valueRanges.TOTAL,
    countriesAmount: 10,
  },
};

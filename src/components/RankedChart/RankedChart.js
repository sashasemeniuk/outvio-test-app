import React from 'react';
import PropTypes from 'prop-types';

import { Bar } from 'react-chartjs-2';
import { chartTypes, valueRanges, valueTypes } from '../../utils/constants';
import { tokenize } from '../../utils/helpers';

function RankedChart({ data, currentChartType, chartOptions, countriesLabels }) {
  const { valueRange, valueType, countriesAmount } = chartOptions[currentChartType];
  const valueField = `${valueRange}_${valueType}`;

  const formattedData = data[valueType]
    // eslint-disable-next-line react/prop-types
    .sort((a, b) => b.value - a.value)
    .slice(0, countriesAmount);

  const chartData = {
    labels: formattedData.map(({ country }) => countriesLabels[country]),
    datasets: [
      {
        label: tokenize(valueField),
        barPercentage: 0.5,
        barThickness: 8,
        maxBarThickness: 10,
        minBarLength: 2,
        backgroundColor: 'rgba(75,192,192,1)',
        data: formattedData.map(({ value }) => value),
      },
    ],
  };

  return <Bar data={chartData} />;
}

RankedChart.propTypes = {
  data: PropTypes.shape({
    [valueTypes.DEATHS]: PropTypes.arrayOf(
      PropTypes.shape({
        country: PropTypes.string,
        value: PropTypes.number,
      }),
    ),
  }).isRequired,
  currentChartType: PropTypes.oneOf([chartTypes.REPORTED_CASES, chartTypes.RANKED]),
  chartOptions: PropTypes.shape({
    valueType: PropTypes.oneOf([valueTypes.CASES, valueTypes.DEATHS]),
    valueRange: PropTypes.oneOf([valueRanges.NEW, valueRanges.TOTAL]),
    countriesAmount: PropTypes.number,
  }).isRequired,
  countriesLabels: PropTypes.instanceOf(Object).isRequired,
};

export default RankedChart;

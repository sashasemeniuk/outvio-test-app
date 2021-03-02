import React from 'react';
import PropTypes from 'prop-types';

import { Bar } from 'react-chartjs-2';
import { chartTypes, valueRanges, valueTypes, defaultChartColor, highlightedChartColor } from '../../utils/constants';
import { tokenize } from '../../utils/helpers';

function RankedChart({ data, currentChartType, chartOptions, countriesLabels, selectedCountry, isDarkMode }) {
  const { valueRange, valueType, countriesAmount } = chartOptions[currentChartType];
  const valueField = `${valueRange}_${valueType}`;

  const formattedData = data[valueType]
    // eslint-disable-next-line react/prop-types
    .sort((a, b) => b.value - a.value)
    .slice(0, countriesAmount);

  const backgroundColor = new Array(countriesAmount).fill(defaultChartColor);
  const selectedCountryCodes = formattedData.map(({ country }) => country);

  if (selectedCountry) {
    const index = selectedCountryCodes.findIndex((label) => label === selectedCountry);

    if (index !== -1) {
      backgroundColor[index] = highlightedChartColor;
    }
  }

  const chartData = {
    labels: formattedData.map(({ country }) => countriesLabels[country]),
    datasets: [
      {
        label: tokenize(valueField),
        barPercentage: 0.5,
        barThickness: 8,
        maxBarThickness: 10,
        minBarLength: 2,
        backgroundColor,
        data: formattedData.map(({ value }) => value),
      },
    ],
  };

  const fontColor = isDarkMode ? '#afbdd1' : 'black';

  const options = {
    scales: {
      xAxes: [
        {
          ticks: { fontColor },
        },
      ],
      yAxes: [
        {
          ticks: { fontColor },
        },
      ],
    },
    legend: {
      labels: {
        fontColor,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
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
  selectedCountry: PropTypes.string,
  isDarkMode: PropTypes.bool,
};

export default RankedChart;

import React from 'react';
import PropTypes from 'prop-types';

import { Line } from 'react-chartjs-2';
import { chartTypes, valueRanges, valueTypes, darkModeChartFont } from '../../utils/constants';
import { tokenize } from '../../utils/helpers';

function ReportedCasesChart({ data, currentChartType, chartOptions, isDarkMode }) {
  const { valueRange, valueType } = chartOptions[currentChartType];
  const valueField = `${valueRange}_${valueType}`;

  const formatData = () =>
    data.map(({ date, ...rest }) => ({ x: new Date(date), y: rest[valueField] })).filter((a) => !!a.y);

  const chartData = {
    datasets: [
      {
        label: tokenize(valueField),
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: formatData(),
      },
    ],
  };

  const fontColor = isDarkMode ? darkModeChartFont : 'black';

  const options = {
    scales: {
      xAxes: [
        {
          type: 'time',
          distribution: 'series',
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

  return <Line data={chartData} options={options} />;
}

ReportedCasesChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      total_cases: PropTypes.number,
      new_cases: PropTypes.number,
      total_deaths: PropTypes.number,
      new_deaths: PropTypes.number,
    }),
  ).isRequired,
  currentChartType: PropTypes.oneOf([chartTypes.REPORTED_CASES, chartTypes.RANKED]),
  chartOptions: PropTypes.shape({
    valueType: PropTypes.oneOf([valueTypes.CASES, valueTypes.DEATHS]),
    valueRange: PropTypes.oneOf([valueRanges.NEW, valueRanges.TOTAL]),
    countriesAmount: PropTypes.number,
  }).isRequired,
  isDarkMode: PropTypes.bool,
};

export default ReportedCasesChart;

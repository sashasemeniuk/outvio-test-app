import React from 'react';
import PropTypes from 'prop-types';

import { Line } from 'react-chartjs-2';

function ReportedCasesChart({ data }) {
  const formatData = () =>
    data.map(({ date, new_cases }) => ({ x: new Date(date), y: new_cases })).filter((a) => !!a.y);

  const chartData = {
    datasets: [
      {
        label: 'New Cases',
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

  const options = {
    scales: {
      xAxes: [
        {
          type: 'time',
          distribution: 'series',
        },
      ],
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
};

export default ReportedCasesChart;

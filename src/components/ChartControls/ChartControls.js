import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

import { chartTypes, valueRanges, valueTypes } from '../../utils/constants';
import { generateNumbers } from '../../utils/helpers';

function ChartControls({ type, changeChartOptions, chartOptions, countriesAmount }) {
  const chartControlsOptions = useMemo(
    () => ({
      [chartTypes.REPORTED_CASES]: {
        valueTypes: [
          { text: 'Cases', value: valueTypes.CASES },
          { text: 'Deaths', value: valueTypes.DEATHS },
        ],
        valueRanges: [
          { text: 'New', value: valueRanges.NEW },
          { text: 'Total', value: valueRanges.TOTAL },
        ],
      },
      [chartTypes.RANKED]: {
        valueTypes: [
          { text: 'Total Cases', value: valueTypes.CASES },
          { text: 'Total Deaths', value: valueTypes.DEATHS },
        ],
        countriesAmount: generateNumbers(countriesAmount).map((number) => ({ text: number, value: number })),
      },
    }),
    [countriesAmount],
  );

  if (type === chartTypes.REPORTED_CASES) {
    const dropdownOptions = chartControlsOptions[chartTypes.REPORTED_CASES];
    const currentChartOptions = chartOptions[chartTypes.REPORTED_CASES];

    return (
      <>
        <Dropdown
          selection
          options={dropdownOptions.valueTypes}
          value={currentChartOptions.valueType}
          onChange={(e, data) => changeChartOptions(chartTypes.REPORTED_CASES, { valueType: data.value })}
        />
        <Dropdown
          selection
          options={dropdownOptions.valueRanges}
          value={currentChartOptions.valueRange}
          onChange={(e, data) => changeChartOptions(chartTypes.REPORTED_CASES, { valueRange: data.value })}
        />
      </>
    );
  }

  if (type === chartTypes.RANKED) {
    const dropdownOptions = chartControlsOptions[chartTypes.RANKED];
    const currentChartOptions = chartOptions[chartTypes.RANKED];

    return (
      <>
        <Dropdown
          selection
          options={dropdownOptions.valueTypes}
          value={currentChartOptions.valueType}
          onChange={(e, data) =>
            changeChartOptions(chartTypes.RANKED, { valueType: data.value, valueRange: valueRanges.TOTAL })
          }
        />
        <Dropdown
          selection
          options={dropdownOptions.countriesAmount}
          value={currentChartOptions.countriesAmount}
          onChange={(e, data) => changeChartOptions(chartTypes.RANKED, { countriesAmount: data.value })}
        />
      </>
    );
  }

  return <div>{type}</div>;
}

ChartControls.propTypes = {
  type: PropTypes.oneOf(Object.values(chartTypes)).isRequired,
  changeChartOptions: PropTypes.func.isRequired,
  chartOptions: PropTypes.shape({
    valueType: PropTypes.oneOf([valueTypes.CASES, valueTypes.DEATHS]),
    valueRange: PropTypes.oneOf([valueRanges.NEW, valueRanges.TOTAL]),
    countriesAmount: PropTypes.number,
  }).isRequired,
  countriesAmount: PropTypes.number.isRequired,
};

export default ChartControls;

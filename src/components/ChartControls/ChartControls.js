import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

import { chartTypes } from '../../utils/constants';

function ChartControls({ type }) {
  if (type === chartTypes.REPORTED_CASES) {
    return (
      <>
        <Dropdown selection />
        <Dropdown selection />
      </>
    );
  }

  if (type === chartTypes.RANKED) {
    return (
      <>
        <Dropdown selection />
        <Dropdown selection />
      </>
    );
  }

  return <div>{type}</div>;
}

ChartControls.propTypes = {
  type: PropTypes.oneOf(Object.values(chartTypes)),
};

export default ChartControls;

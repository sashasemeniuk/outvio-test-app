import React, { useState } from 'react';

import { Dropdown, Container, Tab, Card } from 'semantic-ui-react';
import ReportedCasesChart from '../ReportedCasesChart/ReportedCasesChart';
import ChartControls from '../ChartControls/ChartControls';

import './style.sass';
import dataset from '../../assets/data/owid-covid-data.json';

import { formatDataset, getCountriesList } from '../../utils/helpers';
import { chartTypes, defaultChartOptions } from '../../utils/constants';

function App() {
  const data = formatDataset(dataset);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [chartOptions, setChartOptions] = useState({
    [chartTypes.REPORTED_CASES]: defaultChartOptions[chartTypes.REPORTED_CASES],
    [chartTypes.RANKED]: defaultChartOptions[chartTypes.RANKED],
  });

  const currentChartType = selectedTab === 0 ? chartTypes.REPORTED_CASES : chartTypes.RANKED;

  const panes = [
    {
      menuItem: 'Reported Cases',
      render: () => (
        <Tab.Pane>
          <ReportedCasesChart
            data={data.countries[selectedCountry] || data.world}
            currentChartType={currentChartType}
            chartOptions={chartOptions}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Ranked Charts',
      render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
    },
  ];

  const changeChartOptions = (chartType, newOptions) =>
    setChartOptions((prevState) => ({ ...prevState, [chartType]: { ...prevState[chartType], ...newOptions } }));

  const countriesList = getCountriesList(dataset);

  return (
    <div className="app">
      <Container text>
        <Card fluid>
          <Card.Content>
            <Dropdown
              placeholder="Select Country"
              fluid
              search
              selection
              options={[{ text: 'World', value: null }, ...countriesList]}
              onChange={(e, currentProps) => setSelectedCountry(currentProps.value)}
              value={selectedCountry}
            />
            <Tab
              panes={panes}
              onTabChange={(e, tabData) => setSelectedTab(tabData.activeIndex)}
              activeIndex={selectedTab}
            />
          </Card.Content>
          <Card.Content extra>
            <ChartControls
              type={currentChartType}
              chartOptions={chartOptions}
              changeChartOptions={changeChartOptions}
              countriesAmount={countriesList.length}
            />
          </Card.Content>
        </Card>
      </Container>
    </div>
  );
}

export default App;

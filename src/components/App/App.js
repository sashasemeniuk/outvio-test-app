import React, { useState } from 'react';

import { Dropdown, Container, Tab, Card } from 'semantic-ui-react';
import ReportedCasesChart from '../ReportedCasesChart/ReportedCasesChart';

import './style.sass';
import dataset from '../../assets/data/owid-covid-data.json';

import { formatDataset, getCountriesList } from '../../utils/helpers';

function App() {
  const data = formatDataset(dataset);

  const [selectedCountry, setSelectedCountry] = useState(null);

  const panes = [
    {
      menuItem: 'Reported Cases',
      render: () => (
        <Tab.Pane>
          <ReportedCasesChart data={data.countries[selectedCountry] || data.world} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Ranked Charts',
      render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
    },
  ];

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
              options={getCountriesList(dataset)}
              onChange={(e, currentProps) => setSelectedCountry(currentProps.value)}
              value={selectedCountry}
            />
            <Tab panes={panes} />
          </Card.Content>
          <Card.Content extra>Chart controls here</Card.Content>
        </Card>
      </Container>
    </div>
  );
}

export default App;

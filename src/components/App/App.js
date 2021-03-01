import React from 'react';

import './style.sass';
import { Dropdown, Container, Tab, Card } from 'semantic-ui-react';

export function App() {
  const panes = [
    {
      menuItem: 'Tab 1',
      render: () => <Tab.Pane>Tab 1 Content</Tab.Pane>,
    },
    {
      menuItem: 'Tab 2',
      render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
    },
  ];

  return (
    <div className="app">
      <Container text>
        <Card fluid>
          <Card.Content>
            <Dropdown placeholder="Select Country" fluid search selection />
            <Tab panes={panes} />
          </Card.Content>
          <Card.Content extra>Chart controls here</Card.Content>
        </Card>
      </Container>
    </div>
  );
}

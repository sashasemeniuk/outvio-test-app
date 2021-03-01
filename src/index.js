import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import 'semantic-ui-css/semantic.min.css';

import { App } from './components/';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

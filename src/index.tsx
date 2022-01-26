import './index.css';

import { initSentry } from '@core/sentry';
import { StorageProvider } from '@core/storage';
import { MuiThemeProvider } from '@material-ui/core';
import { Screens } from '@screens';
import { muiTheme } from '@styles';
import React, { FC } from 'react';
import ReactDOM from 'react-dom';

initSentry();

const App: FC = () => (
  <StorageProvider>
    <MuiThemeProvider theme={muiTheme}>
      <Screens />
    </MuiThemeProvider>
  </StorageProvider>
);

ReactDOM.render(<App />, document.getElementById('app'));

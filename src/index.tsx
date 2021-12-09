import './index.css';

import { initSentry } from '@core/sentry';
import { MuiThemeProvider } from '@material-ui/core';
import { NavPath } from '@screens';
import MapScreen from '@screens/Map';
import { PrivacyScreen } from '@screens/Privacy';
import { muiTheme } from '@styles';
import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

initSentry();

const AppContainer: FC = () => (
  <MuiThemeProvider theme={muiTheme}>
    <Router>
      <Routes>
        <Route path={NavPath.Root} element={<MapScreen />} />
        <Route path={NavPath.Privacy} element={<PrivacyScreen />} />
        <Route path="*" element={<Navigate replace to={NavPath.Root} />} />
      </Routes>
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(<AppContainer />, document.getElementById('app'));

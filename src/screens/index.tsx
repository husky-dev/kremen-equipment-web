import React, { FC } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import MapScreen from './Map';
import PrivacyScreen from './Privacy';
import RenderScreen from './Render';
import { routes } from './routes';

export const Screens: FC = () => (
  <Router>
    <Routes>
      <Route path={routes.index} element={<MapScreen />} />
      <Route path={routes.privacy} element={<PrivacyScreen />} />
      <Route path={routes.render} element={<RenderScreen />} />
      <Route path="*" element={<Navigate replace to={routes.index} />} />
    </Routes>
  </Router>
);

import { Paper } from '@material-ui/core';
import { Markdown } from 'components/Common';
import React, { FC } from 'react';
import { Styles } from 'styles';

import content from './assets/content.md';

export const PrivacyScreen: FC = () => (
  <Paper style={styles.content}>
    <Markdown>{content.html}</Markdown>
  </Paper>
);

const styles: Styles = {
  container: {},
  content: {
    maxWidth: 992,
    margin: '40px auto',
    padding: '20px',
  },
};

export default PrivacyScreen;

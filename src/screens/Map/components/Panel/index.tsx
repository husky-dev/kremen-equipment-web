import { Text, View } from '@components/Common';
import { EquipmentMachine, EquipmentMovementLogPeriod } from '@core';
import { Checkbox, FormControlLabel, FormLabel, Paper } from '@material-ui/core';
import { colors, ms, Styles, ViewStyleProps } from '@styles';
import { uniq } from 'lodash';
import React, { ChangeEvent, FC } from 'react';

import { machinesCountOfCompany, machinesToCompanies } from './utils';

interface Props extends ViewStyleProps {
  movementPeriod: EquipmentMovementLogPeriod;
  machines: EquipmentMachine[];
  selectedCompanies?: string[];
  onSelectedCompaniesChange?: (value: string[]) => void;
  onMovementPeriodChange: (value: EquipmentMovementLogPeriod) => void;
}

export const MapPanel: FC<Props> = ({
  style,
  machines,
  movementPeriod,
  selectedCompanies,
  onSelectedCompaniesChange,
  onMovementPeriodChange,
}) => {
  const companies = machinesToCompanies(machines);

  const isCompanySelected = (val: string) => (!selectedCompanies ? true : !!selectedCompanies.find(itm => itm === val));

  const handleSelectedCompanyChecked = (company: string) => (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (!onSelectedCompaniesChange) return;
    if (!selectedCompanies)
      return onSelectedCompaniesChange(companies.filter(itm => itm.name !== company).map(itm => itm.name));
    if (checked) {
      onSelectedCompaniesChange(uniq([...selectedCompanies, company]));
    } else {
      onSelectedCompaniesChange(selectedCompanies.filter(itm => itm !== company));
    }
  };

  return (
    <Paper style={ms(styles.container, style)}>
      <FormLabel component="legend">{`Підприємства:`}</FormLabel>
      {companies.map(itm => (
        <FormControlLabel
          key={itm.name}
          control={
            <Checkbox
              style={ms(styles.item, { color: itm.color })}
              checked={isCompanySelected(itm.name)}
              name={itm.name}
              onChange={handleSelectedCompanyChecked(itm.name)}
            />
          }
          label={<span style={ms(styles.label)}>{`${itm.name} (${machinesCountOfCompany(machines, itm.name)})`}</span>}
        />
      ))}
      <FormLabel component="legend">{`Теплова карта руху:`}</FormLabel>
      <View row>
        <FormControlLabel
          control={
            <Checkbox
              style={ms(styles.item)}
              checked={movementPeriod === 'hour'}
              name={'hour'}
              onChange={() => onMovementPeriodChange('hour')}
            />
          }
          label={<span style={ms(styles.label)}>{`За годину`}</span>}
        />
        <FormControlLabel
          control={
            <Checkbox
              style={ms(styles.item)}
              checked={movementPeriod === 'day'}
              name={'day'}
              onChange={() => onMovementPeriodChange('day')}
            />
          }
          label={<span style={ms(styles.label)}>{`За добу`}</span>}
        />
      </View>
      <Text style={styles.version}>{`v${APP_VERSION}`}</Text>
    </Paper>
  );
};

const styles: Styles = {
  container: {
    backgroundColor: colors.withAlpha('#ffffff', 0.7),
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    display: 'flex',
    flexDirection: 'column',
  },
  item: {},
  label: {},
  version: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '10px',
  },
};

export type MapPanelProps = Props;
export default MapPanel;

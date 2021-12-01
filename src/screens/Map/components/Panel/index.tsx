import React, { FC, ChangeEvent } from 'react';
import { Styles, ViewStyleProps, ms, colors } from '@styles';
import { Checkbox, FormControlLabel, FormLabel, Paper } from '@material-ui/core';
import { EquipmentMachine } from '@core';
import { machinesToCompanies, machinesCountOfCompany } from '@core';
import { uniq } from 'lodash';
import { Text } from '@components/Common';

interface Props extends ViewStyleProps {
  machines: EquipmentMachine[];
  selectedCompanies?: string[];
  onSelectedCompaniesChange?: (value: string[]) => void;
}

export const MapPanel: FC<Props> = ({ style, machines, selectedCompanies, onSelectedCompaniesChange }) => {
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
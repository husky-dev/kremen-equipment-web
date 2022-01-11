import { EquipmentMachine } from '@core';
import { sortBy, uniqBy } from 'lodash';

export const machinesToCompanies = (items: EquipmentMachine[]) => {
  const companies = uniqBy(
    items.map(({ company, color }) => ({ name: company, color })),
    'name',
  );
  return sortBy(companies, 'name');
};

export const machinesCountOfCompany = (items: EquipmentMachine[], company: string): number =>
  items.filter(itm => itm.company === company).length;

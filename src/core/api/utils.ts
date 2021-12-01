import { isUnknownDict } from '@utils';
import { uniqBy, sortBy } from 'lodash';

import { EquipmentMachine } from './types';

// API

interface HttpReqParams {
  [key: string]: undefined | string | number;
}

type HttpReqMethod = 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch';

export interface ApiReqOpt {
  method?: HttpReqMethod;
  path: string;
  params?: HttpReqParams;
}

export interface ApiRespErr {
  error: string;
}

export interface ApiErr {
  status: number;
  msg: string;
}

export const isApiRespErr = (val: unknown): val is ApiRespErr => isUnknownDict(val) && typeof val.error === 'string';

export const getErrFromResp = <T>(status: number, data: T): ApiErr | undefined => {
  if (status === 200) {
    return undefined;
  }
  if (isApiRespErr(data)) {
    return { status, msg: data.error };
  }
  if (status > 299) {
    return { status, msg: `Status code ${status}` };
  }
  return undefined;
};

// Machines

export const machinesToCompanies = (items: EquipmentMachine[]) => {
  const companies = uniqBy(
    items.map(({ company, color }) => ({ name: company, color })),
    'name',
  );
  return sortBy(companies, 'name');
};

export const machinesCountOfCompany = (items: EquipmentMachine[], company: string): number =>
  items.filter(itm => itm.company === company).length;

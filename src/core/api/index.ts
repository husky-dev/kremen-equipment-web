import { EquipmentMachine, log } from '@core';
import { genRandId } from '@utils';
import axios from 'axios';

import { ApiReqOpt, getErrFromResp } from './utils';

export const getApiRoot = () => {
  switch (APP_ENV) {
    case 'loc':
      return {
        api: 'http://localhost:8080',
        ws: 'ws://localhost:8080',
      };
    default:
      return {
        api: 'https://api.kremen.dev',
        ws: 'wss://api.kremen.dev',
      };
  }
};

interface EquipmentLogQueryOpt {
  start: number;
  end: number;
  eid?: string;
}

export type EquipmentLogRecord = [string, number, number, number];

export type EquipmentMovementLogPeriod = 'day' | 'hour';

const getApi = () => {
  const apiRoot = getApiRoot().api;

  const apiReq = async <T>(opt: ApiReqOpt): Promise<T> => {
    const { path, method = 'get', params } = opt;
    const reqUrl = `${apiRoot}/${path}`;
    const id = genRandId(5);
    const msg = `req id=${id}, method=${method}, path=${path}, params=${JSON.stringify(params)}`;
    log.debug(msg);
    const resp = await axios({ method, url: reqUrl, params });
    log.debug(`${msg} done`);
    const { status } = resp;
    const data = resp.data as unknown as T;
    const err = getErrFromResp(status, data);
    if (err) {
      throw err;
    }
    return data;
  };

  return {
    equipment: {
      list: async (): Promise<EquipmentMachine[]> => apiReq<EquipmentMachine[]>({ path: `equipment` }),
      log: async (opt: EquipmentLogQueryOpt) =>
        apiReq<EquipmentLogRecord[]>({ path: 'equipment/log', params: { format: 'array', ...opt } }),
    },
  };
};

export const api = getApi();

export * from './types';
export * from './utils';

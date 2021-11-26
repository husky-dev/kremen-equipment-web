import { getStorageParam } from '@core';
import { isStrOrUndef, Log } from '@utils';
import { genId } from '@utils';

import getUserLocale, { getUserLocales } from './locales';

const log = Log('core.analytics');

const enabled = APP_ENV !== 'dev';

const uidStorage = getStorageParam('uid', isStrOrUndef);

// User

const getUID = (): string => {
  const storedUid = uidStorage.get();
  if (storedUid) {
    return storedUid;
  }
  const newUid = genId();
  uidStorage.set(newUid);
  return newUid;
};

/**
 * Unique User ID
 */
export const uid = getUID();

const initUser = () => {
  if (!enabled) {
    return;
  }
  log.info('analytics enabled');
  const locale = getUserLocale();
  const locales = getUserLocales();
  log.debug('locale=', locale, ', locales=', locales);
};

initUser();

export const track = (event: string, params?: Record<string, string | number | boolean>) => {
  if (!enabled) {
    return;
  }
  log.debug('track event=', event, ', params=', params);
};

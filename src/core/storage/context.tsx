import { errToStr } from '@utils';
import React, { createContext, FC, useContext, useEffect, useState } from 'react';

import { api, EquipmentMachine, isEquipmentMachineArrOrUndef } from '../api';
import { Log } from '../log';
import { useWebScockets } from '../ws';
import { getStorageParam } from './utils';

const log = Log('core.storage');

interface StorageContext {
  items: EquipmentMachine[];
}

const StorageContext = createContext<StorageContext>({
  items: [],
});

export const useStorage = () => useContext(StorageContext);

const itemsStorage = getStorageParam<EquipmentMachine[] | undefined>('items', isEquipmentMachineArrOrUndef);

export const StorageProvider: FC = ({ children }) => {
  const [items, setItems] = useState<EquipmentMachine[]>(itemsStorage.get() || []);

  // Data updates

  useEffect(() => {
    updateData();
  }, []);

  const updateData = async () => {
    try {
      log.debug('updating data');
      const newItems = await api.equipment.list();
      log.debug('updating data done');
      setAndSaveItems(newItems);
    } catch (err: unknown) {
      log.err('updating data err', { err: errToStr(err) });
    }
  };

  // WebSockets updates

  const [itemsUpdate, setItemsUpdate] = useState<Partial<EquipmentMachine>[]>([]);

  useEffect(() => {
    const updatedItems = items.map(itm => {
      const update = itemsUpdate.find(upd => upd.eid === itm.eid);
      return update ? { ...itm, ...update } : itm;
    });
    setAndSaveItems(updatedItems);
  }, [itemsUpdate]);

  useWebScockets({
    onMessage: msg => {
      if (msg.type === 'items') {
        log.debug('ws items update', { count: msg.data.length });
        setItemsUpdate(msg.data);
      }
    },
  });

  // Utils

  const setAndSaveItems = (val: EquipmentMachine[]) => {
    setItems(val);
    itemsStorage.set(val);
  };

  return <StorageContext.Provider value={{ items }}>{children}</StorageContext.Provider>;
};

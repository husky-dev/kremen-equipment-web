/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocTitle, View } from '@components/Common';
import { EquipmentMap } from '@components/Equipment';
import { ServicesAppBar } from '@components/Services';
import { coordinates, EquipmentMovementLogPeriod, log } from '@core';
import { api } from '@core/api';
import { getStorageParam, useStorage } from '@core/storage';
import { fullScreen, ms, Styles, ViewStyleProps } from '@styles';
import { dayMs, errToStr, hourMs, isNumOrUndef } from '@utils';
import React, { FC, useEffect, useState } from 'react';

import MapPanel from './components/Panel';

type Props = ViewStyleProps;

const zoomStorage = getStorageParam<number | undefined>('zoom', isNumOrUndef);

export const MapScreen: FC<Props> = ({ style }) => {
  const { items } = useStorage();
  const [selectedCompanies, setSelectedCompanies] = useState<string[] | undefined>();

  const [movementLog, setMovementLog] = useState<[number, number][]>([]);
  const [movementPeriod, setMovementPeriod] = useState<EquipmentMovementLogPeriod>('hour');

  useEffect(() => {
    (async () => {
      try {
        log.debug('getting movement log');
        const end = new Date().getTime();
        const start = end - (movementPeriod === 'day' ? dayMs : hourMs);
        const newMovementLog = await api.equipment.log({ start, end });
        log.debug('getting movement log done', { count: newMovementLog.length });
        setMovementLog(newMovementLog.map(itm => [itm[1], itm[2]]));
      } catch (err: unknown) {
        log.err('getting movement log err', { msg: errToStr(err) });
      }
    })();
  }, [movementPeriod]);

  return (
    <View style={ms(styles.container, style)}>
      <DocTitle title={APP_TITLE} />
      <ServicesAppBar />
      <MapPanel
        style={styles.panel}
        movementPeriod={movementPeriod}
        machines={items}
        selectedCompanies={selectedCompanies}
        onSelectedCompaniesChange={setSelectedCompanies}
        onMovementPeriodChange={val => setMovementPeriod(val)}
      />
      <EquipmentMap
        style={styles.map}
        items={items}
        defZoom={zoomStorage.get()}
        defCenter={coordinates.kremen}
        companies={selectedCompanies}
        heatmap={movementLog}
        onZoomChange={val => zoomStorage.set(val)}
      />
    </View>
  );
};

const styles: Styles = {
  container: {
    ...fullScreen,
    overflow: 'hidden',
  },
  panel: {
    position: 'absolute',
    top: 14 + 60,
    left: 14,
    minWidth: 260,
    zIndex: 2,
    overflowY: 'scroll',
  },
  map: {
    ...fullScreen,
    zIndex: 1,
  },
};

export default MapScreen;

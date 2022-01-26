import { View } from '@components/Common';
import { EquipmentMap } from '@components/Equipment';
import { api, coordinates, EquipmentMachine } from '@core';
import { fullScreen, ms, Styles, ViewStyleProps } from '@styles';
import React, { FC, useEffect, useState } from 'react';

type Props = ViewStyleProps;

export const RenderScreen: FC<Props> = ({ style }) => {
  const [items, setItems] = useState<EquipmentMachine[]>([]);

  useEffect(() => {
    (async () => {
      const newItems = await api.equipment.list();
      setItems(newItems);
    })();
  }, []);

  return (
    <View style={ms(styles.container, style)}>
      <EquipmentMap style={styles.map} controls={false} items={items} defCenter={coordinates.kremen} />
    </View>
  );
};

const styles: Styles = {
  container: {
    ...fullScreen,
    overflow: 'hidden',
  },
  map: {
    ...fullScreen,
    zIndex: 1,
  },
};

export type RenderScreenProps = Props;
export default RenderScreen;

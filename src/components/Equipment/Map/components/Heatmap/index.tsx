import React, { FC, useMemo } from 'react';
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer';

interface Props {
  data: [number, number][];
}

export const EquipmentHeatmap: FC<Props> = ({ data }) => {
  const latLngArr = useMemo(() => data.map(itm => new google.maps.LatLng(itm[0], itm[1])), [data]);
  return <HeatmapLayer data={latLngArr} />;
};

export type EquipmentHeatmapProps = Props;
export default EquipmentHeatmap;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonMap, ControlRoundBtn, View } from '@components/Common';
import { log } from '@core';
import { EquipmentMachine } from '@core/api';
import { fullScreen, ms, Styles, ViewStyleProps } from '@styles';
import { LatLng } from '@utils';
import React, { FC, useRef, useState } from 'react';
import { GoogleMap } from 'react-google-maps';

import EquipmentHeatmap from './components/Heatmap';
import EquipmentMarker from './components/Marker';

interface Props extends ViewStyleProps {
  defCenter?: LatLng;
  defZoom?: number;
  items: EquipmentMachine[];
  companies?: string[];
  heatmap?: [number, number][];
  onZoomChange?: (val: number) => void;
}

export const EquipmentMap: FC<Props> = ({
  style,
  defZoom = 14,
  defCenter,
  items,
  companies,
  heatmap,
  onZoomChange,
}) => {
  const [selectedItem, setSelectedItem] = useState<EquipmentMachine | undefined>(undefined);

  const mapRef = useRef<GoogleMap>(null);

  const [center, setCenter] = useState<LatLng | undefined>(defCenter);
  const [zoom, setZoom] = useState<number>(defZoom);

  const handleMapZoomChanged = () => {
    if (!mapRef.current) {
      return;
    }
    const zoom = mapRef.current.getZoom();
    if (isNaN(zoom)) {
      return;
    }
    log.debug(`zoom changed: ${zoom}`);
    onZoomChange && onZoomChange(zoom);
  };

  const handleMapCenterChanged = () => {
    if (!mapRef.current) {
      return;
    }
    log.debug('cener changed');
    const coord = mapRef.current.getCenter();
    const lat = coord.lat();
    const lng = coord.lng();
    setCenter({ lat, lng });
  };

  const handleMapClick = () => {
    log.debug('map click');
  };

  const handleZoomInPress = () => {
    if (mapRef.current) {
      setZoomAndSave(mapRef.current.getZoom() + 1);
    }
  };

  const handleZoomOutPress = () => {
    if (mapRef.current) {
      setZoomAndSave(mapRef.current.getZoom() - 1);
    }
  };

  const setZoomAndSave = (val: number) => {
    let newVal = val;
    if (newVal < 0) {
      newVal = 0;
    }
    if (newVal > 22) {
      newVal = 22;
    }
    setZoom(newVal);
    onZoomChange && onZoomChange(zoom);
  };

  const filterSelectedCompaniesFn = (itm: EquipmentMachine) => (!companies ? true : companies.includes(itm.company));

  // Render

  const renderItemMarker = (item: EquipmentMachine) => {
    const zIndex = 0;
    const opacity = 1;
    return (
      <EquipmentMarker
        key={`item-${item.eid}`}
        item={item}
        zIndex={zIndex}
        size={46}
        opacity={opacity}
        popupOpen={!!selectedItem && selectedItem.eid === item.eid}
        onClick={() => setSelectedItem(item)}
        onPopupClose={() => setSelectedItem(undefined)}
      />
    );
  };

  const mapOpt: google.maps.MapOptions = {
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: false,
    styles: [
      {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  return (
    <View style={ms(styles.container, style)}>
      <CommonMap
        mapRef={mapRef}
        style={styles.map}
        defaultOptions={mapOpt}
        defaultZoom={zoom}
        defaultCenter={center}
        center={center}
        zoom={zoom}
        onZoomChanged={handleMapZoomChanged}
        onCenterChanged={handleMapCenterChanged}
        onClick={handleMapClick}
      >
        {items.filter(filterSelectedCompaniesFn).map(renderItemMarker)}
        {!!heatmap && <EquipmentHeatmap data={heatmap} />}
      </CommonMap>
      <View style={styles.controlsPanel}>
        <ControlRoundBtn style={styles.controlsPanelBtn} icon="plus" onClick={handleZoomInPress} />
        <ControlRoundBtn style={styles.controlsPanelBtn} icon="minus" onClick={handleZoomOutPress} />
      </View>
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
  controlsPanel: {
    position: 'absolute',
    right: 14,
    bottom: 24,
    zIndex: 2,
  },
  controlsPanelBtn: {
    marginTop: 4,
    marginBottom: 4,
  },
};

export default EquipmentMap;

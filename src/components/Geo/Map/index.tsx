import { log } from '@core';
import { ViewStyleProps } from '@styles';
import React, { FC, MutableRefObject, RefObject } from 'react';
import { GoogleMap, GoogleMapProps, withGoogleMap, withScriptjs } from 'react-google-maps';

const apiKey = typeof MAPS_API_KEY !== 'undefined' && MAPS_API_KEY ? MAPS_API_KEY : null;
if (apiKey) {
  log.debug(`GoogleMap key`, { key: apiKey });
} else {
  log.err('emty GoogleMap key');
}

interface MapProps extends GoogleMapProps {
  mapRef?: RefObject<GoogleMap> | ((instance: GoogleMap | null) => void) | MutableRefObject<GoogleMap | null>;
}

const Map: FC<MapProps> = ({ mapRef, ...props }) => <GoogleMap ref={mapRef} {...props} />;

const WrappedMap = withScriptjs(withGoogleMap(Map));

type WrappedMapProps = MapProps & ViewStyleProps;

const WrappedMapWithDefault: FC<WrappedMapProps> = ({ style, ...props }) => {
  return (
    <WrappedMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?libraries=visualization&key=${apiKey}`}
      loadingElement={<div style={style} />}
      containerElement={<div style={style} />}
      mapElement={<div style={style} />}
      {...props}
    />
  );
};

export default WrappedMapWithDefault;

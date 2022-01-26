import { config } from '@core/config';
import { ViewStyleProps } from '@styles';
import React, { FC, MutableRefObject, RefObject } from 'react';
import { GoogleMap, GoogleMapProps, withGoogleMap, withScriptjs } from 'react-google-maps';

interface MapProps extends GoogleMapProps {
  mapRef?: RefObject<GoogleMap> | ((instance: GoogleMap | null) => void) | MutableRefObject<GoogleMap | null>;
}

const Map: FC<MapProps> = ({ mapRef, ...props }) => <GoogleMap ref={mapRef} {...props} />;

const WrappedMap = withScriptjs(withGoogleMap(Map));

type WrappedMapProps = MapProps & ViewStyleProps;

const WrappedMapWithDefault: FC<WrappedMapProps> = ({ style, ...props }) => {
  return (
    <WrappedMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?libraries=visualization&key=${config.google.maps.apiKey}`}
      loadingElement={<div style={style} />}
      containerElement={<div style={style} />}
      mapElement={<div style={style} />}
      {...props}
    />
  );
};

export default WrappedMapWithDefault;

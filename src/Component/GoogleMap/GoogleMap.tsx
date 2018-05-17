import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import {
  library
} from '@fortawesome/fontawesome-svg-core';
interface IProps {
  data: any
}

library.add(faMapMarkerAlt);

const Marker = (props:any) => <div><FontAwesomeIcon
  icon={['fas', 'map-marker-alt']}
  fixedWidth
  size="4x"
/></div>

export const GoogleMap = (props: IProps) => {

  return (
    <div style={{ height: '300px', width: '500px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_KEY }}
        center={{ lat: Number(props.data.lat), lng: Number(props.data.lng) }}
        zoom={11}
      >
      <Marker 
        lat={Number(props.data.lat)}
        lng={Number(props.data.lng)}
      />
      </GoogleMapReact>
    </div>
  );
}
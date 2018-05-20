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
  data: {
    lat: string,
    lng: string
  }
}

library.add(faMapMarkerAlt);

const Marker = (props:any) => <div className="marker"><FontAwesomeIcon
  icon={['fas', 'map-marker-alt']}
  fixedWidth
  size="4x"
/></div>

export const GoogleMap = (props: IProps) => {

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyD7iFr-OKYYm_ehoR7sfOukE4eIRXNIGlM"}}
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
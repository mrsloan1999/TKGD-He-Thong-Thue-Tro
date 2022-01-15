import * as React from 'react';
import ReactMapGL , {Marker} from 'react-map-gl';
import {MarkerIcon} from './marker';

function Map() {
  const [viewport, setViewport] = React.useState({
    latitude: 10.798097,
    longitude: 106.6616635,
    zoom: 14
  });

  const marker = {
    id: "tenerife-2",
    latitude: 10.798097,
    longitude: 106.6616635
  }

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="1000px"
      onViewportChange={(viewport) => setViewport(viewport)}
    >
    <Marker key={marker.id} {...marker} offsetLeft={-17.5} 
            offsetTop={-38}>
            <MarkerIcon />
          </Marker>
          </ReactMapGL>
  );
}

export default Map;
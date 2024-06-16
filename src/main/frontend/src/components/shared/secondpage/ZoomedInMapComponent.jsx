import React from 'react'
import {Map, MapMarker, Polygon, Polyline} from 'react-kakao-maps-sdk'
import styled from 'styled-components'
import {Colors} from '../../../type/Colors'

export const ZoomedInMapComponent = ({
  center,
  markers,
  paths,
  setOpenMarkerIndex,
  openMarkerIndex,
  setMarkerPosition,
  setMapLevel,
  updatedMapLevel,
  gangnamArea,
}) => {
  return (
    <ZoomedInMap center={center} draggable={false} level={7}>
      <Polygon
        key={`area-${gangnamArea.name}`}
        path={gangnamArea.path}
        strokeWeight={7}
        strokeColor={Colors.BORDER_PINK}
        strokeOpacity={1}
        fillColor={Colors.BASIC_WHITE}
        fillOpacity={0.8}
      />
      {markers.map((marker, index) => (
        <MapMarker
          key={index}
          position={marker.position}
          image={{
            src: `${marker.image}`,
            size: {width: 64, height: 69},
            options: {offset: {x: 32, y: 69}},
          }}
          onClick={() => {
            setOpenMarkerIndex(index === openMarkerIndex ? null : index)
            setMarkerPosition(marker.position)
            setMapLevel(updatedMapLevel)
          }}
        />
      ))}
      <Polyline
        path={paths}
        strokeWeight={20}
        strokeColor='#FC609F'
        strokeOpacity={1}
        strokeStyle='solid'
      />
    </ZoomedInMap>
  )
}

const ZoomedInMap = styled(Map)`
  width: 100%;
  height: 100vh;
  background-color: #f7eef3;
`

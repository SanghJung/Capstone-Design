import React from 'react'
import {Map, Polygon, CustomOverlayMap} from 'react-kakao-maps-sdk'
import styled from 'styled-components'
import {Colors} from '../../../type/Colors'
import getCenteroid from '../../../utils/getCentroid'

export const SeoulComponent = ({
  center,
  level,
  onMouseMove,
  outerRectanglePath,
  areas,
  setAreas,
  setClickedArea,
}) => {
  return (
    <Seoul center={center} level={level} onMouseMove={onMouseMove}>
      <Polygon
        path={outerRectanglePath}
        strokeWeight={2}
        strokeColor={Colors.strokePink}
        fillColor={Colors.fillPink}
        fillOpacity={1}
      />
      {areas.map((area, index) => (
        <Polygon
          key={`area-${area.name}`}
          path={area.path}
          strokeWeight={3}
          strokeColor={Colors.mapLinePink}
          strokeOpacity={1}
          fillColor={
            area.isMouseover || area.isOnClick
              ? Colors.mapFillPink
              : Colors.white
          }
          fillOpacity={1}
          onMouseover={() =>
            setAreas((prev) =>
              prev.map((item, i) =>
                i === index ? {...item, isMouseover: true} : item
              )
            )
          }
          onMouseout={() =>
            setAreas((prev) =>
              prev.map((item, i) =>
                i === index ? {...item, isMouseover: false} : item
              )
            )
          }
          onClick={(polygon, mouseEvent) => {
            setClickedArea({
              position: {
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
              },
              area: Math.floor(polygon.getArea()),
              name: area.name,
            })
            setAreas((previous) =>
              previous.map((item, i) =>
                i === index
                  ? {...item, isOnClick: true}
                  : {...item, isOnClick: false}
              )
            )
          }}
        />
      ))}
      {areas.map((area) => (
        <CustomOverlayMap
          key={`overlay-${area.name}`}
          position={getCenteroid(area.path)}
        >
          <StyledSpan>{area.name}</StyledSpan>
        </CustomOverlayMap>
      ))}
    </Seoul>
  )
}

const Seoul = styled(Map)`
  width: 100%;
  height: 800px;
  background-color: ${Colors.backgroundPink};
`

const StyledSpan = styled.span`
  font-size: 14px;
  color: ${Colors.BASIC_GRAY};
  font-weight: 700;
`

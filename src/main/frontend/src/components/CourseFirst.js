import {useEffect, useState} from 'react'
import {Container, Col, Row} from 'react-bootstrap'
import {Map, Polygon, CustomOverlayMap} from 'react-kakao-maps-sdk'
import {AreaBadge} from './shared/firstpage/Areabadge'
import {OptionBar} from './shared/firstpage/OptionBar'
import {OptionBarContainer} from './shared/firstpage/OptionBarContainer'
import {fetchPlaces} from '../api/getAllData'
import {placeDataState} from '../state/places'
import {useRecoilState} from 'recoil'
import styled from 'styled-components'
import {Areas} from './shared/data/areas'
import {center, level} from './shared/data/default_map'
import {outerRectanglePath} from './shared/data/outerRectangle'

export const CourseFirst = () => {
  const [placeData, setPlaceData] = useRecoilState(placeDataState)
  const [, setFilteredPlaces] = useState([])
  const [areas, setAreas] = useState(Areas)
  const [, setMousePosition] = useState({lat: 0, lng: 0})
  const [, setSelectedPlace] = useState(null)
  const [, setSelectedPlaceLocal] = useState(null)
  const [clickedArea, setClickedArea] = useState({
    area: 38731528,
    name: '강남구',
    position: {lat: 37.51507332009245, lng: 127.04452102475092},
  })

  const onMouseMove = (_map, mouseEvent) => {
    setMousePosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    })
  }

  useEffect(() => {
    fetchPlaces()
      .then((data) => {
        const newData = {
          id: data.map((v) => v.id),
          places: data.map((v) => v.placeName),
          categories: data.map((v) => v.categoryName),
          index: data.map((v) => v.place_type),
          positions: data.map((v) => ({
            lat: v.coord.y,
            lng: v.coord.x,
          })),
          addresses: data.map((v) => v.addressName),
          phoneNumber: data.map((v) => v.phoneNumber),
          placeUrl: data.map((v) => v.thumbnailUrl),
        }
        setPlaceData(newData)
      })
      .catch((e) => console.log('error :' + e))
  }, [setPlaceData])

  useEffect(() => {
    const filterPlaces = () => {
      const filteredIndexes = placeData.addresses
        .map((location, index) => {
          if (location.includes('강남구')) return index
        })
        .filter((index) => index !== undefined)
      const filtered = filteredIndexes.map((index) => placeData.places[index])
      setFilteredPlaces(filtered)
    }
    filterPlaces()
  }, [placeData])

  useEffect(() => {
    setSelectedPlace(null)
    setSelectedPlaceLocal(null)
  }, [clickedArea])

  return (
    <>
      <StyledContainer>
        <Seoul center={center} level={level} onMouseMove={onMouseMove}>
          <Polygon
            path={outerRectanglePath}
            strokeWeight={2}
            strokeColor={'#FF0000'}
            fillColor={'#FBF3F7'}
            fillOpacity={1}
          />
          {areas.map((area, index) => (
            <Polygon
              key={`area-${area.name}`}
              path={area.path}
              strokeWeight={3}
              strokeColor={'#FACCCA'}
              strokeOpacity={1}
              fillColor={
                area.isMouseover || area.isOnClick ? '#F85F9C' : '#fff'
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
                setAreas((prev) =>
                  prev.map((item, i) =>
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
              position={getCentroid(area.path)}
            >
              <span style={{fontSize: '10px'}}>{area.name}</span>
            </CustomOverlayMap>
          ))}
        </Seoul>
      </StyledContainer>
      <StyledComponent>
        <Row>
          <Col>
            <StyledRow>
              <h1 style={{fontWeight: '700'}}>
                반갑습니다, <br />
                <span style={{color: '#FC609F'}}>봄이 그렇게도 좋냐</span>님.
                <br />
                어디를 방문하실 예정인가요?
              </h1>
              <SubTitle>
                추천 AI가 추천 경로를 제공할 수 있도록 아래 지도에서 방문할 '구'
                <br />를 선택해주시고 오른쪽 팝업창에서 '특정 장소'를
                선택해주세요.
              </SubTitle>
            </StyledRow>
            <OptionBar />
          </Col>
          <Col>
            <Row style={{overflow: 'visible', position: 'relative'}}>
              <ClickableCol>
                <OptionBarContainer
                  clickedArea={clickedArea}
                  data={placeData}
                  setSelectedPlace={setSelectedPlace}
                  setSelectedPlaceLocal={setSelectedPlaceLocal}
                />
              </ClickableCol>
              <Col style={{flexGrow: 1}}>
                <AreaBadge clickedArea={clickedArea} />
              </Col>
            </Row>
          </Col>
        </Row>
      </StyledComponent>
    </>
  )
}

const Seoul = styled(Map)`
  width: 100%;
  height: 800px;
  backgroundcolor: #f7eef3;
`

const StyledContainer = styled(Container)`
  position: relative;
  height: 200px;
  z-index: 1;
  background: none;
`

const StyledComponent = styled.div`
  position: absolute;
  top: 10px;
  left: 300px;
  z-index: 10;
  pointer-events: none;
`

const StyledRow = styled(Row)`
  margin-bottom: 100px;
`

const ClickableCol = styled(Col)`
  pointer-events: auto;
  backgroundcolor: white;
  opacity: 80;
  flex-grow: 4;
  position: relative;
  borderradius: 20px;
  padding: 25px;
  z-index: 20;
`

const SubTitle = styled.p`
  font-weight: 600;
  color: grey;
  font-size: 20px;
`

function getCentroid(coordinates) {
  var xSum = 0
  var ySum = 0

  const numPoints = coordinates.length

  coordinates.forEach((point) => {
    xSum += point.lat
    ySum += point.lng
  })

  return {lat: xSum / numPoints, lng: ySum / numPoints}
}

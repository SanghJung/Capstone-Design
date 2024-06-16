import {Map, MapMarker, Polyline, CustomOverlayMap} from 'react-kakao-maps-sdk'
import {useState, useEffect} from 'react'
import {Container, Col, Row, Button, ListGroup} from 'react-bootstrap'
import styled from 'styled-components'
import {BiSolidCategoryAlt} from 'react-icons/bi'
import {FaLocationDot} from 'react-icons/fa6'
import {MdStarRate} from 'react-icons/md'
import {CiShop} from 'react-icons/ci'
import getCentroid from '../../utils/getCentroid'
import axios from 'axios'
import {placeDataState} from '../../state/places'
import {useRecoilState} from 'recoil'
import {fetchPlaces} from '../../api/getAllData'
import {FaSquarePhone} from 'react-icons/fa6'
import {FaMap} from 'react-icons/fa'
import {IoMdTime} from 'react-icons/io'
import {MdRestaurantMenu} from 'react-icons/md'
import {markersState} from '../../state/markers'
import {categoryMap} from '../../type/categoryType'

const defaultCenter = {lat: 37.5665, lng: 126.978}
const defaultMapLevel = 6
const updatedMapLevel = 3

export const KakaoMap = () => {
  // DATA
  const [placeData, setPlaceData] = useRecoilState(placeDataState) // 전체 데이터 담김
  const [replaceData, setReplaceData] = useState([]) // 인덱스 담김

  // State
  const [openMarkerIndex, setOpenMarkerIndex] = useState(null)
  const [openSidebar, setOpenSidebar] = useState(false)
  const [openEditSidebar, setOpenEditSidebar] = useState(false)
  const [openNavigationSidebar, setOpenNavigationSidebar] = useState(false)
  const [mapLevel, setMapLevel] = useState(defaultMapLevel)
  const [,] = useState()

  const [key, setKey] = useState(0)

  // Data Flow
  const [markerPosition, setMarkerPosition] = useState(defaultCenter)
  const [placeInfo, setPlaceInfo] = useState(null) // 추가 정보
  const [selectedPlace, setSelectedPlace] = useState(null) // 바꿀 장소 선택

  const [markers, set_test_markers] = useRecoilState(markersState)

  const paths = markers.map((marker) => marker.position)

  const changeLocation = (selectedPlace) => {
    const updatedMarkers = markers.map((v) => {
      if (
        v.position.lat === markerPosition.lat &&
        v.position.lng === markerPosition.lng
      ) {
        console.log('찾음 ' + JSON.stringify(v, null, 2))
        return {
          ...v,
          ...selectedPlace,
        }
      } else {
        console.log('못찾음')
        return v
      }
    })
    set_test_markers(updatedMarkers)
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
          ratingReview: data.map((v) => v.ratingReview),
          place_type: data.map((v) => v.place_type),
        }
        setPlaceData(newData)
      })
      .catch((e) => console.log('error :' + e))
  }, [setPlaceData])

  useEffect(() => {
    if (markers.length > 0) {
      const center = getCentroid(markers.map((marker) => marker.position))
      setMarkerPosition(center)
    }
  }, [markers])

  useEffect(() => {
    console.log('tesT' + JSON.stringify(markerPosition))
    if (markerPosition.lat !== 0 && markerPosition.lng !== 0) setKey(1)
  }, [markerPosition])

  const clickReplacePlace = (index) => {
    const place = {
      id: placeData.id[index],
      position: {
        lat: placeData.positions[index].lat,
        lng: placeData.positions[index].lng,
      },
      image: categoryMap[placeData.index[index]],
      place: placeData.places[index],
      category: placeData.categories[index],
      address: placeData.addresses[index],
      placeUrl: placeData.placeUrl[index],
      placeType: placeData.index[index],
      ratingReview: [
        placeData.ratingReview[index].ratingValue,
        placeData.ratingReview[index].visitorReviews,
        placeData.ratingReview[index].blogReviews,
      ],
    }
    setSelectedPlace(place)
  }

  const calculateDistance = (coord1, coord2) => {
    const latDiff = coord1.lat - coord2.lat
    const lngDiff = coord1.lng - coord2.lng
    return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff)
  }

  const getSortedIndicesByDistance = (main, response) => {
    const responseWithIndex = response.map((item, index) => ({
      ...item,
      index,
      distance: calculateDistance(main, item),
    }))
    responseWithIndex.sort((a, b) => a.distance - b.distance)
    return responseWithIndex.map((item) => item.index)
  }

  const handleEdit = async () => {
    try {
      setOpenSidebar(false)
      setOpenEditSidebar(true)
      setOpenNavigationSidebar(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleNavigation = () => {
    setOpenSidebar(false)
    setOpenEditSidebar(false)
    setOpenNavigationSidebar(true)
  }

  const handleStoreInfo = async (id) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/info`, {id})
      setPlaceInfo(response.data)
      setOpenSidebar(true)
      setOpenNavigationSidebar(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = (markerId) => {
    const updatedMarkers = markers.filter((marker) => marker.id !== markerId)
    set_test_markers(updatedMarkers)
  }

  const closeSideBar = () => {
    setOpenSidebar(false)
    setOpenEditSidebar(false)
    setOpenNavigationSidebar(false)
    setSelectedPlace(null)
  }

  const closeSideAndInfo = () => {
    setOpenSidebar(false)
    setOpenEditSidebar(false)
    setOpenNavigationSidebar(false)
    setOpenMarkerIndex(null)
    setMapLevel(defaultMapLevel)
  }

  return (
    <>
      {markerPosition && (
        <Map
          key={key}
          center={{lat: markerPosition.lat, lng: markerPosition.lng}}
          style={{width: '1200px', height: '700px'}} // 지도 크기 fixed
          level={mapLevel}
        >
          {markers.map((marker, index) => (
            <>
              <MapMarker
                key={index}
                position={marker.position}
                image={{
                  src: `${process.env.PUBLIC_URL}/${marker.image}`,
                  size: {width: 64, height: 69},
                  options: {offset: {x: 32, y: 69}},
                }}
                onClick={() => {
                  setOpenMarkerIndex(index === openMarkerIndex ? null : index)
                  setMarkerPosition(marker.position)
                  setMapLevel(updatedMapLevel)

                  const main = placeData.positions[marker.id - 1] // {"lat": 37.52608666907984, "lng": 127.03537543435476}
                  const response = placeData.positions // 모든 포지션 정보 일단 넣어놓기??

                  const sortedIndices = getSortedIndicesByDistance(
                    main,
                    response
                  )
                  setOpenSidebar(false)
                  setReplaceData(sortedIndices)
                }}
              />
              {openMarkerIndex === index && (
                <CustomOverlayMap
                  position={marker.position}
                  xAnchor={1}
                  yAnchor={1.2}
                >
                  <StyledMarkerInfoContainer>
                    <StyledMakerInfoRow>
                      <StyledMarkerInfoCol1>
                        <div
                          style={{
                            backgroundColor: 'gray',
                            width: '85px',
                            height: '85px',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            padding: '0px',
                            margin: '0px',
                            boxSizing: 'border-box',
                          }}
                        >
                          <img
                            src={'https://' + marker.placeUrl}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              padding: 0,
                              margin: 0,
                              display: 'block',
                            }}
                          />
                        </div>
                      </StyledMarkerInfoCol1>
                      <StyledMarkerInfoCol2>
                        <StyledMarkerInfoTitle>
                          {marker.place}
                        </StyledMarkerInfoTitle>
                        <StyledeMarkerInfoIndex>
                          {marker.category}
                        </StyledeMarkerInfoIndex>
                        <StyledMarkerInfoAddress>
                          {marker.address}
                        </StyledMarkerInfoAddress>
                      </StyledMarkerInfoCol2>
                    </StyledMakerInfoRow>
                    <hr />
                    <StyledButtonLayout>
                      <StyledButton onClick={() => handleNavigation()}>
                        길 찾기
                      </StyledButton>
                      <StyledButton
                        onClick={() => handleStoreInfo(marker.id)}
                        backgroundColor={'#ffffff'}
                        fontColor={'black'}
                        borderColor={'black'}
                      >
                        장소 정보
                      </StyledButton>
                      <StyledButton
                        onClick={() => handleEdit(marker.id)}
                        backgroundColor={'#ABB5BE'}
                        borderColor={'#ABB5BE'}
                      >
                        수정
                      </StyledButton>
                      <StyledButton
                        onClick={() => handleDelete(marker.id)}
                        fontColor={'#FF0431'}
                        backgroundColor={'#ffffff'}
                        borderColor={'#FF0431'}
                      >
                        삭제
                      </StyledButton>
                    </StyledButtonLayout>
                    <div
                      onClick={() => closeSideAndInfo()}
                      title='닫기'
                      style={{cursor: 'pointer', textAlign: 'end'}}
                    >
                      닫기
                    </div>
                  </StyledMarkerInfoContainer>
                </CustomOverlayMap>
              )}
            </>
          ))}
          <Polyline
            path={paths}
            strokeWeight={20} // 선의 두께
            strokeColor='#FF1493' // 선의 색깔
            strokeOpacity={0.7} // 선의 불투명도
            strokeStyle='solid' // 선의 스타일
          />
          {markers.map((marker, index) => {
            if (
              openMarkerIndex !== null &&
              index === openMarkerIndex &&
              openSidebar
            ) {
              return (
                <SideBarContainer key={index}>
                  <SideBarClosedButton onClick={closeSideBar}>
                    ×
                  </SideBarClosedButton>
                  <h3 style={{fontWeight: 600, color: 'gray'}}>
                    장소 정보 자세히보기
                  </h3>
                  <div className='info'>
                    <div className='title'>
                      <h1 style={{fontWeight: 800, padding: '10px'}}>
                        {marker.place}
                      </h1>
                    </div>
                    <div>
                      <div
                        style={{
                          backgroundColor: 'gray',
                          width: '100%',
                          height: '400px',
                          borderRadius: '20px',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={'https://' + marker.placeUrl}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'fill',
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className='category'
                      style={{padding: '20px', display: 'grid', gap: '5px'}}
                    >
                      <p style={{fontSize: '20px'}}>
                        <BiSolidCategoryAlt /> {marker.category}
                      </p>
                      <p style={{fontSize: '20px'}}>
                        <FaLocationDot /> {marker.address}
                      </p>
                      <p style={{fontSize: '20px'}}>
                        <FaSquarePhone /> {placeInfo.phoneNumber}
                      </p>
                      <p
                        style={{
                          fontSize: '20px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <FaMap style={{marginRight: '5px'}} /> {placeInfo.url}
                      </p>
                      <p style={{fontSize: '20px'}}>
                        {placeInfo.menus && placeInfo.menus.name ? (
                          <>
                            <p>
                              <FaLocationDot /> {placeInfo.menus.name}
                            </p>
                            <p>{placeInfo.menus.price}</p>
                            <p>{placeInfo.menus.thum}</p>
                          </>
                        ) : (
                          <p>
                            <MdRestaurantMenu /> 등록된 메뉴가 없어요
                          </p>
                        )}
                      </p>
                      <p style={{fontSize: '20px'}}>
                        <IoMdTime />
                        {placeInfo.detail.placeTime}
                      </p>
                      <p style={{fontSize: '20px'}}>
                        <MdStarRate />{' '}
                        {marker.ratingReview[0] === 0
                          ? '아직 평점이 없어요.'
                          : marker.ratingReview[0] + '점'}
                      </p>
                      <Row>
                        <Col>
                          <p style={{fontSize: '20px'}}>
                            <CiShop /> <b>{marker.ratingReview[1]} 개</b>의
                            방문자 리뷰수
                          </p>
                        </Col>
                        <Col>
                          <p style={{fontSize: '20px'}}>
                            <CiShop /> <b>{marker.ratingReview[2]} 개</b>의
                            블로그 리뷰수
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <ButtonLayout>
                    <StyledButton onClick={() => handleNavigation()}>
                      길 찾기
                    </StyledButton>
                    <StyledButton
                      borderColor={'#ABB5BE'}
                      backgroundColor={'#ABB5BE'}
                      onClick={() => handleEdit()}
                    >
                      수정
                    </StyledButton>
                    <StyledButton
                      fontColor={'#FF0431'}
                      backgroundColor={'#ffffff'}
                      borderColor={'#FF0431'}
                      onClick={() => handleDelete()}
                    >
                      삭제
                    </StyledButton>
                  </ButtonLayout>
                </SideBarContainer>
              )
            } else if (
              openMarkerIndex !== null &&
              index === openMarkerIndex &&
              openEditSidebar
            ) {
              return (
                <SideBarContainer key={index}>
                  <SideBarClosedButton onClick={closeSideBar}>
                    ×
                  </SideBarClosedButton>
                  <h4 style={{fontWeight: 600, color: 'gray'}}>
                    이 근방 추천 장소 모아모기
                  </h4>
                  <h2 style={{fontWeight: 700}}>선택된 장소는...</h2>
                  <Container style={{padding: '20px'}}>
                    <Row
                      style={{
                        padding: '10px',
                        marginBottom: '10px',
                        borderRadius: '10px',
                        boxShadow: '0px 0px 15px 5px rgba(0, 100, 255, 0.5)',
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: 'gray',
                          width: '100px',
                          height: '100px',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          padding: '0 0',
                        }}
                      >
                        <img
                          src={'https://' + marker.placeUrl}
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      </div>
                      <Col style={{margin: '5px'}}>
                        <Row
                          style={{
                            paddingLeft: '15px',
                            fontWeight: '700',
                            fontSize: '20px',
                          }}
                        >
                          {marker.place}
                        </Row>
                        <Row
                          style={{
                            margin: '5px',
                            color: 'gray',
                            fontSize: '18px',
                          }}
                        >
                          {marker.address}
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                  <h2 style={{fontWeight: '700'}}>
                    <span style={{fontWeight: '700', color: '#EB539F'}}>
                      #{marker.place}
                    </span>{' '}
                    기준으로 거리가 가까운 순으로 정렬했어요!
                  </h2>
                  <p style={{fontSize: '20px', color: 'gray'}}>
                    선택한 장소와 거리가 가까운 순으로 정렬된 추천 장소들을
                    아래에 리스트로 제공합니다.
                  </p>
                  <ScrollableListGroup>
                    {replaceData &&
                      replaceData
                        .filter((_, index) => index < 30)
                        .map((v, index) => (
                          <Container
                            key={index}
                            style={{padding: '10px'}}
                            onClick={() => clickReplacePlace(v)}
                          >
                            <Row
                              style={{
                                padding: '10px',
                                marginBottom: '10px',
                                borderRadius: '10px',
                                boxShadow:
                                  '0px 0px 5px rgba(0.1, 0.1, 0.1, 0.1)',
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor: 'gray',
                                  width: '100px',
                                  height: '100px',
                                  borderRadius: '10px',
                                  overflow: 'hidden',
                                  padding: '0 0',
                                }}
                              >
                                <img
                                  src={'https://' + placeData.placeUrl[v]}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                  }}
                                />
                              </div>
                              <Col
                                style={{
                                  margin: '5px',
                                }}
                              >
                                <Row
                                  style={{
                                    paddingLeft: '10px',
                                    fontWeight: '700',
                                    fontSize: '23px',
                                  }}
                                >
                                  {placeData.places[v]}
                                </Row>
                                <Row
                                  style={{
                                    paddingLeft: '15px',
                                    fontSize: '18px',
                                    color: 'gray',
                                  }}
                                >
                                  {placeData.addresses[v]}
                                </Row>
                              </Col>
                            </Row>
                          </Container>
                        ))}
                  </ScrollableListGroup>
                  {selectedPlace !== null ? (
                    <>
                      <h2 style={{fontWeight: 700, padding: '10px'}}>
                        <span style={{color: '#EB539F'}}>
                          #{selectedPlace.place}
                        </span>{' '}
                        을/를 선택했어요
                      </h2>
                      <Container style={{padding: '20px'}}>
                        <Row
                          style={{
                            padding: '10px',
                            marginBottom: '10px',
                            borderRadius: '10px',
                            boxShadow: '0px 0px 5px rgba(0.1, 0.1, 0.1, 0.1)',
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: 'gray',
                              width: '100px',
                              height: '100px',
                              borderRadius: '10px',
                              overflow: 'hidden',
                              padding: '0 0',
                            }}
                          >
                            <img
                              src={'https://' + selectedPlace.placeUrl}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                              }}
                            />
                          </div>
                          <Col style={{margin: '5px'}}>
                            <Row
                              style={{
                                margin: '5px',
                                fontWeight: '700',
                                fontSize: '20px',
                              }}
                            >
                              {selectedPlace.place}
                            </Row>
                            <Row style={{margin: '5px'}}>
                              {selectedPlace.address}
                            </Row>
                          </Col>
                        </Row>
                      </Container>
                    </>
                  ) : (
                    <h3 style={{marginTop: '30px', fontWeight: '700'}}>
                      아직 아무것도 선택하지 않았어요.
                    </h3>
                  )}
                  {Array.isArray(markers) && markers.length > 0 && (
                    <ButtonLayout>
                      <StyledButton
                        fontColor={'#FF0431'}
                        backgroundColor={'#ffffff'}
                        borderColor={'#FF0431'}
                        onClick={() => {
                          changeLocation(selectedPlace)
                          closeSideAndInfo()
                        }}
                      >
                        여기로 바꾸겠습니다.
                      </StyledButton>
                      <StyledButton>그냥 그대로 둘래요!</StyledButton>
                    </ButtonLayout>
                  )}
                </SideBarContainer>
              )
            } else if (
              openMarkerIndex !== null &&
              index === openMarkerIndex &&
              openNavigationSidebar
            ) {
              return (
                <SideBarContainer>
                  <SideBarClosedButton onClick={closeSideBar}>
                    ×
                  </SideBarClosedButton>
                  <h4 style={{fontWeight: 600, color: 'gray'}}>
                    해당 장소 길찾기
                  </h4>
                  <Container>
                    <Row>
                      <h2>#{marker.place} 경로 미리 보기</h2>
                    </Row>
                    <Row style={{height: '400px', backgroundColor: 'gray'}}>
                      <Map
                        center={marker.position}
                        draggable={false}
                        level={7}
                      ></Map>
                    </Row>
                  </Container>
                  <Container>
                    <h2>이 전 장소에서 #{marker.place}로 가는 길</h2>
                  </Container>
                </SideBarContainer>
              )
            }
            return null
          })}
        </Map>
      )}
    </>
  )
}

export default KakaoMap

const StyledMarkerInfoContainer = styled(Container)`
  background-color: white;
  width: 400px;
  padding: 20px;
  border-radius: 10px;
`

const StyledMakerInfoRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
`

const StyledMarkerInfoCol1 = styled(Col)`
  flex-grow: 2;
  position: relative;
`

const StyledMarkerInfoCol2 = styled(Col)`
  flex-grow: 5;
  position: relative;
`

const StyledMarkerInfoTitle = styled(Row)`
  font-weight: 700;
  font-size: 25px;
`

const StyledeMarkerInfoIndex = styled(Row)`
  color: gray;
`

const StyledMarkerInfoAddress = styled(Row)`
  color: gray;
`

const StyledButtonLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`

const StyledButton = styled(Button)`
  border-radius: 50px;
  border-color: ${(props) => props.borderColor};
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.fontColor};
`

const SideBarContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 450px;
  height: 100%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow-x: hidden;
  transition: 0.3s;
  padding: 15px;
  z-index: 1;
`

const SideBarClosedButton = styled.div`
  background: none;
  border: none;
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`

const ButtonLayout = styled.div`
  display: grid;
  gap: 10px;
`

const ScrollableListGroup = styled(ListGroup)`
  max-height: 270px;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0px;
`

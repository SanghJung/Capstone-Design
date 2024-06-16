import {Map, MapMarker, Polyline, CustomOverlayMap} from 'react-kakao-maps-sdk'
import {useState} from 'react'
import {Container, Col, Row, Button} from 'react-bootstrap'
import styled from 'styled-components'
import {BiSolidCategoryAlt} from 'react-icons/bi'
import {FaLocationDot} from 'react-icons/fa6'
import {IoPhonePortraitSharp} from 'react-icons/io5'
import {CiShop} from 'react-icons/ci'

const defaultMapLevel = 9
const updatedMapLevel = 7

export const KakaoMap = ({markers}) => {
  const [openMarkerIndex, setOpenMarkerIndex] = useState(null)
  const [openSidebar, setOpenSidebar] = useState(false)
  const [markerPosition, setMarkerPosition] = useState({lat: 33.4, lng: 126.8})
  const [mapLevel, setMapLevel] = useState(defaultMapLevel)

  const paths = markers.map((marker) => marker.position)

  const handleNavigation = () => {
    // 길찾기 로직 추가
    console.log('길찾기')
  }

  const handleStoreInfo = () => {
    setOpenSidebar(true)
  }

  const handleEdit = () => {
    // TODO: 수정 로직 추가
    console.log('수정')
  }

  const handleDelete = () => {
    // TODO: 삭제 로직 추가
    console.log('삭제')
  }

  const closeSideBar = () => setOpenSidebar(false)

  const closeSideAndInfo = () => {
    setOpenSidebar(false)
    setOpenMarkerIndex(null)
    setMapLevel(defaultMapLevel)
  }

  return (
    <>
      <Map
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
                        }}
                      />
                    </StyledMarkerInfoCol1>
                    <StyledMarkerInfoCol2>
                      <StyledMarkerInfoTitle>
                        {marker.place}
                      </StyledMarkerInfoTitle>
                      <StyledeMarkerInfoIndex>
                        {marker.index}
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
                      onClick={() => handleStoreInfo()}
                      backgroundColor={'#ffffff'}
                      fontColor={'black'}
                      borderColor={'black'}
                    >
                      장소 정보
                    </StyledButton>
                    <StyledButton
                      onClick={() => handleEdit()}
                      backgroundColor={'#ABB5BE'}
                      borderColor={'#ABB5BE'}
                    >
                      수정
                    </StyledButton>
                    <StyledButton
                      onClick={() => handleDelete()}
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
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '450px',
                  height: '100%',
                  backgroundColor: 'white',
                  boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                  overflowX: 'hidden',
                  transition: '0.3s',
                  padding: '15px',
                  zIndex: '1',
                }}
              >
                <button
                  onClick={closeSideBar}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: 'pointer',
                  }}
                >
                  ×
                </button>
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
                      }}
                    />
                  </div>
                  <div
                    className='category'
                    style={{padding: '20px', display: 'grid', gap: '5px'}}
                  >
                    <p style={{fontSize: '20px'}}>
                      <BiSolidCategoryAlt /> {marker.index}
                    </p>
                    <p style={{fontSize: '20px'}}>
                      <FaLocationDot /> {marker.address}
                    </p>
                    <p style={{fontSize: '20px'}}>
                      <IoPhonePortraitSharp /> {marker.phoneNumber}
                    </p>
                    <p style={{fontSize: '20px'}}>
                      <CiShop /> {marker.placeUrl}
                    </p>
                  </div>
                </div>
                <div style={{display: 'grid', gap: '10px'}}>
                  <StyledButton onClick={() => handleNavigation()}>
                    길 찾기
                  </StyledButton>
                  <StyledButton
                    onClick={() => handleEdit()}
                    backgroundColor={'#ABB5BE'}
                    borderColor={'#ABB5BE'}
                  >
                    수정
                  </StyledButton>
                  <StyledButton
                    onClick={() => handleDelete()}
                    fontColor={'#FF0431'}
                    backgroundColor={'#ffffff'}
                    borderColor={'#FF0431'}
                  >
                    삭제
                  </StyledButton>
                </div>
              </div>
            )
          }
          return null
        })}
      </Map>
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

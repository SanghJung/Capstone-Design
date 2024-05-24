import {Map, MapMarker, Polyline} from 'react-kakao-maps-sdk'
import {useState} from 'react'

export const KakaoMap = ({markers}) => {
  const [openMarkerIndex, setOpenMarkerIndex] = useState(null)

  const paths = markers.map((marker) => marker.position)

  const handleNavigation = () => {
    // 길찾기 로직 추가
    console.log('길찾기')
  }

  const handleStoreInfo = () => {
    // 가게정보 로직 추가
    console.log('가게정보')
  }

  const handleEdit = () => {
    // 수정 로직 추가
    console.log('수정')
  }

  const handleDelete = () => {
    // 삭제 로직 추가
    console.log('삭제')
  }

  const closeSideBar = () => {
    setOpenMarkerIndex(null)
  }

  return (
    <Map
      center={{lat: 33.4, lng: 126.8}} // 지도의 중심 좌표
      style={{width: '1200px', height: '700px'}} // 지도 크기
      level={8} // 지도 확대 레벨
    >
      {markers.map((marker, index) => (
        <MapMarker
          key={index}
          position={marker.position}
          image={{
            src: `${process.env.PUBLIC_URL}/${marker.image}`,
            size: {width: 64, height: 69},
            options: {offset: {x: 32, y: 69}},
          }}
          onClick={() =>
            setOpenMarkerIndex(index === openMarkerIndex ? null : index)
          }
        >
          {openMarkerIndex === index && (
            <div className='wrap' style={{color: '#000', padding: '10px'}}>
              <div className='info'>
                <div className='title'>
                  <h5>{marker.place}</h5>
                </div>
                <div className='category'>
                  <p>{marker.category}</p>
                  <p>{marker.index}</p>
                  <p>{marker.address}</p>
                </div>
                <hr />
                <div
                  className='button-grid'
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px',
                    marginBottom: '10px',
                  }}
                >
                  <button
                    className='info-button'
                    onClick={() => handleNavigation()}
                  >
                    길찾기
                  </button>
                  <button
                    className='info-button'
                    onClick={() => handleStoreInfo()}
                  >
                    가게정보
                  </button>
                  <button className='info-button' onClick={() => handleEdit()}>
                    수정
                  </button>
                  <button
                    className='info-button'
                    onClick={() => handleDelete()}
                  >
                    삭제
                  </button>
                </div>
                <div
                  className='close'
                  onClick={() => setOpenMarkerIndex(null)}
                  title='닫기'
                  style={{cursor: 'pointer', marginBottom: '15px'}}
                >
                  닫기
                </div>
              </div>
            </div>
          )}
        </MapMarker>
      ))}
      <Polyline
        path={paths}
        strokeWeight={20} // 선의 두께
        strokeColor='#FF1493' // 선의 색깔
        strokeOpacity={0.7} // 선의 불투명도
        strokeStyle='solid' // 선의 스타일
      />
      {markers.map((marker, index) => {
        if (openMarkerIndex !== null && index === openMarkerIndex) {
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '400px',
                height: '100%',
                backgroundColor: 'white',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                overflowX: 'hidden',
                transition: '0.3s',
                padding: '10px',
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
              <h1>가게 정보 자세히보기</h1>
              <div className='info'>
                <div className='title'>
                  <h2>{marker.place}</h2>
                </div>
                <div className='category'>
                  <p>{marker.category}</p>
                  <p>{marker.index}</p>
                  <p>{marker.address}</p>
                  <p>{marker.phoneNumber}</p>
                  <p>{marker.placeUrl}</p>
                </div>
              </div>
            </div>
          )
        }
        return null
      })}
    </Map>
  )
}

export default KakaoMap

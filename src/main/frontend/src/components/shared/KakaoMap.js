import {Map, MapMarker, Polyline} from 'react-kakao-maps-sdk'
import {useState} from 'react'

export const KakaoMap = ({markers}) => {
  const [openMarkerIndex, setOpenMarkerIndex] = useState(null)

  const paths = markers.map((marker) => marker.position)

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
                  <h5>{marker.info}</h5>
                </div>
                <div
                  className='close'
                  onClick={() => setOpenMarkerIndex(null)}
                  title='닫기'
                  style={{cursor: 'pointer'}}
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
    </Map>
  )
}

export default KakaoMap

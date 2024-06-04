import {MapInfoWindow} from 'react-kakao-maps-sdk'

export const MapInfoContainer = ({clickedArea, setClickedArea}) => {
  return (
    <MapInfoWindow position={clickedArea.position}>
      <img
        alt='close'
        width='14'
        height='13'
        src='http://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif'
        style={{
          position: 'absolute',
          right: '5px',
          top: '5px',
          cursor: 'pointer',
          borderRadius: '20px',
        }}
        onClick={() => setClickedArea(null)}
      ></img>
      {/* <div className='info'>
        <div className='title'>{clickedArea.name}</div>
        <div className='size'>
          총 면적 : 약 {clickedArea.area})m<sup>2</sup>
        </div>
      </div> */}
    </MapInfoWindow>
  )
}

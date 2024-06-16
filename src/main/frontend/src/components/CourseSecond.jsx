import {Container} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {useRecoilValue} from 'recoil'
import {placeDataState} from '../state/places'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import API_URLS from '../api/config'
import {Areas} from '../data/areas'
import {ZoomedInMapComponent} from './shared/secondpage/ZoomedInMapComponent'
import {PlaceInfoContainer} from './shared/secondpage/PlaceInfoContainer'
import { categoryMap } from '../type/categoryType'

const center = {
  lat: 37.490728250649646,
  lng: 127.10433125798602,
}
const defaultMapLevel = 9
const updatedMapLevel = 7

export const CourseSecond = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {data, place_id, index} = location.state || {}

  const selectedCourse = useRecoilValue(placeDataState)

  const [openMarkerIndex, setOpenMarkerIndex] = useState(null)
  const [, setMarkerPosition] = useState({lat: 33.4, lng: 126.8})
  const [, setMapLevel] = useState(defaultMapLevel)

  const [places, setPlaces] = useState([])
  const [categories, setCategories] = useState([])
  const [positions, setPositions] = useState([])
  const [addresses, setAddresses] = useState([])
  const [placeUrl, setPlaceUrl] = useState([])
  const [placeType, setPlaceType] = useState([])
  const [ratingReview, setRatingReview] = useState([])
  const [_index, setIndex] = useState([])

  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    if (data && selectedCourse) {
      const array = data.id // 추천받은 id 값
      const filtered = array
        .map((id) => {
          const idx = selectedCourse.id.indexOf(id)
          if (idx !== -1) {
            return {
              id,
              address: selectedCourse.addresses[idx],
              category: selectedCourse.categories[idx],
              places: selectedCourse.places[idx],
              index: selectedCourse.index[idx],
              positions: selectedCourse.positions[idx],
              phoneNumber: selectedCourse.phoneNumber[idx],
              placeUrl: selectedCourse.placeUrl[idx],
              ratingReview: selectedCourse.ratingReview[idx],
            }
          }
          return null
        })
        .filter((item) => item !== null)
      console.log('filtered:', filtered)
      setFilteredData(filtered)
    }
  }, [data, selectedCourse])

  useEffect(() => {
    setIndex(index)
    if (filteredData.length > 0) {
      const newPlaces = filteredData.map((item) => item.places)
      const newCategories = filteredData.map((item) => item.category)
      const newPositions = filteredData.map((item) => item.positions)
      const newAddresses = filteredData.map((item) => item.address)
      const newPlaceUrl = filteredData.map((item) => item.placeUrl)
      const newPlaceType = filteredData.map((item) => item.index)
      const newRatingReview = filteredData.map((item) => item.ratingReview)

      setPlaces(newPlaces)
      setCategories(newCategories)
      setPositions(newPositions)
      setAddresses(newAddresses)
      setPlaceUrl(newPlaceUrl)
      setPlaceType(newPlaceType)
      setRatingReview(newRatingReview)
    }
  }, [filteredData])

  const newPlace = async () => {
    try {
      let apiUrl
      if (place_id) {
        apiUrl = API_URLS.CHOSEN_PLACE(place_id)
      } else {
        apiUrl = API_URLS.UNCHOSEN_PLACE
      }
      const response = await axios.post(apiUrl)
      navigate('/coursesecond', {state: {data: response.data, place_id}})
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  const gangnamArea = Areas.find((area) => area.name === index)

  const markers = positions
    .map((position, index) => {
      if (position) {
        return {
          position: position,
          image: categoryMap[placeType[index]] || categoryMap['Cafe'],
          place: places[index],
          category: categories[index],
          index: _index[index],
          address: addresses[index],
          placeUrl: placeUrl[index],
          ratingReview: ratingReview[index],
          place_type: placeType[index],
        }
      }
      return null
    })
    .filter((marker) => marker !== null)

  console.log('markers' + JSON.stringify(markers, null, 2))
  const paths = markers.map((marker) => marker.position)

  return (
    <>
      <StyledBottomLayerContainer>
        <ZoomedInMapComponent
          center={center}
          markers={markers}
          paths={paths}
          setOpenMarkerIndex={setOpenMarkerIndex}
          openMarkerIndex={openMarkerIndex}
          setMarkerPosition={setMarkerPosition}
          setMapLevel={setMapLevel}
          updatedMapLevel={updatedMapLevel}
          gangnamArea={gangnamArea}
        />
      </StyledBottomLayerContainer>
      <StyledUpperLayerContainer>
        <PlaceInfoContainer
          index={index}
          newPlace={newPlace}
          filteredData={filteredData}
          categoryMap={categoryMap}
          navigate={navigate}
        />
      </StyledUpperLayerContainer>
    </>
  )
}

const StyledBottomLayerContainer = styled(Container)`
  position: relative;
  height: 300px;
  z-index: 0;
  background: none;
`

const StyledUpperLayerContainer = styled(Container)`
  position: absolute;
  top: 10px;
  left: 300px;
  z-index: 10;
`

export default CourseSecond

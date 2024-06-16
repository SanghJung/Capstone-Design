import {useRecoilState, useSetRecoilState} from 'recoil'
import {useNavigate} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {KakaoMap} from './shared/KakaoMap'
import {CourseLayout} from './shared/CourseLayout'
import styled from 'styled-components'
import {placeState, categoryState, positionState} from '../state/course'
import {markersState} from '../state/markers'
import {ROUTES} from '../Routes'
import {useLocation} from 'react-router-dom'
import {categoryMap} from '../type/categoryType'
import React, {useEffect, useState} from 'react'
import PlaceRowComponent from './shared/thirdpage/PlaceRowComponent'

export const CourseFinal = () => {
  const location = useLocation()
  const data = location.state || {}

  const [placeId, setPlaceId] = useState([])
  const [places, setPlaces] = useState([])
  const [categories, setCategories] = useState([])
  const [positions, setPositions] = useState([])
  const [addresses, setAddresses] = useState([])
  const [placeUrl, setPlaceUrl] = useState([])
  const [placeType, setPlaceType] = useState([])
  const [ratingReview, setRatingReview] = useState([])

  const setPlaceState = useSetRecoilState(placeState)
  const setCategoryState = useSetRecoilState(categoryState)
  const setPositionState = useSetRecoilState(positionState)
  const [mapMarkers, setMapMarkersState] = useRecoilState(markersState)

  useEffect(() => {
    if (data.length > 0) {
      const newPlaceId = data.map((item) => item.id)
      const newPlaces = data.map((item) => item.places)
      const newCategories = data.map((item) => item.category)
      const newPositions = data.map((item) => item.positions)
      const newAddresses = data.map((item) => item.address)
      const newPlaceUrl = data.map((item) => item.placeUrl)
      const newIndex = data.map((item) => item.index)
      const newRatingReview = data.map((item) => item.ratingReview)

      setPlaceId(newPlaceId)
      setPlaces(newPlaces)
      setCategories(newCategories)
      setPositions(newPositions)
      setAddresses(newAddresses)
      setPlaceUrl(newPlaceUrl)
      setPlaceType(newIndex)
      setRatingReview(newRatingReview)
    }
  }, [data])

  useEffect(() => {
    const markers = places.map((place, index) => ({
      id: placeId[index],
      position: positions[index],
      image: categoryMap[placeType[index]] || categoryMap['기타'],
      place: place, // 장소 이름 (상호명)
      category: categories[index], // 플레이스 카테고리
      address: addresses[index], // 플레이스 주소
      placeUrl: placeUrl[index], // 플레이스 이미지
      placeType: placeType[index], // 플레이스 타입 (레스토랑 / 엑티비티 / 카페)
      ratingReview: [
        ratingReview[index].ratingValue, // 별점
        ratingReview[index].visitorReviews, // 방문자 리뷰수
        ratingReview[index].blogReviews, // 블로그 리뷰
      ],
    }))
    setMapMarkersState(markers)
  }, [places])

  const navigate = useNavigate()

  const handleSaveCourse = (e) => {
    e.preventDefault()
    setPlaceState(places)
    setCategoryState(categories)
    setPositionState(positions)
    navigate(ROUTES.CREATE_COURSE_NAME)
  }

  const handleCancelCourse = (e) => {
    e.preventDefault()
    navigate(ROUTES.GENERATE_COURSE)
  }

  return (
    <CourseLayout>
      <Container>
        <StyledMapContainer>
          <KakaoMap />
        </StyledMapContainer>
        <PlaceRowComponent
          mapMarkers={mapMarkers}
          handleSaveCourse={handleSaveCourse}
          handleCancelCourse={handleCancelCourse}
        />
      </Container>
    </CourseLayout>
  )
}

const StyledMapContainer = styled(Container)`
  padding-left: 50px;
  padding-bottom: 50px;
`

export default CourseFinal

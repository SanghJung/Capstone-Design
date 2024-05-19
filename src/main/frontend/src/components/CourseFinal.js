import React, {useState} from 'react'
import {useSetRecoilState} from 'recoil'
import {useNavigate} from 'react-router-dom'
import {Container, Row, Col, Button} from 'react-bootstrap'
import {KakaoMap} from './shared/KakaoMap'
import {CourseLayout} from './shared/CourseLayout'
import styled from 'styled-components'
import {placeState, categoryState, positionState} from '../state/course'
import {ROUTES} from '../Routes'
import {Play} from './shared/svg/play'
import {Cafe} from './shared/svg/cafe'
import {Eat} from './shared/svg/eat'
import {Rest} from './shared/svg/rest'

export const CourseFinal = () => {
  const initialPlaces = [
    '청춘부추소곱창',
    '리듬게임랜드',
    '메가커피',
    '휴양림산책로',
  ]
  const initialCategories = ['음식점', '놀거리', '마실거리', '힐링']
  const initialPositions = [
    {lat: 33.55635, lng: 126.795841},
    {lat: 33.5, lng: 126.795841},
    {lat: 33.4, lng: 126.7},
    {lat: 33.4, lng: 126.6},
  ]

  const [places] = useState(initialPlaces)
  const [categories] = useState(initialCategories)
  const [positions] = useState(initialPositions)

  const setPlaceState = useSetRecoilState(placeState)
  const setCategoryState = useSetRecoilState(categoryState)
  const setPositionState = useSetRecoilState(positionState)

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
    setPlaceState(places)
    setCategoryState(categories)
    setPositionState(positions)
    navigate(ROUTES.GENERATE_COURSE)
  }

  const categoryMap = {
    음식점: 'Play.png',
    놀거리: 'Eat.png',
    마실거리: 'Cafe.png',
    힐링: 'Rest.png',
    기타: 'Play.png',
  }

  const categoryComponentMap = {
    음식점: {Component: Play, color: '#64C466'},
    놀거리: {Component: Eat, color: '#010101'},
    마실거리: {Component: Cafe, color: '#C39D74'},
    힐링: {Component: Rest, color: '#A1E4BD'},
    기타: {Component: Play, color: '#64C466'},
  }

  const markers = places.map((place, index) => ({
    position: positions[index],
    image: categoryMap[categories[index]] || categoryMap['기타'],
    info: place,
  }))

  return (
    <CourseLayout>
      <Container>
        <StyledMapContainer>
          <KakaoMap markers={markers} />
        </StyledMapContainer>
        <StyledContainer>
          {places.map((place, index) => {
            const {Component, color} =
              categoryComponentMap[categories[index]] ||
              categoryComponentMap['기타']
            return (
              <React.Fragment key={index}>
                <StyledCol1>
                  <StyledComponent backgroundColor={color}>
                    {place}
                    <StyledSvgBadge>
                      <Component />
                    </StyledSvgBadge>
                  </StyledComponent>
                </StyledCol1>
                {index < places.length - 1 && <StyledCol2>→</StyledCol2>}
              </React.Fragment>
            )
          })}
          <StyledCol2></StyledCol2>

          <StyledCol1>
            <Row>
              <StyledButton onClick={handleSaveCourse}>
                이 코스 찜!
              </StyledButton>
            </Row>
            <Row>
              <StyledButton onClick={handleCancelCourse} color='#BFBFBF'>
                코스 생성 포기
              </StyledButton>
            </Row>
          </StyledCol1>
        </StyledContainer>
      </Container>
    </CourseLayout>
  )
}

const StyledMapContainer = styled(Container)`
  padding-left: 50px;
  padding-bottom: 50px;
`

const StyledContainer = styled(Container)`
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
`

const StyledComponent = styled.div`
  border-radius: 10px;
  background-color: ${(props) => props.backgroundColor || `#64C466`};
  height: 180px;
  font-size: 30px;
  color: white;
  padding: 30px;
  font-weight: 700;
  position: relative;
  overflow: visible;
  margin-bottom: 20px;
`

const StyledButton = styled(Button)`
  border-radius: 10px;
  height: 60px;
  color: white;
  font-weight: 800;
  margin-top: 10px;
  background-color: ${(props) => props.color || `#ff9fc5`};
  font-size: 20px;
`

const StyledSvgBadge = styled.div`
  position: absolute;
  top: -20px;
  right: -20px;
`

const StyledCol1 = styled(Col)`
  flex-grow: 3;
  position: relative;
`

const StyledCol2 = styled(Col)`
  flex-grow: 1;
  font-size: 50px;
  text-align: center;
  padding-left: 25px;
`
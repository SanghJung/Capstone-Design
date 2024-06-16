import React from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import styled from 'styled-components'
import { Colors } from '../../../type/Colors'
import { categoryComponentMap } from '../../../type/categoryType'

const PlaceRowComponent = ({
  mapMarkers,
  handleSaveCourse,
  handleCancelCourse,
}) => {
  return (
    <StyledContainer>
      {mapMarkers.map((marker, index) => {
        const {Component, color} =
          categoryComponentMap[marker.placeType] || categoryComponentMap['기타']
        return (
          <React.Fragment key={index}>
            <StyledCol1>
              <StyledComponent backgroundColor={color}>
                {marker.place}
                <StyledSvgBadge>
                  <Component />
                </StyledSvgBadge>
              </StyledComponent>
            </StyledCol1>
            {index < mapMarkers.length - 1 && <StyledCol2>→</StyledCol2>}
          </React.Fragment>
        )
      })}
      <StyledCol2></StyledCol2>
      <StyledCol1>
        <StyledButton style={{height: '130px'}}>장소 추가</StyledButton>
      </StyledCol1>
      <StyledCol1>
        <Row>
          <StyledButton onClick={handleSaveCourse}>이 코스 찜!</StyledButton>
        </Row>
        <Row>
          <StyledButton onClick={handleCancelCourse} color={Colors.BASIC_GRAY}>
            코스 생성 포기
          </StyledButton>
        </Row>
      </StyledCol1>
    </StyledContainer>
  )
}

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

export default PlaceRowComponent

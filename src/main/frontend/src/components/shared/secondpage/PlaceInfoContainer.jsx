import React from 'react'
import {Col, Row, Badge} from 'react-bootstrap'
import styled from 'styled-components'
import {IoReloadCircleSharp} from 'react-icons/io5'

export const PlaceInfoContainer = ({
  index,
  newPlace,
  filteredData,
  categoryMap,
  navigate,
}) => {
  return (
    <Row>
      <Col>
        <Row>
          <h1 style={{fontSize: '60px', fontWeight: 700, padding: '10px'}}>
            <span style={{color: '#DA5E9D'}}>#{index}</span> 기준으로 <br />
            코스를 생성했어요!
          </h1>
        </Row>
        <Row style={{height: '600px'}}></Row>
        <Row>
          <Col style={{flexGrow: 1, position: 'relative'}}>
            <IoReloadCircleSharp
              onClick={newPlace}
              size='100'
              style={{cursor: 'pointer'}}
            />
          </Col>
          <Col style={{flexGrow: 6}}>
            <Row>
              <h4>
                <b>마음에 안들어요.</b>
              </h4>
            </Row>
            <Row>
              <h5>경로 다시 생성하기</h5>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col>
        <StyledCourseContainer>
          <Row>
            <h1 style={{fontWeight: '700', padding: '40px'}}>
              <span style={{color: '#DA5E9D'}}>#강남구</span> 코스 미리보기
            </h1>
          </Row>
          <Row
            style={{
              width: '90%',
              margin: '0 auto',
              padding: '20px',
              boxSizing: 'border-box',
            }}
          >
            <ul
              style={{
                listStyle: 'none',
                padding: '0',
                margin: '0px',
              }}
            >
              {filteredData.map((item, index) => (
                <StyledRow key={item.id}>
                  <StyledSvgBadge>
                    <StyledImg
                      src={categoryMap[item.index]}
                      alt={`Icon ${index + 1}`}
                    />
                    <StyledBadge pill bg={'#FC609F'} index={index}>
                      {`${index + 1}번 플레이스`}
                    </StyledBadge>
                  </StyledSvgBadge>
                  <StyledInfoCol>
                    <StyledH2>{item.places}</StyledH2>
                    <StyledInfo>
                      <div style={{color: '#999'}}>{item.category}</div>
                      <div style={{color: '#666'}}>{item.address}</div>
                    </StyledInfo>
                  </StyledInfoCol>
                  <StyledCol>
                    <StyledPlaceImg src={'https://' + item.placeUrl} />
                  </StyledCol>
                </StyledRow>
              ))}
            </ul>
            <StyledButton
              onClick={(e) => {
                try {
                  e.preventDefault()
                  console.log('SECOND TO FINAL : ' + filteredData)
                  navigate('/coursefinal', {state: filteredData})
                } catch (error) {
                  console.error('Error:', error)
                }
              }}
            >
              이 코스가 마음에 들어요!
            </StyledButton>
          </Row>
        </StyledCourseContainer>
      </Col>
    </Row>
  )
}

const StyledButton = styled.div`
  float: right;
  padding: 15px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: #ff9fc5;
  border-radius: 20px;
  color: #ffffff;
  font-size: 23px;
  font-weight: 800;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const StyledSvgBadge = styled.div`
  position: absolute;
  top: -28px;
  right: -10px;
  margin: -5px;
`

const StyledCol = styled(Col)`
  background-color: #bfbfbf;
  border-radius: 20px;
  flex-grow: 1;
  position: relative;
  overflow: hidden;
  height: 100px;
  width: 200px;
  padding: 0px;
`

const StyledRow = styled(Row)`
  margin-bottom: 60px;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  overflow: visible;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 20px;
}}
`

const StyledImg = styled.img`
  width: 40px;
`

const StyledBadge = styled(Badge)`
  margin: 5px;
  padding: 10px;
  fontsize: 13px;
  backgroundcolor: ${(index) => {
    index % 2 === 0 ? '#FC609F' : '#FC609F'
  }};
`

const StyledH2 = styled.h2`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 5px;
`

const StyledInfo = styled.div`
  margin-bottom: 5px;
`

const StyledInfoCol = styled(Col)`
  flex-grow: 3;
`

const StyledPlaceImg = styled.img`
  width: 100%;
  height: 100%;
`

const StyledCourseContainer = styled.div`
  width: 500px;
  height: 1000px;
  background-color: #ffffff;
  border-radius: 30px;
  opacity: 0.9;
  pointer-events: auto;
`

import React, {useEffect, useState} from 'react'
import {Button, Col, Form, ListGroup, Row, InputGroup} from 'react-bootstrap'
import {IoIosSearch} from 'react-icons/io'
import styled from 'styled-components'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {Colors} from '../../../type/Colors'
import API_URLS from '../../../api/config'

export const OptionBarContainer = ({
  clickedArea,
  data,
  setSelectedPlace,
  setSelectedPlaceLocal,
}) => {
  const [ids, setIds] = useState([])
  const [places, setPlaces] = useState([])
  const [addresses, setAddresses] = useState([])
  const [categories, setCategories] = useState([])
  const [indices, setIndices] = useState([])
  const [positions, setPositions] = useState([])
  const [phoneNumbers, setPhoneNumbers] = useState([])
  const [placeUrls, setPlaceUrls] = useState([])
  const [placeType, setPlaceType] = useState([])
  const [ratingReviews, setRatingReviews] = useState([])

  const [selectedPlaceLocal, setSelectedPlaceLocalState] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const searchArea = clickedArea.name

  const navigate = useNavigate()

  useEffect(() => {
    const matchingIdxs 
      = data.addresses.reduce((indices, address, index) => {
          if (address.includes(searchArea)) indices.push(index)
          return indices
  }, [])

    const filteredIds = matchingIdxs.map((index) => data.id[index])
    const filteredPlaces = matchingIdxs.map((index) => data.places[index])
    const filteredAddresses = matchingIdxs.map((index) => data.addresses[index])
    const filteredCategories = matchingIdxs.map((index) => data.categories[index])
    const filteredIndices = matchingIdxs.map((index) => data.index[index])
    const filteredPositions = matchingIdxs.map((index) => data.positions[index])
    const filteredPhoneNumbers = matchingIdxs.map((index) => data.phoneNumber[index])
    const filteredPlaceUrls = matchingIdxs.map((index) => data.placeUrl[index])
    const filteredRatingReviews = matchingIdxs.map((index) => data.ratingReview[index])
    const filteredPlaceType = matchingIdxs.map((index) => data.place_type[index])

    setIds(filteredIds)
    setPlaces(filteredPlaces)
    setAddresses(filteredAddresses)
    setCategories(filteredCategories)
    setIndices(filteredIndices)
    setPositions(filteredPositions)
    setPhoneNumbers(filteredPhoneNumbers)
    setPlaceUrls(filteredPlaceUrls)
    setRatingReviews(filteredRatingReviews)
    setPlaceType(filteredPlaceType)
  }, [data, searchArea])

  useEffect(() => {
    setSelectedPlace(null)
    setSelectedPlaceLocalState(null)
  }, [searchArea, setSelectedPlace])

  const placeChosen = async (id) => {
    try {
      const apiUrl = API_URLS.CHOSEN_PLACE(id)
      const response = await axios.post(apiUrl)
      navigate('/coursesecond', {
        state: {
          data: response.data, 
          place_id: id, 
          index: clickedArea.name
      }})
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  const placeUnchosen = async () => {
    try {
      const apiUrl = API_URLS.UNCHOSEN_PLACE
      const response = await axios.post(apiUrl)
      navigate('/coursesecond', {
        state: response.data
      })
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const filteredPlaces = places.filter((place) =>
    place.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const firstSelectedPlaceLocal =
    Array.isArray(selectedPlaceLocal)&& selectedPlaceLocal.length > 0
      ? selectedPlaceLocal[0]
      : null

  const getPlaceTypeLebel = (placeType) => {
    switch (placeType) {
      case 'restaurant':
        return '음식점'
      case 'activity':
        return '놀거리'
      case 'cafe':
        return '카페'
      default:
        return '기타'
    }
  }

  return (
    <StyledContainer>
      <Row>
        <StyledH1>
          <span style={{color: Colors.STAR_PINK}}>
            #{clickedArea.name}
          </span>를 선택했어요!
        </StyledH1>
      </Row>
      <Form inline>
        <Row>
          <Col xs={12}>
            <InputGroup>
              <StyledFormControl
                type='text'
                placeholder='찾으시는 위치를 입력해주세요.'
                className='mr-sm-2'
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <InputGroup.Text>
                <StyledSearchButton type='submit'>
                  <StyledSearchIcon />
                </StyledSearchButton>
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>

        <ScrollableListGroup as='ol'>
          {filteredPlaces.map((place, idx) => (
            <ListGroup.Item
              as='li'
              key={idx}
              onClick={() => {
                const newSelectedPlace = {
                  id: ids[places.indexOf(place)],
                  place: place,
                  address: addresses[places.indexOf(place)],
                  category: categories[places.indexOf(place)],
                  index: indices[places.indexOf(place)],
                  position: positions[places.indexOf(place)],
                  phoneNumber: phoneNumbers[places.indexOf(place)],
                  placeUrl: placeUrls[places.indexOf(place)],
                  ratingReview: ratingReviews[places.indexOf(place)],
                  placeType: placeType[places.indexOf(place)],
                }
                setSelectedPlace(newSelectedPlace)
                setSelectedPlaceLocalState([newSelectedPlace])
                setSelectedPlaceLocal([newSelectedPlace])
              }}
            >
              <StyledRow>
                <StyledColImage>
                  <img src={'https://' + placeUrls[places.indexOf(place)]} />
                </StyledColImage>
                <StyledCol>
                  <Row style={{fontSize: '20px', fontWeight: '700'}}>{place}</Row>
                  <Row color={Colors.gray}>{addresses[places.indexOf(place)]}</Row>
                </StyledCol>
              </StyledRow>
            </ListGroup.Item>
          ))}
        </ScrollableListGroup>
      </Form>
      {firstSelectedPlaceLocal && (
        <div>
          <StyledH2>
            <span style={{color: '#FEB5D2'}}>
              #{firstSelectedPlaceLocal.place}
            </span>
            을(를) 포함해 경로를 생성합니다.
          </StyledH2>
          <ListGroup as='ol'>
            <ListGroup.Item as='li'>
              <Row>
                <StyledPlaceImage>
                  <img
                    src={'https://' + firstSelectedPlaceLocal.placeUrl}
                    alt={firstSelectedPlaceLocal.place}
                  />
                </StyledPlaceImage>
                <StyledDescription>
                  <StyledDescriptionRow fontSize={'28px'}>
                    {firstSelectedPlaceLocal.place}
                  </StyledDescriptionRow>
                  <StyledDescriptionRow>
                    # {getPlaceTypeLebel(firstSelectedPlaceLocal.placeType)}
                  </StyledDescriptionRow>
                  <StyledDescriptionRow fontColor={Colors.BASIC_GRAY}>
                    {firstSelectedPlaceLocal.category}
                  </StyledDescriptionRow>
                  <StyledDescriptionRow fontColor={Colors.STAR_PINK}>
                    ★{' '}
                    {firstSelectedPlaceLocal.ratingReview.ratingValue !== 0
                      ? firstSelectedPlaceLocal.ratingReview.ratingValue
                      : '아직 평점이 등록되지 않았어요.'}
                  </StyledDescriptionRow>
                  <StyledDescriptionRow fontColor={Colors.basicGray}>
                    {firstSelectedPlaceLocal.address}
                  </StyledDescriptionRow>
                </StyledDescription>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </div>
      )}
      <Row>
        <StyledButton
          onClick={() =>
            firstSelectedPlaceLocal 
            && placeChosen(firstSelectedPlaceLocal.id)
          }
        >
          여기를 포함해서 추천 받을래요!
        </StyledButton>
      </Row>
      <Row>
        <StyledButton 
          onClick={placeUnchosen}
          color={Colors.BASIC_WHITE}
          font_color={Colors.BASIC_BLACK}
        >
          선택하지 않고 넘어가겠습니다!
        </StyledButton>
      </Row>
    </StyledContainer>
  )
}

const StyledPlaceImage = styled(Col)`
  flex-grow: 1;
  background-color: gray;
  height: 150px;
  border-radius: 10px;
  margin: 3px;
  overflow: hidden;
  padding: 0px;
`

const StyledDescription = styled(Col)`
  flex-grow: 3;
  margin: 5px;
`

const StyledButton = styled(Button)`
  background-color: ${(props) => props.color || '#FF9FC5'};
  color: ${(props) => props.font_color || 'white'};
  border-color: white;
  padding: 10px;
  margin: 5px;
  font-weight: 700;
  font-size: 20px;
  &:hover {
    background-color: grey;
  }
`

const StyledContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  margin: 10px;
`

const ScrollableListGroup = styled(ListGroup)`
  max-height: 270px;
  overflow-y: auto;
  overflow-x: hidden;
`

const StyledFormControl = styled(Form.Control)`
  &::placeholder {
    font-size: 18px;
  }
`

const StyledSearchIcon = styled(IoIosSearch)`
  color: gray;
  fontsize: 2em;
  stroke: #eb539f;
  strokewidth: 1;
`

const StyledSearchButton = styled(Button)`
  background-color: transparent;
  border: none;
  padding: 0;
`

const StyledH1 = styled.h1`
  font-weight: 700;
  paddingbottom: 20px;
  paddingtop: 20px;
`

const StyledH2 = styled.h2`
  font-weight: 700;
  padding-top: 20px;
  padding-bottom: 10px;
`

const StyledRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
`

const StyledColImage = styled(Col)`
  flex-grow: 1;
  background-color: gray;
  height: 100px;
  border-radius: 10px;
  margin: 3px;
  overflow: hidden;
  padding: 0px;
`

const StyledCol = styled(Col)`
  flex-grow: 5;
  margin: 5px;
`

const StyledDescriptionRow = styled(Row)`
  font-size: ${({fontSize}) => fontSize || '18px'};
  color: ${({fontColor}) => fontColor || 'black'};
  font-weight: 700;
`

export default OptionBarContainer

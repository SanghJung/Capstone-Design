import React, {useEffect, useState} from 'react'
import {Button, Col, Form, ListGroup, Row} from 'react-bootstrap'
import {IoIosSearch} from 'react-icons/io'
import styled from 'styled-components'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export const OptionBarContainer = ({
  clickedArea,
  data,
  setSelectedPlace,
  setSelectedPlaceLocal,
}) => {
  const navigate = useNavigate()

  const [places, setPlaces] = useState([])
  const [addresses, setAddresses] = useState([])
  const [categories, setCategories] = useState([])
  const [indices, setIndices] = useState([])
  const [positions, setPositions] = useState([])
  const [phoneNumbers, setPhoneNumbers] = useState([])
  const [placeUrls, setPlaceUrls] = useState([])
  const [selectedPlaceLocal, setSelectedPlaceLocalState] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const searchArea = clickedArea.name

  useEffect(() => {
    const matchingIndices = data.addresses.reduce((indices, address, index) => {
      if (address.includes(searchArea)) indices.push(index)
      return indices
    }, [])

    const filteredPlaces = matchingIndices.map((index) => data.places[index])
    const filteredAddresses = matchingIndices.map(
      (index) => data.addresses[index]
    )
    const filteredCategories = matchingIndices.map(
      (index) => data.categories[index]
    )
    const filteredIndices = matchingIndices.map((index) => data.index[index])
    const filteredPositions = matchingIndices.map(
      (index) => data.positions[index]
    )
    const filteredPhoneNumbers = matchingIndices.map(
      (index) => data.phoneNumber[index]
    )
    const filteredPlaceUrls = matchingIndices.map(
      (index) => data.placeUrl[index]
    )

    setPlaces(filteredPlaces)
    setAddresses(filteredAddresses)
    setCategories(filteredCategories)
    setIndices(filteredIndices)
    setPositions(filteredPositions)
    setPhoneNumbers(filteredPhoneNumbers)
    setPlaceUrls(filteredPlaceUrls)
  }, [data, searchArea])

  useEffect(() => {
    setSelectedPlace(null)
    setSelectedPlaceLocalState(null)
  }, [searchArea, setSelectedPlace])

  const placeChosen = () => {
    console.log('placeChosen axios')
  }

  const placeUnchosen = async () => {
    try {
      const apiUrl = 'http://localhost:8080/api/unchosen' // Spring Boot 서버 URL
      const response = await axios.post(apiUrl)
      navigate('/coursesecond', {state: response.data})
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const filteredPlaces = places.filter((place) =>
    place.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const firstSelectedPlaceLocal =
    Array.isArray(selectedPlaceLocal) && selectedPlaceLocal.length > 0
      ? selectedPlaceLocal[0]
      : null

  return (
    <StyledContainer>
      <h2 style={{fontWeight: '700'}}>
        <span style={{color: '#EB539F'}}>#{clickedArea.name}</span>를 선택했어요
      </h2>
      <Form inline>
        <Row>
          <Col xs='auto'>
            <Form.Control
              type='text'
              placeholder='Search'
              className='mr-sm-2'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Col>
          <Col xs='auto'>
            <Button type='submit'>
              <IoIosSearch />
            </Button>
          </Col>
        </Row>

        <ScrollableListGroup as='ol'>
          {filteredPlaces.map((place, idx) => (
            <ListGroup.Item
              as='li'
              key={idx}
              onClick={() => {
                const newSelectedPlace = {
                  place: place,
                  address: addresses[places.indexOf(place)],
                  category: categories[places.indexOf(place)],
                  index: indices[places.indexOf(place)],
                  position: positions[places.indexOf(place)],
                  phoneNumber: phoneNumbers[places.indexOf(place)],
                  placeUrl: placeUrls[places.indexOf(place)],
                }
                setSelectedPlace(newSelectedPlace)
                setSelectedPlaceLocalState([newSelectedPlace])
                setSelectedPlaceLocal([newSelectedPlace])
              }}
            >
              <Row>
                <StyledPlaceImage></StyledPlaceImage>
                <StyledDescription>
                  <Row style={{fontWeight: '700'}}>{place}</Row>
                  <Row>{addresses[places.indexOf(place)]}</Row>
                </StyledDescription>
              </Row>
            </ListGroup.Item>
          ))}
        </ScrollableListGroup>
      </Form>
      {firstSelectedPlaceLocal && (
        <div>
          <h2 style={{fontWeight: '700'}}>
            <span style={{color: '#EB539F'}}>
              #{firstSelectedPlaceLocal.place}
            </span>
            을(를) 포함해 경로를 생성합니다.
          </h2>
          <ListGroup as='ol'>
            <ListGroup.Item as='li'>
              <Row>
                <StyledPlaceImage>
                  <img
                    src={firstSelectedPlaceLocal.placeUrl}
                    alt={firstSelectedPlaceLocal.place}
                  />
                </StyledPlaceImage>
                <StyledDescription>
                  <Row style={{fontWeight: '700'}}>
                    {firstSelectedPlaceLocal.place}
                  </Row>
                  <Row>{firstSelectedPlaceLocal.category}</Row>
                  <Row>★ 4.5</Row>
                  <Row>{firstSelectedPlaceLocal.address}</Row>
                  <Row>{firstSelectedPlaceLocal.phoneNumber}</Row>
                </StyledDescription>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </div>
      )}
      <Row>
        <StyledButton onClick={placeChosen}>
          여기를 포함해서 추천 받을래요!
        </StyledButton>
      </Row>
      <Row>
        <StyledButton onClick={placeUnchosen} color='white' font_color='black'>
          선택하지 않고 넘어가겠습니다!
        </StyledButton>
      </Row>
    </StyledContainer>
  )
}

const StyledPlaceImage = styled(Col)`
  flex-grow: 1;
  background-color: gray;
  height: 120px;
  border-radius: 10px;
  margin: 3px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
  font-weight: 600;

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
`

export default OptionBarContainer

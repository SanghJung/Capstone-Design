import {useEffect, useState} from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import {AreaBadge} from './shared/firstpage/Areabadge';
import {OptionBarContainer} from './shared/firstpage/OptionBarContainer';
import {fetchPlaces} from '../api/getAllData';
import {placeDataState} from '../state/places';
import {useRecoilState} from 'recoil';
import styled from 'styled-components';
import {Areas} from '../data/areas';
import {center, level} from '../data/default_map';
import {outerRectanglePath} from '../data/outerRectangle';
import {gangnamArea} from '../data/default_map';
import {Colors} from '../../src/type/Colors';
import {SeoulComponent} from '../../src/components/shared/firstpage/SeoulComponent';

export const CourseFirst = () => {
  const [placeData, setPlaceData] = useRecoilState(placeDataState);
  const [, setFilteredPlaces] = useState([]);
  const [areas, setAreas] = useState(Areas);
  const [, setMousePosition] = useState({lat: 0, lng: 0});
  const [, setSelectedPlace] = useState(null);
  const [, setSelectedPlaceLocal] = useState(null);
  const [clickedArea, setClickedArea] = useState(gangnamArea);

  const onMouseMove = (_map, mouseEvent) => {
    setMousePosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
  };

  useEffect(() => {
    fetchPlaces()
      .then((data) => {
        const newData = {
          id: data.map((v) => v.id),
          places: data.map((v) => v.placeName),
          categories: data.map((v) => v.categoryName),
          index: data.map((v) => v.place_type),
          positions: data.map((v) => ({
            lat: v.coord.y,
            lng: v.coord.x,
          })),
          addresses: data.map((v) => v.addressName),
          phoneNumber: data.map((v) => v.phoneNumber),
          placeUrl: data.map((v) => v.thumbnailUrl),
          ratingReview: data.map((v) => v.ratingReview),
          place_type: data.map((v) => v.place_type),
        };
        setPlaceData(newData);
      })
      .catch((e) => console.log('error :' + e));
  }, [setPlaceData]);

  useEffect(() => {
    const filterPlaces = () => {
      const filteredIndexes = placeData.addresses
        .map((location, index) => {
          if (location.includes('강남구')) return index;
        })
        .filter((index) => index !== undefined);
      const filtered = filteredIndexes.map((index) => placeData.places[index]);
      setFilteredPlaces(filtered);
    };
    filterPlaces();
  }, [placeData]);

  useEffect(() => {
    setSelectedPlace(null);
    setSelectedPlaceLocal(null);
  }, [clickedArea]);

  return (
    <>
      <StyledContainer>
        <SeoulComponent
          center={center}
          level={level}
          onMouseMove={onMouseMove}
          outerRectanglePath={outerRectanglePath}
          areas={areas}
          setAreas={setAreas}
          setClickedArea={setClickedArea}
        />
      </StyledContainer>
      <StyledComponent>
        <Row>
          <Col>
            <StyledRow>
              <StyledTitle>
                반갑습니다, <br />
                <span style={{color: Colors.HOT_PINK}}>봄이 그렇게도 좋냐</span>님. <br />
                어디를 방문하실 예정인가요?
              </StyledTitle>
              <SubTitle>
                추천 AI가 추천 경로를 제공할 수 있도록 아래 지도에서 방문할 '구'
                <br />를 선택해주시고 오른쪽 팝업창에서 '특정 장소'를
                선택해주세요.
              </SubTitle>
            </StyledRow>
            {/* <OptionBar /> */}
          </Col>
          <Col>
            <StyledRightRow>
              <ClickableCol>
                <OptionBarContainer
                  clickedArea={clickedArea}
                  data={placeData}
                  setSelectedPlace={setSelectedPlace}
                  setSelectedPlaceLocal={setSelectedPlaceLocal}
                />
              </ClickableCol>
              <StyledAreaBadgeCol>
                <AreaBadge clickedArea={clickedArea} />
              </StyledAreaBadgeCol>
            </StyledRightRow>
          </Col>
        </Row>
      </StyledComponent>
    </>
  );
};

const StyledContainer = styled(Container)`
  position: relative;
  height: 200px;
  z-index: 1;
  background: none;
`;

const StyledComponent = styled.div`
  position: absolute;
  top: 10px;
  left: 300px;
  z-index: 10;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledRow = styled(Row)`
  margin-bottom: 100px;
`;

const ClickableCol = styled(Col)`
  pointer-events: auto;
  background-color: white;
  opacity: 80;
  flex-grow: 4;
  position: relative;
  border-radius: 20px;
  padding: 25px;
  z-index: 20;
`;

const SubTitle = styled.p`
  font-weight: 600;
  color: grey;
  font-size: 20px;
`;

const StyledTitle = styled.h1`
  font-weight: 700;
  padding-top: 10px;
  padding-bottom: 5px;
`;

const StyledAreaBadgeCol = styled(Col)`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const StyledRightRow = styled(Row)`
  overflow: visible;
  position: relative;
  align-items: center;
  flex-wrap: nowrap;
`;
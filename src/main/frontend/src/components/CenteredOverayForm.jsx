import {Container, Row, Button} from 'react-bootstrap'
import {styled} from 'styled-components'
import {Form} from 'react-bootstrap'
import {OverlayWrapper} from './shared/OverlayWrapper'

export const CenteredOverayForm = ({number, title, children, handleSubmit, validated}) => {
  return (
    <StyledCenteralizedContainer>
      <OverlayWrapper>
        <Container>
        <Form validated={validated} onSubmit={handleSubmit}>
          <StyledRow>
            <Row className='align-items-start'>
              <StyledSection>{number}</StyledSection>
              <StyledH1>{title}</StyledH1>
            </Row>
            <Row className='align-items-center'>
              {children}
            </Row>
            <Row className='align-items-end'>
              <StyledSubmitButton>다음</StyledSubmitButton>
            </Row>
          </StyledRow>
        </Form>
      </Container>
      </OverlayWrapper>
    </StyledCenteralizedContainer>
  )
}

const StyledCenteralizedContainer = styled(Container)`
  background-color: #fbf3f7;
  width: 30vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
  padding: 0px;
  gap: 10px;
`

const StyledRow = styled(Row)`
  height: 80vh;
  align-items: center;
  justify-content: center;
`

const StyledSection = styled.section`
  border-radius: 100%;
  background-color: #295ff4;
  height: 5vw;
  width: 5vw;
  color: white;
  font-weight: 600;
  font-size: 3vw;
  margin: auto;
`

const StyledH1 = styled.h1`
  padding: 30px;
  font-weight: 600;
  line-height: 50px;
  text-align: left;
  word-break: keep-all;
  overflow-wrap: break-word;
  span {
    color: #295ff4;
  }
`

const StyledSubmitButton = styled(Button).attrs({type: 'submit'})`
  width: 60%;
  height: 50px;
  margin: 0 auto;
  background: white;
  border-radius: 50px;
  border-color: #295ff4;
  border-width: 2px;
  color: #295ff4;
  font-weight: 600;
  font-size: 18px;
  &: hover {
    background-color: #295ff4;
    filter: brightness(90%);
    color: white;
    font-weight: 1000;
  }
`
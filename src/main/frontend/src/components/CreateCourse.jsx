import {useState} from 'react'
import {useRecoilState} from 'recoil'
import {courseNameState} from '../state/courseName'
import {CenteredOverayForm} from './CenteredOverayForm'
import {Container, Form, Row, Button} from 'react-bootstrap'
import {styled} from 'styled-components'

export const CreateCourse = () => {
  const [validated, setvalidated] = useState(false)
  const [validCourseName, setValidCourseName] = useState(false)
  const [, setCourseName] = useRecoilState(courseNameState)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity()) {
      setValidCourseName(true)
    } else {
      e.stopPropagation()
      setValidCourseName(false)
    }
    setvalidated(true)
  }

  return (
    <CenteredOverayForm>
      <Container>
        <Form validated={validated} onSubmit={handleSubmit}>
          <StyledRow>
            <Row className='align-items-start'>
              <StyledSection>01</StyledSection>
              <StyledH1>
                선택하신 코스에 <span>이름</span>을 붙여주세요.
              </StyledH1>
            </Row>
            <Row className='align-items-center'>
              <Form.Group controlId='validationCourseName'>
                <Form.Control
                  type='text'
                  required
                  placeholder='코스명을 입력해주세요. (최대 20자)'
                  onChange={(e) => {
                    setCourseName(e.target.value)
                  }}
                />
                <Form.Control.Feedback
                  type='invalid'
                  data-valid={validCourseName}
                >
                  코스명을 입력해주세요.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className='align-items-end'>
              <StyledSubmitButton>다음</StyledSubmitButton>
            </Row>
          </StyledRow>
        </Form>
      </Container>
    </CenteredOverayForm>
  )
}

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

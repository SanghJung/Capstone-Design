import {useState} from 'react'
import {useSetRecoilState} from 'recoil'
import {courseNameState} from '../state/courseName'
import {Container, Form, Row} from 'react-bootstrap'
import {
  CenteredOverayForm,
  StyledRow,
  StyledSection,
  StyledSubmitButton,
  StyledH1,
} from './CenteredOverayForm'


export const CreateCourse = () => {
  const [validated, setvalidated] = useState(false)
  const [validCourseName, setValidCourseName] = useState(false)
  const setCourseName = useSetRecoilState(courseNameState)

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
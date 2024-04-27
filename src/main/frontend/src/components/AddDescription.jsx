import {useState} from 'react'
import {useSetRecoilState, useRecoilValue} from 'recoil'
import {courseNameState} from '../state/courseName'
import {courseDescriptionState} from '../state/courseDescription'
import {Container, Form, Row} from 'react-bootstrap'
import {
  CenteredOverayForm,
  StyledRow,
  StyledSection,
  StyledSubmitButton,
  StyledH1,
  StyledH2
} from './CenteredOverayForm'


export const AddDescription = () => {
  const [validated, setvalidated] = useState(false)
  const courseName = useRecoilValue(courseNameState)
  const setCourseDescription = useSetRecoilState(courseDescriptionState)

  const handleSubmit = (e) => {
    e.preventDefault()
    setvalidated(true)
  }

  return (
    <CenteredOverayForm>
      <Container>
        <Form validated={validated} onSubmit={handleSubmit}>
          <StyledRow>
            <Row className='align-items-start'>
              <StyledSection>03</StyledSection>
              <StyledH1>
                <span>{courseName}</span>코스에 대한 <span>부가설명</span>을 작성해주세요.
              </StyledH1>
              <StyledH2>(선택)</StyledH2>
            </Row>
            <Row className='align-items-center'>
              <Form.Group controlId='validationCourseName'>
                <Form.Control
                  type='text'
                  placeholder='코스 설명을 작성해주세요. (최대 100자)'
                  onChange={(e) => {
                    setCourseDescription(e.target.value)
                  }}
                />
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
import {useState} from 'react'
import {
  CenteredOverayForm,
  StyledRow,
  StyledSection,
  StyledSubmitButton,
  StyledH1,
} from './CenteredOverayForm'
import {styled} from 'styled-components'
import {Container, Form, FormControl, Row} from 'react-bootstrap'
import {InputTags} from 'react-bootstrap-tagsinput'
import {useRecoilState, useRecoilValue} from 'recoil'
import {courseNameState} from '../state/courseName'
import {visitPurposeState} from '../state/visitPurpose'

export const AddVisitPurpose = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const courseName = useRecoilValue(courseNameState)
  const [visitPurpose, setVisitPurpose] = useRecoilState(visitPurposeState)
  const [selectedOptions, setSelectedOptions] = useState([])
  const options = [
    '데이트',
    '기념일',
    '우정여행',
    '가족여행',
    '맛집탐방',
    '드라이빙',
    '소개팅',
    '혼자여행',
  ]

  const handleSelectChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    )
    setSelectedOptions(selectedValues)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <CenteredOverayForm>
      <Container>
        <Form noValidate onSubmit={handleSubmit}>
          <StyledRow>
            <Row>
              <StyledSection>02</StyledSection>
              <StyledH1>
                <span>{courseName}</span>코스에 <span>무엇</span>을 하러 가나요?
              </StyledH1>
            </Row>
            <Row>
              <Form.Group controlId='selectVisitPurposes'>
                <Form.Label>해당되는 옵션을 모두 선택해주세요.</Form.Label>
                <FormControl as='select' multiple onChange={handleSelectChange}>
                  {options.map(
                    (option) =>
                      !visitPurpose.includes(option) && (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      )
                  )}
                </FormControl>
                <InputTags
                  placeholder='해당되는 태그를 모두 선택해주세요.'
                  value={selectedOptions[selectedOptions.length - 1]}
                  onTags={(value) => {
                    setSelectedOptions(value.values)
                    setVisitPurpose(value.values)
                  }}
                />
                {formSubmitted && visitPurpose.length === 0 && (
                  <StyledErrorMessage>
                    최소 1개 이상의 태그를 선택해주세요.
                  </StyledErrorMessage>
                )}
              </Form.Group>
            </Row>
            <Row>
              <StyledSubmitButton>다음</StyledSubmitButton>
            </Row>
          </StyledRow>
        </Form>
      </Container>
    </CenteredOverayForm>
  )
}

const StyledErrorMessage = styled.span`
  color: red;
`

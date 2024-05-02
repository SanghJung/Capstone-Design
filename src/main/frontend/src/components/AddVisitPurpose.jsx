import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {CenteredOverayForm} from './CenteredOverayForm'
import {Form, FormControl} from 'react-bootstrap'
import {InputTags} from 'react-bootstrap-tagsinput'
import {useRecoilState, useRecoilValue} from 'recoil'
import {courseNameState} from '../state/courseName'
import {visitPurposeState} from '../state/visitPurpose'
import {ROUTES} from '../Routes'

export const AddVisitPurpose = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const courseName = useRecoilValue(courseNameState)
  const [validated] = useState(false)
  const [visitPurpose, setVisitPurpose] = useRecoilState(visitPurposeState)
  const [selectedOptions, setSelectedOptions] = useState([])
  const navigate = useNavigate()
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
    if (visitPurpose.length > 0) navigate(ROUTES.ADD_COURSE_DESCRIPTION)
  }

  const title = (<div><span>{courseName}</span> 코스에 <span>무엇</span>을 하러 가나요?</div>)

  return (
    <CenteredOverayForm
      number='02'
      title={title}
      validated={validated}
      handleSubmit={handleSubmit}
    >
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
    </CenteredOverayForm>
  )
}

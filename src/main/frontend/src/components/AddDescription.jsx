import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSetRecoilState, useRecoilValue} from 'recoil'
import {courseNameState} from '../state/courseName'
import {courseDescriptionState} from '../state/courseDescription'
import {Form} from 'react-bootstrap'
import {CenteredOverayForm} from './CenteredOverayForm'
import {ROUTES} from '../Routes'

export const AddDescription = () => {
  const [validated, setvalidated] = useState(false)
  const courseName = useRecoilValue(courseNameState)
  const setCourseDescription = useSetRecoilState(courseDescriptionState)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setvalidated(true)
    navigate(ROUTES.CREATE_COURSE)
  }

  const title = (<div><span>{courseName}</span> 코스에 대한 <span>부가설명</span>을 작성해주세요.</div>)
  
  return (
    <CenteredOverayForm
      number='03'
      title={title}
      validated={validated}
      handleSubmit={handleSubmit}
    >
      <Form.Group controlId='validationCourseName'>
        <Form.Control
          type='text'
          placeholder='코스 설명을 작성해주세요. (최대 100자)'
          onChange={(e) => {
            setCourseDescription(e.target.value)
          }}
        />
      </Form.Group>
    </CenteredOverayForm>
  )
}

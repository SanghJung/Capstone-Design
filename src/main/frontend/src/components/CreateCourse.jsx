import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSetRecoilState} from 'recoil'
import {courseNameState} from '../state/courseName'
import {Form} from 'react-bootstrap'
import {CenteredOverayForm} from './CenteredOverayForm'
import {ROUTES} from '../Routes'

export const CreateCourse = () => {
  const [validated, setvalidated] = useState(false)
  const [validCourseName, setValidCourseName] = useState(false)
  const setCourseName = useSetRecoilState(courseNameState)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity()) {
      setValidCourseName(true)
      navigate(ROUTES.ADD_VISIT_PURPOSE)
    } else {
      e.stopPropagation()
      setValidCourseName(false)
    }
    setvalidated(true)
  }

  const title = (<div>선택하신 코스에 <span>이름</span>을 붙여주세요.</div>)

  return (
    <CenteredOverayForm
      number='01'
      title={title}
      validated={validated}
      handleSubmit={handleSubmit}
    >
      <Form.Group controlId='validationCourseName'>
        <Form.Control
          type='text'
          required
          placeholder='코스명을 입력해주세요. (최대 20자)'
          onChange={(e) => {
            setCourseName(e.target.value)
          }}
        />
        <Form.Control.Feedback type='invalid' data-valid={validCourseName}>
          코스명을 입력해주세요.
        </Form.Control.Feedback>
      </Form.Group>
    </CenteredOverayForm>
  )
}

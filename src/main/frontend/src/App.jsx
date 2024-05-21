import './App.scss'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {RecoilRoot} from 'recoil'
import {Main} from './components/Main'
import {CreateCourse} from './components/CreateCourse'
import {AddVisitPurpose} from './components/AddVisitPurpose'
import {AddDescription} from './components/AddDescription'
import {CourseFirst} from './components/CourseFirst'
import {CreateCourseEnd} from './components/CreateCourseEnd'
import {CourseFinal} from './components/CourseFinal'
import {ROUTES} from './Routes'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path={ROUTES.GENERATE_COURSE} element={<CourseFirst />} />
          <Route path={ROUTES.COURSE_FINAL} element={<CourseFinal />} />
          <Route path={ROUTES.CREATE_COURSE_NAME} element={<CreateCourse />} />
          <Route path={ROUTES.ADD_VISIT_PURPOSE} element={<AddVisitPurpose />}/>
          <Route path={ROUTES.ADD_COURSE_DESCRIPTION} element={<AddDescription />}/>
          <Route path={ROUTES.CREATE_COURSE} element={<CreateCourseEnd />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App

import './App.scss'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {RecoilRoot} from 'recoil'
import {Main} from './components/Main'
import {CreateCourse} from './components/CreateCourse'
import {AddVisitPurpose} from './components/AddVisitPurpose'
import {AddDescription} from './components/AddDescription'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/course/1' element={<CreateCourse />} />
          <Route path='/course/2' element={<AddVisitPurpose />} />
          <Route path='/course/3' element={<AddDescription />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App

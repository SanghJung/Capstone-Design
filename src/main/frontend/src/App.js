import './App.scss'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {RecoilRoot} from 'recoil'
import {Main} from './components/Main'
import {CreateCourse} from './components/CreateCourse'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/course/1' element={<CreateCourse />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App

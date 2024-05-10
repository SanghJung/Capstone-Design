import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <div style={{backgroundColor: '#fbf3f7'}}>
      <App />
    </div>
  </React.StrictMode>
)

reportWebVitals()

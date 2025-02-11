import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className='w-[100vw] h-[100vh] bg-gray-100'>
        {/* <h1>My App</h1> */}
        <Routes>
          <Route path="/" element={<Home />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App

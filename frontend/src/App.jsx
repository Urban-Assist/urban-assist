import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import './App.css'
import Dashboard from './pages/Dashboard';
import ServiceProviders from './pages/ServiceProviders';
import PortfolioPage from './pages/PortfolioPage';
import Login from './pages/Login';
 function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className=' h-[100vh]'>
        {/* <h1>My App</h1> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={ <Dashboard /> } />
           <Route path="/services/:service" element={<ServiceProviders />} />
          <Route path="/portfolio/:providerName" element={<PortfolioPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

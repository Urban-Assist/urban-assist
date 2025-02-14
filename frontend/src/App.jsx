import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import './App.css'
import UserDashboard from './pages/UserDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import ServiceProviders from './pages/ServiceProviders';
import PortfolioPage from './pages/PortfolioPage';
import Login from './pages/Login';
import RegistrationPage from './pages/Registration';
import ProviderAvailibility from './pages/ProviderAvailibility';
import ClientBookingPage from './pages/BookingSlots';
import PortfolioMakerPage from './pages/PortfolioMaker';


 function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className=' h-[100vh]'>
        {/* <h1>My App</h1> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={ <UserDashboard /> } />
           <Route path="/services/:service" element={<ServiceProviders />} />
          <Route path="/portfolio/:providerName" element={<PortfolioPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/add-availability" element={<ProviderAvailibility />} />
          <Route path="/booking" element={<ClientBookingPage />} />


          {/* test urls to be modified later*/}
          <Route path="/dashboard2" element={ <ProviderDashboard /> } />
          <Route path="/register-service/:providerName" element={<PortfolioMakerPage />} />


        </Routes>
      </div>
    </Router>
  )
}

export default App

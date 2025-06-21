import React from 'react'
import Hero from './components/Hero'
import LandingPage from './Pages/LandingPage'
import ChatPage from './Pages/ChatPage'
import { Routes, Route } from 'react-router-dom'
import About from './Pages/About'
import AuthChecker from './service/AuthChecker'

const App = () => {
  return (
    <div className='overflow-hidden'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/chat' element={<AuthChecker><ChatPage /></AuthChecker>} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  )
}

export default App
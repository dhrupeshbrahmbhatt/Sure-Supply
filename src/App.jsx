import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RetailerLanding from './pages/RetailerLanding';
import CustomerLanding from './pages/CustomerLanding';
import { div } from 'framer-motion/client';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerLanding />} />
        <Route path="/retailer" element={<RetailerLanding />} />
      </Routes>
    </Router>
  )
}

export default App

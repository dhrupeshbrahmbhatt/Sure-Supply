import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import RetailerLanding from './pages/RetailerLanding';
import CustomerLanding from './pages/CustomerLanding';
import CustomerSignup from './components/CustomerSignup';
import RetailerSignup from './components/RetailerSignup';

function App() {
  return (
    <Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4aed88',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<CustomerLanding />} />
        <Route path="/retailer" element={<RetailerLanding />} />
        <Route path="/signup/customer" element={<CustomerSignup />} />
        <Route path="/signup/retailer" element={<RetailerSignup />} />
      </Routes>
    </Router>
  )
}

export default App

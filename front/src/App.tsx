import { Routes, Route, Navigate } from 'react-router-dom'

// User pages
import SpotPage from './pages/user/SpotPage'
import BookingPage from './pages/user/BookingPage'
import PaymentPage from './pages/user/PaymentPage'
import CompletePage from './pages/user/CompletePage'

// Host pages
import HostLoginPage from './pages/host/HostLoginPage'
import HostRegisterPage from './pages/host/HostRegisterPage'
import HostDashboard from './pages/host/HostDashboard'
import HostSpotCreatePage from './pages/host/HostSpotCreatePage'

function App() {
  return (
    <Routes>
      {/* User */}
      <Route path="/spot/:uuid" element={<SpotPage />} />
      <Route path="/spot/:uuid/book" element={<BookingPage />} />
      <Route path="/spot/:uuid/payment" element={<PaymentPage />} />
      <Route path="/spot/:uuid/complete" element={<CompletePage />} />

      {/* Host */}
      <Route path="/host/login" element={<HostLoginPage />} />
      <Route path="/host/register" element={<HostRegisterPage />} />
      <Route path="/host" element={<HostDashboard />} />
      <Route path="/host/spots/new" element={<HostSpotCreatePage />} />

      {/* Redirect */}
      <Route path="/" element={<Navigate to="/host/login" replace />} />
    </Routes>
  )
}

export default App

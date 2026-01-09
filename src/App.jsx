import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Sitemap from './pages/Sitemap'
import Membership from './pages/Membership'
import Shop from './pages/Shop'
import Favorites from './pages/Favorites'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/sitemap" element={<Sitemap />} />
      <Route path="/membership/:pack" element={<Membership />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  )
}

export default App


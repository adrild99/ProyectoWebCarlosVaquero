import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AvisoLegal from './pages/AvisoLegal'
import PoliticaPrivacidad from './pages/PoliticaPrivacidad'
import PoliticaCookies from './pages/PoliticaCookies'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/legal/aviso-legal" element={<AvisoLegal />} />
      <Route path="/legal/politica-privacidad" element={<PoliticaPrivacidad />} />
      <Route path="/legal/politica-cookies" element={<PoliticaCookies />} />
    </Routes>
  )
}

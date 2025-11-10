import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import Home from './pages/Home/Home'

import PatientLayout from './layouts/PatientLayout'
import IntakeForm from "./pages/Patient/IntakeForm/IntakeForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<PatientLayout />}>
          <Route path="/patient/intake-form" element={<IntakeForm />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
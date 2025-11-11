import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import Home from './pages/Home/Home'

import PatientLayout from './layouts/PatientLayout'
import IntakeForm from "./pages/Patient/IntakeForm/IntakeForm";

import StaffLayout from "./layouts/StaffLayout";
import CaseList from "./pages/Staff/Case/CaseList";

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

        <Route element={<StaffLayout />}>
          <Route path="/staff/cases" element={<CaseList />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
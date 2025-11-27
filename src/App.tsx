import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import PatientLayout from "./layouts/PatientLayout";
import StaffLayout from "./layouts/StaffLayout";

import Home from "./pages/Home/Home";

import IntakeForm from "./pages/Patient/IntakeForm/IntakeForm";
import PatientCasePage from "./pages/Patient/Case/PatientCasePage";

import CaseList from "./pages/Staff/Case/CaseList";
import CaseDetails from "./pages/Staff/Case/CaseDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<PatientLayout />}>
          <Route path="/patient/intake-form" element={<IntakeForm />} />
          <Route path="/patient/case" element={<PatientCasePage />} />
        </Route>

        <Route element={<StaffLayout />}>
          <Route path="/staff/cases" element={<CaseList />} />
          <Route path="/staff/cases/:caseId" element={<CaseDetails />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
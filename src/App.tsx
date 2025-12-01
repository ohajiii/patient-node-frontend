import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import PatientLayout from "./layouts/PatientLayout";
import StaffLayout from "./layouts/StaffLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home/Home";

import IntakeForm from "./pages/Patient/IntakeForm/IntakeForm";
import PatientCaseList from "./pages/Patient/Case/PatientCaseList";
import PatientCaseDetails from "./pages/Patient/Case/PatientCaseDetails";

import CaseList from "./pages/Staff/Case/CaseList";
import CaseDetails from "./pages/Staff/Case/CaseDetails";

import AdminUserListPage from "./pages/Admin/Users/AdminUserListPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<PatientLayout />}>
          <Route path="/patient/intake-form" element={<IntakeForm />} />
          <Route path="/patient/cases" element={<PatientCaseList />} />
          <Route path="/patient/cases/:caseId" element={<PatientCaseDetails />} />
        </Route>

        <Route element={<StaffLayout />}>
          <Route path="/staff/cases" element={<CaseList />} />
          <Route path="/staff/cases/:caseId" element={<CaseDetails />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin/users" element={<AdminUserListPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
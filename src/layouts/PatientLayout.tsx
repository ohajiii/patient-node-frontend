import { Outlet } from "react-router-dom";
import PatientNavbar from "../components/PatientNavbar/PatientNavbar";
import Footer from "../components/Footer/Footer";

export default function PatientLayout() {
  return (
    <div className="patient-layout">
      <PatientNavbar />
      <main className="patient-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
import { Outlet } from "react-router-dom";
import PatientNavbar from "../components/PatientNavbar/PatientNavbar";
import Footer from "../components/Footer/Footer";

export default function PatientLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PatientNavbar />

      <main className="flex-1 px-6 py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
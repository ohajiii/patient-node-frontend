import { Outlet } from "react-router-dom";
import PatientNavbar from "../components/Navbar/PatientNavbar";
import Footer from "../components/Footer/Footer";

export default function PatientLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PatientNavbar />

      <main className="flex-1 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
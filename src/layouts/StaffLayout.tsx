import { Outlet } from "react-router-dom";
import StaffNavbar from "../components/StaffNavbar/StaffNavbar";
import Footer from "../components/Footer/Footer";

export default function StaffLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <StaffNavbar />

      <main className="flex-1 px-6 py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
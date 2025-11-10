import { Outlet } from "react-router-dom";
import StaffNavbar from "../components/StaffNavbar/StaffNavbar";

import Footer from "../components/Footer/Footer";

export default function StaffLayout() {
  return (
    <div className="staff-layout">
      <StaffNavbar />
      <main className="staff-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
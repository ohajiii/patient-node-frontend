import { Link } from "react-router-dom";
import "./StaffNavbar.css";
import logo from "../../assets/images/logo.svg";

export default function StaffNavbar() {
  return (
    <header className="staff-navbar">
      <div className="staff-navbar-container">
        <Link to="/staff/dashboard" className="staff-navbar-logo">
          <img src={logo} alt="PatientNode logo" className="staff-navbar-logo-img" />
        </Link>

        <nav className="staff-navbar-links">
          <Link to="/staff/dashboard">Dashboard</Link>
          <Link to="/staff/cases">Cases</Link>
          <Link to="/staff/patients">Patients</Link>
          <Link to="/staff/reports">Reports</Link>
          <Link to="/logout" className="staff-navbar-logout">Logout</Link>
        </nav>
      </div>
    </header>
  );
}
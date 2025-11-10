import { Link } from "react-router-dom";
import "./PatientNavbar.css";
import logo from "../../assets/images/logo.svg";

export default function PatientNavbar() {
  return (
    <header className="patient-navbar">
      <div className="patient-navbar-container">
        <Link to="/patient/dashboard" className="patient-navbar-logo">
          <img src={logo} alt="PatientNode logo" className="patient-navbar-logo-img" />
        </Link>

        <nav className="patient-navbar-links">
          <Link to="/patient/dashboard">Dashboard</Link>
          <Link to="/patient/intake-form">Intake Form</Link>
          <Link to="/patient/cases">My Cases</Link>
          <Link to="/patient/notifications">Notifications</Link>
          <Link to="/logout" className="patient-navbar-logout">Logout</Link>
        </nav>
      </div>
    </header>
  );
}
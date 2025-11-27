import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

export default function PatientNavbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/patient/dashboard">
          <img src={logo} alt="PatientNode logo" className="h-10 w-auto" />
        </Link>

        <nav className="flex space-x-6">
          <Link className="text-gray-800 font-medium hover:text-primary" to="/patient/dashboard">Dashboard</Link>
          <Link className="text-gray-800 font-medium hover:text-primary" to="/patient/intake-form">Intake Form</Link>
          <Link className="text-gray-800 font-medium hover:text-primary" to="/patient/case">My Case</Link>
          <Link className="text-gray-800 font-medium hover:text-primary" to="/patient/notifications">Notifications</Link>
          <Link className="text-primary font-semibold hover:underline" to="/logout">Logout</Link>
        </nav>
      </div>
    </header>
  );
}
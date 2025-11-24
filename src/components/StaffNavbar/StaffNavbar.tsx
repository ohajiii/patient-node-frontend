import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

export default function StaffNavbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/staff/dashboard">
          <img src={logo} alt="PatientNode Logo" className="h-10 w-auto" />
        </Link>

        <nav className="flex space-x-6">
          <Link className="text-gray-800 font-medium hover:text-blue-600" to="/staff/dashboard">Dashboard</Link>
          <Link className="text-gray-800 font-medium hover:text-blue-600" to="/staff/cases">Cases</Link>
          <Link className="text-gray-800 font-medium hover:text-blue-600" to="/staff/patients">Patients</Link>
          <Link className="text-gray-800 font-medium hover:text-blue-600" to="/staff/reports">Reports</Link>

          <Link className="text-blue-600 font-semibold hover:underline" to="/logout">Logout</Link>
        </nav>
      </div>
    </header>
  );
}
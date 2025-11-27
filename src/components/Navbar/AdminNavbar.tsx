import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

export default function AdminNavbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

        <Link to="/admin/dashboard">
          <img src={logo} alt="PatientNode logo" className="h-10 w-auto" />
        </Link>

        <nav className="flex space-x-6 text-gray-700">
          <Link
            to="/admin/dashboard"
            className="text-gray-800 font-medium hover:text-primary"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className="text-gray-800 font-medium hover:text-primary"
          >
            Users
          </Link>

          <Link to="/logout" className="text-primary font-semibold hover:underline">
            Logout
          </Link>
        </nav>

      </div>
    </header>
  );
}
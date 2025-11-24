import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/">
          <img src={logo} alt="PatientNode Logo" className="h-10 w-auto" />
        </Link>

        <nav className="flex space-x-6">
          <Link className="text-gray-800 font-medium hover:text-blue-600" to="/">Home</Link>
          <Link className="text-gray-800 font-medium hover:text-blue-600" to="/about">About</Link>
          <Link className="text-gray-800 font-medium hover:text-blue-600" to="/contact">Contact</Link>
          <Link className="text-blue-600 font-semibold hover:underline" to="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}
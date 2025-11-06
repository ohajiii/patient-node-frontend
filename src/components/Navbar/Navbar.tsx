import { Link } from 'react-router-dom'
import './Navbar.css'
import logo from '../../assets/images/logo.svg'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="PatientNode logo" className="navbar-logo-img" />
        </Link>
        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login" className="navbar-login">Login</Link>
        </nav>
      </div>
    </header>
  )
}
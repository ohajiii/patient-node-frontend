import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          © {new Date().getFullYear()} PatientNode. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
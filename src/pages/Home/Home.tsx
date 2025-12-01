import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const navigate = useNavigate();

  function goToPatientSide() {
    navigate("/patient/cases");
  }

  function goToStaffSide() {
    navigate("/staff/cases");
  }

  function goToAdminSide() {
    navigate("/admin/users");
  }

  return (
    <>
      <Helmet>
        <title>Home | PatientNode</title>
      </Helmet>

      <section className="home">
        <div className="home-container">
          <div className="home-content">
            <h1 className="home-title">Welcome to PatientNode</h1>
            <p className="home-subtitle">
              A secure and efficient platform for patient case management, designed to connect patients and healthcare providers seamlessly.
            </p>
            <div className="home-actions">
              <button 
                className="home-btn-primary"
                onClick={goToPatientSide}
              >
                Patient Side
              </button>
              <button 
                className="home-btn-primary"
                onClick={goToStaffSide}
              >
                Staff Side
              </button>
              <button 
                className="home-btn-primary"
                onClick={goToAdminSide}
              >
                Admin Side
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
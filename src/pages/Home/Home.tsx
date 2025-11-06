import { Helmet } from 'react-helmet-async'
import './Home.css'

export default function Home() {
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
              <button className="home-btn-primary">Get Started</button>
              <button className="home-btn-secondary">Learn More</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
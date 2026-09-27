import { useState } from "react";
import { supabase } from "./supabase";

const programs = [
  "Professional Certificate in Leadership & Personal Development",
  "Professional Certificate in Human Resource Management",
  "Professional Certificate in Project Management",
  "Professional Certificate in Criminal Justice & Public Safety",
  "Professional Certificate in Procurement & Supply Management",
];

function App() {
  const [showApplication, setShowApplication] = useState(false);

  return (
    <div className="portal">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">SLIPS</div>
          <div>
            <strong>SUPDA Liberia Institute of Professional Studies</strong>
            <span>Student E-Portal</span>
          </div>
        </div>

        <nav>
          <button onClick={() => setShowApplication(false)}>Home</button>
          <button onClick={() => setShowApplication(true)}>
            Apply Now
          </button>
          <button className="login-button">Student Login</button>
        </nav>
      </header>

      {!showApplication ? (
        <main>
          <section className="hero">
            <div className="hero-content">
              <p className="eyebrow">WELCOME TO SLIPS</p>
              <h1>
                Learn. Lead.
                <br />
                <span>Build Your Future.</span>
              </h1>

              <p className="hero-text">
                Welcome to the official Student E-Portal of SUPDA Liberia
                Institute of Professional Studies. Apply for a program,
                access your academic information, and manage your student
                journey from one secure platform.
              </p>

              <div className="hero-actions">
                <button
                  className="primary-button"
                  onClick={() => setShowApplication(true)}
                >
                  Apply for Admission
                </button>

                <button className="secondary-button">
                  Student Login
                </button>
              </div>
            </div>

            <div className="hero-card">
              <div className="card-label">SLIPS E-PORTAL</div>
              <h2>Your Academic Journey Starts Here.</h2>
              <div className="card-line"></div>
              <p>
                Applications • Courses • Attendance • Assessments • Grades •
                Certificates
              </p>
            </div>
          </section>

          <section className="program-section">
            <div className="section-heading">
              <p className="eyebrow">OUR PROGRAMS</p>
              <h2>Professional Programs at SLIPS</h2>
              <p>
                Choose a professional program designed to strengthen your
                knowledge, skills, leadership and career development.
              </p>
            </div>

            <div className="program-grid">
              {programs.map((program, index) => (
                <div className="program-card" key={program}>
                  <div className="program-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3>{program}</h3>
                  <p>Professional Certificate Program</p>
                </div>
              ))}
            </div>
          </section>

          <section className="portal-section">
            <div>
              <p className="eyebrow">ONE PLATFORM</p>
              <h2>Everything students need in one place.</h2>
            </div>

            <div className="feature-grid">
              <div>
                <strong>01</strong>
                <h3>Admission</h3>
                <p>Submit and track your application online.</p>
              </div>

              <div>
                <strong>02</strong>
                <h3>Academic Records</h3>
                <p>Access courses, attendance, assessments and grades.</p>
              </div>

              <div>
                <strong>03</strong>
                <h3>Certificates</h3>
                <p>Access verified academic certificates when eligible.</p>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main className="application-page">
          <div className="application-header">
            <p className="eyebrow">SLIPS ADMISSIONS</p>
            <h1>Start Your Application</h1>
            <p>
              Complete your application to begin your journey with SUPDA
              Liberia Institute of Professional Studies.
            </p>
          </div>

          <div className="application-box">
            <div className="notice">
              <strong>Application Portal</strong>
              <p>
                Your application will be reviewed by the SLIPS admissions
                team before a student account is created.
              </p>
            </div>

            <div className="form-placeholder">
              <h2>Application Form Coming Next</h2>
              <p>
                We are now connecting this page to the SLIPS application
                database in Supabase.
              </p>

              <button
                className="primary-button"
                onClick={() => setShowApplication(false)}
              >
                Back to Portal
              </button>
            </div>
          </div>
        </main>
      )}

      <footer>
        <div>
          <strong>SUPDA Liberia Institute of Professional Studies</strong>
          <p>Professional Learning • Leadership • Development</p>
        </div>

        <p>© 2026 SLIPS. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

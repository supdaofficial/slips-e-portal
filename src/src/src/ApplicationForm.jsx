import { useEffect, useState } from "react";
import { supabase } from "./supabase";

function ApplicationForm({ onBack }) {
  const [programs, setPrograms] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [message, setMessage] = useState("");
  const [applicationNumber, setApplicationNumber] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    gender: "",
    date_of_birth: "",
    location: "",
    program_id: "",
    cohort_id: "",
    previous_education: "",
    study_mode: "",
  });

  useEffect(() => {
    loadPrograms();
  }, []);

  async function loadPrograms() {
    setLoadingPrograms(true);

    const { data, error } = await supabase
      .from("programs")
      .select("id, name")
      .eq("status", "Active")
      .order("name");

    if (!error) {
      setPrograms(data || []);
    }

    setLoadingPrograms(false);
  }

  async function loadCohorts(programId) {
    if (!programId) {
      setCohorts([]);
      return;
    }

    const { data, error } = await supabase
      .from("cohorts")
      .select("id, cohort_code, cohort_name, start_date, end_date")
      .eq("program_id", programId)
      .in("status", ["Upcoming", "Active"])
      .order("cohort_name");

    if (!error) {
      setCohorts(data || []);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "program_id") {
      setForm((previous) => ({
        ...previous,
        program_id: value,
        cohort_id: "",
      }));

      loadCohorts(value);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setApplicationNumber("");

    if (!form.full_name || !form.phone || !form.program_id) {
      setMessage("Please complete all required fields.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("applications")
      .insert([
        {
          full_name: form.full_name,
          email: form.email || null,
          phone: form.phone,
          gender: form.gender || null,
          date_of_birth: form.date_of_birth || null,
          location: form.location || null,
          program_id: form.program_id,
          cohort_id: form.cohort_id || null,
          previous_education: form.previous_education || null,
          study_mode: form.study_mode || null,
          status: "Pending",
        },
      ])
      .select("application_number")
      .single();

    if (error) {
      setMessage(
        error.message ||
          "We could not submit your application. Please try again."
      );
      setLoading(false);
      return;
    }

    setApplicationNumber(data.application_number);
    setMessage(
      "Your application has been submitted successfully. Please keep your application number."
    );

    setForm({
      full_name: "",
      email: "",
      phone: "",
      gender: "",
      date_of_birth: "",
      location: "",
      program_id: "",
      cohort_id: "",
      previous_education: "",
      study_mode: "",
    });

    setCohorts([]);
    setLoading(false);
  }

  return (
    <main className="application-page">
      <div className="application-header">
        <button className="back-link" onClick={onBack}>
          ← Back to Portal
        </button>

        <p className="eyebrow">SLIPS ADMISSIONS</p>

        <h1>Start Your Application</h1>

        <p>
          Complete the form below to apply for admission to SUPDA Liberia
          Institute of Professional Studies.
        </p>
      </div>

      {applicationNumber && (
        <div className="success-box">
          <strong>Application Submitted Successfully</strong>

          <p>{message}</p>

          <div className="application-number">
            {applicationNumber}
          </div>

          <p>
            Please save this application number for your records.
          </p>
        </div>
      )}

      {!applicationNumber && message && (
        <div className="error-box">
          {message}
        </div>
      )}

      <form className="application-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-section-heading">
            <span>01</span>
            <div>
              <h2>Personal Information</h2>
              <p>Tell us about yourself.</p>
            </div>
          </div>

          <div className="form-grid">
            <label>
              Full Name <span>*</span>
              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </label>

            <label>
              Phone Number <span>*</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </label>

            <label>
              Email Address
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
              />
            </label>

            <label>
              Gender
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">
                  Prefer not to say
                </option>
              </select>
            </label>

            <label>
              Date of Birth
              <input
                type="date"
                name="date_of_birth"
                value={form.date_of_birth}
                onChange={handleChange}
              />
            </label>

            <label>
              Location
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="City / County"
              />
            </label>
          </div>
        </div>

        <div className="form-section">
          <div className="form-section-heading">
            <span>02</span>
            <div>
              <h2>Program Selection</h2>
              <p>Choose the professional program you want to study.</p>
            </div>
          </div>

          <div className="form-grid">
            <label>
              Program <span>*</span>

              <select
                name="program_id"
                value={form.program_id}
                onChange={handleChange}
                required
              >
                <option value="">
                  {loadingPrograms
                    ? "Loading programs..."
                    : "Select a program"}
                </option>

                {programs.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Cohort

              <select
                name="cohort_id"
                value={form.cohort_id}
                onChange={handleChange}
                disabled={!form.program_id}
              >
                <option value="">
                  {form.program_id
                    ? "Select a cohort"
                    : "Select a program first"}
                </option>

                {cohorts.map((cohort) => (
                  <option key={cohort.id} value={cohort.id}>
                    {cohort.cohort_name} ({cohort.cohort_code})
                  </option>
                ))}
              </select>
            </label>

            <label>
              Study Mode

              <select
                name="study_mode"
                value={form.study_mode}
                onChange={handleChange}
              >
                <option value="">Select study mode</option>
                <option value="Online">Online</option>
                <option value="In Person">In Person</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </label>
          </div>
        </div>

        <div className="form-section">
          <div className="form-section-heading">
            <span>03</span>
            <div>
              <h2>Educational Background</h2>
              <p>Provide your most recent educational information.</p>
            </div>
          </div>

          <label>
            Previous Education

            <textarea
              name="previous_education"
              value={form.previous_education}
              onChange={handleChange}
              placeholder="Example: High School Diploma, Bachelor's Degree, etc."
              rows="4"
            ></textarea>
          </label>
        </div>

        <div className="form-bottom">
          <p>
            By submitting this application, you confirm that the information
            provided is accurate to the best of your knowledge.
          </p>

          <button
            type="submit"
            className="primary-button submit-button"
            disabled={loading}
          >
            {loading ? "Submitting Application..." : "Submit Application"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default ApplicationForm;

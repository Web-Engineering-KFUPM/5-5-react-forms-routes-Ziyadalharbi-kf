import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";

// --- COMPONENTS FOR ROUTES ---

const Home = () => (
  <div className="page">
    <h1>Welcome to the Student Portal</h1>
    <p>This portal allows new students to register and access university resources.</p>
  </div>
);

const About = () => (
  <div className="page">
    <h1>About This App</h1>
    <p>This application was built using React Router for navigation and React Forms for data collection.</p>
    <ul>
      <li><strong>React Router:</strong> Handles SPA navigation.</li>
      <li><strong>Controlled Components:</strong> Manages form state.</li>
    </ul>
  </div>
);

const Registration = () => {
  // 1. Form State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    gender: ""
  });

  // 2. Error State
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // 3. Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 4. Form Validation & Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Email Validation: Required + "@" + ".com"
    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!formData.email.includes("@") || !formData.email.endsWith(".com")) {
      validationErrors.email = "Invalid email format (must include @ and .com)";
    }

    // Password Validation: Required
    if (!formData.password) {
      validationErrors.password = "Password is required";
    }

    // Gender Validation: Required
    if (!formData.gender) {
      validationErrors.gender = "Please select your gender";
    }

    setErrors(validationErrors);

    // Success check
    if (Object.keys(validationErrors).length === 0) {
      alert("Registration Successful!");
      console.log("Form Data:", formData);
      navigate("/"); // Redirect to home on success
    }
  };

  return (
    <div className="page">
      <h1>Student Registration</h1>
      <form onSubmit={handleSubmit} className="registration-form">
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
              /> Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
              /> Female
            </label>
          </div>
          {errors.gender && <p className="error-text">{errors.gender}</p>}
        </div>

        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="navbar">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>About</NavLink>
          <NavLink to="/registration" className={({ isActive }) => (isActive ? "active" : "")}>Registration</NavLink>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
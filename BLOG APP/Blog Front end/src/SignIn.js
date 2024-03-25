import React, { useState } from 'react';

function SignIn({ handleSuccessfulLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleLoginSuccess = (userData) => {
    // Storing user data in session storage
    sessionStorage.setItem('username', userData.username);
    sessionStorage.setItem('userId', userData.id); // Assuming the ID is available in the response as 'id'

    handleSuccessfulLogin(userData.username);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5500/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const userData = await response.json();
        handleLoginSuccess(userData); // On successful login, store user data in session storage
      } else {
        const errorData = await response.json();
        setError(errorData.error); // Set error message on failed login
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <div className="container d-flex justify-content-center my-5" style={{ minHeight: '50vh', maxWidth: '100vh' }}>
      <div className="col-md-6">
        <h2 className="mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;

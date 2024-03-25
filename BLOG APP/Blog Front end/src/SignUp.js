import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5500/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessMessage('Registration successful.');
                setErrorMessage(''); // Clear any previous error message
            } else {
                setSuccessMessage(''); // Clear any previous success message
                setErrorMessage('Registration failed.');
            }

            // Clear messages after 3 seconds
            setTimeout(() => {
                setSuccessMessage('');
                setErrorMessage('');
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className="container d-flex justify-content-center my-5" style={{ minHeight: '50vh', maxWidth: '100vh' }}>
            <div className="col-md-6">
                {successMessage && (
                    <div className="alert alert-success d-flex align-items-center" role="alert">
                        <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlinkHref="#check-circle-fill"/></svg>
                        <div>
                            {successMessage}
                        </div>
                    </div>
                )}

                {errorMessage && (
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlinkHref="#exclamation-triangle-fill"/></svg>
                        <div>
                            {errorMessage}
                        </div>
                    </div>
                )}

                <h2 className="mb-4 text-center">Sign Up</h2>
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
                            onChange={handleChange}
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
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;

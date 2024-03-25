import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const categories = [
    'Technology',
    'Travel',
    'Food',
    'Fashion',
    'Health',
    'Sports',
];

function CreateBlogForm() {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        imageUrl: '',
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
            const response = await fetch('http://localhost:5500/blogs/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    user: {
                        username: sessionStorage.getItem('username'), // Retrieve username from sessionStorage
                        id: sessionStorage.getItem('userId'), // Retrieve user ID from sessionStorage
                    },
                }),
            });

            if (response.ok) {
                setSuccessMessage('Blog posted successfully.');
                setErrorMessage('');
                setFormData({
                    title: '',
                    content: '',
                    category: '',
                    imageUrl: '',
                });
            } else {
                setSuccessMessage('');
                setErrorMessage('Failed to post the blog.');
            }
        } catch (error) {
            console.error('Error creating blog:', error);
            setErrorMessage('An error occurred while posting the blog.');
        }

        // Clear messages after 3 seconds
        setTimeout(() => {
            setSuccessMessage('');
            setErrorMessage('');
            navigate('/');
        }, 1500);
    };

    return (
        <div className="m-5">
            <h3>Create a New Blog</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">
                        Image URL
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                        Category
                    </label>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="content"
                        name="content"
                        rows="5"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button className="btn btn-primary" type="submit">
                    Submit
                </button>
            </form>
            {successMessage && (
                <div className="alert alert-success d-flex align-items-center my-2" role="alert">
                    <div>
                        {successMessage}
                    </div>
                </div>
            )}
            {errorMessage && (
                <div className="alert alert-danger d-flex align-items-center my-2" role="alert">
                    <div>
                        {errorMessage}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateBlogForm;

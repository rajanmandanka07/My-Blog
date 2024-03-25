import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const BlogPost = () => {
  const [blogPost, setBlogPost] = useState({});
  const { id } = useParams();
  
  const [loggedInUser, setLoggedInUser] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = sessionStorage.getItem('username');
    setLoggedInUser(userLoggedIn || ''); // Store the logged-in username
    fetch(`http://localhost:5500/blogs/post/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBlogPost(data);
      })
      .catch(error => {
        setErrorMessage('Error fetching data');
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:5500/blogs/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}` // Include access token if required
      },
    })
      .then(response => {
        if (response.ok) {
          setSuccessMessage('Blog post deleted successfully');
          // Redirect to home page after a short delay
          setTimeout(() => {
            navigate('/');
          }, 1500);
        } else {
          setErrorMessage('Failed to delete blog post');
          console.error('Failed to delete blog post');
        }
      })
      .catch(error => {
        setErrorMessage('Network error');
        console.error('Network error', error);
      });
  };

  return (
    <div>
      {/* Blog Image */}
      <div className="d-flex justify-content-center">
        <img
          src={blogPost.imageUrl}
          alt="Blog"
          className="container"
          style={{ maxHeight: '100vh', maxWidth: '100vh' }}
        />
      </div>

      {/* Blog Content */}
      <div className="container mt-4">
        <h1 className='text-center'>{blogPost.title}</h1>
        <p>
          {blogPost.content}
        </p>
        <h6>
          Category : {blogPost.category}
        </h6>
        {blogPost.author && blogPost.author._id ? (
          <h5  >Author ID: {blogPost.author.username}</h5>
        ) : (
          <div className="text-muted m-1">Author ID: N/A</div>
        )}
      </div>
      {(loggedInUser === blogPost.author?.username) && (
        <div>
          <Link to={`/edit-post/${id}`} className="btn btn-secondary m-3">
            Edit
          </Link>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
      {successMessage && (
        <div className="alert alert-success d-flex align-items-center my-2" role="alert">
          <div>{successMessage}</div>
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger d-flex align-items-center my-2" role="alert">
          <div>{errorMessage}</div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;

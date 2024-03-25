import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MyBlog() {
  const [blogData, setBlogData] = useState([]);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    fetch('http://localhost:5500/blogs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBlogData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const userBlogs = blogData.filter(blog => blog.author?._id === userId);

  return (
    <div className="my-3">
      {userBlogs.length > 0 ? (
        userBlogs.map(blog => (
          <div key={blog._id} className="card mb-3 m-" style={{ maxWidth: "1300px" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={blog.imageUrl} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text" style={{ maxHeight: "2.85em", overflow: "hidden" }}>
                    {blog.content}...
                  </p>
                  <div className="text-muted">Category: {blog.category}</div>
                  {blog.author && blog.author._id ? (
                    <div className="text-muted my-1">Author ID: {blog.author.username}</div>
                  ) : (
                    <div className="text-muted my-1">Author ID: N/A</div>
                  )}
                  <Link to={`/blog/post/${blog._id}`} className="btn btn-primary">
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        userBlogs.length === 0 ? <p>No Blogs are available for this user</p> : <p>Loading...</p>
      )}
    </div>
  )
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const categories = [
    'Technology',
    'Travel',
    'Food',
    'Fashion',
    'Health',
    'Sports',
];

export default function BlogItem() {
    const [blogData, setBlogData] = useState([]);
    const [blog, setBlog] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(''); // State to hold the selected category
    console.log(selectedCategory);

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
                setBlog(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const fetchBlogsByCategory = async (selectedCategory) => {
        try {
            const response = await fetch(`http://localhost:5500/blogs/${selectedCategory}`);
            if (response.ok) {
                const data = await response.json();

                if (data.length === 0) {
                    // Clear the blogs if no blogs are found for the category
                    setBlogData([]);
                } else {
                    setBlogData(data); // Set the fetched blogs based on the selected category
                }
            } else {
                console.error('Failed to fetch blogs');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCategoryClick = (category) => {
        if(selectedCategory === ''){
            setSelectedCategory(category);
            fetchBlogsByCategory(category); // Fetch blogs based on the selected category
        }
        else {
            setSelectedCategory('');
            setBlogData(blog);
        }
        
    };
    return (
        <div>
            <div className="categories">
                {categories.map((category, index) => (
                    <div key={index} className="category" onClick={() => handleCategoryClick(category)}>
                        {category}
                    </div>
                ))}
            </div>
            {blogData.length > 0 ? (
                blogData.map(blog => (
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
                blogData.length === 0 ? <p>No Blogs are available</p> : <p>Loading...</p>
            )}
        </div>
    );
}

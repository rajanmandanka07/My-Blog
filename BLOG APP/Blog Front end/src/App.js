import './App.css';
import Navbar from './Navbar';
import Blogitem from './Blogitem';
import CreateBlogForm from './CreateBlogForm';
import About from './About';
import BlogPost from './BlogPost';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyBlog from './MyBlog';
import EditBlog from './EditPost';
import ViewProfile from './ViewProfile';
import ContactUs from './ContactUs';


function App() {

  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          {/* <CreateBlogForm /> */}
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/edit-post/:id" element={<EditBlog />} />
            <Route path="/view-profile" element={<ViewProfile />} />
            <Route path="/my-blog" element={<MyBlog />} />
            <Route path="/blog/post/:id" element={<div className='my-4'><BlogPost /></div>} />
            <Route path="/new-post" element={<CreateBlogForm />} /> {/* Route for creating a new blog post */}
            <Route path="/" element={<div>
              <Blogitem />
            </div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

// Create a new blog post
router.post('/post', async (req, res) => {
    try {
        const { title, content, category, imageUrl } = req.body;

        // Assuming the user information is stored in the request object after successful authentication
        const user = req.body.user;
        console.log(user);
        if (!user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const blog = new Blog({
            title,
            content,
            category,
            imageUrl,
            author: user.id, // Assuming user._id contains the unique identifier of the user
        });

        await blog.save();
        res.json({ message: 'Blog post created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate('author', 'username');
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Get all blogs by category
router.get('/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const blogs = await Blog.find({ category }).populate('author', 'username');
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Get a blog post by ID
router.get('/post/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId).populate('author', 'username');

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Update a blog post by ID
router.put('/:id', async (req, res) => {
    try {
        const { title, content, category, imageUrl } = req.body;
        const blogId = req.params.id;

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        blog.title = title;
        blog.content = content;
        blog.category = category;
        blog.imageUrl = imageUrl;

        await blog.save();
        res.json({ message: 'Blog post updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Delete a blog post by ID
router.delete('/:id', async (req, res) => {
    try {
        const blogId = req.params.id;

        const blog = await Blog.findById(blogId);
        
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Ensure to delete the blog post
        await Blog.findByIdAndDelete(blogId);
        res.json({ message: 'Blog post deleted successfully' });
        console.log("Blog Deleted Successfuly");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});
module.exports = router;

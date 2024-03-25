const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');
const User = require('../models/User');

require('dotenv').config();

// Ragister new user
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create a new user with a plain text password
    const user = new User({ username, password });
    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Login with username and password
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Store user data in the session upon successful login
    req.session.user = user;
    console.log( req.session.user);
    // Respond with username and id on successful login
    res.json({
      message: 'User login successfully',
      username: user.username,
      id: user.id
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

//Logout
router.post('/logout', (req, res) => {
  try {
    // Clear the user session
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'An error occurred during logout' });
      }
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.json({ message: 'User logged out successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const session = require('express-session');
const cors = require('cors');

app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/blogapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Setup session middleware without a specific store
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }, // Set session duration (in this case, 1 day)
}));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());

// Authentication routes
app.use('/auth', authRoutes);

// Blog routes
app.use('/blogs', blogRoutes);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

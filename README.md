# MyBlog App

MyBlog is a full-stack MERN (MongoDB, Express, React, Node.js) web application that allows users to create, edit, and delete blog posts. Users can also view blogs by category and contact the site owners through the contact form. This project uses JWT (JSON Web Tokens) for authentication.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

## Features

- User authentication (signup, login, logout)
- Create, edit, and delete blog posts
- View blogs by category
- Contact us

## Technologies Used

- Frontend: React, Bootstrap
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rajanmandanka07/My-Blog.git
   ```

2. Install dependencies:

   ```bash
   cd myblog
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```bash
   PORT=3001
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Visit `http://localhost:3000` in your browser to view the app.

## Usage

- Register a new account or login with existing credentials.
- Create a new blog post by clicking on the "New Post" button.
- Edit or delete existing blog posts.
- View blogs by category using the navigation menu.
- Use the contact detail to contact to the site owners.

## Screenshots

![Screenshot 2024-03-25 212155](https://github.com/rajanmandanka07/My-Blog/assets/119439834/58f7c849-d3d1-4a85-9fe3-05edec7c66ab)

![Screenshot 2024-03-25 212209](https://github.com/rajanmandanka07/My-Blog/assets/119439834/d5c0904a-28b6-4605-ad50-37185c65eef5)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

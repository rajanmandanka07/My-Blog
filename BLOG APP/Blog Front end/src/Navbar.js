import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Link } from "react-router-dom";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    const handleSignInClick = () => {
        if (showSignIn) {
            setShowSignIn(false);
        } else {
            setShowSignIn(true);
        }
        setShowSignUp(false);
    };

    const handleSignUpClick = () => {
        if (showSignUp) {
            setShowSignUp(false);
        } else {
            setShowSignUp(true);
        }
        setShowSignIn(false);
    };

    const handleSuccessfulLogin = (username) => {
        setShowSignIn(false);
        setShowSignUp(false);
        setIsLoggedIn(true);
        setUsername(username);
        console.log(username);
    };

    const handleLogout = async () => {
        setIsLoggedIn(false);
        // Clear user data from session storage
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userId');
        setUsername('');
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Blog App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            {isLoggedIn && (
                                <>
                                    <li className="nav-item">
                                        <Link to="/new-post" className="btn btn-dark mx-1">New Post</Link> {/* Link to create a new blog post */}
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/my-blog">My Blog</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link disabled" to="/favorites">Favorites</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Settings
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to="/view-profile">View Profile</Link></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><Link className="dropdown-item disabled" to="/" aria-disabled="true">Edit Profile</Link></li>
                                        </ul>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About US</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact US</Link>
                            </li>
                        </ul>
                    </div>
                    {!isLoggedIn ? (
                        <div>
                            <button type="button" className="btn btn-primary mx-1" onClick={handleSignInClick}>
                                Login
                            </button>
                            <button type="button" className="btn btn-outline-primary mx-1" onClick={handleSignUpClick}>
                                Sign Up
                            </button>
                        </div>
                    ) : (
                        <div>
                            <span style={{ color: 'white', marginRight: '10px' }}>
                                Welcome, {username}
                            </span>
                            <Link to="/" onClick={handleLogout}>Logout</Link> {/* Add a logout link or button */}
                        </div>
                    )}
                </div>
            </nav>
            {showSignIn && <SignIn handleSuccessfulLogin={handleSuccessfulLogin} />}
            {showSignUp && <SignUp />}
        </>
    )
}

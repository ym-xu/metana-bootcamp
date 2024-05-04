import React from 'react';
import { Link } from 'react-router-dom';

const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#333',
    color: '#fff',
    padding: '10px'
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    marginRight: '10px'
};

function Navbar() {
    return (
        <nav style={navbarStyle}>
            <div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    <li style={{ display: 'inline' }}>
                        <Link to="/" style={linkStyle}>Home</Link>
                    </li>
                    <li style={{ display: 'inline' }}>
                        <Link to="/blogs" style={linkStyle}>Blog</Link>
                    </li>
                    <li style={{ display: 'inline' }}>
                        <Link to="/create" style={linkStyle}>Create</Link>
                    </li>
                    <li style={{ display: 'inline' }}>
                        <Link to="/about" style={linkStyle}>About</Link>
                    </li>
                </ul>
            </div>
            <div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    <li style={{ display: 'inline' }}>
                        <Link to="/register" style={linkStyle}>Register</Link>
                    </li>
                    <li style={{ display: 'inline' }}>
                        <Link to="/login" style={linkStyle}>Login</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
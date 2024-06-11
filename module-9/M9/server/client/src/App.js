import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import Create from './pages/Create';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import BlogDetail from './pages/BlogDetail';
import EditBlog from './components/Edit';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsAuthenticated(isLoggedIn);
    }, []);

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <div className="min-h-screen bg-gray-100">
                <div className="container mx-auto px-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/blogs" element={<Blogs isAuthenticated={isAuthenticated} />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/blog/:id" element={<BlogDetail />} />
                        <Route path="/edit/:id" element={<EditBlog />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

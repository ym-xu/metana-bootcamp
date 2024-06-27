import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
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
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard'
import axios from 'axios';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsAuthenticated(isLoggedIn);
    }, []);

    useEffect(() => {
        const fetchAdminStatus = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
            const response = await axios.get('/api/auth/admin', {
                headers: {
                Authorization: `Bearer ${token}`
                }
            });
            console.log("response.data.isAdmin:", response.data.user.role);
            setIsAdmin(response.data.user.role == 'admin');
            console.log("isAdmin ... :", isAuthenticated, isAdmin);
            } catch (error) { 
            console.error("Error fetching admin status:", error);
            setIsAdmin(false);
            }
        } else {
            setIsAdmin(false);
        }
        };
    
        fetchAdminStatus();
    }, [isAuthenticated]);


    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <div className="min-h-screen bg-gray-100">
                <div className="container mx-auto px-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* <Route path="/blogs" element={<Blogs setIsAuthenticated = {setIsAuthenticated}  />} /> */}
                        <Route path="/blogs" 
                            element={isAdmin
                                ? <Dashboard setIsAuthenticated={setIsAuthenticated} isAdmin = {isAdmin}/>
                                : <Blogs setIsAuthenticated = {setIsAuthenticated} />
                            }
                        />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/create" 
                            element={
                                <ProtectedRoute requiredRole="admin">
                                    <Create />
                                </ProtectedRoute>
                            } />
                        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/blog/:id" element={<BlogDetail />} />
                        <Route path="/edit/:id" element={<EditBlog />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

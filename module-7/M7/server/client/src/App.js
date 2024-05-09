import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import Create from './pages/Create';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';


function App() {
    return (
        <Router>
            <div>
                <Navbar />
                    <Routes>
                        <Route exact path="/" element={<Home/>} />
                        <Route path="/Blogs" element={<Blogs/>} />
                        <Route path="/contact" element={<Contact/>} />
                        <Route path="/about" element={<About/>} />
                        <Route path="/create" element={<Create/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/register" element={<Register/>} />
                    </Routes>
            </div>
        </Router>
    );
}

export default App;


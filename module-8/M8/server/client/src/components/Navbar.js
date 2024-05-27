import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-black text-white h-16 flex items-center justify-between px-10 sticky top-0 left-0 right-0 z-10">
            <Link to="/" className="text-xl font-semibold no-underline hover:text-gray-300">Yiming</Link>
            <div className="flex items-center">
                <Link to="/" className="mx-4 text-white no-underline hover:text-gray-300">Home</Link>
                <Link to="/create" className="mx-4 text-white no-underline hover:text-gray-300">Create</Link>
                <Link to="/login" className="mx-4 text-white no-underline hover:text-gray-300">Login</Link>
            </div>
        </nav>
    );
}

export default Navbar;

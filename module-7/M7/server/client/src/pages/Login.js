import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to the backend to authenticate the user
            const response = await axios.post('/api/auth/login', { email, password });
            // Assuming the server returns a token upon successful login
            const token = response.data.token;
            // Store the token in local storage or session storage for authentication
            localStorage.setItem('token', token);
            localStorage.setItem('isLoggedIn', 'true');
            // Redirect the user to a protected route or dashboard after login
            window.location.href = '/';
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="String"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="String"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <Footer />
        </div>
    );
}

export default Login;
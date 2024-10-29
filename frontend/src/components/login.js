import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', { "username" : username, "password" : password });
            
            localStorage.setItem('token', response.data.access_token);
            // navigate('/dashboard');

            // Decode the token to get user information
            const decodedToken = jwtDecode(response.data.access_token);

            const role = decodedToken.sub['role'];
            // Check user role and navigate accordingly
            if (role === 'admin') {
                navigate('/admin/dashboard'); // Redirect to admin dashboard
            } else if (role === 'user') {
                navigate('/user/dashboard'); // Redirect to user dashboard
            } else {
                alert('Unknown role');
            }

        } catch (error) {
            console.error('Login failed:', error);
            alert('Invalid username or password');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

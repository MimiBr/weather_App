import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { login } from '../service/loginService'
import { useNavigate } from 'react-router-dom';
import './loginRegister.css'; 

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const data = await login(username, password); 
            localStorage.setItem('token', data.token); 
            alert('Login successful!');
          } catch (error) {
            setError('The username or password you entered is not correct');
          }
    };

    const handleRegister = () => {
        navigate('/register'); 
    };

    return (
        <div className="auth-container">
            <Box
                component="form"
                className="auth-box"
                noValidate
                autoComplete="off"
            >
                <h2 className="auth-title">Login</h2>
                <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    className="auth-input"
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    className="auth-input"
                />
                {error && <div className="error-message">{error}</div>}
                <Button variant="contained" fullWidth className="auth-button" onClick={handleSubmit}>Login</Button>
                <Button variant="outlined" fullWidth className="auth-button" onClick={handleRegister}>Register</Button>
            </Box>
        </div>
    )
}
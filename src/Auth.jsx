import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { signIn, signUp } from './api';

const Auth = ({onAuthSuccess}) => {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: ''});
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = isSignup ? await signUp(formData) : await signIn(formData);

            localStorage.setItem('profile', JSON.stringify(data));
            onAuthSuccess(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed');
        }
    };

    return (
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#00041ccb',
            zIndex: 1000,
        }}>
            <Paper 
                elevation={6} 
                sx={{
                    p: '4vh',
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    borderRadius: '2vw',
                    width: '30vw',
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ fontSize: '1.5vw', mb: '2vh' }}>
                    {isSignup ? 'Register' : 'Login'}
                </Typography>

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField 
                        fullWidth 
                        label="Email Address" 
                        margin="normal" 
                        required
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        sx={{ mb: '1vh' }}
                    />
                    <TextField 
                        fullWidth 
                        label="Password" 
                        type="password" 
                        margin="normal" 
                        required
                        onChange={(e) => setFormData({...formData, password: e.target.value})} 
                        sx={{ mb: '1vh' }}
                    />

                    {error && (
                        <Typography 
                            color="error" 
                            variant="body2" 
                            sx={{ fontSize: '0.8vw', mt: '1vh' }}
                        >
                            {error}
                        </Typography>
                    )}

                    <Button 
                        type="submit" 
                        fullWidth 
                        variant="contained" 
                        color="primary" 
                        sx={{ 
                            mt: '3vh', 
                            mb: '1vh', 
                            height: '5vh', 
                            fontSize: '0.9vw' 
                        }}
                    >
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <Button 
                        fullWidth 
                        onClick={() => setIsSignup(!isSignup)}
                        sx={{ fontSize: '0.7vw' }}
                    >
                        {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Auth;
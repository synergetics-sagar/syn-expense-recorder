import React, { useState } from 'react';
import { Box, Tabs, Tab, TextField, Button, Typography, AppBar } from '@mui/material';

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState(0); // Track active tab (0 for Login, 1 for Signup)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '' // For signup only
  });

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab); // Switch between Login and Signup tabs
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',  // Vertically center the form in the viewport
      padding: 2
    }}>
      {/* AppBar with Tabs for Login/Signup */}
      <Box sx={{ maxWidth: 400, width: '100%' }}>
        <AppBar position="static" sx={{ backgroundColor: '#fff', color: '#000' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="login-signup-tabs"
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 600,
                color: '#757575', // Inactive tabs color
              },
              '& .Mui-selected': {
                color: '#1976d2', // Active tab color
              },
            }}
          >
            <Tab label="Login" />
            <Tab label="Signup" />
          </Tabs>
        </AppBar>

        {/* Login/Signup Form */}
        <form onSubmit={handleSubmit}>
          {activeTab === 0 ? (
            // Login Form
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>Login</Typography>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              />
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Box>
          ) : (
            // Signup Form
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>Signup</Typography>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              />
              <Button type="submit" variant="contained" fullWidth>
                Signup
              </Button>
            </Box>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default AuthForm;

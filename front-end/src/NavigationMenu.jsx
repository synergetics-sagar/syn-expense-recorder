import React, { useState } from 'react';
import { Box, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, AppBar, Button } from '@mui/material';
import { Menu, ExitToApp, Category, AccountBalance } from '@mui/icons-material';
import {Outlet, useNavigate} from "react-router-dom"
const NavigationMenu = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
    const navigate = useNavigate()
  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleNavigation = (route) => {
    navigate(route)
    setOpenSidebar(false); // Close the sidebar after navigation
  };

  return (
    <Box>
      {/* AppBar (Navigation bar at the top) */}
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
            <Menu />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={() => handleNavigation('/expenses')}>
            Expense Recorder
          </Typography>
          {/* Optional Logout button on the top-right */}
          <Button color="inherit" onClick={() => handleNavigation('/logout')}>Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar (Drawer) */}
      <Drawer open={openSidebar} onClose={toggleSidebar}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleSidebar}
          onKeyDown={toggleSidebar}
        >
          <List>
            <ListItem button onClick={() => handleNavigation('/expenses')}>
              <ListItemIcon>
                <AccountBalance />
              </ListItemIcon>
              <ListItemText primary="Expenses" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/categories')}>
              <ListItemIcon>
                <Category />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/logout')}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      
      <Outlet />
    </Box>
  );
};

export default NavigationMenu;

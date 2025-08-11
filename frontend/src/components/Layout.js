// src/components/Layout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Leads', icon: <PeopleIcon />, path: '/leads' },
    { text: 'Tickets', icon: <SupportAgentIcon />, path: '/tickets' },
  ];

  // Safe avatar initial calculation
  const getAvatarInitial = () => {
    if (!user) return '?';
    if (user.fullName && user.fullName.length > 0) return user.fullName.charAt(0);
    if (user.email && user.email.length > 0) return user.email.charAt(0);
    return '?';
  };

  // Safe user display name
  const getUserDisplayName = () => {
    if (!user) return 'Guest';
    if (user.fullName) return user.fullName;
    if (user.email) return user.email;
    return 'User';
  };

  return (
    <div className="layout">
      <AppBar position="fixed" className="app-bar">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Customer Relationship Manager
          </Typography>

          {/* Safe user display with loading state */}
          {!loading && user && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: blue[500], width: 32, height: 32, fontSize: 14 }}>
                {getAvatarInitial()}
              </Avatar>
              <Typography variant="body2" sx={{ ml: 1 }}>
                {getUserDisplayName()}
              </Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <ListItem button onClick={logout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <main className="content">
        <Toolbar /> {/* Spacer for app bar */}
        <Outlet />
        {children}
      </main>
    </div>
  );
};

export default Layout;
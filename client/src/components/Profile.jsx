import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import {
  Close,
  Person,
  ShoppingBag,
  Favorite,
  Settings,
  Logout,
  Login,
  HowToReg,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
  open: boolean;
  onClose: () => void;
}

const Profile: React.FC<ProfileProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to update the user's profile
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogin = () => {
    // Simulate login
    setIsLoggedIn(true);
    setUserData({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({
      name: '',
      email: '',
      phone: '',
    });
    onClose();
  };

  const menuItems = [
    { icon: <ShoppingBag />, text: 'My Orders', path: '/orders' },
    { icon: <Favorite />, text: 'Wishlist', path: '/wishlist' },
    { icon: <Settings />, text: 'Settings', path: '/settings' },
  ];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Profile</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {!isLoggedIn ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{ width: 100, height: 100, mb: 2 }}
            >
              <Person sx={{ fontSize: 60 }} />
            </Avatar>
            <Typography variant="h6" sx={{ mb: 2 }}>Not Signed In</Typography>
            <Button 
              variant="contained" 
              startIcon={<Login />} 
              onClick={handleLogin}
              sx={{ mb: 2, width: '100%' }}
            >
              Sign In
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<HowToReg />} 
              onClick={() => handleNavigation('/signup')}
              sx={{ width: '100%' }}
            >
              Create Account
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{ width: 100, height: 100, mb: 2 }}
              src="/path-to-profile-image.jpg"
            />
            {isEditing ? (
              <>
                <TextField
                  fullWidth
                  label="Name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Phone"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={handleSave} sx={{ mb: 1 }}>
                  Save Changes
                </Button>
                <Button onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h6">{userData.name}</Typography>
                <Typography color="textSecondary">{userData.email}</Typography>
                <Typography color="textSecondary">{userData.phone}</Typography>
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing(true)}
                  sx={{ mt: 2 }}
                >
                  Edit Profile
                </Button>
              </>
            )}
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        <List>
          {isLoggedIn && menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleNavigation(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          {isLoggedIn ? (
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/settings')}>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default Profile; 
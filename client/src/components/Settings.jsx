import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Switch,
  FormControlLabel,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Close,
  Notifications,
  Language,
  Security,
  Payment,
  Help,
  DarkMode,
  Email,
  Phone,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ImageUpdater from './ImageUpdater';

const Settings = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('usd');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

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
          <Typography variant="h6">Settings</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <ImageUpdater />

        <List>
          <ListItem>
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
            <Switch
              edge="end"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <DarkMode />
            </ListItemIcon>
            <ListItemText primary="Dark Mode" />
            <Switch
              edge="end"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText primary="Language" />
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                displayEmpty
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Español</MenuItem>
                <MenuItem value="fr">Français</MenuItem>
                <MenuItem value="de">Deutsch</MenuItem>
              </Select>
            </FormControl>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Payment />
            </ListItemIcon>
            <ListItemText primary="Currency" />
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                displayEmpty
              >
                <MenuItem value="usd">USD ($)</MenuItem>
                <MenuItem value="eur">EUR (€)</MenuItem>
                <MenuItem value="gbp">GBP (£)</MenuItem>
                <MenuItem value="jpy">JPY (¥)</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" sx={{ mb: 1 }}>Contact Preferences</Typography>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Email Notifications"
        />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="SMS Notifications"
        />

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" sx={{ mb: 1 }}>Account Security</Typography>
        <Button
          variant="outlined"
          fullWidth
          sx={{ mb: 1 }}
          onClick={() => handleNavigation('/change-password')}
        >
          Change Password
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{ mb: 1 }}
          onClick={() => handleNavigation('/two-factor')}
        >
          Two-Factor Authentication
        </Button>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" sx={{ mb: 1 }}>Help & Support</Typography>
        <Button
          variant="outlined"
          fullWidth
          sx={{ mb: 1 }}
          onClick={() => handleNavigation('/faq')}
        >
          FAQ
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{ mb: 1 }}
          onClick={() => handleNavigation('/contact')}
        >
          Contact Support
        </Button>
      </Box>
    </Drawer>
  );
};

export default Settings; 
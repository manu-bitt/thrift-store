import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Lock,
  Security,
  QrCode2,
  CheckCircle,
  Error,
} from '@mui/icons-material';

const UserSettings = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' | 'error',
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'New passwords do not match',
        severity: 'error',
      });
      return;
    }

    // Here you would typically send the password change request to your backend
    console.log('Password change requested:', passwordData);
    
    setSnackbar({
      open: true,
      message: 'Password changed successfully',
      severity: 'success',
    });

    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handle2FAToggle = () => {
    if (!twoFactorEnabled) {
      setShowQRCode(true);
    } else {
      // Here you would typically send a request to disable 2FA
      setTwoFactorEnabled(false);
      setSnackbar({
        open: true,
        message: 'Two-factor authentication disabled',
        severity: 'success',
      });
    }
  };

  const handleVerify2FA = () => {
    // Here you would typically verify the code with your backend
    if (verificationCode === '123456') { // This is just for demonstration
      setTwoFactorEnabled(true);
      setShowQRCode(false);
      setVerificationCode('');
      setSnackbar({
        open: true,
        message: 'Two-factor authentication enabled successfully',
        severity: 'success',
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Invalid verification code',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Account Settings
      </Typography>

      <Grid container spacing={4}>
        {/* Password Change Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Lock sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h6">Change Password</Typography>
            </Box>
            <form onSubmit={handlePasswordSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    label="Current Password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    label="New Password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    label="Confirm New Password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Lock />}
                  >
                    Update Password
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Two-Factor Authentication Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Security sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h6">Two-Factor Authentication</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Enable two-factor authentication
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add an extra layer of security to your account by requiring a verification code
                  in addition to your password when signing in.
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={twoFactorEnabled}
                    onChange={handle2FAToggle}
                    color="primary"
                  />
                }
                label={twoFactorEnabled ? 'Enabled' : 'Disabled'}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* 2FA Setup Dialog */}
      <Dialog open={showQRCode} onClose={() => setShowQRCode(false)}>
        <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', my: 2 }}>
            <QrCode2 sx={{ fontSize: 200, color: 'primary.main' }} />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Scan this QR code with your authenticator app
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowQRCode(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleVerify2FA}
            startIcon={<CheckCircle />}
          >
            Verify
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserSettings; 
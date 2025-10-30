import React from 'react';
import { Container, Typography, Box, Paper, Grid, TextField, Button } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';

const Contact = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Contact Us
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" align="center" sx={{ mb: 6 }}>
        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <Email sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h6" component="h2" gutterBottom>
                Email
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center">
                support@thriftstore.com
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <Phone sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h6" component="h2" gutterBottom>
                Phone
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center">
                +1 (555) 123-4567
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <LocationOn sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h6" component="h2" gutterBottom>
                Address
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center">
                123 Thrift Street<br />
                San Francisco, CA 94105
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Send us a Message
            </Typography>
            <Box component="form" sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Subject"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ mt: 2 }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact; 
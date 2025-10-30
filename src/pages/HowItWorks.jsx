import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  ShoppingBag,
  Sell,
  Security,
  LocalShipping,
  Payment,
  Verified,
  Support,
  Recycling,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 700 }}
        >
          How ThriftStore Works
        </Typography>

        {/* Buying Section */}
        <motion.div variants={itemVariants}>
          <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
              <ShoppingBag sx={{ mr: 2, verticalAlign: 'middle' }} />
              How to Buy
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Verified color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Browse Authenticated Items"
                  secondary="Explore our curated collection of verified pre-loved items"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Payment color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Secure Payment"
                  secondary="Make purchases with confidence using our secure payment system"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocalShipping color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Fast Shipping"
                  secondary="Enjoy quick and reliable delivery of your purchases"
                />
              </ListItem>
            </List>
          </Paper>
        </motion.div>

        {/* Selling Section */}
        <motion.div variants={itemVariants}>
          <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
              <Sell sx={{ mr: 2, verticalAlign: 'middle' }} />
              How to Sell
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Verified color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="List Your Items"
                  secondary="Create detailed listings with high-quality photos and descriptions"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Security color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Authentication Process"
                  secondary="Our team verifies the authenticity of your items"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Payment color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Get Paid"
                  secondary="Receive payment once your item is sold"
                />
              </ListItem>
            </List>
          </Paper>
        </motion.div>

        {/* Site Features */}
        <motion.div variants={itemVariants}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
              <Recycling sx={{ mr: 2, verticalAlign: 'middle' }} />
              Why Choose ThriftStore
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Security color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="100% Authentic"
                      secondary="Every item is verified by our expert team"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Recycling color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Sustainable Fashion"
                      secondary="Join the movement towards eco-friendly shopping"
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Support color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="24/7 Support"
                      secondary="Our customer service team is always here to help"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocalShipping color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Global Shipping"
                      secondary="We ship to customers worldwide"
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default HowItWorks; 
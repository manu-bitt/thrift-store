import React from 'react';
import { Container, Typography, Box, Grid, Paper, Button, Avatar, Divider, useTheme } from '@mui/material';
import { 
  Recycling, 
  People, 
  Verified, 
  ShoppingBag, 
  LocalShipping, 
  Security, 
  Email, 
  Phone, 
  LocationOn,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ghibliImage from '../assets/images/ghibli.png';

const About = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const handleLearnMore = () => {
    // Scroll to the mission section
    const missionSection = document.getElementById('mission');
    if (missionSection) {
      missionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShopNow = () => {
    navigate('/shop');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 2
            }}
          >
            About ThriftStore
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
          >
            Your premier destination for sustainable fashion and unique pre-loved treasures
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              mb: 4,
              opacity: 0.9,
            }}
          >
            Find your next favorite piece while supporting sustainable fashion
          </Typography>
        </Box>
      </motion.div>
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Box id="mission" sx={{ my: 6 }}>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              color: theme.palette.primary.main,
              mb: 3
            }}
          >
            Our Mission
          </Typography>
          <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            At ThriftStore, we're passionate about sustainable fashion and giving pre-loved items a second life. 
            Our platform connects sellers and buyers in a community dedicated to reducing waste and promoting 
            conscious consumption. We believe that fashion can be both stylish and sustainable, and we're committed
            to making that vision a reality.
          </Typography>
        </Box>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <Grid container spacing={4} sx={{ my: 6 }}>
          <Grid item xs={12} md={4}>
            <motion.div variants={fadeIn}>
              <Paper 
                sx={{ 
                  p: 4, 
                  height: '100%',
                  borderRadius: 2,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: theme.palette.primary.main,
                      width: 60,
                      height: 60
                    }}
                  >
                    <Recycling fontSize="large" />
                  </Avatar>
                </Box>
                <Typography 
                  variant="h5" 
                  gutterBottom
                  sx={{ 
                    textAlign: 'center',
                    fontWeight: 600,
                    color: theme.palette.primary.main
                  }}
                >
                  Sustainable Fashion
                </Typography>
                <Typography sx={{ textAlign: 'center' }}>
                  By choosing pre-loved items, you're helping reduce the environmental impact of fast fashion 
                  and supporting a more sustainable approach to style. Every purchase contributes to a greener planet.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div variants={fadeIn}>
              <Paper 
                sx={{ 
                  p: 4, 
                  height: '100%',
                  borderRadius: 2,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: theme.palette.primary.main,
                      width: 60,
                      height: 60
                    }}
                  >
                    <People fontSize="large" />
                  </Avatar>
                </Box>
                <Typography 
                  variant="h5" 
                  gutterBottom
                  sx={{ 
                    textAlign: 'center',
                    fontWeight: 600,
                    color: theme.palette.primary.main
                  }}
                >
                  Community Driven
                </Typography>
                <Typography sx={{ textAlign: 'center' }}>
                  Our platform is built on trust and community. We bring together fashion enthusiasts who share 
                  a passion for unique finds and sustainable living. Join a community that values style and sustainability.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div variants={fadeIn}>
              <Paper 
                sx={{ 
                  p: 4, 
                  height: '100%',
                  borderRadius: 2,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: theme.palette.primary.main,
                      width: 60,
                      height: 60
                    }}
                  >
                    <Verified fontSize="large" />
                  </Avatar>
                </Box>
                <Typography 
                  variant="h5" 
                  gutterBottom
                  sx={{ 
                    textAlign: 'center',
                    fontWeight: 600,
                    color: theme.palette.primary.main
                  }}
                >
                  Quality Assured
                </Typography>
                <Typography sx={{ textAlign: 'center' }}>
                  Every item listed on our platform undergoes a quality check to ensure you receive exactly 
                  what you expect. We stand behind the quality of every product we sell.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Box sx={{ my: 6, textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              color: theme.palette.primary.main,
              mb: 3
            }}
          >
            How It Works
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ p: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.primary.main,
                    width: 60,
                    height: 60,
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <ShoppingBag fontSize="large" />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  Browse
                </Typography>
                <Typography>
                  Explore our curated collection of pre-loved items
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ p: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.primary.main,
                    width: 60,
                    height: 60,
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <Security fontSize="large" />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  Find
                </Typography>
                <Typography>
                  Discover unique pieces at great prices
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ p: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.primary.main,
                    width: 60,
                    height: 60,
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <LocalShipping fontSize="large" />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  Purchase
                </Typography>
                <Typography>
                  Make a purchase or list your own items
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ p: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.primary.main,
                    width: 60,
                    height: 60,
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <People fontSize="large" />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  Join
                </Typography>
                <Typography>
                  Become part of our sustainable fashion community
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Box sx={{ my: 6, textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              color: theme.palette.primary.main,
              mb: 3
            }}
          >
            Our Team
          </Typography>
          <Typography paragraph sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
            Meet the visionary behind ThriftStore
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 180, 
                    height: 180, 
                    mx: 'auto',
                    mb: 2,
                    border: `4px solid ${theme.palette.primary.main}`
                  }}
                  src={ghibliImage}
                  alt="Meet Kumar"
                />
                <Typography variant="h5" gutterBottom>
                  Meet Kumar
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Founder & CEO
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Box sx={{ my: 6, textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              color: theme.palette.primary.main,
              mb: 3
            }}
          >
            Connect With Us
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, cursor: 'pointer' }}>
              <Facebook />
            </Avatar>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, cursor: 'pointer' }}>
              <Twitter />
            </Avatar>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, cursor: 'pointer' }}>
              <Instagram />
            </Avatar>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, cursor: 'pointer' }}>
              <LinkedIn />
            </Avatar>
          </Box>
          <Paper 
            sx={{ 
              p: 4, 
              maxWidth: '600px', 
              mx: 'auto',
              borderRadius: 2,
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
            }}
          >
            <Typography variant="h5" gutterBottom>
              Contact Us
            </Typography>
            <Typography paragraph>
              Have questions? We'd love to hear from you!
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email color="primary" />
                <Typography>support@thriftstore.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone color="primary" />
                <Typography>+1 (555) 123-4567</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn color="primary" />
                <Typography>123 Fashion Street, Style City, SC 12345</Typography>
              </Box>
            </Box>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              sx={{ mt: 3 }}
            >
              Send Us a Message
            </Button>
          </Paper>
        </Box>
      </motion.div>
    </Container>
  );
};

export default About; 
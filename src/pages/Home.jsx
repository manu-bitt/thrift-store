import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box, Paper, Chip, Stack, IconButton, Badge, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { LocalShipping, Security, Support, Favorite, FavoriteBorder, ShoppingCart } from '@mui/icons-material';
import { useWishlist } from '../context/WishlistContext';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  backgroundImage: 'url("https://fuel4fashion.wordpress.com/wp-content/uploads/2015/06/brand-identity-copy2.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  transition: 'all 0.3s ease',
  border: '2px solid transparent',
  '&:hover': {
    border: '2px solid black',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.4)',
    zIndex: 1,
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  color: theme.palette.common.white,
  padding: theme.spacing(4),
  maxWidth: '800px',
  margin: '0 auto',
}));

const HeroButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(1.5, 3),
  fontSize: '1.1rem',
  fontWeight: 600,
  borderRadius: '30px',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[4],
  },
}));

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { addItem, removeItem, isInWishlist } = useWishlist();

  const featuredItems = [
    {
      id: 1,
      title: 'Vintage Denim Jacket',
      price: 89.99,
      image: 'https://levi.in/cdn/shop/files/6bf78008b77807ca8888a80a02e518b4.jpg?v=1740740507',
      tag: 'Popular',
      description: "Classic blue denim jacket from the 90s, perfect condition",
      images: [
        "https://levi.in/cdn/shop/files/6bf78008b77807ca8888a80a02e518b4.jpg?v=1740740507",
        "https://levi.in/cdn/shop/files/fa1a7deb0d9c087fad2734c4d3f1123c.jpg?v=1740740507",
        "https://levi.in/cdn/shop/files/8e13a4f01eab2496a1fd553d28b2240f.jpg?v=1740740507"
      ],
      condition: "Excellent",
      year: 1995,
      lowestAsk: 79.99,
      highestBid: 99.99,
      totalSales: 15,
      sizes: ["M", "L"],
      category: "Jackets",
      brand: "Levi's",
      lastUpdated: "2024-04-21",
      stock: 1
    },
    {
      id: 2,
      title: 'Retro Sneakers',
      price: 129.99,
      image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1983f2e1-0271-479c-bada-6176a571fa4f/NIKE+VOMERO+18.png',
      tag: 'New',
      description: "Vintage running shoes in great condition",
      images: [
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1983f2e1-0271-479c-bada-6176a571fa4f/NIKE+VOMERO+18.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/845727d1-ba37-418a-a382-23d421ac82c8/NIKE+VOMERO+18.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/2946648c-e96e-490a-a1e8-284c2a5fa653/NIKE+VOMERO+18.png"
      ],
      condition: "Good",
      year: 1998,
      lowestAsk: 119.99,
      highestBid: 139.99,
      totalSales: 8,
      sizes: ["42", "43"],
      category: "Shoes",
      brand: "Nike",
      lastUpdated: "2024-04-21",
      stock: 1
    },
    {
      id: 3,
      title: 'Classic Watch',
      price: 45.99,
      image: 'https://shop.timexindia.com/cdn/shop/files/TW2Y02200_363x.jpg?v=1740484984',
      tag: 'Limited',
      description: "Vintage watch from the 70s, still working perfectly",
      images: [
        "https://shop.timexindia.com/cdn/shop/files/TW2Y02200_363x.jpg?v=1740484984",
        "https://shop.timexindia.com/cdn/shop/files/TW2Y02200_E_363x.jpg?v=1740484984",
        "https://shop.timexindia.com/cdn/shop/files/TW2Y02200_B_363x.jpg?v=1740484984"
      ],
      condition: "Very Good",
      year: 1975,
      lowestAsk: 39.99,
      highestBid: 49.99,
      totalSales: 12,
      sizes: ["One Size"],
      category: "Accessories",
      brand: "Timex",
      lastUpdated: "2024-04-21",
      stock: 1
    },
    {
      id: 4,
      title: 'Designer Sunglasses',
      price: 79.99,
      image: 'https://india.ray-ban.com/media/catalog/product/0/r/0rb8097926748p21_1.png',
      tag: 'Trending',
      description: "Stylish sunglasses with UV protection",
      images: [
        "https://india.ray-ban.com/media/catalog/product/0/r/0rb8097926748p21_1.png",
        "https://india.ray-ban.com/media/catalog/product/0/r/0rb8097926748p21shadlt_3.png",
        "https://india.ray-ban.com/media/catalog/product/0/r/0rb8097926748p21shadcfr_6.png"
      ],
      condition: "Like New",
      year: 2023,
      lowestAsk: 69.99,
      highestBid: 89.99,
      totalSales: 5,
      sizes: ["One Size"],
      category: "Accessories",
      brand: "Ray-Ban",
      lastUpdated: "2024-04-21",
      stock: 1
    }
  ];

  const features = [
    {
      icon: <LocalShipping sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />,
      title: 'Free Shipping',
      description: 'Enjoy free shipping on all orders over $50',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />,
      title: 'Secure Payments',
      description: 'Your payments are always secure with us',
    },
    {
      icon: <Support sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />,
      title: '24/7 Support',
      description: 'Our customer support team is always here to help',
    },
  ];

  const handleFavorite = (productId: number) => {
    if (isInWishlist(productId)) {
      removeItem(productId);
    } else {
      const product = featuredItems.find(p => p.id === productId);
      if (product) {
        addItem({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        });
      }
    }
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  const handleShopNow = () => {
    navigate('/shop');
  };

  return (
    <Container maxWidth="lg">
      <HeroSection>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant={isMobile ? 'h3' : 'h2'}
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                mb: 3,
              }}
            >
              Discover Sustainable Fashion
            </Typography>
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              sx={{
                mb: 4,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              Shop pre-loved clothing and accessories while making a positive impact on the environment
            </Typography>
            <Box>
              <HeroButton
                variant="contained"
                color="primary"
                onClick={handleLearnMore}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                Learn More
              </HeroButton>
              <HeroButton
                variant="outlined"
                onClick={handleShopNow}
                sx={{
                  borderColor: theme.palette.common.white,
                  color: theme.palette.common.white,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: theme.palette.common.white,
                  },
                }}
              >
                Shop Now
              </HeroButton>
            </Box>
          </motion.div>
        </HeroContent>
      </HeroSection>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  height: '100%', 
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  }
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Items Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6, fontWeight: 600 }}>
          Featured Items
        </Typography>
        <Grid container spacing={4}>
          {featuredItems.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Tilt
                tiltMaxAngleX={25}
                tiltMaxAngleY={25}
                scale={1.05}
                transitionSpeed={400}
                glareEnable={true}
                glareMaxOpacity={0.5}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.image}
                      alt={item.title}
                      sx={{
                        objectFit: 'cover',
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 1)',
                        },
                      }}
                      onClick={() => handleFavorite(item.id)}
                    >
                      {isInWishlist(item.id) ? (
                        <Favorite color="error" />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                    <Chip
                      label={item.tag}
                      color="primary"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        backgroundColor: 'rgba(25, 118, 210, 0.9)',
                        color: 'white',
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2" noWrap>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {item.description}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                      ${item.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => navigate(`/product/${item.id}`)}
                      endIcon={<ArrowForwardIcon />}
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </Tilt>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

export default Home; 
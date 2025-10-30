import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  Rating,
  Fade,
  Zoom,
  Grow,
  Slide,
} from '@mui/material';
import {
  TrendingUp,
  LocalShipping,
  Security,
  Verified,
  Favorite,
  Share,
  ArrowBack,
  FavoriteBorder,
  ShoppingCart,
  ArrowForward,
  ArrowBack as ArrowBackIcon,
  Close,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import PaymentGateway from '../components/PaymentGateway';
import { useProducts } from '../context/ProductContext';
import { motion } from 'framer-motion';

// Fallback featured items from Home component
const featuredItems = [
  {
    id: 1,
    title: 'Vintage Denim Jacket',
    price: 45.99,
    image: 'https://source.unsplash.com/random/300x200?jacket',
    tag: 'Popular',
    description: "Classic blue denim jacket from the 90s, perfect condition",
    images: [
      "https://source.unsplash.com/random/500x500?jacket",
      "https://source.unsplash.com/random/500x500?jacket+2",
      "https://source.unsplash.com/random/500x500?jacket+3"
    ],
    condition: "Excellent",
    year: 1995,
    lowestAsk: 39.99,
    highestBid: 49.99,
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
    price: 35.99,
    image: 'https://source.unsplash.com/random/300x200?sneakers',
    tag: 'New',
    description: "Vintage running shoes in great condition",
    images: [
      "https://source.unsplash.com/random/500x500?sneakers",
      "https://source.unsplash.com/random/500x500?sneakers+2",
      "https://source.unsplash.com/random/500x500?sneakers+3"
    ],
    condition: "Good",
    year: 1998,
    lowestAsk: 29.99,
    highestBid: 39.99,
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
    price: 29.99,
    image: 'https://source.unsplash.com/random/300x200?watch',
    tag: 'Limited',
    description: "Vintage watch from the 70s, still working perfectly",
    images: [
      "https://source.unsplash.com/random/500x500?watch",
      "https://source.unsplash.com/random/500x500?watch+2",
      "https://source.unsplash.com/random/500x500?watch+3"
    ],
    condition: "Very Good",
    year: 1975,
    lowestAsk: 24.99,
    highestBid: 34.99,
    totalSales: 12,
    sizes: ["One Size"],
    category: "Accessories",
    brand: "Timex",
    lastUpdated: "2024-04-21",
    stock: 1
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const { products } = useProducts();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [direction, setDirection] = useState(0);

  // First try to find the product in the products array
  let product = products.find((p) => p.id === Number(productId));
  
  // If not found, try to find it in the featuredItems array
  if (!product) {
    product = featuredItems.find((p) => p.id === Number(productId));
  }

  if (!product) {
    return (
      <Container>
        <Typography variant="h5">Product not found</Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Return to Home
        </Button>
      </Container>
    );
  }

  // At this point, product is guaranteed to be defined
  const safeProduct = product;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSnackbar({
        open: true,
        message: 'Please select a size',
        severity: 'error',
      });
      return;
    }
    setPaymentDialogOpen(true);
  };

  const handlePaymentSuccess = () => {
    // Add item to cart after successful payment
    addItem({
      id: safeProduct.id,
      title: safeProduct.title,
      price: safeProduct.price,
      image: safeProduct.images[0],
      quantity: 1,
      size: selectedSize,
    });

    setSnackbar({
      open: true,
      message: 'Payment successful! Item added to your orders.',
      severity: 'success',
    });

    // Close payment dialog
    setPaymentDialogOpen(false);
    
    // Navigate to orders page
    navigate('/orders');
  };

  const handlePaymentError = (error) => {
    setSnackbar({
      open: true,
      message: `Payment failed: ${error}`,
      severity: 'error',
    });
  };

  const handleMakeOffer = () => {
    if (!selectedSize) {
      setSnackbar({
        open: true,
        message: 'Please select a size',
        severity: 'error',
      });
      return;
    }
    setOfferDialogOpen(true);
  };

  const handleOfferSubmit = () => {
    const offer = parseFloat(offerAmount);
    if (isNaN(offer) || offer <= 0) {
      setSnackbar({
        open: true,
        message: 'Please enter a valid offer amount',
        severity: 'error',
      });
      return;
    }

    // Here you would typically make an API call to submit the offer
    setSnackbar({
      open: true,
      message: 'Offer submitted successfully',
      severity: 'success',
    });
    setOfferDialogOpen(false);
    setOfferAmount('');
  };

  const handleSave = () => {
    if (isInWishlist(safeProduct.id)) {
      removeFromWishlist(safeProduct.id);
      setSnackbar({
        open: true,
        message: 'Item removed from wishlist',
        severity: 'info',
      });
    } else {
      addToWishlist({
        id: safeProduct.id,
        title: safeProduct.title,
        price: safeProduct.price,
        image: safeProduct.images[0],
      });
      setSnackbar({
        open: true,
        message: 'Item added to wishlist',
        severity: 'success',
      });
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: safeProduct.title,
          text: `Check out this ${safeProduct.title} on ThriftStore!`,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        await navigator.clipboard.writeText(window.location.href);
        setSnackbar({
          open: true,
          message: 'Link copied to clipboard',
          severity: 'success',
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleWishlistClick = () => {
    if (isInWishlist(safeProduct.id)) {
      removeFromWishlist(safeProduct.id);
    } else {
      addToWishlist({
        id: safeProduct.id,
        title: safeProduct.title,
        price: safeProduct.price,
        image: safeProduct.images[0],
      });
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: safeProduct.id,
      title: safeProduct.title,
      price: safeProduct.price,
      image: safeProduct.images[0],
      quantity: 1,
      size: selectedSize,
    });
  };

  const handleNextImage = () => {
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % safeProduct.images.length);
  };

  const handlePrevImage = () => {
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + safeProduct.images.length) % safeProduct.images.length);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

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

  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ mb: 4 }}
        >
          Back
        </Button>

        <Grid container spacing={4} component="div">
          {/* Left Column - Product Images */}
          <Grid item xs={12} md={6} component="div">
            <motion.div variants={itemVariants}>
              <Box sx={{ position: 'relative', mb: 2 }}>
                <motion.div
                  key={currentImageIndex}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  style={{ position: 'relative', width: '100%' }}
                >
                  <Box
                    component="img"
                    src={safeProduct.images[currentImageIndex]}
                    alt={safeProduct.title}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                    }}
                    onClick={handleFullscreenToggle}
                  />
                </motion.div>
                
                {/* Navigation Arrows */}
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: 0, 
                    right: 0, 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    transform: 'translateY(-50%)',
                    px: 1,
                    zIndex: 2
                  }}
                >
                  <IconButton 
                    onClick={handlePrevImage}
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.7)', 
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } 
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  <IconButton 
                    onClick={handleNextImage}
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.7)', 
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } 
                    }}
                  >
                    <ArrowForward />
                  </IconButton>
                </Box>
                
                {/* Image Counter */}
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 16, 
                    right: 16, 
                    bgcolor: 'rgba(0,0,0,0.6)', 
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.875rem'
                  }}
                >
                  {currentImageIndex + 1} / {safeProduct.images.length}
                </Box>
              </Box>

              {/* Thumbnails */}
              <Grid container spacing={1}>
                {safeProduct.images.map((image, index) => (
                  <Grid item xs={4} key={index} component="div">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Box
                        component="img"
                        src={image}
                        alt={`${safeProduct.title} view ${index + 1}`}
                        onClick={() => handleThumbnailClick(index)}
                        sx={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: 1,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease-in-out',
                          border: currentImageIndex === index ? '2px solid #2E7D32' : '2px solid transparent',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>

          {/* Right Column - Product Info */}
          <Grid item xs={12} md={6} component="div">
            <motion.div variants={itemVariants}>
              <Typography variant="h4" component="h1" gutterBottom>
                {safeProduct.title}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {safeProduct.brand}
              </Typography>
              
              <Box sx={{ my: 3 }}>
                <Typography variant="h3" color="primary" gutterBottom>
                  ${safeProduct.price}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip
                    icon={<TrendingUp />}
                    label={`Last Sale: $${safeProduct.lowestAsk}`}
                    variant="outlined"
                  />
                  <Chip
                    icon={<LocalShipping />}
                    label="Free Shipping"
                    color="success"
                  />
                  <Chip
                    icon={<Verified />}
                    label="Authenticated"
                    color="primary"
                  />
                </Stack>
              </Box>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Size</InputLabel>
                <Select
                  value={selectedSize}
                  label="Size"
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {safeProduct.sizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={handleMakeOffer}
                  >
                    Make Offer
                  </Button>
                </motion.div>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Favorite />}
                    fullWidth
                    onClick={handleSave}
                    color={isInWishlist(safeProduct.id) ? 'error' : 'primary'}
                  >
                    {isInWishlist(safeProduct.id) ? 'Saved' : 'Save'}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Share />}
                    fullWidth
                    onClick={handleShare}
                  >
                    Share
                  </Button>
                </motion.div>
              </Box>

              <Paper sx={{ mb: 3 }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="Overview" />
                  <Tab label="Price History" />
                  <Tab label="Details" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                  <Typography paragraph>{safeProduct.description}</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6} component="div">
                      <Typography variant="subtitle2" color="text.secondary">
                        Condition
                      </Typography>
                      <Typography variant="body1">{safeProduct.condition}</Typography>
                    </Grid>
                    <Grid item xs={6} component="div">
                      <Typography variant="subtitle2" color="text.secondary">
                        Year
                      </Typography>
                      <Typography variant="body1">{safeProduct.year}</Typography>
                    </Grid>
                  </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { date: '2024-01', price: safeProduct.lowestAsk - 5 },
                        { date: '2024-02', price: safeProduct.lowestAsk - 2 },
                        { date: '2024-03', price: safeProduct.lowestAsk + 1 },
                        { date: '2024-04', price: safeProduct.price },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="price" stroke="#2E7D32" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={4} component="div">
                        <Typography variant="subtitle2" color="text.secondary">
                          Lowest Ask
                        </Typography>
                        <Typography variant="body1">${safeProduct.lowestAsk}</Typography>
                      </Grid>
                      <Grid item xs={4} component="div">
                        <Typography variant="subtitle2" color="text.secondary">
                          Highest Bid
                        </Typography>
                        <Typography variant="body1">${safeProduct.highestBid}</Typography>
                      </Grid>
                      <Grid item xs={4} component="div">
                        <Typography variant="subtitle2" color="text.secondary">
                          Total Sales
                        </Typography>
                        <Typography variant="body1">{safeProduct.totalSales}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Product Details
                  </Typography>
                  <Typography paragraph>
                    • 100% Cotton Denim
                    <br />
                    • Classic Fit
                    <br />
                    • Button Closure
                    <br />
                    • Multiple Pockets
                    <br />
                    • Vintage Wash
                  </Typography>
                </TabPanel>
              </Paper>

              <Box sx={{ mt: 4 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<ShoppingCart />}
                    onClick={handleAddToCart}
                    sx={{ mr: 2 }}
                  >
                    Add to Cart
                  </Button>
                </motion.div>
                <IconButton
                  color={isInWishlist(safeProduct.id) ? 'error' : 'default'}
                  onClick={handleWishlistClick}
                  sx={{ mr: 2 }}
                >
                  {isInWishlist(safeProduct.id) ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <IconButton>
                  <Share />
                </IconButton>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>

      {/* Fullscreen Image Dialog */}
      <Dialog
        open={isFullscreen}
        onClose={handleFullscreenToggle}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'black',
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }
        }}
      >
        <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
          <IconButton 
            onClick={handleFullscreenToggle}
            sx={{ color: 'white' }}
          >
            <Close />
          </IconButton>
        </Box>
        
        <Box sx={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <motion.div
            key={currentImageIndex}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}
          >
            <Box
              component="img"
              src={safeProduct.images[currentImageIndex]}
              alt={safeProduct.title}
              sx={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
              }}
            />
          </motion.div>
          
          {/* Navigation Arrows */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: '50%', 
              left: 0, 
              right: 0, 
              display: 'flex', 
              justifyContent: 'space-between',
              transform: 'translateY(-50%)',
              px: 4,
              zIndex: 2
            }}
          >
            <IconButton 
              onClick={handlePrevImage}
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.4)' } 
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton 
              onClick={handleNextImage}
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.4)' } 
              }}
            >
              <ArrowForward />
            </IconButton>
          </Box>
          
          {/* Image Counter */}
          <Box 
            sx={{ 
              position: 'absolute', 
              bottom: 16, 
              left: '50%', 
              transform: 'translateX(-50%)', 
              bgcolor: 'rgba(0,0,0,0.6)', 
              color: 'white',
              px: 2,
              py: 0.5,
              borderRadius: 1,
              fontSize: '1rem'
            }}
          >
            {currentImageIndex + 1} / {safeProduct.images.length}
          </Box>
        </Box>
      </Dialog>

      {/* Offer Dialog */}
      <Dialog open={offerDialogOpen} onClose={() => setOfferDialogOpen(false)}>
        <DialogTitle>Make an Offer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Offer Amount ($)"
            type="number"
            fullWidth
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOfferDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleOfferSubmit} variant="contained">
            Submit Offer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Payment Gateway Dialog */}
      <PaymentGateway
        open={paymentDialogOpen}
        onClose={() => setPaymentDialogOpen(false)}
        amount={safeProduct.price}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetails; 
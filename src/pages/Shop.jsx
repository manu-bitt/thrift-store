import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Chip,
  Stack,
  IconButton,
  SelectChangeEvent,
  Grid,
  Paper,
  Divider,
  Button,
  InputAdornment,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  TrendingUp,
  LocalShipping,
  Search,
  FilterList,
  Sort,
  ShoppingCart,
  Person,
  Menu as MenuIcon,
  Close,
  Category,
  AttachMoney,
  Star,
  StarBorder,
} from '@mui/icons-material';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductContext';

const Shop = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const { products } = useProducts();
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('newest');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredProducts = products
    .filter(function(product) {
      const matchesCategory = category === 'all' || product.category.toLowerCase() === category;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort(function(a, b) {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popular':
          return b.totalSales - a.totalSales;
        default:
          return 0;
      }
    });

  const handleFavorite = function(productId) {
    if (isInWishlist(productId)) {
      removeItem(productId);
    } else {
      const product = products.find(function(p) {
        return p.id === productId;
      });
      if (product) {
        addItem({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images[0],
        });
      }
    }
  };

  const toggleDrawer = function() {
    setDrawerOpen(!drawerOpen);
  };

  const categoryCounts = products.reduce(function(acc, product) {
    const cat = product.category.toLowerCase();
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const drawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Filters</Typography>
        <IconButton onClick={toggleDrawer} size="small">
          <Close />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />
      
      <Typography variant="subtitle1" gutterBottom>
        Categories
      </Typography>
      <List dense>
        <ListItem 
          button 
          selected={category === 'all'} 
          onClick={function() {
            setCategory('all');
          }}
          sx={{ borderRadius: 1 }}
        >
          <ListItemIcon>
            <Category fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="All Categories" />
          <Chip label={products.length} size="small" />
        </ListItem>
        <ListItem 
          button 
          selected={category === 'clothing'} 
          onClick={function() {
            setCategory('clothing');
          }}
          sx={{ borderRadius: 1 }}
        >
          <ListItemIcon>
            <Category fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Clothing" />
          <Chip label={categoryCounts['clothing'] || 0} size="small" />
        </ListItem>
        <ListItem 
          button 
          selected={category === 'shoes'} 
          onClick={function() {
            setCategory('shoes');
          }}
          sx={{ borderRadius: 1 }}
        >
          <ListItemIcon>
            <Category fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Shoes" />
          <Chip label={categoryCounts['shoes'] || 0} size="small" />
        </ListItem>
        <ListItem 
          button 
          selected={category === 'accessories'} 
          onClick={function() {
            setCategory('accessories');
          }}
          sx={{ borderRadius: 1 }}
        >
          <ListItemIcon>
            <Category fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Accessories" />
          <Chip label={categoryCounts['accessories'] || 0} size="small" />
        </ListItem>
      </List>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="subtitle1" gutterBottom>
        Price Range
      </Typography>
      <Box sx={{ px: 2 }}>
        <Slider
          value={priceRange}
          onChange={(_, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={50000}
          step={100}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2">${priceRange[0]}</Typography>
          <Typography variant="body2">${priceRange[1]}</Typography>
        </Box>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="subtitle1" gutterBottom>
        Sort By
      </Typography>
      <FormControl fullWidth size="small">
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          displayEmpty
        >
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="price-low">Price: Low to High</MenuItem>
          <MenuItem value="price-high">Price: High to Low</MenuItem>
          <MenuItem value="popular">Most Popular</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'primary.contrastText',
          py: 8,
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                Thrift Store
              </Typography>
              <Typography variant="h5" paragraph>
                Discover unique, pre-loved items at amazing prices
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                sx={{ mt: 2 }}
                onClick={function() {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }}
              >
                Shop Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Thrift Store"
                sx={{ 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        {/* Search and Filter Bar */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: 2, 
            mb: 4, 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 2,
          }}
        >
          <TextField
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            {isMobile ? (
              <Button 
                variant="outlined" 
                startIcon={<FilterList />}
                onClick={toggleDrawer}
                fullWidth
              >
                Filters
              </Button>
            ) : (
              <>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <MenuItem value="all">All Categories</MenuItem>
                    <MenuItem value="clothing">Clothing</MenuItem>
                    <MenuItem value="shoes">Shoes</MenuItem>
                    <MenuItem value="accessories">Accessories</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    label="Sort By"
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <MenuItem value="newest">Newest</MenuItem>
                    <MenuItem value="price-low">Price: Low to High</MenuItem>
                    <MenuItem value="price-high">Price: High to Low</MenuItem>
                    <MenuItem value="popular">Most Popular</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
          </Box>
        </Paper>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {filteredProducts.map(function(product) {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    borderRadius: 2,
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={product.images[0]}
                      alt={product.title}
                      sx={{ 
                        cursor: 'pointer',
                        objectFit: 'cover',
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                      onClick={function() {
                        navigate('/product/' + product.id);
                      }}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'background.paper',
                        boxShadow: 2,
                        '&:hover': { 
                          bgcolor: 'background.paper',
                          transform: 'scale(1.1)',
                        },
                        transition: 'transform 0.2s',
                      }}
                      onClick={function() {
                        handleFavorite(product.id);
                      }}
                    >
                      {isInWishlist(product.id) ? (
                        <Favorite color="error" />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                    {product.condition === 'New' && (
                      <Chip
                        label="NEW"
                        color="primary"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          fontWeight: 'bold',
                          boxShadow: 2,
                        }}
                      />
                    )}
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 2.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography 
                      variant="subtitle2" 
                      color="text.secondary" 
                      gutterBottom
                      sx={{ 
                        textTransform: 'uppercase', 
                        letterSpacing: 1,
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                      }}
                    >
                      {product.brand}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        height: '3em',
                        lineHeight: 1.3,
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      color="primary" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: '1.25rem',
                        mt: 'auto',
                      }}
                    >
                      ${product.price.toLocaleString()}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                      <Chip
                        icon={<TrendingUp />}
                        label={`Last Sale: $${product.lowestAsk}`}
                        size="small"
                        variant="outlined"
                        sx={{ 
                          borderRadius: 1,
                          '& .MuiChip-label': {
                            px: 1,
                          },
                        }}
                      />
                      <Chip
                        icon={<LocalShipping />}
                        label="Free Shipping"
                        size="small"
                        color="success"
                        sx={{ 
                          borderRadius: 1,
                          '& .MuiChip-label': {
                            px: 1,
                          },
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        
        {filteredProducts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No products found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your filters or search query
            </Typography>
          </Box>
        )}
      </Container>
      
      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Shop; 
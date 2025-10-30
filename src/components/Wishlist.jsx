import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Badge,
  Fade,
  Zoom,
  useTheme,
  useMediaQuery,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Close,
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  Delete,
  LocalOffer,
  TrendingUp,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

interface WishlistProps {
  open: boolean;
  onClose: () => void;
}

const Wishlist: React.FC<WishlistProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();
  const [removingItemId, setRemovingItemId] = useState<number | null>(null);

  const handleRemoveItem = (id: number) => {
    setRemovingItemId(id);
    setTimeout(() => {
      removeItem(id);
      setRemovingItemId(null);
    }, 300);
  };

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: 1,
      size: item.size,
    });
    removeItem(item.id);
  };

  const handleViewItem = (id: number) => {
    navigate(`/product/${id}`);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { 
          width: { xs: '100%', sm: 400 },
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        }
      }}
    >
      <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Favorite sx={{ mr: 1, color: 'error.main' }} />
            <Typography variant="h6" component="div">
              Your Wishlist
            </Typography>
            <Badge 
              badgeContent={items.length} 
              color="error" 
              sx={{ ml: 1 }}
            />
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {items.length === 0 ? (
          <Box 
            sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              textAlign: 'center',
              p: 3
            }}
          >
            <FavoriteBorder sx={{ fontSize: 64, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Your wishlist is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Save items you love for later by clicking the heart icon
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => {
                onClose();
                navigate('/shop');
              }}
              startIcon={<ArrowForward />}
            >
              Browse Products
            </Button>
          </Box>
        ) : (
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <Grid container spacing={2}>
              {items.map((item, index) => (
                <Grid item xs={12} key={item.id}>
                  <Zoom in={true} timeout={300 + index * 100}>
                    <Card 
                      sx={{ 
                        display: 'flex',
                        position: 'relative',
                        opacity: removingItemId === item.id ? 0.5 : 1,
                        transition: 'opacity 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        }
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 120, height: 120, objectFit: 'cover' }}
                        image={item.image}
                        alt={item.title}
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <CardContent sx={{ flex: '1 0 auto', pb: 1 }}>
                          <Typography variant="subtitle1" component="div" sx={{ fontWeight: 500 }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            ${item.price.toFixed(2)}
                          </Typography>
                          {item.size && (
                            <Chip 
                              label={`Size: ${item.size}`} 
                              size="small" 
                              sx={{ mr: 1 }} 
                            />
                          )}
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 1 }}>
                          <Box>
                            <Tooltip title="Remove from wishlist">
                              <IconButton 
                                size="small" 
                                onClick={() => handleRemoveItem(item.id)}
                                sx={{ color: 'error.main' }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="View details">
                              <IconButton 
                                size="small" 
                                onClick={() => handleViewItem(item.id)}
                              >
                                <ArrowForward fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          <Button 
                            variant="contained" 
                            size="small"
                            startIcon={<ShoppingCart />}
                            onClick={() => handleAddToCart(item)}
                            sx={{ 
                              borderRadius: 2,
                              textTransform: 'none',
                            }}
                          >
                            Add to Cart
                          </Button>
                        </CardActions>
                      </Box>
                    </Card>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default Wishlist; 
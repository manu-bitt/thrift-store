import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Divider,
  TextField,
  Badge,
  Chip,
  Fade,
  Zoom,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Close,
  Add,
  Remove,
  Delete,
  ShoppingBag,
  LocalShipping,
  Payment,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface CartProps {
  open: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, total } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };

  const handleCheckout = () => {
    navigate('/checkout');
    onClose();
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim() === '') return;
    
    setIsApplyingCoupon(true);
    
    // Simulate API call to validate coupon
    setTimeout(() => {
      if (couponCode.toLowerCase() === 'save10') {
        setDiscount(total * 0.1);
      } else {
        setDiscount(0);
      }
      setIsApplyingCoupon(false);
    }, 1000);
  };

  const finalTotal = total - discount;

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
            <ShoppingBag sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" component="div">
              Your Cart
            </Typography>
            <Badge 
              badgeContent={items.length} 
              color="primary" 
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
            <ShoppingBag sx={{ fontSize: 64, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Looks like you haven't added any items to your cart yet
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
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <List sx={{ width: '100%' }}>
                {items.map((item, index) => (
                  <Zoom in={true} timeout={300 + index * 100} key={item.id}>
                    <ListItem
                      sx={{
                        mb: 1,
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar 
                          variant="rounded" 
                          src={item.image} 
                          alt={item.title}
                          sx={{ width: 80, height: 80, mr: 2 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                            {item.title}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
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
                          </Box>
                        }
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <IconButton 
                            size="small" 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            sx={{ 
                              border: '1px solid', 
                              borderColor: 'divider',
                              borderRadius: 1,
                              p: 0.5
                            }}
                          >
                            <Remove fontSize="small" />
                          </IconButton>
                          <Typography sx={{ mx: 1, minWidth: 24, textAlign: 'center' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton 
                            size="small" 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            sx={{ 
                              border: '1px solid', 
                              borderColor: 'divider',
                              borderRadius: 1,
                              p: 0.5
                            }}
                          >
                            <Add fontSize="small" />
                          </IconButton>
                        </Box>
                        <IconButton 
                          size="small" 
                          onClick={() => handleRemoveItem(item.id)}
                          sx={{ color: 'error.main' }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </ListItem>
                  </Zoom>
                ))}
              </List>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', mb: 1 }}>
                <TextField
                  size="small"
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  sx={{ flex: 1, mr: 1 }}
                />
                <Button 
                  variant="outlined" 
                  onClick={handleApplyCoupon}
                  disabled={isApplyingCoupon || couponCode.trim() === ''}
                >
                  Apply
                </Button>
              </Box>
              {discount > 0 && (
                <Fade in={true}>
                  <Chip 
                    label={`10% discount applied!`} 
                    color="success" 
                    size="small" 
                    sx={{ mt: 1 }}
                  />
                </Fade>
              )}
            </Box>

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Subtotal
                </Typography>
                <Typography variant="body2">
                  ${total.toFixed(2)}
                </Typography>
              </Box>
              {discount > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="success.main">
                    Discount
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    -${discount.toFixed(2)}
                  </Typography>
                </Box>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Shipping
                </Typography>
                <Typography variant="body2" color="success.main">
                  Free
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Total
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  ${finalTotal.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              size="large"
              onClick={handleCheckout}
              endIcon={<ArrowForward />}
              sx={{ 
                py: 1.5,
                borderRadius: 2,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                '&:hover': {
                  boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                }
              }}
            >
              Proceed to Checkout
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default Cart; 
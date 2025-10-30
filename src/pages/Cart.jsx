import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  IconButton,
  Divider,
  TextField,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { useCart, CartItem } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeItem, updateQuantity } = useCart();

  const calculateSubtotal = (): number => {
    return cart.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" component="h1" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Looks like you haven't added any items to your cart yet.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/shop')}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            {cart.map((item: CartItem) => (
              <React.Fragment key={item.id}>
                <Grid container spacing={2} alignItems="center" sx={{ py: 2 }}>
                  <Grid item xs={3} sm={2}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.title}
                      sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: 1,
                      }}
                    />
                  </Grid>
                  <Grid item xs={9} sm={4}>
                    <Typography variant="h6" component="h2">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Size: {item.size}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value);
                          if (!isNaN(newQuantity)) {
                            handleQuantityChange(item.id, newQuantity);
                          }
                        }}
                        inputProps={{
                          style: { textAlign: 'center' },
                          min: 1,
                        }}
                        size="small"
                        sx={{ width: 60 }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography variant="h6" align="right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <IconButton
                      color="error"
                      onClick={() => removeItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Divider />
              </React.Fragment>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ my: 2 }}>
              <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                <Grid item>
                  <Typography variant="body1">Subtotal</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">${calculateSubtotal().toFixed(2)}</Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                <Grid item>
                  <Typography variant="body1">Shipping</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">Free</Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6">Total</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">${calculateSubtotal().toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart; 
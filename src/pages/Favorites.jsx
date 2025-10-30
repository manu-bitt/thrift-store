import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import { Delete as DeleteIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  const handleRemoveFromFavorites = (id: number) => {
    removeItem(id);
  };

  const handleAddToCart = (item: { id: number; title: string; price: number; image: string; size?: string }) => {
    addItem({
      ...item,
      quantity: 1,
      size: item.size || 'One Size',
    });
    removeItem(item.id);
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box textAlign="center" py={4}>
          <Typography variant="h5" gutterBottom>
            Your favorites list is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/shop')}
            startIcon={<ShoppingCartIcon />}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Favorites
      </Typography>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="h6" noWrap>
                  {item.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  ${item.price.toFixed(2)}
                </Typography>
                {item.size && (
                  <Typography variant="body2" color="text.secondary">
                    Size: {item.size}
                  </Typography>
                )}
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveFromFavorites(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Favorites; 
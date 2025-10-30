import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import { useProducts } from '../context/ProductContext';

const ImageUpdater = () => {
  const { products, refreshProducts } = useProducts();
  const [productId, setProductId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageIndex, setImageIndex] = useState('0');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleUpdateImage = () => {
    try {
      const id = parseInt(productId);
      const index = parseInt(imageIndex);
      
      if (isNaN(id) || isNaN(index)) {
        setSnackbar({
          open: true,
          message: 'Please enter valid numbers for Product ID and Image Index',
          severity: 'error',
        });
        return;
      }

      const product = products.find(p => p.id === id);
      
      if (!product) {
        setSnackbar({
          open: true,
          message: `Product with ID ${id} not found`,
          severity: 'error',
        });
        return;
      }

      if (index < 0 || index >= product.images.length) {
        setSnackbar({
          open: true,
          message: `Image index must be between 0 and ${product.images.length - 1}`,
          severity: 'error',
        });
        return;
      }

      // In a real app, this would be an API call
      // For now, we'll just update the local state
      const updatedProducts = products.map(p => {
        if (p.id === id) {
          const updatedImages = [...p.images];
          updatedImages[index] = imageUrl;
          return { ...p, images: updatedImages };
        }
        return p;
      });

      // Update the products in localStorage
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      
      // Refresh the products
      refreshProducts();
      
      setSnackbar({
        open: true,
        message: `Image updated for product ${id} at index ${index}`,
        severity: 'success',
      });
      
      // Clear the form
      setImageUrl('');
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'An error occurred while updating the image',
        severity: 'error',
      });
      console.error('Error updating image:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Update Product Images
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Product ID"
            variant="outlined"
            fullWidth
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Image Index"
            variant="outlined"
            fullWidth
            value={imageIndex}
            onChange={(e) => setImageIndex(e.target.value)}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateImage}
          disabled={!productId || !imageIndex || !imageUrl}
        >
          Update Image
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Available Products:
        </Typography>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2">
                  ID: {product.id} - {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.images.length} images available
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ImageUpdater; 
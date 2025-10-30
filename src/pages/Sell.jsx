import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

const Sell = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    images: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: Array.from(files)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      title: '',
      description: '',
      price: '',
      category: '',
      condition: '',
      images: [],
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sell Your Items
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        List your pre-loved items and give them a new home.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Box sx={{ display: 'grid', gap: 3 }}>
          <TextField
            required
            fullWidth
            label="Item Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
            <TextField
              required
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: '$',
              }}
            />

            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                label="Category"
                onChange={handleSelectChange}
              >
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="shoes">Shoes</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="home">Home & Garden</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <FormControl fullWidth required>
            <InputLabel>Condition</InputLabel>
            <Select
              name="condition"
              value={formData.condition}
              label="Condition"
              onChange={handleSelectChange}
            >
              <MenuItem value="new">Like New</MenuItem>
              <MenuItem value="good">Good</MenuItem>
              <MenuItem value="fair">Fair</MenuItem>
              <MenuItem value="poor">Poor</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mb: 2 }}
          >
            Upload Images
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          {formData.images.length > 0 && (
            <Typography variant="body2" color="text.secondary">
              {formData.images.length} image(s) selected
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            List Item for Sale
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Sell; 
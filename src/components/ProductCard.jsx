import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  Stack,
  useTheme,
  Skeleton,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeItem(product.id);
    } else {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      size: product.sizes[0] || 'One Size',
    });
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        position: 'relative',
        '&:hover': {
          boxShadow: theme.shadows[8],
          transform: 'translateY(-4px)',
          transition: 'all 0.3s ease-in-out',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {imageLoading && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={300}
            animation="wave"
          />
        )}
        <CardMedia
          component="img"
          height="300"
          image={product.images[currentImageIndex]}
          alt={product.title}
          onClick={handleImageClick}
          onLoad={handleImageLoad}
          sx={{
            cursor: 'pointer',
            display: imageLoading ? 'none' : 'block',
            objectFit: 'cover',
          }}
        />
        {product.images.length > 1 && (
          <>
            <IconButton
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
              }}
              onClick={handlePrevImage}
            >
              <ArrowUpward />
            </IconButton>
            <IconButton
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
              }}
              onClick={handleNextImage}
            >
              <ArrowDownward />
            </IconButton>
          </>
        )}
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
          }}
          onClick={handleWishlistClick}
        >
          {isInWishlist(product.id) ? (
            <Favorite color="error" />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
      </Box>
      <CardContent>
        <Typography variant="h6" component="div" noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {product.brand}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Chip
            label={product.condition}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`${product.year}`}
            size="small"
            color="secondary"
            variant="outlined"
          />
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            ${product.price}
          </Typography>
          <IconButton
            color="primary"
            onClick={handleAddToCart}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            <ShoppingCart />
          </IconButton>
        </Box>
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Lowest Ask: ${product.lowestAsk}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Highest Bid: ${product.highestBid}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard; 
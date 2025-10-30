import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  CardMedia,
  Chip,
  Button,
  Divider,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  ShoppingBag as ShoppingBagIcon,
  LocalShipping as LocalShippingIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
  Visibility as ViewDetailsIcon,
  LocalShipping as TrackPackageIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

// Mock data for orders - in a real app, this would come from an API
const mockOrders = [
  {
    id: 'ORD-12345',
    date: '2023-04-15',
    status: 'Delivered',
    total: 49.99,
    items: [
      {
        id: '2',
        title: 'Retro Sunglasses',
        price: 49.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
    ],
  },
  {
    id: 'ORD-12346',
    date: '2023-04-10',
    status: 'Processing',
    total: 89.99,
    items: [
      {
        id: '3',
        title: 'Classic Leather Boots',
        price: 89.99,
        quantity: 1,
        image: 'https://assets.woodlandworldwide.app/product/images/FGF0C3046352A/BLACK/FGF0C3046352A_004_1.webp',
      },
    ],
  },
];

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingDialogOpen, setTrackingDialogOpen] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch orders
    const fetchOrders = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/orders');
        // const data = await response.json();
        
        // For demo purposes, using mock data
        setTimeout(() => {
          setOrders(mockOrders);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load orders. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircleIcon color="success" />;
      case 'processing':
        return <ScheduleIcon color="primary" />;
      case 'cancelled':
        return <CancelIcon color="error" />;
      default:
        return <ShoppingBagIcon />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'processing':
        return 'primary';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleTrackPackage = (order) => {
    setSelectedOrder(order);
    setTrackingDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedOrder(null);
    setTrackingDialogOpen(false);
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading your orders...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 6, 
            textAlign: 'center',
            borderRadius: 2,
            backgroundColor: 'background.default'
          }}
        >
          <ShoppingBagIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            No Orders Yet
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            You haven't placed any orders yet. Start shopping to see your order history here.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/shop')}
            startIcon={<ShoppingBagIcon />}
            sx={{ mt: 2 }}
          >
            Start Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
        My Orders
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
        Track and manage your orders
      </Typography>

      {orders.map((order) => (
        <Paper 
          key={order.id} 
          elevation={2} 
          sx={{ 
            mb: 3, 
            borderRadius: 2,
            overflow: 'hidden',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 4,
            }
          }}
        >
          <Box sx={{ p: 2, bgcolor: 'background.default' }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold" color="primary">
                  Order #{order.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Placed on {formatDate(order.date)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                <Chip
                  icon={getStatusIcon(order.status)}
                  label={order.status}
                  color={getStatusColor(order.status)}
                  variant="outlined"
                  sx={{ 
                    mr: 1,
                    borderWidth: 2,
                    '& .MuiChip-icon': {
                      fontSize: '1.2rem'
                    }
                  }}
                />
                <Typography variant="subtitle1" component="span" fontWeight="bold" color="primary">
                  ${order.total.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          
          <Divider />
          
          <Box sx={{ p: 2 }}>
            {order.items.map((item) => (
              <Grid container key={item.id} spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={3} sm={2}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{ 
                      height: 100, 
                      objectFit: 'cover',
                      borderRadius: 1,
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={9} sm={10}>
                  <Typography variant="subtitle1" fontWeight="medium" color="text.primary">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${item.price.toFixed(2)} each
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Box>
          
          <Box sx={{ p: 2, bgcolor: 'background.default', textAlign: 'right' }}>
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => handleViewDetails(order)}
              startIcon={<ViewDetailsIcon />}
              sx={{ 
                mr: 1,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                }
              }}
            >
              View Details
            </Button>
            {order.status !== 'Cancelled' && (
              <Button 
                variant="contained" 
                size="small" 
                startIcon={<TrackPackageIcon />}
                onClick={() => handleTrackPackage(order)}
                sx={{
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  }
                }}
              >
                Track Package
              </Button>
            )}
          </Box>
        </Paper>
      ))}

      {/* Order Details Dialog */}
      <Dialog
        open={!!selectedOrder && !trackingDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Order Details - #{selectedOrder?.id}
          <Button
            onClick={handleCloseDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Order Date: {formatDate(selectedOrder.date)}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Status: {selectedOrder.status}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Total: ${selectedOrder.total.toFixed(2)}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Items
              </Typography>
              <List>
                {selectedOrder.items.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemIcon>
                      <CardMedia
                        component="img"
                        image={item.image}
                        alt={item.title}
                        sx={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 1 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      secondary={`Quantity: ${item.quantity} - $${item.price.toFixed(2)}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Tracking Dialog */}
      <Dialog
        open={trackingDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Track Package - #{selectedOrder?.id}
          <Button
            onClick={handleCloseDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Tracking Number: TRK-{selectedOrder.id}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Current Status: {selectedOrder.status}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Tracking History
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ShoppingBagIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Order Placed"
                    secondary={formatDate(selectedOrder.date)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocalShippingIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Package Shipped"
                    secondary={new Date(selectedOrder.date).toLocaleDateString()}
                  />
                </ListItem>
                {selectedOrder.status === 'Delivered' && (
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Delivered"
                      secondary={new Date(selectedOrder.date).toLocaleDateString()}
                    />
                  </ListItem>
                )}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Orders; 
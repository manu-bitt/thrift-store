import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Grid,
  Divider,
  Alert,
} from '@mui/material';
import { useCart } from '../context/CartContext';
import PaymentGateway from '../components/PaymentGateway';

const steps = ['Shipping Address', 'Payment Details', 'Review Order'];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setPaymentDialogOpen(true);
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleShippingInputChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentSuccess = () => {
    setPaymentDialogOpen(false);
    clearCart();
    navigate('/orders');
  };

  const handlePaymentError = (error) => {
    setError(error);
    setPaymentDialogOpen(false);
  };

  const isShippingFormValid = () => {
    return (
      shippingData.firstName.trim() !== '' &&
      shippingData.lastName.trim() !== '' &&
      shippingData.address.trim() !== '' &&
      shippingData.city.trim() !== '' &&
      shippingData.state.trim() !== '' &&
      shippingData.zipCode.trim() !== '' &&
      shippingData.country.trim() !== ''
    );
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstName"
                value={shippingData.firstName}
                onChange={handleShippingInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={shippingData.lastName}
                onChange={handleShippingInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                name="address"
                value={shippingData.address}
                onChange={handleShippingInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="City"
                name="city"
                value={shippingData.city}
                onChange={handleShippingInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="State/Province"
                name="state"
                value={shippingData.state}
                onChange={handleShippingInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Zip / Postal Code"
                name="zipCode"
                value={shippingData.zipCode}
                onChange={handleShippingInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Country"
                name="country"
                value={shippingData.country}
                onChange={handleShippingInputChange}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Payment Summary
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Amount: ${total.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click "Next" to proceed to payment
            </Typography>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            {items.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography>{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {item.quantity} {item.size && `| Size: ${item.size}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: 'right' }}>
                    <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Grid container>
              <Grid item xs={8}>
                <Typography variant="h6">Total</Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'right' }}>
                <Typography variant="h6">${total.toFixed(2)}</Typography>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {getStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={activeStep === 0 && !isShippingFormValid()}
          >
            {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
          </Button>
        </Box>
      </Paper>
      <PaymentGateway
        open={paymentDialogOpen}
        onClose={() => setPaymentDialogOpen(false)}
        amount={total}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </Container>
  );
};

export default Checkout; 
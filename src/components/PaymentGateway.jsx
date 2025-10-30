import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_51NxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

const PaymentForm = ({ amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // In a real application, you would create a payment intent on your server
      // and then confirm it with the client secret
      // For this example, we'll simulate a successful payment
      
      // Simulate API call to create payment intent
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful payment
      onSuccess();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during payment';
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Payment Details
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Total Amount: ${amount.toFixed(2)}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </Box>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={!stripe || processing}
        sx={{ mt: 2 }}
      >
        {processing ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          `Pay $${amount.toFixed(2)}`
        )}
      </Button>
    </form>
  );
};

const PaymentGateway = ({ open, onClose, amount, onSuccess, onError }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Complete Your Purchase</DialogTitle>
      <DialogContent>
        <Elements stripe={stripePromise}>
          <PaymentForm
            amount={amount}
            onSuccess={onSuccess}
            onError={onError}
          />
        </Elements>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentGateway; 
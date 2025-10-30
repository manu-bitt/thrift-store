import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Sell from './pages/Sell';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import FAQ from './pages/FAQ';
import ContactSupport from './pages/ContactSupport';
import UserSettings from './pages/UserSettings';
import Favorites from './pages/Favorites';
import HowItWorks from './pages/HowItWorks';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ProductProvider } from './context/ProductContext';
import { ThemeProvider } from './context/ThemeContext';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#FFA000',
    },
    background: {
      default: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider>
      <MuiThemeProvider theme={theme}>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              <CssBaseline />
              <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Navbar />
                <div style={{ position: 'relative' }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/sell" element={<Sell />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/support" element={<ContactSupport />} />
                    <Route path="/settings" element={<UserSettings />} />
                    <Route path="/favorites" element={<Favorites />} />
                  </Routes>
                </div>
              </Router>
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default App;


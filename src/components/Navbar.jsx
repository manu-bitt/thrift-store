import React, { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  InputBase,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Search,
  Notifications,
  Person,
  ShoppingCart,
  Menu as MenuIcon,
  Favorite,
  LocalOffer,
  Settings,
  Logout,
  Chat,
  LocalShipping,
  TrendingDown,
  NotificationsOff,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import AuthModal from './AuthModal';
import Cart from './Cart';
import Profile from './Profile';
import SettingsDrawer from './Settings';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const cartContext = useCart();
  const { itemCount = 0 } = cartContext || {};
  const { items: wishlistItems } = useWishlist();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const handleWishlistClick = () => {
    navigate('/favorites');
  };

  const handleFavoritesClick = () => {
    navigate('/favorites');
  };

  const handleProfileOpen = () => {
    setProfileOpen(true);
    setUserMenuAnchor(null);
  };

  const handleProfileClose = () => {
    setProfileOpen(false);
  };

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
    setUserMenuAnchor(null);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  const handleFAQClick = () => {
    navigate('/faq');
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleOrdersClick = () => {
    navigate('/orders');
    handleUserMenuClose();
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Sell', path: '/sell' },
    { name: 'About', path: '/about' },
  ];

  const mobileMenu = (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
    >
      <Box sx={{ width: 250 }}>
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              component={RouterLink}
              to={item.path}
              key={item.name}
              selected={location.pathname === item.path}
              onClick={handleMobileMenuToggle}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
          <ListItem button onClick={handleFAQClick}>
            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText primary="FAQ" />
          </ListItem>
          <ListItem button onClick={handleContactClick}>
            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText primary="Contact Support" />
          </ListItem>
          <ListItem button onClick={handleSettingsClick}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'offer',
      title: 'Offer Accepted',
      message: 'Your offer for "Vintage Denim Jacket" was accepted',
      time: '2 hours ago',
      read: false,
      icon: <LocalOffer color="primary" />,
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message',
      message: 'New message from seller about "Retro Sneakers"',
      time: '5 hours ago',
      read: false,
      icon: <Chat color="info" />,
    },
    {
      id: 3,
      type: 'shipping',
      title: 'Item Shipped',
      message: 'Your item "Classic Watch" has been shipped',
      time: '1 day ago',
      read: true,
      icon: <LocalShipping color="success" />,
    },
    {
      id: 4,
      type: 'price',
      title: 'Price Drop',
      message: 'Price dropped on "Leather Boots" you saved',
      time: '2 days ago',
      read: true,
      icon: <TrendingDown color="error" />,
    },
  ];

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMobileMenuToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 0,
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LocalOffer sx={{ mr: 1 }} />
          ThriftStore
        </Typography>

        {!isMobile && (
          <Box sx={{ display: 'flex', ml: 4 }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={RouterLink}
                to={item.path}
                color="inherit"
                sx={{
                  mx: 1,
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        )}

        <SearchBar>
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </SearchBar>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            color="inherit" 
            onClick={handleNotificationsOpen}
            sx={{ 
              position: 'relative',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            <Badge 
              badgeContent={notifications.filter(n => !n.read).length} 
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  right: -3,
                  top: 3,
                  border: `2px solid ${theme.palette.background.paper}`,
                  padding: '0 4px',
                }
              }}
            >
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton color="inherit" onClick={handleCartOpen}>
            <Badge badgeContent={itemCount} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <IconButton color="inherit" onClick={handleWishlistClick}>
            <Badge badgeContent={wishlistItems.length} color="error">
              <Favorite />
            </Badge>
          </IconButton>

          <IconButton
            onClick={handleUserMenuOpen}
            sx={{ ml: 1 }}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <Person />
            </Avatar>
          </IconButton>
        </Box>

        <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={handleUserMenuClose}
        >
          <MenuItem onClick={handleProfileOpen}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleOrdersClick}>
            <ListItemIcon>
              <LocalShipping fontSize="small" />
            </ListItemIcon>
            Orders
          </MenuItem>
          <MenuItem onClick={handleFavoritesClick}>
            <ListItemIcon>
              <Favorite fontSize="small" />
            </ListItemIcon>
            Favorites
          </MenuItem>
          <MenuItem onClick={handleSettingsClick}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleFAQClick}>
            <ListItemIcon>
              <Chat fontSize="small" />
            </ListItemIcon>
            FAQ
          </MenuItem>
          <MenuItem onClick={handleContactClick}>
            <ListItemIcon>
              <Chat fontSize="small" />
            </ListItemIcon>
            Contact Support
          </MenuItem>
          <MenuItem onClick={() => setAuthModalOpen(true)}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Sign Out
          </MenuItem>
        </Menu>

        <Menu
          anchorEl={notificationsAnchor}
          open={Boolean(notificationsAnchor)}
          onClose={handleNotificationsClose}
          onClick={handleNotificationsClose}
          PaperProps={{
            sx: { 
              width: 360,
              maxHeight: 400,
              mt: 1.5,
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              borderRadius: 2,
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Notifications
            </Typography>
          </Box>
          
          {notifications.length > 0 ? (
            <>
              {notifications.map((notification) => (
                <MenuItem 
                  key={notification.id}
                  sx={{ 
                    py: 1.5, 
                    px: 2,
                    display: 'flex',
                    alignItems: 'flex-start',
                    backgroundColor: notification.read ? 'transparent' : 'rgba(25, 118, 210, 0.04)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      mr: 2, 
                      mt: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      backgroundColor: notification.read ? 'rgba(0, 0, 0, 0.04)' : 'rgba(25, 118, 210, 0.1)',
                    }}
                  >
                    {notification.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: notification.read ? 400 : 600 }}>
                        {notification.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {notification.time}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {notification.message}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
              <Box sx={{ p: 1, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
                <Button size="small" color="primary">
                  View All Notifications
                </Button>
              </Box>
            </>
          ) : (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <NotificationsOff sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
              <Typography variant="body1" color="text.secondary">
                No notifications yet
              </Typography>
            </Box>
          )}
        </Menu>

        {mobileMenu}
      </Toolbar>

      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <Cart
        open={cartOpen}
        onClose={handleCartClose}
      />

      <Profile
        open={profileOpen}
        onClose={handleProfileClose}
      />

      <SettingsDrawer
        open={settingsOpen}
        onClose={handleSettingsClose}
      />
    </AppBar>
  );
};

export default Navbar; 
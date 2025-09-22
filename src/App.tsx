import { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import './App.css';

const colors = {
  darkGreen: '#0c5d56',
  teal: '#2dd4bf',
  mediumGreen: '#0d9488',
  lightTeal: '#14b8a6',
};

const BackgroundContainer = styled(Box)(({ mouseX, mouseY }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: `linear-gradient(135deg, ${colors.darkGreen} 0%, ${colors.mediumGreen} 100%)`,
  transform: `translate(${mouseX / 50}px, ${mouseY / 50}px)`,
  transition: 'transform 0.1s ease-out',
  width: '105vw',
  height: '105vh',
  left: '-2.5vw',
  top: '-2.5vh',
}));

const ContentBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  maxWidth: 800,
  color: '#fff',
  zIndex: 1,
  padding: theme.spacing(2),
}));

function App() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [utmSource, setUtmSource] = useState('');
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmSource(params.get('utm_source') || 'direct');

    const handleMouseMove = (event) => {
      setMouseX(event.clientX - window.innerWidth / 2);
      setMouseY(event.clientY - window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async () => {
    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }

    try {
      const response = await fetch('https://api.dev.donaboon.org/v1/landing/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, utm_source: utmSource }),
      });

      const data = await response.json();

      if (response.ok && data.isSuccess) {
        setMessage('Thank you for subscribing! We will notify you when we launch.');
        setEmail('');
      } else {
        if (data.errors && data.errors.length > 0) {
          switch (data.errors[0]) {
            case 'landing.subscription.email.alreadyUsed':
              setMessage('This email is already subscribed.');
              break;
            case 'landing.subscription.email.required':
              setMessage('Email is required.');
              break;
            case 'landing.subscription.email.invalid':
              setMessage('Please enter a valid email address.');
              break;
            default:
              setMessage('Subscription failed. Please try again.');
          }
        } else {
          setMessage('Subscription failed. Please try again.');
        }
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      console.error('Subscription error:', error);
    }
  };

  return (
    <BackgroundContainer mouseX={mouseX} mouseY={mouseY}>
      <Box sx={{
        position: 'fixed',
        top: 30,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        filter: 'brightness(10000%)'
      }}
      marginTop='50px'>
        <Typography variant="h5" component="div" sx={{ fontWeight: 600, color: 'white' }}>
          Donaboon
        </Typography>
        <img
          src="logo.png"
          alt="Donaboon Logo"
          style={{
            height: 40,
            width: 'auto',
            borderRadius: '8px',
          }}
        />
      </Box>

      <ContentBox>
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 700,
            lineHeight: 1.3,
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          Join our journey! Leave your email and be the first to know when we launch.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <TextField
            placeholder="Your email address"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                borderRadius: '8px',
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.8)' },
                '&.Mui-focused fieldset': { borderColor: '#fff' },
              },
              input: { color: '#fff' },
              width: 300,
            }}
            InputProps={{
              style: { padding: '10px 14px' }
            }}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: colors.teal,
              '&:hover': { backgroundColor: colors.lightTeal },
              color: '#fff',
              fontWeight: 600,
              padding: '12px 24px',
              borderRadius: '8px',
            }}
          >
            Notify Me
          </Button>
        </Box>

        {message && (
          <Typography variant="body1" sx={{ mt: 3, color: '#fff', fontWeight: 500 }}>
            {message}
          </Typography>
        )}
      </ContentBox>
    </BackgroundContainer>
  );
}

export default App;
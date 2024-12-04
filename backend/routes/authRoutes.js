const express = require('express');
const passport = require('passport');
const User = require('../models/User'); 
const router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized. Please log in.' });
}

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  try {
   
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

   
    const user = new User({ username, email, password });
    await user.save();

    console.log('User registered successfully:', user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Authentication error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Error logging in', error: err.message });
      }

      res.status(200).json({
        message: 'Login successful',
        user: { id: user._id, username: user.username, email: user.email },
      });
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Error logging out', error: err.message });
    }

    res.status(200).json({ message: 'Logout successful' });
  });
});

router.get('/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ isAuthenticated: true, user: req.user });
  }
  res.status(401).json({ isAuthenticated: false });
});

router.get('/protected', ensureAuthenticated, (req, res) => {
  res.status(200).json({ message: 'You have access to this protected route!' });
});

module.exports = router;
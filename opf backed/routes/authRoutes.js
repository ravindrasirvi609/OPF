const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Registration endpoint
// router.post('/register', async (req, res) => {
//   try {
//     // Retrieve user input
//     const { username, email, password, confirmPassword } = req.body;

//     // Validate password and confirmPassword
//     if (password !== confirmPassword) {
//       res.status(400).json({ error: 'Password and confirmPassword do not match' });
//       return;
//     }

//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       res.status(400).json({ error: 'User with the same email already exists' });
//       return;
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const user = new User({ username, email, password: hashedPassword });
//     await user.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to register user' });
//   }
// });
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// router.post('/login', async (req, res) => {
//   try {
//     // Retrieve user input
//     const { email, password } = req.body;

//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       res.status(401).json({ error: 'Invalid email or password' });
//       return;
//     }

//     // Compare the provided password with the stored password
//     const isValidPassword = await bcrypt.compare(password, user.password);
//     if (!isValidPassword) {
//       res.status(401).json({ error: 'Invalid email or password' });
//       return;
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ email: user.email }, 'secret-key');

//     res.status(200).json({ token });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to login' });
//   }
// });
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a token
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    // Retrieve user input
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Generate a password reset token
    const token = jwt.sign({ email: user.email }, 'secret-key', { expiresIn: '1h' });

    // Send the password reset email
    const transporter = nodemailer.createTransport({
      // Configure your email service here
    });

    const mailOptions = {
      from: 'noreply@example.com',
      to: user.email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: http://localhost:3000/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Failed to send password reset email', error);
        res.status(500).json({ error: 'Failed to send password reset email' });
      } else {
        console.log('Password reset email sent:', info.response);
        res.status(200).json({ message: 'Password reset email sent' });
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process password reset' });
  }
});


// Logout endpoint
router.post('/logout', (req, res) => {
  // Clear session or token on the server-side
  // ...

  // Clear authentication information on the client-side
  res.clearCookie('token'); // Clear token cookie

  res.status(200).json({ message: 'User logged out successfully' });
});

module.exports = router;
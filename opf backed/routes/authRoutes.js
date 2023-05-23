const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (password !== confirmPassword) {
      res.status(400).json({ error: 'Password and confirmPassword do not match' });
      return;
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'User with the same email already exists' });
      return;
    }
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log("user",user);
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log(isValidPassword);
    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }
    const token = jwt.sign({ email: user.email }, 'secret-key');
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Password recovery endpoint
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
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

module.exports = router;










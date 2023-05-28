// routes/protected.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

// Protected route
router.get('/protected-route', verifyToken, (req, res) => {
  const userId = req.userId;
  // Handle further processing for the protected route
  // ...
  res.json({ message: 'Protected route accessed successfully' });
});

module.exports = router;

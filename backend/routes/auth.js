const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const router = express.Router();

// Seed admin account — visit /api/auth/seed
router.get('/seed', async (req, res) => {
  try {
    const email = process.env.ADMIN_EMAIL.toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.json({ message: 'Admin already exists.' });
    }

    await Admin.create({
      email,
      password
    });

    res.json({ message: '✅ Admin created successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, email: admin.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

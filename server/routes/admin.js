const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Add student or teacher
// router.post('/add-user', async (req, res) => {
//   const { name, email, password, role } = req.body;

//   if (!['student', 'teacher'].includes(role)) {
//     return res.status(400).json({ msg: "Invalid role" });
//   }

//   try {
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ msg: "User already exists" });

//     const newUser = new User({ name, email, password, role });
//     await newUser.save();

//     res.status(201).json({ msg: `${role} added successfully` });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// });
// ✅ POST: Add a new user (admin adds teacher/student)
router.post('/add-user', async (req, res) => {
  try {
    const { name, email, password, role, classId } = req.body;

    // Basic validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: 'Please fill all required fields' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const newUser = new User({ name, email, password, role });

    // If student, assign classId
    if (role === 'student' && classId) {
      newUser.classId = classId;
    }

    await newUser.save();
    res.status(201).json({ msg: 'User added successfully' });
  } catch (err) {
    console.error('Error in add-user:', err.message);
    res.status(500).json({ msg: 'Internal server error' });
  }
});


// Get all students and teachers
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ['student', 'teacher'] } }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch users" });
  }
});

// Update user
router.put('/user/:id', async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    ).select('-password');

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Update failed' });
  }
});

// Delete user
router.delete('/user/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Delete failed' });
  }
});

module.exports = router;

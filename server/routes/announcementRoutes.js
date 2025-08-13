const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');
const authMiddleware = require('../middleware/authMiddleware'); // JWT verify middleware

// 📌 Get all announcements
router.get('/', authMiddleware, async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching announcements' });
  }
});

// 📌 Create a new announcement
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, message } = req.body;
    const newAnnouncement = new Announcement({
      title,
      message,
      createdBy: req.user.id // token से user
    });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (err) {
    res.status(500).json({ message: 'Error creating announcement' });
  }
});

// 📌 Update an announcement
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, message } = req.body;
    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, message },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating announcement' });
  }
});

// 📌 Delete an announcement
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Announcement deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting announcement' });
  }
});

module.exports = router;

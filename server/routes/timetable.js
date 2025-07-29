const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');

// ➕ Add a new timetable entry
router.post('/add', async (req, res) => {
  const { classId, subject, teacherId, day, time } = req.body;

  if (!classId || !subject || !teacherId || !day || !time) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const newEntry = new Timetable({ classId, subject, teacherId, day, time });
    await newEntry.save();

    console.log('✅ New Timetable Entry:', newEntry);
    res.status(201).json({ message: 'Timetable entry added successfully!', entry: newEntry });
  } catch (error) {
    console.error('❌ Timetable creation error:', error);
    res.status(500).json({ error: 'Server error while adding timetable entry.' });
  }
});

// 📅 Get timetable by class (Student View)
router.get('/class/:classId', async (req, res) => {
  try {
    const timetable = await Timetable.find({ classId: req.params.classId }).populate('teacherId', 'name');
    res.json(timetable);
  } catch (err) {
    console.error('❌ Error fetching class timetable:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// 📘 Get timetable by teacher (Teacher View)
router.get('/teacher/:teacherId', async (req, res) => {
  try {
    const timetable = await Timetable.find({ teacherId: req.params.teacherId }).populate('classId', 'name');
    res.json(timetable);
  } catch (err) {
    console.error('❌ Error fetching teacher timetable:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// 🧑‍💼 Get all timetables (Admin View)
router.get('/all', async (req, res) => {
  try {
    const timetable = await Timetable.find().populate('classId', 'name').populate('teacherId', 'name');
    res.json(timetable);
  } catch (err) {
    console.error('❌ Error fetching all timetables:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

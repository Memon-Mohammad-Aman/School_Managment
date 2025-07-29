const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const User = require('../models/User');

// POST: Mark attendance
router.post('/mark', async (req, res) => {
  const { classId, subjectId, date, records } = req.body;

  try {
    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const exists = await Attendance.findOne({
      classId,
      subjectId,
      date: { $gte: start, $lte: end },
    });

    if (exists) {
      return res.status(400).json({ msg: 'Attendance already marked for this date.' });
    }

    const formattedRecords = records.map(r => ({
      studentId: r.studentId,
      present: r.status === 'present',
    }));

    const attendance = new Attendance({
      classId,
      subjectId,
      date,
      records: formattedRecords,
    });

    await attendance.save();
    res.json({ msg: 'Attendance saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error saving attendance' });
  }
});

// GET: Students in class
router.get('/students/:classId', async (req, res) => {
  try {
    const students = await User.find({ role: 'student', classId: req.params.classId });
    res.json(students);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching students' });
  }
});

// GET: Attendance Records
router.get('/records/:classId/:subjectId', async (req, res) => {
  const { classId, subjectId } = req.params;
  try {
    const records = await Attendance.find({ classId, subjectId })
      .populate('records.studentId', 'name email');
    res.json(records);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching records' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const Assignment = require('../models/Assignment');
const User = require('../models/User'); // Teachers are stored here

// ✅ Get teacher's assigned classes and subjects
router.get('/assigned/:teacherId', async (req, res) => {
  try {
    const { teacherId } = req.params;

    const classes = await Class.find({
      'teachingAssignments.teacher': teacherId
    }).select('name subjects teachingAssignments');

    const filteredClasses = classes.map((cls) => {
      const relevantAssignments = cls.teachingAssignments.filter(
        (ta) => ta.teacher.toString() === teacherId
      );

      return {
        _id: cls._id,
        name: cls.name,
        subjects: relevantAssignments.map((ta) => ta.subject.name)
      };
    });

    res.json(filteredClasses);
  } catch (err) {
    console.error('Error fetching assigned classes:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Get all assignments uploaded by a teacher
router.get('/assignments/:teacherId', async (req, res) => {
  try {
    const { teacherId } = req.params;

    const assignments = await Assignment.find({ teacherId })
      .populate('classId', 'name');

    res.json(assignments);
  } catch (err) {
    console.error('Error fetching teacher assignments:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Get all teachers (for admin dropdown in timetable form etc.)
router.get('/all', async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' }).select('_id name email'); // Add any fields you need
    res.json(teachers);
  } catch (err) {
    console.error('Error fetching teachers:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

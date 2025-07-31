const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const AssignmentSubmission = require('../models/AssignmentSubmission');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

// POST /api/assignment-submission
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { studentId, assignmentId, classId } = req.body;

    // Validate ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(studentId) ||
      !mongoose.Types.ObjectId.isValid(assignmentId) ||
      !mongoose.Types.ObjectId.isValid(classId)
    ) {
      return res.status(400).json({ error: 'Invalid ID(s) provided' });
    }

    const filePath = req.file?.path;
    if (!filePath) {
      return res.status(400).json({ error: 'File not uploaded' });
    }

    const submission = new AssignmentSubmission({
      studentId,
      assignmentId,
      classId,
      filePath,
    });

    await submission.save();
    res.status(201).json({ message: 'Assignment submitted successfully' });
  } catch (error) {
    console.error('Submission Error:', error);
    res.status(500).json({ error: 'Server error while submitting assignment' });
  }
});

module.exports = router;

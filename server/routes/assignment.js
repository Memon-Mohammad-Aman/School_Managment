const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const upload = require('../utils/multer');

// Upload assignment
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { title, description, classId, subject, teacherId } = req.body;

    if (!req.file) return res.status(400).json({ msg: 'File upload failed' });

    const assignment = new Assignment({
      title,
      description,
      classId,
      subject,
      teacherId,
      filePath: `/uploads/${req.file.filename}`
    });

    await assignment.save();
    res.json({ msg: 'Assignment uploaded successfully', assignment });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ msg: 'Error uploading assignment', error: err.message });
  }
});

// View assignments for students
router.get('/student/:classId', async (req, res) => {
  try {
    const assignments = await Assignment.find({ classId: req.params.classId });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching assignments' });
  }
});

// View all assignments for admin
// ✅ View all assignments for admin
router.get('/all', async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate('teacherId', 'name email')      // already there ✅
      .populate('classId', 'name');              // 👈 add this line

    res.json(assignments);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching assignments' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) return res.status(404).json({ msg: 'Not found' });
    res.json({ msg: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Delete error' });
  }
});


module.exports = router;

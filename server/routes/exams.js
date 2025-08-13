const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');
const Submission = require('../models/Submission');
const auth = require('../middleware/authMiddleware');

/**
 * ADMIN: Create exam
 */
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });

    const { title, classId, startTime, duration, questions } = req.body;
    if (!title || !classId || !startTime || !duration || !questions?.length) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    for (const q of questions) {
      if (!q.questionText || !Array.isArray(q.options) || q.options.length < 2 || typeof q.correctOption !== 'number') {
        return res.status(400).json({ error: 'Invalid question format' });
      }
    }

    const exam = await Exam.create({
      title,
      classId,
      startTime: new Date(startTime),
      duration,
      questions,
      createdBy: req.user.id
    });

    res.status(201).json(exam);
  } catch (err) {
    console.error('Create exam error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * ADMIN: List all exams
 */
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });

    const exams = await Exam.find()
      .populate('classId', 'name')
      .sort({ startTime: -1 });

    res.json(exams);
  } catch (err) {
    console.error('Get exams error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * STUDENT: Active exams for a class (start <= now < end)
 */
router.get('/active/:classId', auth, async (req, res) => {
  try {
    const now = Date.now();
    const exams = await Exam.find({
      classId: req.params.classId,
      startTime: { $lte: now },
      $expr: { $gt: [{ $add: ['$startTime', { $multiply: ['$duration', 60 * 1000] }] }, now] }
    }).select('-questions.correctOption'); // hide answers
    res.json(exams);
  } catch (err) {
    console.error('Active exams error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * COMMON: Get single exam for taking (hide correctOption)
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).lean();
    if (!exam) return res.status(404).json({ error: 'Exam not found' });

    const clean = {
      _id: exam._id,
      title: exam.title,
      classId: exam.classId,
      startTime: exam.startTime,
      duration: exam.duration,
      questions: exam.questions.map(q => ({
        _id: q._id,
        questionText: q.questionText,
        options: q.options
      }))
    };
    res.json(clean);
  } catch (err) {
    console.error('Get exam error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * STUDENT: Submit answers (auto-grade)
 */
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const examId = req.params.id;
    const studentId = req.user.id;
    const { answers, autoSubmitted = false } = req.body || {};

    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ error: 'Exam not found' });

    const now = Date.now();
    const start = new Date(exam.startTime).getTime();
    const end = start + exam.duration * 60 * 1000;

    if (now < start) return res.status(400).json({ error: 'Exam has not started yet' });
    if (now > end && !autoSubmitted) return res.status(400).json({ error: 'Exam time is over' });

    const submitted = Array.isArray(answers) ? answers : [];
    let correct = 0;
    exam.questions.forEach((q, i) => {
      if (submitted[i] === q.correctOption) correct++;
    });

    const score = correct; // per-question = 1 point

    const upsert = await Submission.findOneAndUpdate(
      { examId, studentId },
      { answers: submitted, score, autoSubmitted, submittedAt: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ message: 'Submission saved', score });
  } catch (err) {
    console.error('Submit error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * ADMIN/TEACHER/STUDENT: Results
 * - Admin/teacher: all submissions for exam
 * - Student: only their own submission
 */
router.get('/:id/results', auth, async (req, res) => {
  try {
    const examId = req.params.id;

    if (req.user.role === 'student') {
      const mine = await Submission.findOne({ examId, studentId: req.user.id })
        .populate('examId', 'title duration');
      return res.json(mine ? [mine] : []);
    }

    // admin/teacher -> all
    const all = await Submission.find({ examId })
      .populate('studentId', 'name email')
      .populate('examId', 'title duration');
    res.json(all);
  } catch (err) {
    console.error('Results error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * ADMIN: Delete exam + related submissions
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });

    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ error: 'Exam not found' });

    await Exam.findByIdAndDelete(req.params.id);
    await Submission.deleteMany({ examId: req.params.id });

    res.json({ message: 'Exam and related submissions deleted successfully' });
  } catch (err) {
    console.error('Delete exam error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

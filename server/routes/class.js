// // Use this router at: app.use('/api/class', classRoutes);

// const express = require('express');
// const router = express.Router();
// const Class = require('../models/Class');
// const Subject = require('../models/Subject');

// // GET all classes
// router.get('/', async (req, res) => {
//   try {
//     const classes = await Class.find().populate('teachingAssignments.teacher');
//     res.json(classes);
//   } catch (err) {
//     res.status(500).json({ msg: 'Error fetching classes' });
//   }
// });

// // GET class by ID (including subjects)
// router.get('/:id', async (req, res) => {
//   try {
//     const cls = await Class.findById(req.params.id);
//     if (!cls) return res.status(404).json({ msg: 'Class not found' });
//     res.json(cls);
//   } catch (err) {
//     res.status(500).json({ msg: 'Error fetching class data' });
//   }
// });

// // GET all subjects
// router.get('/subjects/all', async (req, res) => {
//   try {
//     const subjects = await Subject.find();
//     res.json(subjects);
//   } catch (err) {
//     res.status(500).json({ msg: 'Error fetching subjects' });
//   }
// });

// // Add class
// router.post('/add-class', async (req, res) => {
//   const { name } = req.body;
//   try {
//     const newClass = new Class({ name, subjects: [] });
//     await newClass.save();
//     res.json(newClass);
//   } catch (err) {
//     res.status(500).json({ msg: 'Error adding class' });
//   }
// });

// // Add subject
// router.post('/add-subject', async (req, res) => {
//   const { name } = req.body;
//   try {
//     const newSubject = new Subject({ name });
//     await newSubject.save();
//     res.json(newSubject);
//   } catch (err) {
//     res.status(500).json({ msg: 'Error adding subject' });
//   }
// });

// // Assign subject to class (by name)
// router.post('/assign-subject', async (req, res) => {
//   const { classId, subjectId } = req.body;
//   try {
//     const cls = await Class.findById(classId);
//     const subject = await Subject.findById(subjectId);
//     if (!cls || !subject) return res.status(404).json({ msg: 'Not found' });

//     const alreadyAssigned = cls.subjects.some((s) => s.name === subject.name);
//     if (alreadyAssigned) return res.status(400).json({ msg: 'Already assigned' });

//     cls.subjects.push({ name: subject.name });
//     await cls.save();
//     res.json({ msg: 'Subject assigned to class' });
//   } catch (err) {
//     res.status(500).json({ msg: 'Error assigning subject' });
//   }
// });

// // Assign teacher to subject
// router.post('/assign-teacher', async (req, res) => {
//   const { classId, subjectName, teacherId } = req.body;

//   try {
//     const cls = await Class.findById(classId);
//     if (!cls) return res.status(404).json({ msg: 'Class not found' });

//     const subjectExists = cls.subjects.some((s) => s.name === subjectName);
//     if (!subjectExists) return res.status(404).json({ msg: 'Subject not found in class' });

//     const alreadyAssigned = cls.teachingAssignments.some(
//       (a) => a.subject.name === subjectName && a.teacher.toString() === teacherId
//     );
//     if (alreadyAssigned) {
//       return res.status(400).json({ msg: 'Teacher already assigned to this subject' });
//     }

//     cls.teachingAssignments.push({
//       subject: { name: subjectName },
//       teacher: teacherId,
//     });

//     await cls.save();
//     res.json({ msg: 'Teacher assigned successfully' });
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error while assigning teacher' });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Class = require('../models/Class');
// const Subject = require('../models/Subject');

// // ✅ GET all classes (root route)
// router.get('/', async (req, res) => {
//   try {
//     const classes = await Class.find().populate('teachingAssignments.teacher');
//     res.json(classes);
//   } catch (err) {
//     res.status(500).json({ msg: 'Error fetching classes' });
//   }
// });

// // ✅ Also support /classes (for frontend expecting /api/class/classes)
// router.get('/classes', async (req, res) => {
//   try {
//     const classes = await Class.find().populate('teachingAssignments.teacher');
//     res.json(classes);
//   } catch (err) {
//     res.status(500).json({ msg: 'Error fetching classes' });
//   }
// });

// // ✅ GET class by ID (including subjects)
// router.get('/:id', async (req, res) => {
//   try {
//     const cls = await Class.findById(req.params.id);
//     if (!cls) return res.status(404).json({ msg: 'Class not found' });
//     res.json(cls);
//   } catch (err) {
//     res.status(500).json({ msg: 'Error fetching class data' });
//   }
// });

// // ✅ GET all subjects
// router.get('/subjects/all', async (req, res) => {
//   try {
//     const subjects = await Subject.find();
//     res.json(subjects);
//   } catch (err) {
//     res.status(500).json({ msg: 'Error fetching subjects' });
//   }
// });

// // ✅ Add class
// router.post('/add-class', async (req, res) => {
//   const { name } = req.body;
//   try {
//     const newClass = new Class({ name, subjects: [] });
//     await newClass.save();
//     res.json(newClass);
//   } catch (err) {
//     res.status(500).json({ msg: 'Error adding class' });
//   }
// });

// // ✅ Add subject
// router.post('/add-subject', async (req, res) => {
//   const { name } = req.body;
//   try {
//     const newSubject = new Subject({ name });
//     await newSubject.save();
//     res.json(newSubject);
//   } catch (err) {
//     res.status(500).json({ msg: 'Error adding subject' });
//   }
// });

// // ✅ Assign subject to class (by name)
// router.post('/assign-subject', async (req, res) => {
//   const { classId, subjectId } = req.body;
//   try {
//     const cls = await Class.findById(classId);
//     const subject = await Subject.findById(subjectId);
//     if (!cls || !subject) return res.status(404).json({ msg: 'Not found' });

//     const alreadyAssigned = cls.subjects.some((s) => s.name === subject.name);
//     if (alreadyAssigned) return res.status(400).json({ msg: 'Already assigned' });

//     cls.subjects.push({ name: subject.name });
//     await cls.save();
//     res.json({ msg: 'Subject assigned to class' });
//   } catch (err) {
//     res.status(500).json({ msg: 'Error assigning subject' });
//   }
// });

// // ✅ Assign teacher to subject
// router.post('/assign-teacher', async (req, res) => {
//   const { classId, subjectName, teacherId } = req.body;

//   try {
//     const cls = await Class.findById(classId);
//     if (!cls) return res.status(404).json({ msg: 'Class not found' });

//     const subjectExists = cls.subjects.some((s) => s.name === subjectName);
//     if (!subjectExists) return res.status(404).json({ msg: 'Subject not found in class' });

//     const alreadyAssigned = cls.teachingAssignments.some(
//       (a) => a.subject.name === subjectName && a.teacher.toString() === teacherId
//     );
//     if (alreadyAssigned) {
//       return res.status(400).json({ msg: 'Teacher already assigned to this subject' });
//     }

//     cls.teachingAssignments.push({
//       subject: { name: subjectName },
//       teacher: teacherId,
//     });

//     await cls.save();
//     res.json({ msg: 'Teacher assigned successfully' });
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error while assigni ng teacher' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const Subject = require('../models/Subject');

// ✅ GET all classes (root route)
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find().populate('teachingAssignments.teacher');
    res.json(classes);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching classes' });
  }
});

// ✅ Also support /classes (for frontend expecting /api/class/classes)
router.get('/classes', async (req, res) => {
  try {
    const classes = await Class.find().populate('teachingAssignments.teacher');
    res.json(classes);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching classes' });
  }
});

// ✅ GET class by ID (including subjects)
router.get('/:id', async (req, res) => {
  try {
    const cls = await Class.findById(req.params.id);
    if (!cls) return res.status(404).json({ msg: 'Class not found' });
    res.json(cls);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching class data' });
  }
});

// ✅ GET all subjects
router.get('/subjects/all', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching subjects' });
  }
});

// ✅ Add class
router.post('/add-class', async (req, res) => {
  const { name } = req.body;
  try {
    const newClass = new Class({ name, subjects: [] });
    await newClass.save();
    res.json(newClass);
  } catch (err) {
    res.status(500).json({ msg: 'Error adding class' });
  }
});

// ✅ Add subject
router.post('/add-subject', async (req, res) => {
  const { name } = req.body;
  try {
    const newSubject = new Subject({ name });
    await newSubject.save();
    res.json(newSubject);
  } catch (err) {
    res.status(500).json({ msg: 'Error adding subject' });
  }
});

// ✅ Assign subject to class (by name)
router.post('/assign-subject', async (req, res) => {
  const { classId, subjectId } = req.body;
  try {
    const cls = await Class.findById(classId);
    const subject = await Subject.findById(subjectId);
    if (!cls || !subject) return res.status(404).json({ msg: 'Not found' });

    const alreadyAssigned = cls.subjects.some((s) => s.name === subject.name);
    if (alreadyAssigned) return res.status(400).json({ msg: 'Already assigned' });

    cls.subjects.push({ name: subject.name });
    await cls.save();
    res.json({ msg: 'Subject assigned to class' });
  } catch (err) {
    res.status(500).json({ msg: 'Error assigning subject' });
  }
});

// ✅ Assign teacher to subject
router.post('/assign-teacher', async (req, res) => {
  const { classId, subjectName, teacherId } = req.body;

  try {
    const cls = await Class.findById(classId);
    if (!cls) return res.status(404).json({ msg: 'Class not found' });

    const subjectExists = cls.subjects.some((s) => s.name === subjectName);
    if (!subjectExists) return res.status(404).json({ msg: 'Subject not found in class' });

    const alreadyAssigned = cls.teachingAssignments.some(
      (a) => a.subject.name === subjectName && a.teacher.toString() === teacherId
    );
    if (alreadyAssigned) {
      return res.status(400).json({ msg: 'Teacher already assigned to this subject' });
    }

    cls.teachingAssignments.push({
      subject: { name: subjectName },
      teacher: teacherId,
    });

    await cls.save();
    res.json({ msg: 'Teacher assigned successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error while assigning teacher' });
  }
});

module.exports = router;

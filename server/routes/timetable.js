// // const express = require('express');
// // const router = express.Router();
// // const Class = require('../models/Class');
// // const User = require('../models/User'); // for teacher ref

// // // 📌 POST: Assign timetable entry
// // router.post('/assign', async (req, res) => {
// //   const { classId, day, period, subject, teacherId } = req.body;

// //   try {
// //     const cls = await Class.findById(classId);
// //     if (!cls) return res.status(404).json({ error: 'Class not found' });

// //     // Remove existing entry for same day & period
// //     cls.timetable = cls.timetable.filter(
// //       (entry) => !(entry.day === day && entry.period === period)
// //     );

// //     // Add new entry
// //     cls.timetable.push({
// //       day,
// //       period,
// //       subject,
// //       teacher: teacherId,
// //     });

// //     await cls.save();
// //     res.json({ message: 'Timetable entry saved successfully' });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: 'Server error while saving timetable' });
// //   }
// // });

// // // 📌 GET: Get timetable for a class
// // router.get('/:classId', async (req, res) => {
// //   try {
// //     const cls = await Class.findById(req.params.classId).populate('timetable.teacher', 'name');
// //     if (!cls) return res.status(404).json({ error: 'Class not found' });

// //     res.json(cls.timetable);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: 'Error fetching timetable' });
// //   }

// //   // GET: Timetable for a specific teacher
// // // GET timetable for a specific teacher
// // router.get('/teacher/:teacherId', async (req, res) => {
// //   try {
// //     const teacherId = req.params.teacherId;

// //     // Find all classes with timetable entries for this teacher
// //     const classes = await Class.find({ 'timetable.teacher': teacherId });

// //     const timetable = [];

// //     classes.forEach(cls => {
// //       cls.timetable.forEach(entry => {
// //         if (entry.teacher?.toString() === teacherId) {
// //           timetable.push({
// //             className: cls.name,
// //             day: entry.day,
// //             period: entry.period,
// //             subject: entry.subject,
// //           });
// //         }
// //       });
// //     });

// //     res.json(timetable);
// //   } catch (err) {
// //     console.error('Error fetching teacher timetable:', err);
// //     res.status(500).json({ error: 'Error fetching teacher timetable' });
// //   }
// // });


// // });

// // module.exports = router;

// // const express = require('express');
// // const router = express.Router();
// // const Class = require('../models/Class');
// // const User = require('../models/User'); // Ensure teacher reference is valid

// // // ✅ POST: Assign a timetable entry to a class
// // router.post('/assign', async (req, res) => {
// //   const { classId, day, period, subject, teacherId } = req.body;

// //   try {
// //     const cls = await Class.findById(classId);
// //     if (!cls) return res.status(404).json({ error: 'Class not found' });

// //     // Remove existing entry for the same day and period
// //     cls.timetable = cls.timetable.filter(
// //       (entry) => !(entry.day === day && entry.period === period)
// //     );

// //     // Add the new timetable entry
// //     cls.timetable.push({
// //       day,
// //       period,
// //       subject,
// //       teacher: teacherId,
// //     });

// //     await cls.save();
// //     res.json({ message: 'Timetable entry saved successfully' });
// //   } catch (err) {
// //     console.error('Error assigning timetable:', err);
// //     res.status(500).json({ error: 'Server error while assigning timetable' });
// //   }
// // });

// // // ✅ GET: Fetch timetable for a specific class
// // router.get('/:classId', async (req, res) => {
// //   try {
// //     const cls = await Class.findById(req.params.classId).populate('timetable.teacher', 'name');
// //     if (!cls) return res.status(404).json({ error: 'Class not found' });

// //     res.json(cls.timetable);
// //   } catch (err) {
// //     console.error('Error fetching class timetable:', err);
// //     res.status(500).json({ error: 'Error fetching timetable' });
// //   }
// // });


// // // ✅ GET: Fetch timetable for a specific teacher
// // router.get('/teacher/:teacherId', async (req, res) => {
// //   try {
// //     const { teacherId } = req.params;

// //     // Find all classes with timetable entries for this teacher
// //     const classes = await Class.find({ 'timetable.teacher': teacherId });

// //     const timetable = [];

// //     classes.forEach(cls => {
// //       cls.timetable.forEach(entry => {
// //         if (entry.teacher?.toString() === teacherId) {
// //           timetable.push({
// //             className: cls.name,
// //             day: entry.day,
// //             period: entry.period,
// //             subject: entry.subject,
// //           });
// //         }
// //       });
// //     });

// //     res.json(timetable);
// //   } catch (err) {
// //     console.error('Error fetching teacher timetable:', err.message);
// //     res.status(500).json({ error: 'Failed to fetch teacher timetable' });
// //   }
// // });





// // module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Class = require('../models/Class');

// // ✅ POST: Assign a timetable entry to a class
// router.post('/assign', async (req, res) => {
//   const { classId, day, period, subject, teacherId } = req.body;

//   try {
//     const cls = await Class.findById(classId);
//     if (!cls) return res.status(404).json({ error: 'Class not found' });

//     // Remove existing entry for same day and period
//     cls.timetable = cls.timetable.filter(
//       (entry) => !(entry.day === day && entry.period === period)
//     );

//     // Add new entry
//     cls.timetable.push({
//       day,
//       period,
//       subject,
//       teacher: teacherId,
//     });

//     await cls.save();
//     res.json({ message: 'Timetable entry saved successfully' });
//   } catch (err) {
//     console.error('Error assigning timetable:', err);
//     res.status(500).json({ error: 'Server error while assigning timetable' });
//   }
// });

// // ✅ GET: Class-specific timetable
// router.get('/:classId', async (req, res) => {
//   try {
//     const cls = await Class.findById(req.params.classId).populate('timetable.teacher', 'name');
//     if (!cls) return res.status(404).json({ error: 'Class not found' });

//     res.json(cls.timetable);
//   } catch (err) {
//     console.error('Error fetching class timetable:', err);
//     res.status(500).json({ error: 'Error fetching timetable' });
//   }
// });

// // ✅ GET: Teacher-specific timetable
// router.get('/teacher/:teacherId', async (req, res) => {
//   try {
//     const { teacherId } = req.params;

//     const classes = await Class.find({ 'timetable.teacher': teacherId });

//     const timetable = [];

//     classes.forEach(cls => {
//       cls.timetable.forEach(entry => {
//         if (entry.teacher?.toString() === teacherId) {
//           timetable.push({
//             className: cls.name,
//             day: entry.day,
//             period: entry.period,
//             subject: entry.subject,
//           });
//         }
//       });
//     });

//     res.json(timetable);
//   } catch (err) {
//     console.error('Error fetching teacher timetable:', err.message);
//     res.status(500).json({ error: 'Failed to fetch teacher timetable' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Class = require('../models/Class');

// ✅ POST: Assign a timetable entry to a class
router.post('/assign', async (req, res) => {
  const { classId, day, period, subject, teacherId, date, time } = req.body;

  try {
    const cls = await Class.findById(classId);
    if (!cls) return res.status(404).json({ error: 'Class not found' });

    // Remove existing entry for the same day and period
    cls.timetable = cls.timetable.filter(
      (entry) => !(entry.day === day && entry.period === period)
    );

    // Add new entry
    cls.timetable.push({
      day,
      period,
      subject,
      teacher: teacherId,
      ...(date && { date }),   // optional
      ...(time && { time })    // optional
    });

    await cls.save();
    res.json({ message: '✅ Timetable entry assigned successfully' });
  } catch (err) {
    console.error('❌ Error assigning timetable:', err);
    res.status(500).json({ error: 'Server error while assigning timetable' });
  }
});

// ✅ GET: Fetch timetable for a specific class
router.get('/:classId', async (req, res) => {
  try {
    const cls = await Class.findById(req.params.classId)
      .populate('timetable.teacher', 'name');
    
    if (!cls) return res.status(404).json({ error: 'Class not found' });

    res.json(cls.timetable);
  } catch (err) {
    console.error('❌ Error fetching class timetable:', err);
    res.status(500).json({ error: 'Error fetching timetable' });
  }
});

// ✅ GET: Fetch timetable for a specific teacher
router.get('/teacher/:teacherId', async (req, res) => {
  try {
    const { teacherId } = req.params;

    const classes = await Class.find({ 'timetable.teacher': teacherId });

    const timetable = [];

    classes.forEach(cls => {
      cls.timetable.forEach(entry => {
        if (entry.teacher?.toString() === teacherId) {
          timetable.push({
            className: cls.name,
            day: entry.day,
            period: entry.period,
            subject: entry.subject,
            date: entry.date || null,
            time: entry.time || null,
          });
        }
      });
    });

    res.json(timetable);
  } catch (err) {
    console.error('❌ Error fetching teacher timetable:', err.message);
    res.status(500).json({ error: 'Failed to fetch teacher timetable' });
  }
});

module.exports = router;

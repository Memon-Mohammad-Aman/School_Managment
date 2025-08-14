// const express = require("express");
// const Fee = require("../models/Fee");
// const User = require("../models/User");
// const router = express.Router();

// // 📌 Admin - Add Fee
// router.post("/add", async (req, res) => {
//   try {
//     const { studentId, classId, amount, dueDate } = req.body;
//     const fee = new Fee({ studentId, classId, amount, dueDate });
//     await fee.save();
//     res.json({ success: true, message: "Fee added successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// // 📌 Admin - Get All Fees
// router.get("/all", async (req, res) => {
//   try {
//     const fees = await Fee.find().populate("studentId", "name").populate("classId", "name");
//     res.json(fees);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Admin - Mark Fee as Paid
// router.put("/mark-paid/:id", async (req, res) => {
//   try {
//     await Fee.findByIdAndUpdate(req.params.id, { status: "Paid" });
//     res.json({ success: true, message: "Fee marked as Paid" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Student - View Own Fees
// router.get("/student/:studentId", async (req, res) => {
//   try {
//     const fees = await Fee.find({ studentId: req.params.studentId }).populate("classId", "name");
//     res.json(fees);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Student - Pay Fee
// router.put("/pay/:id", async (req, res) => {
//   try {
//     await Fee.findByIdAndUpdate(req.params.id, { status: "Paid" });
//     res.json({ success: true, message: "Fee Paid Successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;
const express = require("express");
const mongoose = require("mongoose");
const Fee = require("../models/Fee");
const User = require("../models/User");

const router = express.Router();

/**
 * 📌 Admin - Add Fee for a Class
 * This will automatically create a fee record for each student in the class.
 */
router.post("/add", async (req, res) => {
  try {
    const { classId, amount, dueDate } = req.body;

    if (!classId || !amount || !dueDate) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    // ✅ Convert classId to ObjectId
    const classObjectId = new mongoose.Types.ObjectId(classId);

    // ✅ Find all students in the class
    const students = await User.find({ role: "student", classId: classObjectId });

    if (!students.length) {
      return res.status(404).json({ success: false, error: "No students found in this class" });
    }

    // ✅ Create fee entries for each student
    const feeEntries = students.map(student => ({
      studentId: student._id,
      classId: classObjectId,
      amount,
      dueDate,
      status: "Unpaid"
    }));

    await Fee.insertMany(feeEntries);

    res.json({
      success: true,
      message: `Fees added for ${students.length} students in the class`
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 📌 Admin - Get All Fees
 */
router.get("/all", async (req, res) => {
  try {
    const fees = await Fee.find()
      .populate("studentId", "name")
      .populate("classId", "name");
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 📌 Admin - Mark Fee as Paid
 */
router.put("/mark-paid/:id", async (req, res) => {
  try {
    await Fee.findByIdAndUpdate(req.params.id, { status: "Paid" });
    res.json({ success: true, message: "Fee marked as Paid" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 📌 Student - View Own Fees
 */
router.get("/student/:studentId", async (req, res) => {
  try {
    const fees = await Fee.find({ studentId: req.params.studentId })
      .populate("classId", "name");
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 📌 Student - Pay Fee
 */
router.put("/pay/:id", async (req, res) => {
  try {
    await Fee.findByIdAndUpdate(req.params.id, { status: "Paid" });
    res.json({ success: true, message: "Fee Paid Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

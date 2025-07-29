const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Class = require("../models/Class");
const User = require("../models/User");

// GET /api/student/assigned-class
router.get("/assigned-class", authMiddleware, async (req, res) => {
  try {
    const student = await User.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const assignedClass = await Class.findOne({ students: student._id });

    if (!assignedClass) {
      return res.status(404).json({ message: "No class assigned" });
    }

    res.json({
      className: assignedClass.name,
      subjects: assignedClass.subjects,
    });
  } catch (err) {
    console.error("Error fetching assigned class:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

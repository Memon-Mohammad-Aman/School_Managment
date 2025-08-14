const express = require("express");
const router = express.Router();
const Leave = require("../models/Leave"); // We'll create this model below
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// 🔹 Helper role checkers
const isStudent = (req, res, next) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ error: "Access denied. Students only." });
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

// ✅ Apply for leave (Student)
router.post("/apply", auth, isStudent, async (req, res) => {
  try {
    const { reason, startDate, endDate } = req.body;
    if (!reason || !startDate || !endDate) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const leave = new Leave({
      student: req.user.id,
      reason,
      startDate,
      endDate,
    });

    await leave.save();
    res.json({ success: true, leave });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get my leave requests (Student)
router.get("/my-leaves", auth, isStudent, async (req, res) => {
  try {
    const leaves = await Leave.find({ student: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, leaves });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get all leave requests (Admin)
router.get("/all", auth, isAdmin, async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("student", "name email")
      .sort({ createdAt: -1 });
    res.json({ success: true, leaves });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update leave status (Admin)
router.put("/update/:id", auth, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ error: "Leave request not found" });

    leave.status = status;
    await leave.save();

    res.json({ success: true, leave });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

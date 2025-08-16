

// module.exports = router;
const express = require("express");
const router = express.Router();
const Leave = require("../models/Leave");
const auth = require("../middleware/authMiddleware");

// ✅ Apply for leave (Student or Teacher)
router.post("/apply", auth, async (req, res) => {
  try {
    const { reason, startDate, endDate } = req.body;
    if (!reason || !startDate || !endDate) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const leaveData = {
      reason,
      startDate,
      endDate,
      status: "Pending",
    };

    if (req.user.role === "student") {
      leaveData.student = req.user.id;
    } else if (req.user.role === "teacher") {
      leaveData.teacher = req.user.id;
    } else {
      return res.status(403).json({ error: "Only students or teachers can apply for leave." });
    }

    const leave = new Leave(leaveData);
    await leave.save();

    res.json({ success: true, leave });
  } catch (err) {
    console.error("Leave apply error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get my leave requests (Student or Teacher)
router.get("/my-leaves", auth, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "student") {
      query.student = req.user.id;
    } else if (req.user.role === "teacher") {
      query.teacher = req.user.id;
    } else {
      return res.status(403).json({ error: "Only students or teachers can view their leaves." });
    }

    const leaves = await Leave.find(query).sort({ createdAt: -1 });
    res.json({ success: true, leaves });
  } catch (err) {
    console.error("Fetch my leaves error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get all leave requests (Admin)
router.get("/all", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const leaves = await Leave.find()
      .populate("student", "name email")
      .populate("teacher", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, leaves });
  } catch (err) {
    console.error("Fetch all leaves error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update leave status (Admin)
router.put("/update/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

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
    console.error("Update leave error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

// // const express = require("express");
// // const Fee = require("../models/Fee");
// // const Class = require("../models/Class");
// // const User = require("../models/User");

// // const router = express.Router();

// // // ✅ Admin: Add Fees for a Class
// // router.post("/add", async (req, res) => {
// //   try {
// //     const { classId, amount, dueDate } = req.body;
// //     const fee = await Fee.create({ classId, amount, dueDate });
// //     res.json(fee);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // ✅ Admin: Get All Fees
// // router.get("/", async (req, res) => {
// //   try {
// //     const fees = await Fee.find()
// //       .populate("classId", "name")
// //       .populate("paidBy", "firstName lastName");
// //     res.json(fees);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // ✅ Student: View Fees for Own Class
// // router.get("/my-fees/:studentId", async (req, res) => {
// //   try {
// //     const student = await User.findById(req.params.studentId);
// //     if (!student) return res.status(404).json({ error: "Student not found" });

// //     const fees = await Fee.find({ classId: student.classId })
// //       .populate("classId", "name");

// //     res.json(fees);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // ✅ Student: Pay Fee
// // router.put("/pay/:id", async (req, res) => {
// //   try {
// //     const { studentId } = req.body;
// //     const fee = await Fee.findByIdAndUpdate(
// //       req.params.id,
// //       { status: "Paid", paidBy: studentId, paidAt: new Date() },
// //       { new: true }
// //     );
// //     res.json(fee);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });
// // // GET all fees
// // // GET all fees (Admin)
// // router.get("/fees", async (req, res) => {
// //   try {
// //     const fees = await Fee.find()
// //       .populate("paidBy", "firstName lastName") // student ka naam
// //       .populate("classId", "name"); // class ka naam
// //     res.json(fees);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });


// // // Mark fee as paid
// // router.put("/fees/:id/mark-paid", async (req, res) => {
// //   try {
// //     const fee = await Fee.findByIdAndUpdate(
// //       req.params.id,
// //       { isPaid: true },
// //       { new: true }
// //     );
// //     res.json(fee);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });
// // router.get("/all", async (req, res) => {
// //   try {
// //     const fees = await Fee.find()
// //       .populate("studentId", "firstName lastName className email")
// //       .sort({ dueDate: 1 });

// //     res.json(fees);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // module.exports = router;

// const express = require("express");
// const Fee = require("../models/Fee");
// const User = require("../models/User");

// const router = express.Router();

// // ✅ Admin: Add Fees for a Class
// router.post("/add", async (req, res) => {
//   try {
//     const { classId, amount, dueDate } = req.body;
//     const fee = await Fee.create({ classId, amount, dueDate, isPaid: false });
//     res.json(fee);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// router.get("/admin-fees", async (req, res) => {
//   try {
//     const fees = await Fee.find()
//       .populate("classId", "name")
//       .populate("studentId", "firstName lastName");
//     res.json(fees);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching fees", error });
//   }
// });



// // ✅ Admin: Get All Fees with Student & Class info
// // router.get("/all", async (req, res) => {
// //   try {
// //     const fees = await Fee.find()
// //       .populate("paidBy", "firstName lastName") // Student name
// //       .populate("classId", "name") // Class name
// //       .sort({ dueDate: 1 }); // Sort by nearest due date

// //     res.json(fees);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// router.get("/all", async (req, res) => {
//   try {
//     const fees = await Fee.find()
//       .populate("studentId", "firstName lastName") // Always assigned student
//       .populate("paidBy", "firstName lastName")    // Paid student
//       .populate("classId", "name")
//       .sort({ dueDate: 1 });

//     res.json(fees);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });




// // ✅ Student: View Fees for Their Class
// router.get("/my-fees/:studentId", async (req, res) => {
//   try {
//     const student = await User.findById(req.params.studentId);
//     if (!student) return res.status(404).json({ error: "Student not found" });

//     const fees = await Fee.find({ classId: student.classId })
//       .populate("classId", "name");

//     res.json(fees);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ Student: Pay Fee
// router.put("/pay/:id", async (req, res) => {
//   try {
//     const { studentId } = req.body;
//     const fee = await Fee.findByIdAndUpdate(
//       req.params.id,
//       { isPaid: true, paidBy: studentId, paidAt: new Date() },
//       { new: true }
//     );
//     res.json(fee);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;
// const express = require("express");
// const mongoose = require("mongoose");
// const Fee = require("../models/Fee");
// const User = require("../models/User");

// const router = express.Router();

// // Toggle this if your MongoDB is not set for transactions (standalone)
// // Transactions require a replica set or MongoDB Atlas
// const USE_TRANSACTIONS = true;

// // Helpers
// const ensureNumber = (n) => {
//   const v = Number(n);
//   return Number.isFinite(v) ? v : NaN;
// };

// const ensureDate = (d) => {
//   const v = new Date(d);
//   return isNaN(v.getTime()) ? null : v;
// };

// const withFullName = (user) => {
//   if (!user) return undefined;
//   const full = `${user.firstName || ""} ${user.lastName || ""}`.trim();
//   return full || user.name || undefined;
// };

// // ========== VALIDATION MIDDLEWARE-LIKE HELPERS ==========
// function validateAddClassFees(req, res) {
//   const { classId, amount, dueDate } = req.body || {};
//   if (!classId) return "classId is required";
//   const amt = ensureNumber(amount);
//   if (!Number.isFinite(amt) || amt < 0) return "amount must be a non-negative number";
//   const dd = ensureDate(dueDate);
//   if (!dd) return "dueDate must be a valid date";
//   return null;
// }

// function validatePayBody(req, res) {
//   const { studentId } = req.body || {};
//   if (!studentId) return "studentId is required";
//   return null;
// }

// // ========== ROUTES ==========

// // Admin: Add fees for all students in a class
// router.post("/add", async (req, res) => {
//   const error = validateAddClassFees(req, res);
//   if (error) return res.status(400).json({ error });

//   const { classId, amount, dueDate } = req.body;

//   try {
//     const students = await User.find({ classId, role: "student" }, { _id: 1 });
//     if (!students.length) {
//       return res.status(404).json({ message: "No students found in this class" });
//     }

//     const docs = students.map((s) => ({
//       classId,
//       studentId: s._id,
//       amount: Number(amount),
//       dueDate: new Date(dueDate),
//       status: "Unpaid",
//     }));

//     let created;
//     if (USE_TRANSACTIONS && mongoose.connection.readyState === 1) {
//       const session = await mongoose.startSession();
//       try {
//         await session.withTransaction(async () => {
//           created = await Fee.insertMany(docs, { session });
//         });
//       } finally {
//         session.endSession();
//       }
//     } else {
//       created = await Fee.insertMany(docs);
//     }

//     res.json({ message: "Fees added successfully for all students", count: created.length });
//   } catch (err) {
//     res.status(500).json({ error: err.message || "Server error" });
//   }
// });

// // Admin/All: Get all fees with student & class info
// router.get("/all", async (req, res) => {
//   try {
//     const fees = await Fee.find({})
//       .populate("studentId", "firstName lastName name email")
//       .populate("paidBy", "firstName lastName name email")
//       .populate("classId", "name")
//       .sort({ dueDate: 1 })
//       .lean();

//     const shaped = fees.map((f) => ({
//       ...f,
//       studentName: withFullName(f.studentId),
//       paidByName: withFullName(f.paidBy),
//     }));

//     res.json(shaped);
//   } catch (err) {
//     res.status(500).json({ error: err.message || "Server error" });
//   }
// });

// // Admin/All: Get fees by class
// router.get("/class/:classId", async (req, res) => {
//   try {
//     const fees = await Fee.find({ classId: req.params.classId })
//       .populate("studentId", "firstName lastName name email")
//       .populate("paidBy", "firstName lastName name email")
//       .populate("classId", "name")
//       .sort({ dueDate: 1 })
//       .lean();

//     const shaped = fees.map((f) => ({
//       ...f,
//       studentName: withFullName(f.studentId),
//       paidByName: withFullName(f.paidBy),
//     }));

//     res.json(shaped);
//   } catch (err) {
//     res.status(500).json({ error: err.message || "Server error" });
//   }
// });

// // Student: View fees (also usable by admin)
// router.get("/my-fees/:studentId", async (req, res) => {
//   try {
//     const student = await User.findById(req.params.studentId, { _id: 1 });
//     if (!student) return res.status(404).json({ error: "Student not found" });

//     const fees = await Fee.find({ studentId: student._id })
//       .populate("classId", "name")
//       .sort({ dueDate: 1 })
//       .lean();

//     res.json(fees);
//   } catch (err) {
//     res.status(500).json({ error: err.message || "Server error" });
//   }
// });

// // Student/Admin: Pay Fee
// router.put("/pay/:id", async (req, res) => {
//   const error = validatePayBody(req, res);
//   if (error) return res.status(400).json({ error });

//   try {
//     const { studentId } = req.body;

//     const fee = await Fee.findByIdAndUpdate(
//       req.params.id,
//       { status: "Paid", paidBy: studentId, paidAt: new Date() },
//       { new: true }
//     )
//       .populate("studentId", "firstName lastName name email")
//       .populate("paidBy", "firstName lastName name email")
//       .populate("classId", "name")
//       .lean();

//     if (!fee) return res.status(404).json({ error: "Fee not found" });

//     res.json({
//       ...fee,
//       studentName: withFullName(fee.studentId),
//       paidByName: withFullName(fee.paidBy),
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message || "Server error" });
//   }
// });

// // Admin: Mark Unpaid (undo payment)
// router.put("/unpay/:id", async (req, res) => {
//   try {
//     const fee = await Fee.findByIdAndUpdate(
//       req.params.id,
//       { status: "Unpaid", paidBy: null, paidAt: null },
//       { new: true }
//     )
//       .populate("studentId", "firstName lastName name email")
//       .populate("classId", "name")
//       .lean();

//     if (!fee) return res.status(404).json({ error: "Fee not found" });

//     res.json({
//       ...fee,
//       studentName: withFullName(fee.studentId),
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message || "Server error" });
//   }
// });

// // Admin: Update fee (amount, dueDate, status)
// router.put("/:id", async (req, res) => {
//   try {
//     const updates = {};
//     if (req.body.amount !== undefined) {
//       const amt = ensureNumber(req.body.amount);
//       if (!Number.isFinite(amt) || amt < 0) return res.status(400).json({ error: "amount must be non-negative" });
//       updates.amount = amt;
//     }
//     if (req.body.dueDate !== undefined) {
//       const dd = ensureDate(req.body.dueDate);
//       if (!dd) return res.status(400).json({ error: "dueDate must be a valid date" });
//       updates.dueDate = dd;
//     }
//     if (req.body.status !== undefined) {
//       const status = String(req.body.status);
//       if (!["Paid", "Unpaid"].includes(status)) {
//         return res.status(400).json({ error: "status must be Paid or Unpaid" });
//       }
//       updates.status = status;
//       if (status === "Unpaid") {
//         updates.paidBy = null;
//         updates.paidAt = null;
//       } else if (status === "Paid" && !updates.paidAt) {
//         updates.paidAt = new Date();
//       }
//     }

//     const fee = await Fee.findByIdAndUpdate(req.params.id, updates, { new: true })
//       .populate("studentId", "firstName lastName name email")
//       .populate("paidBy", "firstName lastName name email")
//       .populate("classId", "name")
//       .lean();

//     if (!fee) return res.status(404).json({ error: "Fee not found" });

//     res.json({
//       ...fee,
//       studentName: withFullName(fee.studentId),
//       paidByName: withFullName(fee.paidBy),
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message || "Server error" });
//   }
// });

// // Admin: Delete fee
// router.delete("/:id", async (req, res) => {
//   try {
//     const fee = await Fee.findByIdAndDelete(req.params.id);
//     if (!fee) return res.status(404).json({ error: "Fee not found" });
//     res.json({ message: "Fee deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message || "Server error" });
//   }
// });

// module.exports = router;


const express = require("express");
const Fee = require("../models/Fee");
const User = require("../models/User");

const router = express.Router();

// Helpers
const ensureNumber = (n) => {
  const v = Number(n);
  return Number.isFinite(v) ? v : NaN;
};

const ensureDate = (d) => {
  const v = new Date(d);
  return isNaN(v.getTime()) ? null : v;
};

const withFullName = (user) => {
  if (!user) return undefined;
  const full = `${user.firstName || ""} ${user.lastName || ""}`.trim();
  return full || user.name || undefined;
};

// Validation helpers
function validateAddClassFees(req) {
  const { classId, amount, dueDate } = req.body || {};
  if (!classId) return "classId is required";
  const amt = ensureNumber(amount);
  if (!Number.isFinite(amt) || amt < 0) return "amount must be a non-negative number";
  const dd = ensureDate(dueDate);
  if (!dd) return "dueDate must be a valid date";
  return null;
}

function validatePayBody(req) {
  const { studentId } = req.body || {};
  if (!studentId) return "studentId is required";
  return null;
}

// ========================================
// POST /api/fees/add
// Admin: Add fees for all students in a class
// ========================================
router.post("/add", async (req, res) => {
  const error = validateAddClassFees(req);
  if (error) return res.status(400).json({ error });

  const { classId, amount, dueDate } = req.body;

  try {
    const students = await User.find({ classId, role: "student" }, { _id: 1 });
    if (!students.length) {
      return res.status(404).json({ message: "No students found in this class" });
    }

    const docs = students.map((s) => ({
      classId,
      studentId: s._id,
      amount: Number(amount),
      dueDate: new Date(dueDate),
      status: "Unpaid",
    }));

    // Transactions disabled for standalone MongoDB:
    const created = await Fee.insertMany(docs);

    res.json({ message: "Fees added successfully for all students", count: created.length });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// ========================================
// GET /api/fees/all
// Admin/All: Get all fees with student & class info
// ========================================
router.get("/all", async (req, res) => {
  try {
    const fees = await Fee.find({})
      .populate("studentId", "firstName lastName name email")
      .populate("paidBy", "firstName lastName name email")
      .populate("classId", "name")
      .sort({ dueDate: 1 })
      .lean();

    const shaped = fees.map((f) => ({
      ...f,
      studentName: withFullName(f.studentId),
      paidByName: withFullName(f.paidBy),
    }));

    res.json(shaped);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// ========================================
// GET /api/fees/class/:classId
// Admin/All: Get fees by class
// ========================================
router.get("/class/:classId", async (req, res) => {
  try {
    const fees = await Fee.find({ classId: req.params.classId })
      .populate("studentId", "firstName lastName name email")
      .populate("paidBy", "firstName lastName name email")
      .populate("classId", "name")
      .sort({ dueDate: 1 })
      .lean();

    const shaped = fees.map((f) => ({
      ...f,
      studentName: withFullName(f.studentId),
      paidByName: withFullName(f.paidBy),
    }));

    res.json(shaped);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// ========================================
// GET /api/fees/my-fees/:studentId
// Student: View fees (also usable by admin)
// ========================================
router.get("/my-fees/:studentId", async (req, res) => {
  try {
    const student = await User.findById(req.params.studentId, { _id: 1 });
    if (!student) return res.status(404).json({ error: "Student not found" });

    const fees = await Fee.find({ studentId: student._id })
      .populate("classId", "name")
      .sort({ dueDate: 1 })
      .lean();

    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// ========================================
// PUT /api/fees/pay/:id
// Student/Admin: Pay Fee
// ========================================
router.put("/pay/:id", async (req, res) => {
  const error = validatePayBody(req);
  if (error) return res.status(400).json({ error });

  try {
    const { studentId } = req.body;

    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      { status: "Paid", paidBy: studentId, paidAt: new Date() },
      { new: true }
    )
      .populate("studentId", "firstName lastName name email")
      .populate("paidBy", "firstName lastName name email")
      .populate("classId", "name")
      .lean();

    if (!fee) return res.status(404).json({ error: "Fee not found" });

    res.json({
      ...fee,
      studentName: withFullName(fee.studentId),
      paidByName: withFullName(fee.paidBy),
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// ========================================
// PUT /api/fees/unpay/:id
// Admin: Mark Unpaid (undo payment)
// ========================================
router.put("/unpay/:id", async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      { status: "Unpaid", paidBy: null, paidAt: null },
      { new: true }
    )
      .populate("studentId", "firstName lastName name email")
      .populate("classId", "name")
      .lean();

    if (!fee) return res.status(404).json({ error: "Fee not found" });

    res.json({
      ...fee,
      studentName: withFullName(fee.studentId),
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// ========================================
// PUT /api/fees/:id
// Admin: Update fee (amount, dueDate, status)
// ========================================
router.put("/:id", async (req, res) => {
  try {
    const updates = {};
    if (req.body.amount !== undefined) {
      const amt = ensureNumber(req.body.amount);
      if (!Number.isFinite(amt) || amt < 0) return res.status(400).json({ error: "amount must be non-negative" });
      updates.amount = amt;
    }
    if (req.body.dueDate !== undefined) {
      const dd = ensureDate(req.body.dueDate);
      if (!dd) return res.status(400).json({ error: "dueDate must be a valid date" });
      updates.dueDate = dd;
    }
    if (req.body.status !== undefined) {
      const status = String(req.body.status);
      if (!["Paid", "Unpaid"].includes(status)) {
        return res.status(400).json({ error: "status must be Paid or Unpaid" });
      }
      updates.status = status;
      if (status === "Unpaid") {
        updates.paidBy = null;
        updates.paidAt = null;
      } else if (status === "Paid" && !updates.paidAt) {
        updates.paidAt = new Date();
      }
    }

    const fee = await Fee.findByIdAndUpdate(req.params.id, updates, { new: true })
      .populate("studentId", "firstName lastName name email")
      .populate("paidBy", "firstName lastName name email")
      .populate("classId", "name")
      .lean();

    if (!fee) return res.status(404).json({ error: "Fee not found" });

    res.json({
      ...fee,
      studentName: withFullName(fee.studentId),
      paidByName: withFullName(fee.paidBy),
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// ========================================
// DELETE /api/fees/:id
// Admin: Delete fee
// ========================================
router.delete("/:id", async (req, res) => {
  try {
    const fee = await Fee.findByIdAndDelete(req.params.id);
    if (!fee) return res.status(404).json({ error: "Fee not found" });
    res.json({ message: "Fee deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

module.exports = router;

// const mongoose = require('mongoose');

// const feeSchema = new mongoose.Schema({
//   classId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Class',
//     required: true
//   },
//   amount: {
//     type: Number,
//     required: true
//   },
//   dueDate: {
//     type: Date,
//     required: true
//   },
//   description: {
//     type: String
//   },
//   paidBy: [
//     {
//       studentId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User", // ya "Student"
//         required: true
//       },
//       paidAt: {
//         type: Date
//       }
//     }
//   ]
// }, { timestamps: true });

// module.exports = mongoose.model('Fee', feeSchema);
// const mongoose = require("mongoose");

// const feeSchema = new mongoose.Schema({
//   classId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Class",
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   dueDate: {
//     type: Date,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ["Unpaid", "Paid"],
//     default: "Unpaid",
//   },
//   paidBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", // Student who paid
//   },
//   paidAt: {
//     type: Date,
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("Fee", feeSchema);

// const mongoose = require("mongoose");

// const feeSchema = new mongoose.Schema({
//   classId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Class",
//     required: true,
//   },
//   studentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", // assigned student
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   dueDate: {
//     type: Date,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ["Unpaid", "Paid"],
//     default: "Unpaid",
//   },
//   paidBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", // student who paid
//   },
//   paidAt: {
//     type: Date,
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("Fee", feeSchema);

const mongoose = require("mongoose");

const { Schema } = mongoose;

const feeSchema = new Schema(
  {
    classId: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
      index: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User", // assigned student
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount cannot be negative"],
    },
    dueDate: {
      type: Date,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
      index: true,
    },
    paidBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // student who paid
      default: null,
    },
    paidAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Compound index to speed up class/student queries
feeSchema.index({ classId: 1, studentId: 1, dueDate: -1 });

// Virtual: quick overdue check (only meaningful if unpaid)
feeSchema.virtual("isOverdue").get(function () {
  if (!this.dueDate) return false;
  if (this.status === "Paid") return false;
  const now = new Date();
  return now > this.dueDate;
});

// Optional convenience: set paidAt automatically when status -> Paid and not already set
feeSchema.pre("save", function (next) {
  if (this.isModified("status") && this.status === "Paid" && !this.paidAt) {
    this.paidAt = new Date();
  }
  // If status flipped back to Unpaid, clear paidAt/paidBy (safety; comment out if not desired)
  if (this.isModified("status") && this.status === "Unpaid") {
    // Do not force clear paidBy/paidAt by default; uncomment if required:
    // this.paidAt = null;
    // this.paidBy = null;
  }
  next();
});

// Optional: normalize fields before validate
feeSchema.pre("validate", function (next) {
  // Ensure amount is a number
  if (typeof this.amount === "string") {
    const parsed = Number(this.amount);
    if (!Number.isFinite(parsed)) {
      return next(new Error("Amount must be a number"));
    }
    this.amount = parsed;
  }
  next();
});

module.exports = mongoose.model("Fee", feeSchema);

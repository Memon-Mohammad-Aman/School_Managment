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
const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Paid"], default: "Pending" }
});

module.exports = mongoose.model("Fee", feeSchema);

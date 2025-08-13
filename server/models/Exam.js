const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true, validate: v => v.length >= 2 },
  correctOption: { type: Number, required: true }, // index in options[]
}, { _id: true });

const ExamSchema = new mongoose.Schema({
  title: { type: String, required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  startTime: { type: Date, required: true },
  duration: { type: Number, required: true }, // minutes
  questions: { type: [QuestionSchema], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Exam', ExamSchema);

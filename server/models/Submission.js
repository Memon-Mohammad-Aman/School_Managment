const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: { type: [Number], default: [] }, // indices selected
  score: { type: Number, default: 0 },
  autoSubmitted: { type: Boolean, default: false },
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

SubmissionSchema.index({ examId: 1, studentId: 1 }, { unique: true });

module.exports = mongoose.model('Submission', SubmissionSchema);

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Route Imports
const attendanceRoutes = require('./routes/attendance');
const assignmentRoutes = require('./routes/assignment');
const studentRoutes = require('./routes/students');
const teacherRoutes = require('./routes/teachers');
const classRoutes = require('./routes/class');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const submissionRoutes = require('./routes/assignmentSubmission');
const timetableRoutes = require('./routes/timetable');
const exams = require('./routes/exams');
const announcementRoutes = require('./routes/announcementRoutes');



// ✅ include timetable

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Static file access (for uploaded files)
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/class', classRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/assignment', assignmentRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/submission', submissionRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/exams', exams);
app.use('/api/announcements', announcementRoutes);

 // ✅ timetable route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));

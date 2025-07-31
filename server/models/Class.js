// const mongoose = require('mongoose');

// const classSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   subjects: [
//     {
//       name: String,
//     },
//   ],
//   teachingAssignments: [
//     { 



      
//       subject: {
//         name: String,
//       },
//       teacher: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//       },
//     },
//   ],
// });

// module.exports = mongoose.model('Class', classSchema);

const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },

  subjects: [
    {
      name: String,
    },
  ],

  teachingAssignments: [
    {
      subject: {
        name: String,
      },
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],

  timetable: [
    {
      day: { type: String, required: true },        // e.g. "Monday"
      period: { type: Number, required: true },     // e.g. 1 to 8
      subject: { type: String, required: true },     // subject name
      teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // teacher ref
    },
  ],
});

module.exports = mongoose.model('Class', classSchema);

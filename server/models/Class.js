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
});

module.exports = mongoose.model('Class', classSchema);

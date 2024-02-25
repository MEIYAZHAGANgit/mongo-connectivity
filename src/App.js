
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Mentor = require('./model/mentor');
const Student = require('./model/student');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mentor-student', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use(cors());
app.use(bodyParser.json());

// Create a mentor
app.post('/mentors', async (req, res) => {
  try {
    const newMentor = new Mentor(req.body);
    await newMentor.save();
    res.status(201).json({ message: 'Mentor created successfully', mentor: newMentor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a student
app.post('/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: 'Student created successfully', student: newStudent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Assign a student to a mentor (multiple students)
app.post('/students/:studentId/assign'), async (req, res) => {
  const { studentId } = req.params;
  const { mentorIds } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
  }catch (err) {console.log("err")}
};
    const existingMentor = student.mentorId;
    if (existingMentor) {
      return res.status(400).json({ message: 'Student already has a mentor' });
    }

    const mentors = await Mentor.find({ _id: { $in: mentorIds } });
    if (mentors.length !== mentorIds.length) {
      return res.status(400).json({ message: 'One or more mentors not found' });
    };

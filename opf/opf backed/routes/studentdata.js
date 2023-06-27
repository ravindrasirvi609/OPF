const express = require('express');
const router = express.Router();
const StudentModel = require('../models/Student');

// Route for handling form submission
router.post('/studentdata', (req, res) => {
  const studentData = req.body; // Retrieve the entire request body as studentData

  // Create a new Student document
  const newStudent = new StudentModel(studentData);
  console.log(typeof studentData);
  console.log(studentData);

  // Save the document to the database
  newStudent.save()
    .then(() => {
      console.log('Data saved successfully.');
      res.status(200).json({ message: 'Data saved successfully.' });
    })
    .catch(error => {
      console.error('Error saving document', error);
      res.status(500).json({ message: 'Error saving document' });
    });
});


module.exports = router;

const express = require("express");
const router = express.Router();
let students = require("../data/students");

// GET all students
router.get("/", (req, res) => {
  res.status(200).json(students);
});

// GET a student by id
router.get("/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.status(200).json(student);
});

// POST a new student
router.post("/", (req, res) => {
  const { name, age, course } = req.body;

  if (!name || !age || !course) {
    return res.status(400).json({ message: "name, age and course are required" });
  }

  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name,
    age,
    course
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT update a student
router.put("/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { name, age, course } = req.body;
  if (!name && !age && !course) {
    return res.status(400).json({ message: "Provide at least one field to update" });
  }

  if (name) student.name = name;
  if (age) student.age = age;
  if (course) student.course = course;

  res.status(200).json(student);
});

// DELETE a student
router.delete("/:id", (req, res) => {
  const index = students.findIndex((s) => s.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deleted = students.splice(index, 1);
  res.status(200).json({ message: "Student deleted", student: deleted[0] });
});

module.exports = router;

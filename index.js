const express = require("express");
const app = express();

// Middleware to parse JSON
app.use(express.json());


// DATA STORAGE - Array (as required)

let students = [
  { id: 1, name: "Ali Hassan", age: 20, course: "Computer Science" },
  { id: 2, name: "Sara Khan", age: 22, course: "Software Engineering" },
  { id: 3, name: "Usman Tariq", age: 21, course: "Data Science" },
];

let nextId = 4; // Auto-increment ID tracker


// ROUTES

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Express Assignment 01 - CRUD API",
    endpoints: {
      "GET /students": "Get all students",
      "GET /students/:id": "Get a single student by ID",
      "POST /students": "Create a new student",
      "PUT /students/:id": "Update a student by ID",
      "DELETE /students/:id": "Delete a student by ID",
    },
  });
});


// READ ALL - GET /students

app.get("/students", (req, res) => {
  res.status(200).json({
    success: true,
    total: students.length,
    data: students,
  });
});


// READ ONE - GET /students/:id

app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${id} not found`,
    });
  }

  res.status(200).json({
    success: true,
    data: student,
  });
});


// CREATE - POST /students

app.post("/students", (req, res) => {
  const { name, age, course } = req.body;

  // Validation
  if (!name || !age || !course) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, age, and course",
    });
  }

  const newStudent = {
    id: nextId++,
    name,
    age,
    course,
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: newStudent,
  });
});


// UPDATE - PUT /students/:id

app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${id} not found`,
    });
  }

  const { name, age, course } = req.body;

  // Update only fields that are provided
  if (name) students[index].name = name;
  if (age) students[index].age = age;
  if (course) students[index].course = course;

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: students[index],
  });
});


// DELETE - DELETE /students/:id

app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${id} not found`,
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: deletedStudent,
  });
});


// START SERVER

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
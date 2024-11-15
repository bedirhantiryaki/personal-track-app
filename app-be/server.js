const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Employee = require(".//employeeModel");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas bağlantısı
mongoose
  .connect(
    "mongodb+srv://bedirhantiryaki00:l3KWFXmmFmGp32kW@cluster0.7yecv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB bağlantısı başarılı!");
  })
  .catch((err) => {
    console.log("MongoDB bağlantısı hatalı: ", err);
  });

// POST endpoint for adding employee
app.post("/addEmployee", async (req, res) => {
  const { firstName, lastName, position } = req.body;

  const newEmployee = new Employee({ firstName, lastName, position });

  try {
    await newEmployee.save();
    res.status(201).json({ message: "Personel başarıyla kaydedildi!" });
  } catch (error) {
    res.status(500).json({ message: "Bir hata oluştu" });
  }
});
// GET endpoint to fetch all employees
app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find(); // Tüm personelleri al
    res.status(200).json(employees); // Verileri döndür
  } catch (error) {
    res.status(500).json({ message: "Bir hata oluştu" });
  }
});

// Sunucu başlatma
app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});

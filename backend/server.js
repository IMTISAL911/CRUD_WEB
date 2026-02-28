// const express = require("express");
// const cors = require("cors");

import express from "express"
import cors from "cors"

const app = express();
const PORT = 5000;



// middleware
app.use(cors());
app.use(express.json());

// ===== IN-MEMORY DATABASE =====
let users = [
  { id: 1, name: "ALI", email: "ali@gmail.com" },
  { id: 2, name: "SARA", email: "sara@gmail.com" },
  { id: 3, name: "Ahmed", email: "ahmed@gmail.com" },
];
let nextId = users.length + 1;
// ================= ROUTES =================

// ✅ GET USERS
app.get("/api/users", (req, res) => {
  res.json(users);
});

// ✅ CREATE USER
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email required" });
  }

  const newUser = {
    // id: Date.now(),
    id: nextId++,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// ✅ UPDATE USER
app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  users = users.map((u) =>
    u.id === id ? { ...u, ...req.body } : u
  );

  res.json({ message: "User updated" });
});

// ✅ DELETE USER
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  users = users.filter((u) => u.id !== id);

  res.json({ message: "User deleted" });
});

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
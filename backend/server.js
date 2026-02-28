import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

// 🔥 Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, "users.json");

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= SAFE FILE HELPERS =================

// ✅ ensure file exists
const ensureDB = () => {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, "[]");
  }
};

// ✅ read users safely
const readUsers = () => {
  try {
    ensureDB();
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("Read error:", err);
    return [];
  }
};

// ✅ write users safely
const writeUsers = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Write error:", err);
  }
};

// ================= ROUTES =================

// ✅ GET USERS
app.get("/api/users", (req, res) => {
  const users = readUsers();
  res.json(users);
});

// ✅ CREATE USER
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and Email required",
    });
  }

  const users = readUsers();

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    email,
  };

  users.push(newUser);
  writeUsers(users);

  res.status(201).json(newUser);
});

// ✅ UPDATE USER
app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const users = readUsers();

  const updatedUsers = users.map((u) =>
    u.id === id ? { ...u, ...req.body } : u
  );

  writeUsers(updatedUsers);

  res.json({ message: "User updated" });
});

// ✅ DELETE USER
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const users = readUsers();

  const filtered = users.filter((u) => u.id !== id);
  writeUsers(filtered);

  res.json({ message: "User deleted" });
});

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
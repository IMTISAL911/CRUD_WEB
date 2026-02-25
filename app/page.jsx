"use client";

import { useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([
    { id: 1, name: "ALI", email: "ali@gmail.com" },
    { id: 2, name: "SARA", email: "sara@gmail.com" },
    { id: 3, name: "Ahmed", email: "ahmed@gmail.com" },
  ]);

  const [edit, setEdit] = useState("");
  const [dleet, setDleet] = useState("");

  const dleetRow = (id) => {
    setDleet(id);
    const update = users.filter((u) => u.id !== id);
    setUsers(update); // ✅ FIXED (was setDleet)
  };

  const editRow = (user) => {
    setEdit(user.id);

    const newName = prompt("enter new name", user.name);
    const newEmail = prompt("enter new email", user.email);

    if (!newName || !newEmail) return;

    const update = users.map((u) =>
      u.id === user.id ? { ...u, name: newName, email: newEmail } : u
    );

    setUsers(update);
  };

  return (
    <div className="flex justify-center items-center bg-white/10 backdrop-blur-md min-h-screen">
      <div className="w-full max-w-3xl bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg p-6">
        
        <h1 className="text-2xl font-bold text-center mb-6">
          USER MANAGEMENT
        </h1>

        <table className="w-full border border-white/30 rounded-lg overflow-hidden">
          
          <thead className="bg-white/20">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-white/20 hover:bg-white/10 transition"
              >
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => editRow(user)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dleetRow(user.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
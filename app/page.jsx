"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  addUser,
  deleteUser,
  updateUser,
} from "@/app/redux/userSlice";

export default function Home() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAdd = () => {
    if (!name || !email) return;
    dispatch(addUser({ name, email }));
    setName("");
    setEmail("");
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (user) => {
    const newName = prompt("enter new name", user.name);
    const newEmail = prompt("enter new email", user.email);

    if (!newName || !newEmail) return;

    dispatch(
      updateUser({
        id: user.id,
        data: { name: newName, email: newEmail },
      })
    );
  };

  return (
    <div className="flex justify-center items-center bg-white/10 backdrop-blur-md min-h-screen">
      <div className="w-full max-w-3xl bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          USER MANAGEMENT
        </h1>

        {/* ✅ INPUT */}
        <div className="flex gap-2 mb-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="flex-1 p-2 rounded-lg border"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="flex-1 p-2 rounded-lg border"
          />
          <button
            onClick={handleAdd}
            className="px-4 bg-green-500 text-white rounded-lg"
          >
            Add
          </button>
        </div>

        {/* ✅ TABLE */}
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
                    onClick={() => handleEdit(user)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
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
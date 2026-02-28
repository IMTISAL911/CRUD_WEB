"use client";

import { useSelector } from "react-redux";
import Link from "next/link";

export default function SavePage() {
  const users = useSelector((state) => state.users.list);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl text-gray-500 font-bold mb-4 text-center">
          Saved Users
        </h1>

        <Link href="/">
          <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
            ← Back
          </button>
        </Link>

        {users.length === 0 ? (
          <p className="text-center text-gray-500">
            No users found
          </p>
        ) : (
          <ul className="space-y-2 text-gray-500">
            {users.map((u) => (
              <li
                key={u.id}
                className="p-3 border rounded-lg"
              >
                <strong >{u.name}</strong> — {u.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
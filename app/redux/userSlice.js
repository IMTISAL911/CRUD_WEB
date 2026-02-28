"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://localhost:5000/api/users";

// ================= FETCH =================
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const res = await fetch(API);
    return await res.json();
  }
);

// ================= ADD =================
export const addUser = createAsyncThunk(
  "users/addUser",
  async (user) => {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return await res.json();
  }
);

// ================= DELETE =================
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

// ================= UPDATE =================
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }) => {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return { id, data };
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (u) => u.id !== action.payload
        );
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        state.list = state.list.map((u) =>
          u.id === id ? { ...u, ...data } : u
        );
      });
  },
});

export default userSlice.reducer;
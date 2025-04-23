import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// 🔁 GET Tugas current user
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/todos");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || error.message || "Fetch failed"
      );
    }
  }
);

// ➕ POST New Tugas
export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/todos", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Create failed");
    }
  }
);

// ✅ TOGGLE Tugas selesai
export const toggleTodoDone = createAsyncThunk(
  "todos/toggleDone",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState().todos;
      const todo = state.items.find((t) => t.id === id);
      const response = await api.put(`/todos/${id}`, {
        is_done: !todo.is_done,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Toggle failed");
    }
  }
);

// ❌ DELETE Tugas
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/todos/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Delete failed");
    }
  }
);

// ✏️ EDIT Tugas
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/todos/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Update failed");
    }
  }
);

// Slice
const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    resetError(state) {
      state.error = null;
    },
    resetSuccess(state) {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // === FETCH ===
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === CREATE ===
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
        state.success = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.success = "Todo berhasil ditambahkan";
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === TOGGLE DONE ===
      .addCase(toggleTodoDone.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleTodoDone.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.items.findIndex((t) => t.id === updated.id);
        if (index !== -1) state.items[index] = updated;
      })
      .addCase(toggleTodoDone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === DELETE ===
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((todo) => todo.id !== action.payload);
        state.success = "Todo berhasil dihapus";
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === EDIT ===
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.success = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.items.findIndex((t) => t.id === updated.id);
        if (index !== -1) state.items[index] = updated;
        state.success = "Todo berhasil diupdate";
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError, resetSuccess } = todoSlice.actions;
export default todoSlice.reducer;

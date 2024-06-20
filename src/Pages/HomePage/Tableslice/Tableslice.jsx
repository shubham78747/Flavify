import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchtable = createAsyncThunk(
  'table/fetchtable',
  async (table_id) => {
    try {
      const response = await axios.get(`https://flavify-test-caa8d1ec1c7d.herokuapp.com/api/v1/table/${table_id}`)
      return response.data;
    } catch (error) {
      console.error("Error fetching table data:", error);
      throw error;
    }
  }
);
const initialState = {
  table: null, 
  loading: false,
  error: null,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchtable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchtable.fulfilled, (state, action) => {
        state.loading = false;
        state.table = action.payload;
      })
      .addCase(fetchtable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tableSlice.reducer;

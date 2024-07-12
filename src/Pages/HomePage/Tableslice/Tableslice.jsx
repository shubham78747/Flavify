import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Axios from "../../../Helper/axiosHelper";

export const fetchtable = createAsyncThunk(
  'table/fetchtable',
  async (table_id) => {
    try {
      const response = await Axios({
        method: "get",
        url: `/table/${table_id}`,
      })
      return response.data.response;
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
  comboList: [],
  allCombos: {}
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setComboList(state, action) {
          state.comboList = action.payload
    },
    setLpComboList(state, action) {
          state.allCombos = action.payload
    }
  },
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


export const {setComboList, setLpComboList} = tableSlice.actions;

export default tableSlice.reducer;

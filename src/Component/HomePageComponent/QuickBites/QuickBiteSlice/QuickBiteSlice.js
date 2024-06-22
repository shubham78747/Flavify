import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuickBites = createAsyncThunk(
  'food/fetchQuickBites',
  async () => {
    const response = await axios.get('https://flavify-test-caa8d1ec1c7d.herokuapp.com/api/v1/quickbites');
    return response.data.data;
  }
);

// Async thunk to fetch menu
export const fetchMenu = createAsyncThunk(
  'food/fetchMenu',
  async () => {
    const response = await axios.get('https://flavify-test-caa8d1ec1c7d.herokuapp.com/api/v1/menu');
    return response.data;
  }
);

const initialState = {
  quickBites: [],
  menu: [],
  categories: {},
  loading: false,
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuickBites.fulfilled, (state, action) => {
        state.loading = false;
        state.quickBites = action.payload;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menu = action.payload;
        const items = action.payload.items;
        const categories = items.reduce((acc, item) => {
          if (!acc[item.item_category]) {
            acc[item.item_category] = [];
          }
          acc[item.item_category].push(item);
          return acc;
        }, {});
        state.categories = Object.keys(categories).map(item => ({
          item_name: item
     }));
      })
  },
});

export default foodSlice.reducer;


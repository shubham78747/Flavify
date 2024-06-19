import { configureStore } from '@reduxjs/toolkit';
import quickBiteReducer from '../HomePageComponent/QuickBites/QuickBiteSlice/QuickBiteSlice';

const store = configureStore({
  reducer: {
    food: quickBiteReducer,
  },
});

export { store };

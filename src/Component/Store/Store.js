import { configureStore } from '@reduxjs/toolkit';
import quickBiteReducer from '../HomePageComponent/QuickBites/QuickBiteSlice/QuickBiteSlice';
import cartActions  from '../../Pages/CartPage/Cartslice/Cartslice';

const store = configureStore({
  reducer: {
    food: quickBiteReducer,
    cart: cartActions,
  },
});

export { store };

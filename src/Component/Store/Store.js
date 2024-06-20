import { configureStore } from '@reduxjs/toolkit';
import quickBiteReducer from '../HomePageComponent/QuickBites/QuickBiteSlice/QuickBiteSlice';
import cartActions  from '../../Pages/CartPage/Cartslice/Cartslice';
import tableReducer from '../../Pages/HomePage/Tableslice/Tableslice'

const store = configureStore({
  reducer: {
    food: quickBiteReducer,
    cart: cartActions,
    table: tableReducer,
  },
});

export { store };

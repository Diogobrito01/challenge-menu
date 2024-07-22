import { configureStore } from '@reduxjs/toolkit';
import restaurantReducer from './restaurantSlice';
import basketReducer from './basketSlice';

const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    basket: basketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

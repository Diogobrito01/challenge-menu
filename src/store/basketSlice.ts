import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

interface BasketItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  images: { image: string }[];
  selectedOption?: string;
  totalPrice: number;
}

interface BasketState {
  items: BasketItem[];
  itemQuantities: { [key: string]: number };
}

const initialState: BasketState = {
  items: [],
  itemQuantities: {},
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItemToBasket(state, action: PayloadAction<BasketItem>) {
      const { id, selectedOption, quantity } = action.payload;
      const key = `${id}-${selectedOption}`;
      const existingItem = state.items.find(item => item.id === id && item.selectedOption === selectedOption);
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push(action.payload);
      }

      if (state.itemQuantities[key]) {
        state.itemQuantities[key] += quantity;
      } else {
        state.itemQuantities[key] = quantity;
      }
    },
    incrementQuantity(state, action: PayloadAction<{ id: number; selectedOption?: string }>) {
      const key = `${action.payload.id}-${action.payload.selectedOption}`;
      const item = state.items.find(item => item.id === action.payload.id && item.selectedOption === action.payload.selectedOption);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.price * item.quantity;
        state.itemQuantities[key] += 1;
      }
    },
    decrementQuantity(state, action: PayloadAction<{ id: number; selectedOption?: string }>) {
      const key = `${action.payload.id}-${action.payload.selectedOption}`;
      const item = state.items.find(item => item.id === action.payload.id && item.selectedOption === action.payload.selectedOption);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.price * item.quantity;
        state.itemQuantities[key] -= 1;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter(i => i !== item);
        delete state.itemQuantities[key];
      }
    },
    removeItemFromBasket(state, action: PayloadAction<{ id: number; selectedOption?: string }>) {
      const key = `${action.payload.id}-${action.payload.selectedOption}`;
      state.items = state.items.filter(item => item.id !== action.payload.id || item.selectedOption !== action.payload.selectedOption);
      delete state.itemQuantities[key];
    },
  },
});

export const { addItemToBasket, incrementQuantity, decrementQuantity, removeItemFromBasket } = basketSlice.actions;

export const selectBasketItems = (state: RootState) => state.basket.items;
export const selectItemQuantities = (state: RootState) => state.basket.itemQuantities;

export default basketSlice.reducer;

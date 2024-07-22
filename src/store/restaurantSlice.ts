import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface WebSettings {
  id: number;
  venueId: number;
  bannerImage: string;
  backgroundColour: string;
  primaryColour: string;
  primaryColourHover: string;
  navBackgroundColour: string;
}

interface RestaurantDetails {
  id: number;
  name: string;
  internalName: string;
  description: string | null;
  liveFlag: number;
  demoFlag: number;
  address1: string;
  address2: string;
  address3: string | null;
  city: string;
  county: string;
  postcode: string;
  country: string;
  timezoneOffset: string;
  locale: string;
  timeZone: string;
  webSettings: WebSettings;
  ccy: string;
  ccySymbol: string;
  currency: string;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  images: { image: string }[];
}

interface MenuSection {
  id: number;
  name: string;
  description: string | null;
  position: number;
  visible: number;
  images: { image: string }[];
  items: MenuItem[];
}

interface MenuDetails {
  sections: MenuSection[];
}

interface RestaurantState {
  details: RestaurantDetails | null;
  menu: MenuDetails | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RestaurantState = {
  details: null,
  menu: null,
  status: 'idle',
  error: null,
};

export const getRestaurantDetails = createAsyncThunk(
  'restaurant/getRestaurantDetails',
  async () => {
    const response = await fetch('/challenge/venue/9');
    const data = await response.json();
    return data;
  }
);

export const getMenuDetails = createAsyncThunk(
  'restaurant/getMenuDetails',
  async () => {
    const response = await fetch('/challenge/menu');
    const data = await response.json();
    return data;
  }
);

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurantDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRestaurantDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(getRestaurantDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch restaurant details';
      })
      .addCase(getMenuDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMenuDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.menu = action.payload;
      })
      .addCase(getMenuDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch menu details';
      });
  },
});

export default restaurantSlice.reducer;

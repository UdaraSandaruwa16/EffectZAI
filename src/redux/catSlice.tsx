import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface CatBreed {
  id: string;
  name: string;
  reference_image_id:string;
}

export interface CatBreedsState {
  breeds: CatBreed[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CatBreedsState = {
  breeds: [],
  status: 'idle',
  error: null,
};

export const getCats = createAsyncThunk('catBreeds/fetchCatBreeds', async () => {
  const response = await axios.get('https://api.thecatapi.com/v1/breeds?limit=20', {
    headers: { 'x-api-key': process.env.API_KEY },
  });
  return response.data;
});

export const catSlice = createSlice({
  name: 'CatBreed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCats.fulfilled, (state, action: PayloadAction<CatBreed[]>) => {
        state.status = 'succeeded';
        state.breeds = action.payload;
      })
      .addCase(getCats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      });
  },
});

export default catSlice.reducer;

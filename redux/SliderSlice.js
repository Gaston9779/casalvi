import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};



export const SliderSlice = createSlice( {
  name: 'slice',
  initialState,

  reducers: {
    setSlider: ( state, actions ) =>
    {
      return state.value = actions.payload, console.log(actions.payload)
    },


  },

  extraReducers: ( builder ) =>
  {
    builder

  },
} );

export const { setSlider } = SliderSlice.actions;

export const sliderSlicer = ( state ) => state.value;

export default SliderSlice.reducer;

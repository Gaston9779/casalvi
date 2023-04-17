import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};



export const serverSlice = createSlice( {
  name: 'slice',
  initialState,

  reducers: {
    setService: ( state, actions ) =>
    {
      return state.value = actions.payload, console.log(actions.payload)
    },


  },

  extraReducers: ( builder ) =>
  {
    builder

  },
} );

export const { setService } = serverSlice.actions;

export const selectSlice = ( state ) => state.value;

export default serverSlice.reducer;

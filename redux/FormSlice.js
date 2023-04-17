import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email:'',
  agency:'',
  language:'',
  aggiornamento:'',
  timing:'',
  cappotti:'',
  workHelp:''
};



export const formSlice = createSlice( {
  name: 'slice',
  initialState,

  reducers: {
    setFormArtesan: ( state, actions ) =>
    {
      state.value = actions.payload, console.log(actions.payload,'payload')
    },


  },

  extraReducers: ( builder ) =>
  {
    builder

  },
} );

export const { setFormArtesan } = formSlice.actions;

export const formSelectSlice = ( state ) => state.value;

export default formSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
  indice: ''
};

export const serverSlice = createSlice({
  name: 'slice',
  initialState,

  reducers: {
    setService: (state, actions) => {
      state.value = actions.payload;  // Modifica direttamente lo stato
      console.log(actions.payload);
    },
    setHoverText: (state, actions) => {
      state.indice = actions.payload; // Modifica direttamente lo stato
    }
  },

  extraReducers: (builder) => {
    builder
      // Aggiungi eventuali extra reducers qui, se necessari
  },
});

export const { setService, setHoverText } = serverSlice.actions;

// Il selettore ora fa riferimento correttamente allo stato
export const selectSlice = (state) => state.service.value;

export default serverSlice.reducer;

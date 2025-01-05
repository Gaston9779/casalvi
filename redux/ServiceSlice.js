import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
  indice: '',
  log: typeof window !== 'undefined' ? localStorage.getItem('role') || '' : '', // Controllo se 'window' è definito
};

export const serverSlice = createSlice({
  name: 'slice',
  initialState,

  reducers: {
    setService: (state, actions) => {
      state.value = actions.payload;  // Modifica direttamente lo stato
   
    },
    setHoverText: (state, actions) => {
      state.indice = actions.payload; // Modifica direttamente lo stato
    },
    setLogged: (state, action) => {
      state.role = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('role', action.payload); // Aggiorna anche localStorage
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Aggiungi eventuali extra reducers qui, se necessari
  },
});

export const { setService, setHoverText, setLogged } = serverSlice.actions;

// Il selettore ora fa riferimento correttamente allo stato
export const selectSlice = (state) => state.service.value;

export default serverSlice.reducer;

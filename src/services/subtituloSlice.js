import { createSlice } from '@reduxjs/toolkit';

// Definimos el estado inicial
const initialState = {
  value: true,
};

// Creamos el slice
export const subtituloSlice = createSlice({
  name: 'subtitulo',
  initialState,
  reducers: {
    cambiarSubtitulo: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Exportamos los actions y el reducer
export const { cambiarSubtitulo } = subtituloSlice.actions;
export default subtituloSlice.reducer;
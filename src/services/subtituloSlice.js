import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: true,
};


export const subtituloSlice = createSlice({
  name: 'subtitulo',
  initialState,
  reducers: {
    cambiarSubtitulo: (state, action) => {
      state.value = action.payload;
    },
  },
});


export const { cambiarSubtitulo } = subtituloSlice.actions;
export default subtituloSlice.reducer;
// store.jsx
import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice'; // Importa el reducer que hayas creado

const store = configureStore({
  reducer: {
    token: tokenReducer, // Agrega tu reducer al store
    // Puedes agregar más reducers aquí si es necesario
  },
});

export default store;

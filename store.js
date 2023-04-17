import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from './redux/ServiceSlice'
import formReducer from './redux/FormSlice'

export const store = configureStore({
  reducer: {
    service: serviceReducer,
    form: formReducer

  },
})
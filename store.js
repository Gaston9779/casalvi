import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from './redux/ServiceSlice'
import formReducer from './redux/FormSlice'
import sliderReducer from './redux/SliderSlice';

export const store = configureStore({
  reducer: {
    service: serviceReducer,
    form: formReducer,
    slider: sliderReducer

  },
})
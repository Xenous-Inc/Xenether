import { configureStore } from '@reduxjs/toolkit';
import citySlice from './CitySlice';

export default configureStore({
    reducer: {
        cities: citySlice,
    },
});
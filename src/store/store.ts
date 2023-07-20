import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { citySlice } from './slices/citySlice';

const store = configureStore({
    reducer: {
        [citySlice.name]: citySlice.reducer,
    },
});

export type TRootState = ReturnType<typeof store.getState>;

export type TDispatch = typeof store.dispatch;
export const useAppDispatch: () => TDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export default store;

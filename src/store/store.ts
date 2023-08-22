import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { citySlice } from './slices/citySlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { degSlice } from './slices/degSlice';
import { noticeSlice } from './slices/noticeSlice';
import { themeSlice } from './slices/themeSlice';
import { weatherSlice } from './slices/weatherSlice';

const persistConfig = {
    key: 'path',
    storage: AsyncStorage,
};
const rootReducer = combineReducers({
    cities: citySlice.reducer,
    deg: degSlice.reducer,
    notice: noticeSlice.reducer,
    theme: themeSlice.reducer,
    weatherSheet: weatherSlice.reducer,
});

const persistedReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducers,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export type TRootState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;
export const useAppDispatch: () => TDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export const persistor = persistStore(store);
export default store;

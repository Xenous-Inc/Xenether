import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { citySlice } from './slices/citySlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { settingsSlice } from './slices/settingsSlice';
import { weatherSlice } from './slices/weatherSlice';

const persistConfig = {
    key: 'roo1t',
    storage: AsyncStorage,
    blacklist: [weatherSlice.name],
    whitelist: [settingsSlice.name, citySlice.name],
};
const rootReducer = combineReducers({
    [weatherSlice.name]: weatherSlice.reducer,
    [citySlice.name]: citySlice.reducer,
    [settingsSlice.name]: settingsSlice.reducer,
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

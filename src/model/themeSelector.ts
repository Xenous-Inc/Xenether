import { createSelector } from '@reduxjs/toolkit';
import { selectStore } from '../store/store';

export const selectTheme = createSelector(selectStore, store => store.settings.theme);

import { createSlice } from '@reduxjs/toolkit';
import { SwitcherStatus } from '@storage/constants';

type NoticeState = {
    notice: SwitcherStatus;
};
const initialState: NoticeState = {
    notice: SwitcherStatus.On,
};
export const noticeSlice = createSlice({
    name: 'notice',
    initialState,
    reducers: {
        switchToggle(state) {
            if (state.notice != SwitcherStatus.On) {
                state.notice = SwitcherStatus.On;
            } else {
                state.notice = SwitcherStatus.Off;
            }
        },
    },
});

export const { switchToggle } = noticeSlice.actions;
export default noticeSlice.reducer;

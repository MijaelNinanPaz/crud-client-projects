import { createSlice } from '@reduxjs/toolkit';

export const pageSwitcherSlice = createSlice({
    name: 'pageSwitcher',
    initialState: {
        page: 'Projects',
    },
    reducers: {
        setPageRender: (state, action) => {
            state.page = action.payload
        }
    }
})

export const {
    setPageRender
} = pageSwitcherSlice.actions

export default pageSwitcherSlice.reducer
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../index'

type Toast = {
    time: number
    message: string
}

const initialState = {
    toasts: [] as Array<Toast>,
}

export const siteSlice = createSlice({
    name: 'site',
    initialState,
    reducers: {
        showToast: (state, action: PayloadAction<string>) => {
            state.toasts = [
                {
                    time: new Date().getTime(),
                    message: action.payload,
                },
                ...state.toasts,
            ]
        },
        hideToast: (state, action: PayloadAction<number>) => {
            state.toasts = state.toasts.filter(
                (toast) => toast.time !== action.payload
            )
        },
    },
})

export const { showToast, hideToast } = siteSlice.actions

export const selectToasts = (state: RootState) => state.site.toasts

export default siteSlice.reducer

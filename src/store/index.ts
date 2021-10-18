import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth'
import { editSlice } from './slices/edit'
import storageReducer from './slices/storage'
import siteReducer from './slices/site'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        storage: storageReducer,
        edit: editSlice.reducer,
        site: siteReducer,
    },
})

// Вывод типов `RootState` и `AppDispatch` из стора.
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

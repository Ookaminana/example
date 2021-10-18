import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AutomatType, Brand as BrandType, ProductType } from '../../types'
import { RootState } from '../index'
// import { initMashin } from '../../constants'

export const initialState = {
    editProduct: undefined as ProductType | undefined,
    editMashin: {} as AutomatType,
}

export const editSlice = createSlice({
    name: 'edit',
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<ProductType | undefined>) => {
            state.editProduct = action.payload
        },
        setMashin: (state, action: PayloadAction<AutomatType>) => {
            state.editMashin = { ...action.payload, outletId: 1 }
        },
    },
    extraReducers: {},
})

export const { setProduct, setMashin } = editSlice.actions

export const selectEditProduct = (state: RootState) => state.edit.editProduct
export const selectEditMashin = (state: RootState) => state.edit.editMashin

export default editSlice.reducer

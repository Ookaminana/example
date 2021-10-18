import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    Brand as BrandType,
    CupType,
    TasteType,
    LanguageList as LanguageListType,
    AutomatModel as ModelType,
    AutomatFillinsType,
    AutomatType,
    ProductType,
    Outlet as OutletType,
} from '../../types'
import { Brands as BrandsService } from '../../services/Brands'
import { Localizations as LocalizationsService } from '../../services/Localizations'
import { RootState } from '../index'
import { CupsService } from '../../services/Cups'
import { TasteService } from '../../services/Tastes'
import { FillingsService } from '../../services/Fillings'
import { Models } from '../../services/Models'
import { Automats as AutomatsService } from '../../services/Automats'
import { ProductsService } from '../../services/Products'
import { Outlets as OutletsService } from '../../services/Outlets'

export const initialState = {
    brands: [] as Array<BrandType>,
    tastes: [] as Array<TasteType>,
    cups: [] as Array<CupType>,
    models: [] as Array<ModelType>,
    langs: [] as Array<LanguageListType>,
    fillings: [] as Array<AutomatFillinsType>,
    automats: [] as Array<AutomatType>,
    products: [] as Array<ProductType>,
    outlets: [] as Array<OutletType>,
}

export const loadBrands = createAsyncThunk('storage/loadBrands', async () => {
    const limit = 100
    let offset = 0

    let brands: Array<BrandType> = []

    while (true) {
        const result = await BrandsService.getList({ offset, limit })

        if (!result || result.length === 0) {
            break
        }

        brands = [...brands, ...result]
        offset += limit
    }

    return brands
})

export const loadTastes = createAsyncThunk('storage/loadTastes', async () => {
    const limit = 100
    let offset = 0

    let tastesArr: Array<TasteType> = []

    while (true) {
        const tastes = await TasteService.getTastes({ limit, offset })

        if (!tastes || tastes.length === 0) {
            break
        }

        tastesArr = [...tastesArr, ...tastes]
        offset += limit
    }
    return tastesArr
})
export const loadFillings = createAsyncThunk(
    'storage/loadFillings',
    async () => {
        const limit = 100
        let offset = 0

        let data: Array<AutomatFillinsType> = []

        while (true) {
            const tastes = await FillingsService.getFillings({ limit, offset })

            if (!tastes || tastes.length === 0) {
                break
            }

            data = [...data, ...tastes]
            offset += limit
        }
        return data
    }
)
export const loadModels = createAsyncThunk('storage/loadModels', async () => {
    const limit = 100
    let offset = 0

    let data: Array<ModelType> = []

    while (true) {
        const tastes = await Models.getModels({ limit, offset })

        if (!tastes || tastes.length === 0) {
            break
        }

        data = [...data, ...tastes]
        offset += limit
    }
    return data
})

export const loadAutomats = createAsyncThunk(
    'storage/loadAutomats',
    async () => {
        const limit = 100
        let offset = 0

        let data: Array<AutomatType> = []

        while (true) {
            const automats = await AutomatsService.getLists({ limit, offset })

            if (!automats || automats.length === 0) {
                break
            }

            data = [...data, ...automats]
            offset += limit
        }

        return data
    }
)

export const loadProducts = createAsyncThunk(
    'storage/loadProducts',
    async () => {
        const limit = 100
        let offset = 0

        let data: Array<ProductType> = []

        while (true) {
            const products = await ProductsService.getProductList({
                limit,
                offset,
            })

            if (!products || products.length === 0) {
                break
            }

            data = [...data, ...products]
            offset += limit
        }

        return data
    }
)
export const loadOutlets = createAsyncThunk('storage/loadOutlets', async () => {
    const limit = 100
    let offset = 0

    let data: Array<OutletType> = []

    while (true) {
        const outlets = await OutletsService.getList({ limit, offset })

        if (!outlets || outlets.length === 0) {
            break
        }

        data = [...data, ...outlets]
        offset += limit
    }

    return data
})

export const loadCups = createAsyncThunk('storage/loadCups', async () => {
    const cups = await CupsService.getCups()
    return cups
})

export const loadLangs = createAsyncThunk('storage/loadLangs', async () => {
    const langs = await LocalizationsService.getLanguages()
    return langs
})

export const storageSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadBrands.fulfilled, (state, action) => {
            state.brands = action.payload
        })

        builder.addCase(loadTastes.fulfilled, (state, action) => {
            state.tastes = action.payload
        })

        builder.addCase(loadCups.fulfilled, (state, action) => {
            state.cups = action.payload
        })

        builder.addCase(loadModels.fulfilled, (state, action) => {
            state.models = action.payload
        })

        builder.addCase(loadLangs.fulfilled, (state, action) => {
            state.langs = action.payload
        })
        builder.addCase(loadFillings.fulfilled, (state, action) => {
            state.fillings = action.payload
        })
        builder.addCase(loadAutomats.fulfilled, (state, action) => {
            state.automats = action.payload
        })
        builder.addCase(loadProducts.fulfilled, (state, action) => {
            state.products = action.payload
        })

        builder.addCase(loadOutlets.fulfilled, (state, action) => {
            state.outlets = action.payload
        })
    },
})

export const selectBrands = (state: RootState) => state.storage.brands
export const selectTastes = (state: RootState) => state.storage.tastes
export const selectCups = (state: RootState) => state.storage.cups
export const selectModels = (state: RootState) => state.storage.models
export const selectLangs = (state: RootState) => state.storage.langs
export const selectFillings = (state: RootState) => state.storage.fillings
export const selectAutomats = (state: RootState) => state.storage.automats
export const selectProducts = (state: RootState) => state.storage.products
export const selectOutlets = (state: RootState) => state.storage.outlets

export default storageSlice.reducer

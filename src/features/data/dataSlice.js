import { createSlice } from '@reduxjs/toolkit'

import categories from '../../assets/data/categories'
import products from '../../assets/data/products'

const initialState = {
    categories: categories,
    products: products,
    
    currency: '£',

    activeFilters: {
        category: null,
        price: null,
        type: 'any',
        results: 24
    },
    
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setActiveCategory: (state, action) => {
            state.activeFilters.category = state.categories[action.payload].toLowerCase()
        },

        reset: (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    }
})

export const { setActiveCategory, reset } = dataSlice.actions
export default dataSlice.reducer
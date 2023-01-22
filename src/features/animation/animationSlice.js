import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isHome: false,
    focusedCat: false,
    
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const animationSlice = createSlice({
    name: 'anim',
    initialState,
    reducers: {
        transitionHome: (state, action) => {
            state.isHome = action.payload
        },

        setFocusedCategory: (state, action) => {
            state.focusedCat = action.payload
        }
    }   
})

export const {transitionHome, setFocusedCategory, reset } = animationSlice.actions
export default animationSlice.reducer
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import animationReducer from '../features/animation/animationSlice'
import dataReducer from '../features/data/dataSlice'
import cartReducer from '../features/cart/cartSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        anim: animationReducer,
        data: dataReducer,
        cart: cartReducer
    },
});
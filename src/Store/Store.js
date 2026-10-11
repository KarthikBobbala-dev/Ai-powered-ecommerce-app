import { configureStore } from "@reduxjs/toolkit"
import cartReducer from '../Slices/cartSlice'
import searchReducer from '../Slices/search'

const store = configureStore({
    reducer:{
        cartReducer,
        searchedValueReducer: searchReducer
    }
});
export default store;
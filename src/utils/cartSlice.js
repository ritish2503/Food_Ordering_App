import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            //Redux Toolkit uses immer BTS
            //Mutating the state directly
            state.items.push(action.payload);
        },
        removeItem: (state) => {
            state.items.pop();
        },
        clearCart: (state) => {
            state.items.length = 0;

            //Or We can write below line
            //return { items: [] }; //This new empty array will replace the existing array inside original initialState.
        }
    }
});


export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
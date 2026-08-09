import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
};

const globalStates = createSlice({
    name: "globalStates",
    initialState,
    reducers: {
        toggleLogin: (state) => {
            state.value = !state.value
        },

        // increment: (state) => {
        //     state.value += 1;
        // },

        // decrement: (state) => {
        //     state.value -= 1;
        // },

        // incrementByAmount: (state, action) => {
        //     state.value += action.payload;
        // },

        // reset: (state) => {
        //     state.value = 0;
        // },
    },
})

export const {
    toggleLogin
} = globalStates.actions;

export default globalStates.reducer;
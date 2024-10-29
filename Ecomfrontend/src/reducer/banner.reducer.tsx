import { createSlice } from "@reduxjs/toolkit"

const BannerSlice = createSlice({
    name: "banner",
    initialState: {
        listAll: null
    },
    reducers: {
        helloWorld: (state, action) => {
            state.listAll = action.payload
            
    }
}

})

export const { helloWorld } = BannerSlice.actions;
export default BannerSlice.reducer;

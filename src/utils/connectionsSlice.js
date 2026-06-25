import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name: "connections",
    initialState: null,
    reducers:{
        addConnectios: (state,action) => {
            return action.payload;
        },
        removeConnections: (state,action) => {
            return null;
        }
    }
});

export const { addConnectios, removeConnections } = connectionsSlice.actions;

export default connectionsSlice.reducer;
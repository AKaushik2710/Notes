import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import Folders from "../pages/folders";
import { fetchFolders, addFolders } from "../api/fetchFolders";
export interface Folders{
    _id? : string,
    folderName : string,
    notes : string[] | undefined
}

const initialState : Folders[] = [];

const folderSlice = createSlice({
    name : "folders",
    initialState,
    reducers : {
        removeFolder : (state, action : PayloadAction<string>)=>{
            return state.filter(folder => folder._id !== action.payload);
        }
    },
    extraReducers : (builder) =>{
        builder
            .addCase(fetchFolders.fulfilled, (state, action : PayloadAction<Folders[]>) =>{
                return action.payload;
            })
            .addCase(addFolders.fulfilled, (state, action : PayloadAction<Folders>)=>{
                state.push(action.payload);
            })
    }
})

export default folderSlice.reducer;
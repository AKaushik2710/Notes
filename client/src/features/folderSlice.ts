import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import Folders from "../pages/folders";
import type { Note } from "../features/noteSlice";
import { fetchFolders, addFolders, showFolder } from "../api/fetchFolders";
export interface Folders{
    _id? : string,
    folderName : string,
    notes : string[] | undefined,
}

interface populatedFolders {
    _id? : string,
    folderName : string,
    notes : Note[] | undefined
}
interface FolderState {
    folders :Folders[],
    currentFolder? : populatedFolders
}


const initialState : FolderState = {
    folders : [],
    currentFolder : undefined
}

const folderSlice = createSlice({
    name : "folders",
    initialState,
    reducers : {
        removeFolder : (state, action : PayloadAction<string>)=>{
            state.folders = state.folders.filter(folder => folder._id !== action.payload);
        }
    },
    extraReducers : (builder) =>{
        builder
            .addCase(fetchFolders.fulfilled, (state, action : PayloadAction<Folders[]>) =>{
                state.folders = action.payload;
            })
            .addCase(addFolders.fulfilled, (state, action : PayloadAction<Folders>)=>{
                state.folders.push(action.payload);
            })
            .addCase(showFolder.fulfilled, (state, action : PayloadAction<Folders>)=>{
                state.currentFolder = action.payload;
            })
    }
})

export default folderSlice.reducer;
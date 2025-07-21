import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import Folders from "../pages/folders";
import type { Note } from "./notesSlice";
import { fetchFolders, addFolders, showFolder, changeFolder, removeFolder } from "../api/fetchFolders";

// Folder Interface
export interface Folders{
    _id? : string,
    folderName : string | undefined,
    notes : string[] | undefined,
}

// Populated Folders Interface
interface populatedFolders {
    _id? : string,
    folderName : string,
    notes : Note[] | undefined
}

// State interface for folders
interface FolderState {
    folders :Folders[],
    currentFolder? : populatedFolders
}

// Initial state for folders
const initialState : FolderState = {
    folders : [],
    currentFolder : undefined
}

// Slice for folders
const folderSlice = createSlice({
    name : "folders",
    initialState,
    reducers : {

    },
    extraReducers : (builder) =>{
        builder
            // Handling fulfilled state of fetchFolders action
            .addCase(fetchFolders.fulfilled, (state, action : PayloadAction<Folders[]>) =>{
                state.folders = action.payload;
            })
            // Handling fulfilled state of addFolders action
            .addCase(addFolders.fulfilled, (state, action : PayloadAction<Folders>)=>{
                state.folders.push(action.payload);
            })
            // Handling fulfilled state of showFolder action
            .addCase(showFolder.fulfilled, (state, action : PayloadAction<populatedFolders>)=>{
                state.currentFolder = action.payload;
            })
            // Handling fulfilled state of changeFolder action
            .addCase(changeFolder.fulfilled, (state, action : PayloadAction<Folders>)=>{
                const index = state.folders.findIndex(folder => folder._id === action.payload._id);
                if(index !== -1){
                    state.folders[index] = action.payload;
                }
            })
            // Handling fulfilled state removeFolder action
            .addCase(removeFolder.fulfilled, (state, action : PayloadAction<string>)=>{
                state.folders = state.folders.filter(folder => folder._id !== action.payload);
            })
    }
})

export default folderSlice.reducer;
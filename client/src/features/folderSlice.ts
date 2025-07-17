import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import Folders from "../pages/folders";
import type { Note } from "./notesSlice";
import { fetchFolders, addFolders, showFolder, changeFolder } from "../api/fetchFolders";
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
            .addCase(showFolder.fulfilled, (state, action : PayloadAction<populatedFolders>)=>{
                state.currentFolder = action.payload;
            })
            .addCase(changeFolder.fulfilled, (state, action : PayloadAction<Folders>)=>{
                const index = state.folders.findIndex(folder => folder._id === action.payload._id);
                if(index !== -1){
                    state.folders[index] = action.payload;
                }
            })
    }
})

export default folderSlice.reducer;
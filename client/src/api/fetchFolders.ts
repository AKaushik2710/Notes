import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Folders } from "../features/folderSlice";

export const fetchFolders = createAsyncThunk(
    'folders/fetchNotes',
    async(_, thunkAPI)=>{
        try{
            const response = await fetch(import.meta.env.VITE_APP_FOLDERS);
            const data = await response.json();
            return data;
        }
        catch(error){
            return thunkAPI.rejectWithValue(`Following Error Occurred -->\n${error}`);
        }
    }
)

export const addFolders = createAsyncThunk(
    'folders/addFolder',
    async({folderName, notes} : Folders, thunkAPI)=>{
        try{
            const response = await fetch(import.meta.env.VITE_APP_FOLDERS, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({folderName, notes})
            });
            const data = await response.json();
            return data;
        }
        catch(err){
            return thunkAPI.rejectWithValue("Sprry");
        }
    }
)

export const showFolder = createAsyncThunk(
    'folders/showFolder',
    async(id : string, thunkAPI)=>{
        try{
            const response = await fetch(`${import.meta.env.VITE_APP_FOLDERS}/${id}`);
            const data = await response.json();
            return data;
        }
        catch(err){
            return thunkAPI.rejectWithValue("Sprry");
        }
    }
)
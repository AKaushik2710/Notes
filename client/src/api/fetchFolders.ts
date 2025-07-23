import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Folders } from "../features/folderSlice";

// Async thunk to fetch all folders
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

// Async thunk to add a new folder
export const addFolders = createAsyncThunk(
    'folders/addFolder',
    async({folderName="", notes} : Folders, thunkAPI)=>{
        try{
            if(!folderName && notes?.length === 0) return thunkAPI.rejectWithValue("No Data Provided");
            else{
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
        }
        catch(err){
            return thunkAPI.rejectWithValue("Sorry");
        }
    }
)

// Async thunk to show a specific folder
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

// Async thunk to change an existing folder
export const changeFolder = createAsyncThunk(
    'folders/changeFolder',
    async({folderName, _id, notes} : Folders, thunkAPI)=>{
        try{
            console.log(folderName, _id, notes);
            const response = await fetch(import.meta.env.VITE_APP_FOLDERS, {
                method : "PUT",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({folderName, _id, notes})
            });
            return await response.json();
        }
        catch(err){
            return thunkAPI.rejectWithValue("Sorry");
        }
    }
)

// Async thunk to remove a folder
export const removeFolder = createAsyncThunk(
    'folders/removeFolder',
    async(_id : string, thunkAPI)=>{
        try{
            const response = await fetch(import.meta.env.VITE_APP_FOLDERS,{
                method : "DELETE",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({_id})
            });
            return await response.json();
        }
        catch(err){
            return thunkAPI.rejectWithValue("Sorry");
        }
    }
)
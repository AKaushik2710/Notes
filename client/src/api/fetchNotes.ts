import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Note } from "../features/notesSlice";
export const addNotes =  createAsyncThunk(
    'notes/addNotes',
    async ({ heading, message} : Note, thunkAPI) =>{
        try {
            const response = await fetch( import.meta.env.VITE_API_URL, {
                method : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({ heading, message })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch notes");
        }
    }
)

export const fetchNotes = createAsyncThunk(
    'notes/fetchNotes',
    async (_, thunkAPI) =>{
        try{
            const response = await fetch(import.meta.env.VITE_API_URL);
            const data = await response.json();
            return data;
        }
        catch(error){
            return thunkAPI.rejectWithValue("Failed to fetch notes");
        }
    }
)

export const changeNotes = createAsyncThunk(
    'notes/changeNotes',
    async({_id, heading, message} : Note, thunnkAPI)=>{
        try{

            const response = await fetch(import.meta.env.VITE_API_URL, {
                method : "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id, heading, message })
            })
            const data = await response.json();
            return data;
        }
        catch(error){
            return thunnkAPI.rejectWithValue("Failed to change notes");
        }
    }
)

export const deleteNotes = createAsyncThunk(
    "notes/deleteNotes",
    async({_id} : {_id : string}, thunkAPI)=>{
        try{
            const response = await fetch(import.meta.env.VITE_API_URL,{
                method : "DELETE",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({_id})
            });
            const data = await response.json();
            return data;
        }
        catch(error){
            return thunkAPI.rejectWithValue("Error");
        }
    }
)
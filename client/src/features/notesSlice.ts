import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addNotes, fetchNotes, changeNotes, deleteNotes } from "../api/fetchNotes";

export interface Note {
    _id? : string,
    heading : string,
    message : string
}

const initialState : Note[]= [];

const notesSlice = createSlice(
    {
        name : "notes",
        initialState,
        reducers : {
            addNote : (state,  action : PayloadAction<Note>) => {
                state.push(action.payload);
            },
            removeNote : (state, action : PayloadAction<string>) => {
                return state.filter(note => note._id !== action.payload)
            }
        },
        extraReducers : (builder) =>{
            builder
            .addCase(addNotes.fulfilled, (state, action: PayloadAction<Note>) => {
                state.push(action.payload);
            })
            .addCase(addNotes.rejected, (state, action) => {
                console.error("Failed to add note:", action.payload);
            })
            .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
                return action.payload;
            })
            .addCase(changeNotes.fulfilled, (state, action : PayloadAction<Note>) => {
                const index = state.findIndex(note => note._id === action.payload._id);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(deleteNotes.fulfilled,(state, action)=>{
                return state.filter(note => note._id!== action.payload);
            })
        }
    }
)

export const {addNote, removeNote} = notesSlice.actions;
export default  notesSlice.reducer;
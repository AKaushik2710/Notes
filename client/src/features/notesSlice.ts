import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addNotes, fetchNotes, changeNotes, deleteNotes } from "../api/fetchNotes";

// Note Interface
export interface Note {
    _id? : string,
    heading : string,
    message : string,
    checked? : boolean
}

// Initial state for notes
const initialState : Note[]= [];

const notesSlice = createSlice(
    {
        name : "notes",
        initialState,
        reducers : {
            // Action to change the note check state
            changeNoteCheck : (state, action : PayloadAction<{_id : string | undefined | Note}>)=>{
                console.log(action.payload._id);
                try{
                return state.map(note =>{
                    if(note._id === action.payload._id){
                        return {...note, checked : !note.checked};
                    }
                    return note;
                })}
                catch(err){
                    console.error(err)
                }
            },
            // Action to change the check state of all notes
            changeAllNoteCheck : (state)=>{
                return state.map(note =>{
                    return {...note, checked : false};
                })
            }
        },
        extraReducers : (builder) =>{
            builder
            // Handling fulfilled state of addNotes action
            .addCase(addNotes.fulfilled, (state, action: PayloadAction<Note>) => {
                state.push({...action.payload, checked : false});
            })
            // Handling rejected state of addNotes action
            .addCase(addNotes.rejected, (err) => {
                console.error("Failed to add note:", err);
            })
            // Handling fulfilled state of fetchNotes action
            .addCase(fetchNotes.fulfilled, (state,  action: PayloadAction<Note[]>) => {
                state = action.payload.map(note => ({...note, checked : false}));
                return state;
            })
            // Handling fulfilled state of changeNotes action
            .addCase(changeNotes.fulfilled, (state, action : PayloadAction<Note>) => {
                const index = state.findIndex(note => note._id === action.payload._id);
                if (index !== -1) {
                    state[index] = {...state[index], ...action.payload};
                }
            })
            // Handling fulfilled state of deletNotes action
            .addCase(deleteNotes.fulfilled,(state, action)=>{
                return state.filter(note => note._id!== action.payload);
            })
        }
    }
)

// Exporting actions and reducer
export const {changeAllNoteCheck, changeNoteCheck} = notesSlice.actions;
export default  notesSlice.reducer;
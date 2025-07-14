import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../features/notesSlice";
import folderReducer from "../features/folderSlice";
export const store  = configureStore({
    reducer : {
        notes : notesReducer,
        folders : folderReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
import { useRef, useState } from "react";
import type { Note } from "../features/notesSlice";

export default function useFolders(){
    const [change, setChange] = useState<boolean>(false);
    const folderRef = useRef<HTMLInputElement>(null);
    const [writer, setWriter] = useState<boolean>(false);
    const [noteRemove, setNoteRemove] = useState<boolean>(false);
    const [noteAdd, setNoteAdd] = useState<boolean>(false);
    const [noteViewer, setNoteViewer] = useState<boolean>(false);
    const [folderNoteView, setFolderNoteView] = useState<Note>();
    const [windowWidth, setWindoWidth] = useState<number>(window.innerWidth);

    // Handles Note info that is going to be viewed or changed
    function handleNoteView(value : boolean){
        setNoteViewer(value);
        handleWriter(true);
    }

    // Handles Viewing/Changing of Folder's Notes
    function handleFolderNoteView(note : Note){
        handleNoteView(true);
        handleWriter(false);
        setFolderNoteView(note);
    }
    
    // Ḥandles Folder changing 
    function handleChangeFolder(value : boolean){
        setChange(value);
    }

    // Handles Folder Writing 
    function handleWriter(value : boolean){
        setWriter(value);
    }

    function handleNoteAdd(value : boolean){
        setNoteAdd(value);
    }

    function handleRemoveUI(value : boolean){
        setNoteRemove(value);
    }
    return {folderRef, folderNoteView, handleFolderNoteView, change, setChange, handleChangeFolder, writer, handleWriter, noteViewer, handleNoteView, noteAdd, handleNoteAdd, noteRemove, handleRemoveUI, windowWidth, setWindoWidth};
}
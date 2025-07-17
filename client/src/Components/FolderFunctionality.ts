import { useEffect, useRef, useState } from "react";
import type { Folders } from "../features/folderSlice";
import type { Note } from "../features/notesSlice";

export default function useFolders(){
    const [change, setChange] = useState<boolean>(false);
    const folderRef = useRef<HTMLInputElement>(null);
    const [writer, setWriter] = useState<boolean>(false);
    const [noteViewer, setNoteViewer] = useState<boolean>(false);
    const [folderNoteView, setFolderNoteView] = useState<Note>();

    function handleNoteView(value : boolean){
        setNoteViewer(value);
        handleWriter(true);
    }
    
    function handleFolderNoteView(note : Note){
        handleNoteView(true);
        handleWriter(false);
        setFolderNoteView(note);
    }
    
    function handleToggle(id : string, setter : React.Dispatch<React.SetStateAction<any[]>>){
        setter(prev => {
            console.log(prev);
            return prev.map(note => {
                console.log(note);
                if(note._id === id){
                    return {...note, checked : !note.checked};
                }
                return note;
            })
        })
    }

    function handleChangeFolder(value : boolean){
        setChange(value);
    }
    function handleWriter(value : boolean){
        setWriter(value);
    }
    return {folderRef, handleToggle, folderNoteView, handleFolderNoteView, change, setChange, handleChangeFolder, writer, handleWriter, noteViewer, handleNoteView};
}
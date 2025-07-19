import { useRef, useState } from "react";
import type { Note } from "../features/notesSlice";
import type { TempNote } from "../pages/folders";

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
    
    function handleToggle(id : string | undefined, setter : React.Dispatch<React.SetStateAction<TempNote[] | undefined>>){
        setter(prev => {
            console.log(prev);
            return prev!.map(note => {
                // console.log(note);
                if(note._id === id){
                    return {...note, checked : !note.checked};
                }
                return note;
            })
        })
        setter(prev => {console.log(prev);return prev})
    }

    function handleChangeFolder(value : boolean){
        setChange(value);
    }
    function handleWriter(value : boolean){
        setWriter(value);
    }
    return {folderRef, handleToggle, folderNoteView, handleFolderNoteView, change, setChange, handleChangeFolder, writer, handleWriter, noteViewer, handleNoteView};
}
import { useEffect, useRef, useState } from "react";
import type { Note } from "../features/notesSlice";
export default function useNotes() {
    const headingRef = useRef<HTMLInputElement | null>(null);
    const messageRef = useRef<HTMLTextAreaElement | null>(null);
    const idRef = useRef<string | undefined>(""); // To store the ID of the note being edited
    const [change, setChange] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [writer, setWriter] = useState<boolean>(false);
    const [changedNote, setChangedNote] = useState<Note>({_id : "", heading : "", message : ""});
    
    // Handles the assignment of values to refs when a note is viewed or edited
    useEffect(()=>{
        if (headingRef.current) headingRef.current.value = changedNote!.heading;
        if (messageRef.current) messageRef.current.value = changedNote!.message;
        idRef.current = changedNote!._id
    },[changedNote])

    // Handles changes in the note
    function handleChange({ _id, heading, message }: Note) {
        if(window.innerWidth <= 500){
            setIsMobile(true);
        }
        setChange(true);
        setChangedNote({_id: _id, heading:heading, message:message})
    }
    
    return { headingRef, messageRef, idRef, handleChange, change, setChange, writer, setWriter, isMobile, setIsMobile };
}
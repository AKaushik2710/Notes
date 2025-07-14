import { useEffect, useRef, useState } from "react";
import type { Folders } from "../features/folderSlice";

export default function useFolders(){
    const [change, setChange] = useState<boolean>(false);
    const folderRef = useRef<HTMLInputElement>(null);
    const [writer, setWriter] = useState<boolean>(false);
    const [changeFolder, setChangeFolder] = useState<Folders>();
    useEffect(()=>{
        if(folderRef.current){
        folderRef.current.value = changeFolder.folderName;
        }
        // console.log(changeFolder);
    }, [changeFolder]);
    function handleToggle(id, setter){
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
    function handleChange(folder){
        setChange(true);
        setChangeFolder(folder);
    }
    function handleWriter(value : boolean){
        setWriter(value);
    }
    return {folderRef, change, handleChange, changeFolder, handleToggle, handleWriter, writer}
}
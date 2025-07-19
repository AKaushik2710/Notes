import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCircleCheck, faFolderPlus, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { TempContext } from "../App";
import type { Note } from "../features/notesSlice";
import type { Folders } from "../features/folderSlice";
import {Div, Span, Button, Input} from "../Components/Assembler";
import { fetchFolders, addFolders, showFolder, changeFolder, removeFolder } from "../api/fetchFolders";
import useFolders from "../Components/FolderFunctionality";
import { fetchNotes } from "../api/fetchNotes";
import FolderNoteWriter from "../Components/FolderNoteWriter";

export interface TempNote extends Note {
  checked : boolean
}

interface TempContextType {
  tempNotes? : TempNote[];
  setTempNotes : React.Dispatch<React.SetStateAction<TempNote[] | undefined>>,
  handleTempNoteCreation : (folderNotes : Note[]) => void
}

export default function Folders() {
  const currentFolder = useAppSelector((state)=> state.folders.currentFolder);
  const folders = useAppSelector((state) => state.folders.folders);
  const folderNotes = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const myNotes = useContext(TempContext)! as TempContextType;
  const {folderRef, handleToggle, folderNoteView, handleFolderNoteView, change, setChange, handleChangeFolder, writer, handleWriter, noteViewer, handleNoteView}= useFolders();
  function handleSubmission(e : React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    console.log("Submitted", myNotes.tempNotes);
    const checkedNotes = myNotes.tempNotes?.filter(note => note.checked).map(note => note._id);
    console.log(myNotes.tempNotes
          ?.filter(note => note.checked)
          .map(note => note._id))
    if(change){
      dispatch(changeFolder({
        _id : currentFolder!._id,
        folderName : folderRef.current?.value,
        notes : checkedNotes?.filter((id): id is string => typeof id === "string")
      }));
    }
    else{
      dispatch(addFolders({folderName : folderRef.current?.value, notes : checkedNotes as string[]}));
    } 
    handleWriter(false);
      myNotes.setTempNotes(myNotes.tempNotes?.map(note => ({...note, checked : false})));
    if(folderRef.current) folderRef.current.value = "";
  }
  const handleFolderRemoval = (e : React.MouseEvent<HTMLSpanElement>)=>{

    e.stopPropagation();
    const folderId = e.currentTarget.parentElement?.id;
    handleWriter(false);
    handleChangeFolder(false);
    console.log(folderId)
    if(folderId){
      dispatch(removeFolder(folderId));
    }
  }

  // Handle notes checkbox toggle
  useEffect(()=>{
    myNotes.handleTempNoteCreation(folderNotes);
  },[folderNotes])

  // Handle fetching notes on component mount
  useEffect(()=>{
      dispatch(fetchNotes());
  },[]);

  // Handle fetching folders on component mount
  useEffect(()=>{
        dispatch(fetchFolders());
    },[])

  function handleChange(folder : Folders){
    if (myNotes) {
      myNotes.setTempNotes(myNotes.tempNotes?.map(note => {
        return folder.notes?.includes(note._id as string) ? {...note, checked : true} : note;
      }));
    }
    dispatch(showFolder(folder._id? folder._id : ""));
    handleWriter(true);
    handleChangeFolder(true);
  }
  useEffect(()=>{
    if(currentFolder?.folderName !== undefined){
      console.log(currentFolder.folderName, folderRef.current)
      folderRef.current!.value = currentFolder.folderName;
    }
  },[currentFolder])
  function handleMe(){
    console.log("Before Submitted", myNotes.tempNotes);
  }
  return (

        <Div cn=" flex w-full h-full cav bg-[#424874] text-[#CACFD6]">
          <Div cn='w-2/5 border-1 h-full'>
            <Div cn="flex w-full justify-between items-center  h-1/7">
              <Span cn="md:text-2xl font-extrabold text-xl paci">Folders</Span>
              <Span onClick={handleMe}>Me</Span>
              <Span cn="text-xl cursor-pointer mr-6" onClick={()=>{handleWriter(true); console.log(change)}}>
                <FontAwesomeIcon className="hover:text-[#CACFD6]/50" icon={faFolderPlus}></FontAwesomeIcon>
              </Span>
            </Div>
            <Div cn="flex flex-col h-6/7 border-1">
              {folders.map((folder, index)=>{
                return <Span key={index} id={folder._id} cn="relative hover:shadow-lg hover:shadow-white hover:cursor-pointer" onClick={()=>handleChange(folder)}>{currentFolder?._id === folder._id ?<FontAwesomeIcon icon={faFolderOpen}></FontAwesomeIcon> : null}{folder.folderName}<Span cn="absolute right-4" onClick={handleFolderRemoval}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Span></Span>
              })}
            </Div>
          </Div>
          {writer && (<form onSubmit={handleSubmission} className="w-3/5 p-2"> 
            <Input cn="text-2xl w-4/5 bg-teal-300" holder="Folder" ref={folderRef}></Input>
            <Button cn=" text-rose-700 w-1/5 text-xl" type="submit"><FontAwesomeIcon icon={faCircleCheck} /></Button>
            {!change ? myNotes?.tempNotes?.map((note : TempNote) => {return <label key={note._id} className="block hover:shadow-xl hover:shadow-rose-800 mt-2 p-2 text-xl relative" onClick={()=>handleToggle(note._id, myNotes.setTempNotes)}>{note.heading === "" ? note.message : note.heading}<input type="checkbox" className="absolute right-2 bottom-[35%]"></input></label>}) : currentFolder?.notes?.map((note, index) => {return <Span cn="text-teal-500" onClick={()=>handleFolderNoteView(note)} key={index}>{note.heading==="" ? note.message : note.heading}</Span>})}
          </form>)}
          {noteViewer && <FolderNoteWriter note={folderNoteView} handleNoteView={handleNoteView} folderID={currentFolder!._id}/>}
        </Div>
  )
}

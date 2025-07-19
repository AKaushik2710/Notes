import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
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
    console.log("Submitted");
    if(change){
      dispatch(changeFolder({
        _id : currentFolder!._id,
        folderName : folderRef.current?.value,
        notes : myNotes.tempNotes
          ?.filter(note => note.checked)
          .map(note => note._id)
          .filter((id): id is string => typeof id === "string")
      }));
    }
    else{
      dispatch(addFolders({folderName : folderRef.current?.value, notes : myNotes.tempNotes?.filter(note => note.checked).map(note => note._id ) as string[]}));
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
  return (

        <Div cn=" flex w-full h-full">
          <Div cn='w-2/5 border-1 h-full'>
            <Div cn="flex w-full justify-between  h-1/7">
              <Span cn="text-xl">Folders</Span>
              <Span cn="text-xl" onClick={()=>{handleWriter(true); console.log(change)}}>C</Span>
            </Div>
            <Div cn="flex flex-col h-6/7 border-1">
              {folders.map((folder, index)=>{
                return <Span key={index} id={folder._id} cn="relative" onClick={()=>handleChange(folder)}>{folder.folderName}<Span cn="absolute right-4" onClick={handleFolderRemoval}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Span></Span>
              })}
            </Div>
          </Div>
          {writer && (<form onSubmit={handleSubmission}>
            <Input cn="text-2xl" holder="Folder" ref={folderRef}></Input>
            <Button cn="bg-teal-500" type="submit">Done</Button>
            <hr></hr>
            {!change ? myNotes?.tempNotes?.map((note : TempNote) => {return <label key={note._id} onClick={()=>handleToggle(note._id, myNotes.setTempNotes)}>{note.heading === "" ? note.message : note.heading}<input type="checkbox"></input></label>}) : currentFolder?.notes?.map((note, index) => {return <Span cn="text-teal-500" onClick={()=>handleFolderNoteView(note)} key={index}>{note.heading==="" ? note.message : note.heading}</Span>})}
          </form>)}
          {noteViewer && <FolderNoteWriter note={folderNoteView} handleNoteView={handleNoteView} handleChange={handleChange} folderID={currentFolder!._id}/>}
        </Div>
  )
}

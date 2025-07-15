import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { TempContext } from "../App";
import type { Note } from "../features/notesSlice";
import type { Folders } from "../features/folderSlice";
import {Div, Span, Button, Input} from "../Components/Assembler";
import { fetchFolders, addFolders, showFolder } from "../api/fetchFolders";
import useFolders from "../Components/FolderFunctionality";
import { fetchNotes } from "../api/fetchNotes";
import FolderNoteWriter from "../Components/FolderNoteWriter";

export interface TempNote extends Note {
  checked : boolean
}

export default function Folders() {
  const currentFolder = useAppSelector((state)=> state.folders.currentFolder);
  const folders = useAppSelector((state) => state.folders.folders);
  const folderNotes = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const myNotes = useContext(TempContext);
  const {folderRef, handleToggle, folderNoteView, handleFolderNoteView, change, setChange, changeFolder, handleChangeFolder, writer, handleWriter, noteViewer, handleNoteView}= useFolders();
  function hanldeSubmission(e : React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    console.log("Submitted");
    if(change){
      // dispatch()
      console.log("Changinng");
    }
    else{
      dispatch(addFolders({folderName : folderRef.current?.value, notes : myNotes.tempNotes?.filter(note => note.checked).map(note => note._id)}));
    }
    handleWriter(false);
    myNotes.setTempNotes(myNotes.tempNotes?.map(note => ({...note, checked : false})));
    if(folderRef.current) folderRef.current.value = "";
  }
  useEffect(()=>{
    myNotes.handleTempNoteCreation(folderNotes);
  },[folderNotes])
  useEffect(()=>{
      dispatch(fetchNotes());
  },[]);
  useEffect(()=>{
        dispatch(fetchFolders());
    },[])
  function handleCharge(){
    
    console.log(myNotes.tempNotes);
  }

  function handleChange(folder : Folders){
    dispatch(showFolder(folder._id? folder._id : ""));
    handleWriter(true);
    handleChangeFolder(true);
  }
  useEffect(()=>{
    if(currentFolder){
      console.log(currentFolder, folderRef.current)
      folderRef.current!.value = currentFolder.folderName;
    }
  },[currentFolder])
  return (

        <Div cn=" flex w-full h-full">
          <Div cn='w-2/5 border-1 h-full'>
            <Div cn="flex w-full justify-between  h-1/7">
              <Span>Folders</Span>
              <Span onClick={handleCharge}>Me</Span>
              <Span onClick={()=>{handleWriter(true); console.log(change)}}>C</Span>
            </Div>
            <Div cn="flex flex-col h-6/7 border-1">
              {folders.map((folder, index)=>{
                return <Span key={index} id={folder._id} onClick={()=>handleChange(folder)}>{folder.folderName}</Span>
              })}
            </Div>
          </Div>
          {writer && (<form onSubmit={hanldeSubmission}>
            <Input cn="text-2xl" holder="Folder" ref={folderRef}></Input>
            <Button type="submit">Done</Button>
            <hr></hr>
            {!change ? myNotes.tempNotes.map(note => {return <label key={note._id} onClick={()=>handleToggle(note._id, myNotes.setTempNotes)}>{note.heading === "" ? note.message : note.heading}<input type="checkbox"></input></label>}) : currentFolder?.notes?.map((note, index) => {return <Span onClick={()=>handleFolderNoteView(note)} key={index}>{note.heading==="" ? note.message : note.heading}</Span>})}
          </form>)}
          {noteViewer && <FolderNoteWriter note={folderNoteView} handleNoteView={handleNoteView} />}
        </Div>
  )
}

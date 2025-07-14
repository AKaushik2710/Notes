import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { TempContext } from "../App";
import type { Note } from "../features/notesSlice";
import type { Folders } from "../features/folderSlice";
import {Div, Span, Button, Input} from "../Components/Assembler";
import { fetchFolders, addFolders } from "../api/fetchFolders";
import useFolders from "../Components/FolderFunctionality";
import { fetchNotes } from "../api/fetchNotes";

export interface TempNote extends Note {
  checked : boolean
}

export default function Folders() {
  const folders = useAppSelector((state) => state.folders);
  const folderNotes = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const myNotes = useContext(TempContext);
  const {folderRef, change, handleChange, changeFolder, handleToggle, handleWriter, writer} = useFolders();
  function hanldeSubmission(e : React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    console.log("Submitted");
    // if(change){
    //   dispatch()
    // }
    handleWriter(false);
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
  return (

        <Div cn=" flex w-full h-full">
          <Div cn='w-2/5 border-1 h-full'>
            <Div cn="flex w-full justify-between  h-1/7">
              <Span>Folders</Span>
              <Span onClick={handleCharge}>Me</Span>
              <Span onClick={()=>handleWriter(true)}>C</Span>
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
          </form>)}
        </Div>
  )
}

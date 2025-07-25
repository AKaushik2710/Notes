import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCircleCheck, faFolderPlus, faFolderOpen, faArrowLeft, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import type { Note } from "../features/notesSlice";
import type { Folders } from "../features/folderSlice";
import {Div, Span, Button, Input} from "../Components/Assembler";
import { changeNoteCheck } from "../features/notesSlice";
import { changeAllNoteCheck } from "../features/notesSlice";
import { fetchFolders, addFolders, showFolder, changeFolder, removeFolder } from "../api/fetchFolders";
import useFolders from "../Components/FolderFunctionality";
import FolderNoteWriter from "../Components/FolderNoteWriter";
import { fetchNotes } from "../api/fetchNotes";


export default function Folders() {
  const currentFolder = useAppSelector((state)=> state.folders.currentFolder);
  const folders = useAppSelector((state) => state.folders.folders);
  const folderNotes = useAppSelector((state) => state.notes);
  const myNotes = folderNotes;
  const dispatch = useAppDispatch();
  const {folderRef, folderNoteView, handleFolderNoteView, change, handleChangeFolder, writer, handleWriter, noteViewer, handleNoteView, noteAdd, handleNoteAdd, noteRemove, handleRemoveUI}= useFolders();
  
  // Fetching folders when component mounts
  useEffect(()=>{
        dispatch(fetchFolders());
    },[])
  
  // Fetching notes when component mounts
  useEffect(()=>{
    dispatch(fetchNotes());
  },[]);

  // Setting folder name in ref when current folder editing changes
  useEffect(()=>{
    if(currentFolder?.folderName !== undefined){
      folderRef.current!.value = currentFolder.folderName;
    }
    console.log(currentFolder, typeof currentFolder?.notes);
  },[currentFolder?.notes])

  // For updation of UI when a note is added
  useEffect(()=>{
      dispatch(showFolder(currentFolder?._id ? currentFolder._id : ""));
  },[noteAdd]);

  // Handle the updation of UI after a note is removed
  useEffect(()=>{
    if(noteRemove){
      dispatch(showFolder(currentFolder?._id ? currentFolder._id : ""));
      handleRemoveUI(false);
    };
  },[noteRemove]);

  // Handling form submission
  function handleSubmission(e : React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const checkedNotes = folderNotes.filter(note => note.checked).map(note => note._id);
    
    // For handling the submission in case a change is  being made in notes or foldername
    if(change || noteAdd){
      dispatch(changeFolder({
        _id : currentFolder!._id,
        folderName : folderRef.current?.value,
        notes : checkedNotes?.filter((id): id is string => typeof id === "string")
      }));
    }
    // The submission for a newly created folder
    else{
      dispatch(addFolders({folderName : folderRef.current?.value, notes : checkedNotes as string[]}));
    }
    // For triggering the updation of UI
    if(noteAdd){
      handleNoteAdd(false);
      handleChangeFolder(true);
    }
    // For removal of currentFolder after change and resetting all notes to their false checked state
    else{
      dispatch(showFolder(""));
    handleWriter(false);
      dispatch(changeAllNoteCheck());
    if(folderRef.current) folderRef.current.value = "";
    }
  }
  
  // Handling folder removal
  const handleFolderRemoval = (e : React.MouseEvent<HTMLSpanElement>)=>{
    e.stopPropagation();
    const folderId = e.currentTarget.parentElement?.id;
    handleWriter(false);
    handleChangeFolder(false);
    if(folderId){
      dispatch(removeFolder(folderId));
    }
  }

  // Handling folder change
  function handleChange(folder : Folders | undefined){
    if(folder === undefined){
      dispatch(changeAllNoteCheck());
      handleChangeFolder(false);
      if(folderRef.current)folderRef.current!.value = "";
      if(!writer) handleWriter(true);
    }
    else{
    folder.notes!.map(id => {
      dispatch(changeNoteCheck({_id : id}));
    })
    dispatch(showFolder(folder._id? folder._id : ""));
    handleWriter(true);
    handleChangeFolder(true);
    };
  }

  // Handling removal of notes during change
  function handleNoteRemoval(e : React.MouseEvent<SVGSVGElement>){
    e.stopPropagation();
    const noteId = e.currentTarget.parentElement?.id;
    console.log(noteId, typeof noteId);
    currentFolder?.notes?.forEach(note => console.log(typeof note, note));
    dispatch(changeFolder({
      _id : currentFolder!._id,
      folderName : currentFolder!.folderName,
      notes : currentFolder!.notes!.filter(note => note._id !== noteId)
    }));
    dispatch(changeNoteCheck({_id : noteId}));
    handleRemoveUI(true); 
  }

  // For handling the addition of new notes
  function handleAddNote(){
    handleNoteAdd(true);
    handleChangeFolder(false);
  }

  // For the closing of changing of folder
  function handleClose(){
    dispatch(showFolder(""));
    handleWriter(false);
  }
  return (
        <Div cn=" flex w-full h-full cav bg-[#424874] text-[#CACFD6]">
          <Div cn='w-2/5 border-1 h-full'>
            <Div cn="flex w-full justify-between items-center h-1/7">
              <Span cn="md:text-2xl font-extrabold text-xl paci ml-10 select-none">Folders</Span>
              <Span cn="text-xl cursor-pointer mr-6 hover:text-[#DCD6F7]" onClick={()=>{handleChange(undefined); }}>
                <FontAwesomeIcon icon={faFolderPlus}></FontAwesomeIcon>
              </Span>
            </Div>
            <Div cn="flex flex-col h-6/7 border-1 bg-[#DCD6F7] scrollbar-name overflow-y-auto">
              {folders.map((folder, index)=>{
                return <Span key={index} id={folder._id} cn="relative text-[#424874] hover:border-b-2 hover:shadow-lg hover:shadow-black hover:cursor-pointer py-2 my-1 pl-2" onClick={(e)=>{e.stopPropagation();handleChange(folder)}}>{currentFolder?._id === folder._id ?<FontAwesomeIcon icon={faFolderOpen} className="mr-4"></FontAwesomeIcon> : null}{folder.folderName}<Span cn="absolute right-4" onClick={handleFolderRemoval}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Span></Span>
              })}
            </Div>
          </Div>
          {writer && (<form onSubmit={handleSubmission} className="w-3/5 p-2 pt-8 relative overflow-hidden"> 
            <Span cn="absolute top-2 left-4 text-xl cursor-pointer hover:text-[#DCD6F7]" onClick={handleClose}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></Span>
            {change ? <Span cn="absolute bottom-8 right-6 rounded-lg p-2 bg-[#CACFD6] text-[#424874] hover:bg-[#DCD6F7]/25 hover:text-[#CACFD6] text-xl cursor-pointer hover:text-[#DCD6F7]" onClick={handleAddNote}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Span> : null}
            <Input cn="text-2xl w-5/6 ml-8 h-1/7 outline-none" holder="Folder" ref={folderRef} required={true}></Input>
            <Button cn=" text-rose-700 w-1/9 h-1/7 text-xl cursor-pointer" type="submit"><FontAwesomeIcon icon={faCircleCheck} /></Button>
            <Div cn="mt-4 scrollbar h-6/7 overflow-y-auto">{!change ? myNotes!.map((note : Note) => {return <label key={note._id} className="block hover:shadow-xl hover:shadow-rose-800 mt-2 p-2 text-xl relative" >{note.heading==="" ? note.message.trim().slice(0,40) + (note.message.length > 40 ? "..." : "") : note.heading.trim().slice(0,40) + (note.message.length > 40 ? "..." : "")}<input type="checkbox" onChange={() => dispatch(changeNoteCheck({_id : note._id}))} checked={note.checked} className="absolute right-2 bottom-[35%]"></input></label>}) : currentFolder?.notes?.map((note, index) => {return <Span id={note._id} cn="text-[#DDC8C4] block relative ml-10 mr-15 mb-2 py-2 pl-4 hover:shadow-xl my-1 shadow-xs shadow-[#DDC8C4]" onClick={()=>handleFolderNoteView(note)} key={index}>{note.heading==="" ? note.message.trim().slice(0,40) + (note.message.length > 40 ? "..." : "") : note.heading.trim().slice(0,40) + (note.message.length > 40 ? "..." : "")}<FontAwesomeIcon className="text-red-900 absolute right-4" icon={faX} onClick={handleNoteRemoval}></FontAwesomeIcon></Span>})}</Div>
          </form>)}
          {noteViewer && <FolderNoteWriter note={folderNoteView} handleNoteView={handleNoteView} folderID={currentFolder!._id}/>}
        </Div>
  )
}

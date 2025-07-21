import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCircleCheck, faFolderPlus, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
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
  const {folderRef, folderNoteView, handleFolderNoteView, change, handleChangeFolder, writer, handleWriter, noteViewer, handleNoteView}= useFolders();
  
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
  },[currentFolder])

  // Handling form submission
  function handleSubmission(e : React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const checkedNotes = folderNotes.filter(note => note.checked).map(note => note._id);
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
      dispatch(changeAllNoteCheck());
    if(folderRef.current) folderRef.current.value = "";
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
      folderRef.current!.value = "";
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
  return (
        <Div cn=" flex w-full h-full cav bg-[#424874] text-[#CACFD6]">
          <Div cn='w-2/5 border-1 h-full'>
            <Div cn="flex w-full justify-between items-center  h-1/7">
              <Span cn="md:text-2xl font-extrabold text-xl paci">Folders</Span>
              <Span cn="text-xl cursor-pointer mr-6 hover:text-[#DCD6F7]" onClick={()=>{handleChange(undefined); }}>
                <FontAwesomeIcon icon={faFolderPlus}></FontAwesomeIcon>
              </Span>
            </Div>
            <Div cn="flex flex-col h-6/7 border-1">
              {folders.map((folder, index)=>{
                return <Span key={index} id={folder._id} cn="relative hover:shadow-lg hover:shadow-white hover:cursor-pointer" onClick={(e)=>{e.stopPropagation();handleChange(folder)}}>{currentFolder?._id === folder._id ?<FontAwesomeIcon icon={faFolderOpen}></FontAwesomeIcon> : null}{folder.folderName}<Span cn="absolute right-4" onClick={handleFolderRemoval}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Span></Span>
              })}
            </Div>
          </Div>
          {writer && (<form onSubmit={handleSubmission} className="w-3/5 p-2"> 
            <Input cn="text-2xl w-4/5 bg-teal-300" holder="Folder" ref={folderRef}></Input>
            <Button cn=" text-rose-700 w-1/5 text-xl" type="submit"><FontAwesomeIcon icon={faCircleCheck} /></Button>
            {!change ? myNotes!.map((note : Note) => {return <label key={note._id} className="block hover:shadow-xl hover:shadow-rose-800 mt-2 p-2 text-xl relative" >{note.heading === "" ? note.message : note.heading}<input type="checkbox" onChange={() => dispatch(changeNoteCheck({_id : note._id}))} checked={note.checked} className="absolute right-2 bottom-[35%]"></input></label>}) : currentFolder?.notes?.map((note, index) => {return <Span cn="text-teal-500" onClick={()=>handleFolderNoteView(note)} key={index}>{note.heading==="" ? note.message : note.heading}</Span>})}
          </form>)}
          {noteViewer && <FolderNoteWriter note={folderNoteView} handleNoteView={handleNoteView} folderID={currentFolder!._id}/>}
        </Div>
  )
}

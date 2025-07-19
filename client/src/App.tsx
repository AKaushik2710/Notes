import { Outlet } from "react-router-dom";
import {Div, Button} from "./Components/Assembler";
import type { TempNote } from "./pages/folders";
import type { Note } from "./features/notesSlice";
import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showFolder } from "./api/fetchFolders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { fetchNotes } from "./api/fetchNotes";

interface TempContextType {
  tempNotes? : TempNote[];
  setTempNotes : React.Dispatch<React.SetStateAction<TempNote[] | undefined>>,
  handleTempNoteCreation : (folderNotes : Note[]) => void
}
export const TempContext = createContext<TempContextType>(null!);
function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const folderNotes = useAppSelector((state) => state.notes);
  const [tempNotes, setTempNotes] = useState<TempNote[]>();
  function handleTempNoteCreation(){
      const notes = folderNotes.map(note => {return {...note, checked : false}})
      console.log("I ran");
      setTempNotes(notes);
    }
    function handleCurrentFolder(){
      console.log("Dispatching Empty String")
      dispatch(showFolder(""));
    }
  return <>
  <Div cn="flex bg-black text-white w-full h-screen">
        <Div cn="w-20 border-1 hidden md:grid">
          <Button cn="hover:shadow-lg hover:shadow-white" onClick={()=> { handleCurrentFolder();navigate('/notes')}}>Notes</Button>
          <Button cn="hover:shadow-lg hover:shadow-white" onClick={()=>{handleTempNoteCreation();navigate('/folders'); }}>Folders</Button>
          <Button cn="hover:shadow-lg hover:shadow-white">Settings</Button>
        </Div>
        <Div cn="absolute top-5 left-3 text-[#D6E5E3]">
          <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
        </Div>
        <Div cn='w-full border-1 border-teal-200 h-full'>
          <TempContext.Provider value={{tempNotes, setTempNotes, handleTempNoteCreation}}>
            <Outlet />
          </TempContext.Provider>
        </Div>
      </Div>
  </>
}

export {App};

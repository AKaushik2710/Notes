import { useAppDispatch, useAppSelector } from "../redux/hook";
import Writer from "../Components/Writer";
import {  deleteNotes, fetchNotes } from "../api/fetchNotes";
import { useEffect, useContext } from "react";
import { barContext } from "../App";
import {Div, Span} from "../Components/Assembler";
import useNotes from "../Components/NoteFunctionality";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib, faTrash, faBars } from "@fortawesome/free-solid-svg-icons";



export default function Notes() {
  const myContext = useContext(barContext);
  const notes = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();
  const {headingRef, messageRef, change, setChange, idRef, handleChange, writer, setWriter, windowWidth, setWindoWidth}  = useNotes();

  useEffect(()=>{
    dispatch(fetchNotes());
  },[notes]);

      useEffect(()=>{
          if(windowWidth <= 500){
              if(writer) myContext?.myMobileFunction(true)
          }else{
              myContext?.myMobileFunction(false);
          }
      },[windowWidth]);

      useEffect(()=>{
        function handleResize(){
          setWindoWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return ()=> window.removeEventListener("resize", handleResize);
      },[]);

  // Handles note deletion
  function handleDeletion(_id:string){
    dispatch(deleteNotes({_id}))
    if(idRef.current === _id) setWriter(false);
  }
  return (
        <Div cn=" flex w-full h-full overflow-hidden bg-[#424874] text-[#CACFD6]">
          {!myContext?.isMobile && (<Div cn='md:w-2/5 w-full border-1 h-full cav'>
            <Div cn="flex w-full justify-between items-center h-1/7">
              <Div cn="absolute top-5 text-xl left-1 text-[#D6E5E3] md:hidden text-center w-5">
                              <FontAwesomeIcon icon={faBars} onClick={()=> myContext?.myfunction(true)}></FontAwesomeIcon>
                            </Div>
              <Span cn="md:text-2xl text-xl ml-10 paci font-extrabold select-none">Notes</Span>
              <Span cn="text-xl mr-6 cursor-pointer hover:text-[#DCD6F7]"  onClick={() => {setWriter(true); if(windowWidth <=500)myContext?.myMobileFunction(true)}}>
                <FontAwesomeIcon icon={faPenNib}></FontAwesomeIcon>
              </Span>
            </Div>
            <Div cn="flex flex-col h-6/7 overflow-y-auto bg-[#DCD6F7] scrollbar-name">
              {notes.map((note,index) =>{
                return <Span cn='relative text-[#424874] hover:border-b-2 hover:shadow-lg hover:shadow-black hover:cursor-pointer py-2 my-1 pl-2' id={note._id} key={index} onClick={()=>{setWriter(true); handleChange({_id : note._id, heading: note.heading , message : note.message, handleMobile : myContext!.myMobileFunction})}}>{note.heading ? note.heading.trim().slice(0,30) + (note.heading.length>30 ? "..." : "") : note.message.trim().slice(0,30) + (note.message.length>30 ? "..." : "")}<Span cn="text-sm absolute right-3" onClick={(e)=>{e.stopPropagation();handleDeletion(note._id!)}}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Span></Span>
              })}
            </Div>
          </Div>)}
          {writer && (<Writer headingRef={headingRef} messageRef={messageRef} change={change} setWriter={setWriter} setChange={setChange} idRef={idRef} handleMobile={myContext!.myMobileFunction}/>)}
        </Div>
  )
}

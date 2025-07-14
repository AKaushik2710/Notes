import {Button, Span, Div, Input} from "./Assembler";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "@reduxjs/toolkit";
import { addNotes, changeNotes } from "../api/fetchNotes";
import { addNote } from "../features/notesSlice";
import { useAppDispatch} from "../redux/hook";
import useNotes from "./NoteFunctionality";

export default function Writer({headingRef, messageRef, change, setChange, idRef, setWriter, setIsMobile} : {
    headingRef: React.RefObject<HTMLInputElement>,
    messageRef: React.RefObject<HTMLTextAreaElement>,
    change: boolean,
    setChange: React.Dispatch<React.SetStateAction<boolean>>,
    idRef: React.RefObject<string>,
    setWriter : React.Dispatch<React.SetStateAction<boolean>>,
    setIsMobile : React.Dispatch<React.SetStateAction<boolean>>
}) {
    // const {headingRef, messageRef, change, setChange, idRef} = useNotes();
    const dispatch = useAppDispatch();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWriter(false);
    setIsMobile(false);
    const newNote = {
        heading: headingRef.current ? headingRef.current.value : "",
        message: messageRef.current ? messageRef.current.value : ""
    };
    if(!change){
        dispatch(addNotes(newNote));
    }
    else{
        setChange(false);
        dispatch(changeNotes({_id : idRef.current, heading : headingRef.current ? headingRef.current.value : "", message : messageRef.current ? messageRef.current.value : ""}));
    }
    if (headingRef.current) headingRef.current.value = "";
    if (messageRef.current) messageRef.current.value = "";

}

    return <form className="flex flex-col w-full md:w-3/5 border-1 border-teal-200 h-full" onSubmit={handleSubmit}>
        <Div cn="flex justify-end items-center w-full h-1/7">
            <Input cn="md:text-2xl text-xl md:p-2 p-1 m-1 mr-2 h-1/2 md:h-3/4 w-5/7 ml-6 caret-pink-600" ref={headingRef} holder="Heading...."></Input>
            <Button cn="text-2xl p-2 text-pink-500 h-3/4 w-1/9 cursor-pointer text-center mr-2" type="submit">
                <FontAwesomeIcon icon={faCircleCheck} />
            </Button>
        </Div>
        <Div cn=" h-6/7 border-1">
            <textarea className="text-sm md:text-xl w-[95%] md:w-[97%] h-[96%] p-2 m-2 md:m-3 border-1" ref={messageRef} placeholder="Start Writing...."></textarea>
        </Div>
    </form>
}
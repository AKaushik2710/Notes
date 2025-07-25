import {Button, Div, Input, Span} from "./Assembler";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { addNotes, changeNotes } from "../api/fetchNotes";
import { useAppDispatch} from "../redux/hook";

export default function Writer({headingRef, messageRef, change, setChange, idRef, setWriter, handleMobile} : {
    headingRef: React.RefObject<HTMLInputElement | null >,
    messageRef: React.RefObject<HTMLTextAreaElement | null >,
    change: boolean,
    setChange: React.Dispatch<React.SetStateAction<boolean>>,
    idRef: React.RefObject<string | undefined>,
    setWriter : React.Dispatch<React.SetStateAction<boolean>>,
    handleMobile : (value : boolean)=> void
}) {
    // const {headingRef, messageRef, change, setChange, idRef} = useNotes();
    const dispatch = useAppDispatch();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWriter(false);
    handleMobile(false);
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

function handleClose(){
    handleMobile(false);
    setChange(false);
    setWriter(false);
}
    return <form className="flex flex-col w-full md:w-3/5 border-1 border-teal-200 h-full relative" onSubmit={handleSubmit}>
        <Span cn="absolute top-2 left-4 text-xl cursor-pointer hover:text-[#DCD6F7]" onClick={handleClose}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></Span>
        <Div cn="flex justify-end items-center w-full h-1/7 mt-3">
            <Input cn="md:text-2xl text-xl paci md:p-2 p-1 m-1 mr-2 h-1/2 md:h-3/4 w-6/7 ml-6 caret-pink-600 focus:outline-none" ref={headingRef} holder="Heading...."></Input>
            <Button cn="text-2xl p-2 text-pink-500 h-3/4 w-1/9 cursor-pointer text-center mr-2" type="submit">
                <FontAwesomeIcon icon={faCircleCheck} />
            </Button>
        </Div>
        <Div cn=" h-6/7">
            <textarea className="cav text-sm md:text-xl w-[90%] resize-none scrollbar focus:outline-none md:w-[97%] h-[96%] p-2 m-2 md:m-3" ref={messageRef} placeholder="Start Writing...."></textarea>
        </Div>
    </form>
}
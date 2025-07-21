import { Outlet } from "react-router-dom";
import {Div, Button} from "./Components/Assembler";
import { useNavigate } from "react-router-dom";
import { showFolder } from "./api/fetchFolders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch} from "./redux/hook";

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleCurrentFolder(){
    console.log("Dispatching Empty String")
    dispatch(showFolder(""));
  }
  return <>
  <Div cn="flex bg-black text-white w-full h-screen">
        <Div cn="w-20 border-1 hidden md:grid">
          <Button cn="hover:shadow-lg hover:shadow-white" onClick={()=> { handleCurrentFolder();navigate('/notes')}}>Notes</Button>
          <Button cn="hover:shadow-lg hover:shadow-white" onClick={()=>{navigate('/folders'); }}>Folders</Button>
          <Button cn="hover:shadow-lg hover:shadow-white">Settings</Button>
        </Div>
        <Div cn="absolute top-5 left-3 text-[#D6E5E3]">
          <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
        </Div>
        <Div cn='w-full border-1 border-teal-200 h-full'>
            <Outlet />
        </Div>
      </Div>
  </>
}

export {App};

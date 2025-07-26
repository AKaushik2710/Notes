import { Outlet } from "react-router-dom";
import {Div, Button} from "./Components/Assembler";
import { useNavigate } from "react-router-dom";
import { showFolder } from "./api/fetchFolders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFilePen, faFolder } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch} from "./redux/hook";
import { useEffect, useState, createContext, useContext } from "react";

interface barContext {
  myfunction : (value: boolean) => void,
  isMobile : boolean,
  myMobileFunction : (value : boolean) => void
}
export const barContext = createContext<barContext | null>(null);
function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [mob, setMob] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  function handleCurrentFolder(){
    console.log("Dispatching Empty String")
    dispatch(showFolder(""));
  }

  // useEffect(()=>{
  //   console.log(mob);
  // },[mob])
  
  const handleMob = (value : boolean)=>{
    setMob(value);
  }
  const handleMobile = (value : boolean)=>{
    setIsMobile(value);
  }
  return <>
  <Div cn="flex bg-black text-white w-full h-screen">
        <Div cn="w-20 border-1 hidden md:grid hidden">
          <Button cn="hover:shadow-lg hover:shadow-white" onClick={()=> { handleCurrentFolder();navigate('/notes')}}><FontAwesomeIcon icon={faFilePen}></FontAwesomeIcon></Button>
          <Button cn="hover:shadow-lg hover:shadow-white" onClick={()=>{navigate('/folders'); }}><FontAwesomeIcon icon={faFolder}></FontAwesomeIcon></Button>
          {/* <Button cn="hover:shadow-lg hover:shadow-white">Settings</Button> */}
        </Div>
        {mob && (
          <Div cn="fixed inset-0 z-50 bg-black/30" onClick={() => handleMob(false)} >
            <Div cn="w-20 h-full bg-[#424874] border-1 grid" onClick={(e) => e.stopPropagation()}>
              <Button cn="hover:shadow-lg hover:shadow-white text-xs paci"
              onClick={() => {
                handleCurrentFolder();
                navigate("/notes");
                handleMob(false);
              }}>
                <FontAwesomeIcon icon={faFilePen} /> Notes
              </Button>
              <Button cn="hover:shadow-lg hover:shadow-white text-xs paci"
                onClick={() => {
                  navigate("/folders");
                  handleMob(false);
                }}>
                <FontAwesomeIcon icon={faFolder} /> Folders
              </Button>
            </Div>
          </Div>
        )}

        <Div cn='w-full border-1 border-teal-200 h-full'>
          <barContext.Provider value={{ myfunction: handleMob, isMobile : isMobile, myMobileFunction :  handleMobile}}>
            <Outlet />
          </barContext.Provider>
        </Div>
      </Div>
  </>
}

export {App};

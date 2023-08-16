import Navbar from "@/Component/Navbarbottom";
import "./AddPage.css";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import P_Card from "./P_Card";
import Button from "@mui/material/Button";
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import Spinner from "@/Component/spinner";

export default function Addpt() {

  const [isPageReady, setIsPageReady] = React.useState(false); // State for page readiness

    // Simulate some loading process (e.g., fetching data) and then set the page as ready
    React.useEffect(() => {
        // Simulate loading completion after 1 seconds
        setTimeout(() => {
            setIsPageReady(true);
        }, 1000);
    }, []);

  return (
    <div>
      {isPageReady ? (
        <div>
          <div className="IconWrapper">
            <PersonSearchRoundedIcon className="SearchIcon"/>
          </div>
      
      <div className="mb-[40px]">
        <div className="text-black font-extrabold text-[20px] flex mt-[20px] mb-[5px] pl-[10%]">
          Identification ID
        </div>
        <div className="flex flex-row mx-[10%]">
          <input
            className="flex w-full h-[40px] px-[10px] bg-[#f5f5f5] text-[15px] rounded-[5px] items-center"
            id="identificationid"
          ></input>
          <Button
            className="flex h-[40px] text-white items-center ml-[10px] px-[10px] rounded-[5px] bg-[#08a638]"
            variant="contained"
            color="success"
          >
            <SearchIcon />
          </Button>
        </div>
        <div className="text-black font-extrabold text-xl flex mt-5 mb-[5px] pl-[10%]">
          Name
        </div>
        <div className="flex flex-row mx-[10%]">
          <input
            className="flex w-full h-[40px] px-[10px] bg-[#f5f5f5] text-[15px] rounded-[5px] items-center"
            id="name"
          ></input>
          <Button
            className="flex h-[40px] text-white items-center ml-[10px] px-[10px] rounded-[5px] bg-[#08a638]"
            variant="contained"
            color="success"
          >
            <SearchIcon />
          </Button>
        </div>
      </div>
      <P_Card />
      <Navbar />
      </div>) : (
                <div className="spinner-container">
					<Spinner />
                </div>
            )}
    </div>
  );
}

import Navbar from "@/Component/Navbarbottom";
import "./Searchpage.css";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import P_Card from "./P_Card";
import Button from "@mui/material/Button";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import Spinner from "@/Component/spinner";
import { actionAsyncStorage } from "next/dist/client/components/action-async-storage";

export default function Searchpage() {
  const [isPageReady, setIsPageReady] = React.useState(false); // State for page readiness

  // Simulate some loading process (e.g., fetching data) and then set the page as ready
  React.useEffect(() => {
    // Simulate loading completion after 1 seconds
    setTimeout(() => {
      setIsPageReady(true);
    }, 300);
  }, []);

  return (
    <div>
      {isPageReady ? (
        <div>
          <div className="flex justify-center mt-[50px]">
            <PersonSearchRoundedIcon sx={{ fontSize: 40 }} />
          </div>

          <div className="mb-[40px]">
            <div className="text-black font-extrabold text-[20px] flex mt-[20px] mb-[5px] pl-[10%]">
              Identification ID
            </div>
            <div className="flex mx-[10%] relative">
              <input
                className="w-full h-[40px] pl-[15px] pr-[79px] bg-[#f5f5f5] text-[15px] rounded-[5px] items-center mr-[-64px]"
                id="identificationid"
                type="search"
              />
              <Button
                variant="contained"
                style={{ backgroundColor: "#BFDBFE" }}
                sx={{
                  height: "40px",
                  borderRadius: "5px",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  boxShadow: 0,
                }}
              >
                <SearchIcon style={{ color: "#2563EB" }} />
              </Button>
            </div>
            <div className="text-black font-extrabold text-[20px] flex mt-[20px] mb-[5px] pl-[10%]">
              Name
            </div>
            <div className="flex mx-[10%] relative">
              <input
                className="w-full h-[40px] pl-[15px] pr-[79px] bg-[#f5f5f5] text-[15px] rounded-[5px] items-center mr-[-64px]"
                id="name"
                type="search"
              />
              <Button
                variant="contained"
                style={{ backgroundColor: "#BFDBFE" }}
                sx={{
                  height: "40px",
                  borderRadius: "5px",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  boxShadow: 0,
                }}
              >
                <SearchIcon style={{ color: "#2563EB" }} />
              </Button>
            </div>
          </div>

          <P_Card />
          <Navbar />
        </div>
      ) : (
        <div className="spinner-container">
          <Spinner />
        </div>
      )}
    </div>
  );
}

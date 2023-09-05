import Navbar from "@/Component/Navbarbottom";
import "./Searchpage.css";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import P_Card from "./P_Card";
import Button from "@mui/material/Button";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import Spinner from "@/Component/spinner";
import { actionAsyncStorage } from "next/dist/client/components/action-async-storage";
import { useDebouncedState } from '@mantine/hooks';
import { TextInput, Text } from '@mantine/core';
import axios from "axios";

export default function Searchpage() {
  const [isPageReady, setIsPageReady] = React.useState(false); // State for page readiness
  const [valueID, setValueID] = useDebouncedState('', 1000, { leading: true });
  const [valueName, setValueName] = useDebouncedState('', 1000, { leading: true });
  const handleSearchID=()=>{
    const data ={
      identification_id : valueID
    }
    axios.post<any>('http://localhost:5001/api/patient/search',data,{
      headers:{
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log('API Response for ID:', response.data);
    })
    .catch((error) => {
      console.error('API Error for ID:', error);
    });
    
  }


  const handleSearchName=()=>{
    const data ={
      f_name : valueName
    }
    axios.post<any>('http://localhost:5001/api/patient/search',data,{
      headers:{
        'Content-Type': 'application/json',
      }
    }).then((response)=>{
      console.log('API Response for Name:', response.data);
    }).catch((error) => {
      console.error('API Error for Name:', error);
    });
  }

  React.useEffect(() => {
    // Simulate loading completion after 1 seconds
    setTimeout(() => {
      setIsPageReady(true);
    }, 300);
  }, []);

  // console.log(valueID);
  // console.log(valueName);
  
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
              {/* <input
                className="w-full h-[40px] pl-[10px] pr-[10px] bg-[#f5f5f5] text-[15px] rounded-[5px] items-center rounded-tr-none rounded-br-none outline-none"
                id="identificationid"
                type="search"

              /> */}
              <TextInput
                defaultValue={valueID}
                onChange={(event) => setValueID(event.currentTarget.value)}
                className="w-full h-[40px] pl-[10px] pr-[10px] bg-[#f5f5f5] text-[15px] rounded-[5px] items-center rounded-tr-none rounded-br-none outline-none"
                id="identificationid"
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
                onClick={handleSearchID}
              >
                <SearchIcon style={{ color: "#2563EB" }} />
              </Button>
            </div>
            <div className="text-black font-extrabold text-[20px] flex mt-[20px] mb-[5px] pl-[10%]">
              Name
            </div>
            <div className="flex mx-[10%] relative">
              {/* <input
                className="w-full h-[40px] pl-[10px] pr-[10px] bg-[#f5f5f5] text-[15px] rounded-[5px] items-center rounded-tr-none rounded-br-none outline-none"
                id="name"
                type="search"
              /> */}
              <TextInput
                defaultValue={valueName}
                onChange={(event) => setValueName(event.currentTarget.value)}
                className="w-full h-[40px] pl-[10px] pr-[10px] bg-[#f5f5f5] text-[15px] rounded-[5px] items-center rounded-tr-none rounded-br-none outline-none"
                id="identificationid"
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
                onClick={handleSearchName}
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

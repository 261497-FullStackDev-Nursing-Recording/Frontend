"use client";
import "./styles.css";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import { useDebouncedState } from "@mantine/hooks";
import axios from "axios";
import SearchPatient from "./SearchPatient";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Spinner from "../../component/spinner";
import Navbar from "../../component/Navbarbottom";
import PatientHistory from "../PatientHistory/page";
import { useQueryPatients } from "../../query/patient";
import { useParams } from "react-router-dom";

interface type {
  f_name: string;
  l_name: string;
  identification_id: string;
  id: string;
  status: string;
}

export default function Searchpage() {
  const [isPageReady, setIsPageReady] = React.useState(false); // State for page readiness
  const [valueID, setValueID] = useDebouncedState("", 500, { leading: true });
  const [valueName, setValueName] = useDebouncedState("", 500, {
    leading: true,
  });
  const [apiData, setApiData] = useState([]);

  const { data, isLoading, isError } = useQueryPatients({});

  if (isLoading) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data) {
    return null;
  }

  console.log(data);

  const handleSearchID = () => {
    // Filter the data based on the input value for identification_id
    const filteredData = data.filter((item: any) =>
      item.identification_id.includes(valueID)
    );
    const clonedData = filteredData.map((item: type) => ({ ...item }));
    apiData.length = 0;
    setApiData(clonedData);
  };

  const handleSearchName = () => {
    // Filter the data based on the input value for f_name or l_name
    const filteredData = data.filter(
      (item: any) =>
        item.f_name.toLowerCase().includes(valueName.toLowerCase()) ||
        item.l_name.toLowerCase().includes(valueName.toLowerCase())
    );
    const clonedData = filteredData.map((item: type) => ({ ...item }));
    apiData.length = 0;
    setApiData(clonedData);
  };

  return (
    <div>
      <div>
        <div className="flex justify-center mt-[50px]">
          <PersonSearchRoundedIcon sx={{ fontSize: 40 }} />
        </div>

        <div className="mb-[40px]">
          <div className="text-black font-extrabold text-[20px] flex mt-[20px] mb-[5px] pl-[10%]">
            Citizen ID
          </div>
          <div className="flex mx-[10%] relative">
            <input
              className="w-full h-[40px] pl-[10px] pr-[10px] bg-[#f5f5f5] text-[15px] rounded-[5px] items-center rounded-tr-none rounded-br-none outline-none"
              id="identificationid"
              type="search"
              onChange={(event) => setValueID(event.currentTarget.value)}
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
            <input
              className="w-full h-[40px] pl-[10px] pr-[10px] bg-[#f5f5f5] text-[15px] rounded-[5px] items-center rounded-tr-none rounded-br-none outline-none"
              id="name"
              type="search"
              onChange={(event) => setValueName(event.currentTarget.value)}
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
        <SearchPatient apiData={apiData} />
        <div style={{ marginBottom: "80px" }} />
        <Navbar />
      </div>
    </div>
  );
}

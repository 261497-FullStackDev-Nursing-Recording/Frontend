"use client";
import "./styles.css";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import { useDebouncedState, useSetState } from "@mantine/hooks";
import Spinner from "../../component/spinner";
import Navbar from "../../component/Navbarbottom";
import { useQueryPatients, useQuerySearchPatients } from "../../query/patient";
import { Patient, SearchPatient } from "../../types/patient";
import PatientCard from "./SearchPatient";
import Backbtn from "../../component/backBtn";
export default function Searchpage() {
  // const [valueID, setValueID] = useDebouncedState("", 500, { leading: true });
  // const [valueName, setValueName] = useDebouncedState("", 500, {
  //   leading: true,
  // });

  const [apiData, setApiData] = useState<Patient[]>([]);

  const [searchAN, setSearchAN] = useDebouncedState("", 500, { leading: true });
  const [searchBed, setSerachBed] = useDebouncedState("", 500, {
    leading: true,
  });
  const [searchName, setSearchName] = useDebouncedState("", 500, {
    leading: true,
  });
  const [params, setParams] = useState({});

  const { data, isLoading, isError, error, refetch } = useQuerySearchPatients({
    
  });

  if (isLoading) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center text-center min-h-screen">
        {(error as Error).message}
      </div>
    );
  }

  if (!data) {
    return undefined;
  }

  const handleSearchAN = () => {
    if (searchAN.trim() === "") {
      apiData.length = 0;
      setApiData([]);
      return;
    }
    setParams({ an: searchAN, bed_number: "", name: "" });
    refetch();
    setParams({ an: searchAN, bed_number: "", name: "" });
    console.log(data);
    setApiData([]);
    setApiData(data);
  };

  const handleSearchBed = () => {
    if (searchBed.trim() === "") {
      apiData.length = 0;
      setApiData([]);
      return;
    }
    setParams({ an: "", bed_number: searchBed, name: "" });
    refetch();
    setParams({ an: "", bed_number: searchBed, name: "" });
    console.log(data);
    setApiData([]);
    setApiData(data);
  };

  const handleSearchName = () => {
    if (searchName.trim() === "") {
      apiData.length = 0;
      setApiData([]);
      return;
    }
    setParams({ an: "", bed_number: "", name: searchName });
    refetch();
    console.log(data);
    setApiData([]);
    setApiData(data);
  };

  return (

    <div className="mx-auto">
      <Backbtn/>
      <div className="flex justify-center mt-[50px]">
        <PersonSearchRoundedIcon sx={{ fontSize: 40 }} />
      </div>
      <div className="mb-[40px] max-w-[640px] mx-auto">
        <div className="text-black font-extrabold text-[20px] flex mt-[20px] mb-[5px] pl-[10%]">
          AN
        </div>
        <div className="flex mx-[10%] relative">
          <input
            className="w-full h-[40px] pl-[10px] pr-[10px] bg-[#f5f5f5] text-[15px] rounded-[5px] items-center rounded-tr-none rounded-br-none outline-none"
            id="AN"
            type="search"
            placeholder="Admission No."
            onChange={(event) => setSearchAN(event.currentTarget.value)}
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
            onClick={handleSearchAN}
          >
            <SearchIcon style={{ color: "#2563EB" }} />
          </Button>
        </div>

        <div className="text-black font-extrabold text-[20px] flex mt-[20px] mb-[5px] pl-[10%]">
          BED No.
        </div>
        <div className="flex mx-[10%] relative">
          <input
            className="w-full h-[40px] pl-[10px] pr-[10px] bg-[#f5f5f5] text-[15px] rounded-[5px] items-center rounded-tr-none rounded-br-none outline-none"
            id="Bed"
            type="search"
            placeholder="Bed No."
            onChange={(event) => setSerachBed(event.currentTarget.value)}
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
            onClick={handleSearchBed}
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
            placeholder="Name"
            onChange={(event) => setSearchName(event.currentTarget.value)}
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
      <PatientCard apiData={apiData} />
      <div style={{ marginBottom: "80px" }} />
      <Navbar />
    </div>
  );
}

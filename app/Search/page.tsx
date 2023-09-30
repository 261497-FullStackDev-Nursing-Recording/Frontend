"use client";
import "./styles.css";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import { useDebouncedState } from "@mantine/hooks";
import Spinner from "../../component/spinner";
import Navbar from "../../component/Navbarbottom";
import { useQueryPatients } from "../../query/patient";
import { Patient } from "../../types/patient";
import SearchPatient from "./SearchPatient";

export default function Searchpage() {
  const [valueID, setValueID] = useDebouncedState("", 500, { leading: true });
  const [valueName, setValueName] = useDebouncedState("", 500, {
    leading: true,
  });

  const [apiData, setApiData] = useState<Patient[]>([]);

  const { data, isLoading, isError, error } = useQueryPatients({});

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

  const handleSearchID = () => {
    // Trim and check if the input is empty
    if (valueID.trim() === "") {
      apiData.length = 0;
      setApiData([]);
      return; // Exit the function early if the input is empty
    }
    const searchPattern = new RegExp(valueID.trim(), "i");
    // Filter the data based on the input value for identification_id
    setApiData([]);
    setApiData(
      data.filter((item: Patient) => searchPattern.test(item.identification_id))
    );
  };

  const handleSearchName = () => {
    // Trim and check if the input is empty
    if (valueName.trim() === "") {
      apiData.length = 0;
      setApiData([]);
      return; // Exit the function early if the input is empty
    }
    // Create a regular expression pattern from the search value
    const searchPattern = new RegExp(valueName.trim(), "i");
    // Filter the data based on the input value for f_name and l_name
    setApiData(
      data.filter((item: any) => {
        const fullName = `${item.f_name} ${item.l_name}`;
        return (
          searchPattern.test(item.f_name) ||
          searchPattern.test(item.l_name) ||
          searchPattern.test(fullName)
        );
      })
    );
  };

  return (
    <div className="max-w-[80%] mx-auto">
      <div className="flex justify-center mt-[50px]">
        <PersonSearchRoundedIcon sx={{ fontSize: 40 }} />
      </div>
      <div className="mb-[40px]">
        <div className="text-black font-extrabold text-[20px] flex mt-[20px] mb-[5px] pl-[10%]">
          AN
        </div>
        <div className="flex mx-[10%] relative">
          <input
            className="w-full h-[40px] pl-[10px] pr-[10px] bg-[#f5f5f5] text-[15px] rounded-[5px] items-center rounded-tr-none rounded-br-none outline-none"
            id="identificationid"
            type="search"
            placeholder="ID"
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
          BED No.
        </div>
        <div className="flex mx-[10%] relative">
          <input
            className="w-full h-[40px] pl-[10px] pr-[10px] bg-[#f5f5f5] text-[15px] rounded-[5px] items-center rounded-tr-none rounded-br-none outline-none"
            id="identificationid"
            type="search"
            placeholder="ID"
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
            placeholder="Name"
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
  );
}

"use client";
import { useState, useEffect } from "react";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import "./styles.css";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Navbar from "../../component/Navbarbottom";
import Spinner from "../../component/spinner";
import { useQueryLinkedPatients } from "../../query/patient";
import PatientCard from "./PatientCard";
import { Patient } from "../../types/patient";
import { useCurrentNurseLogin } from "../../query/nurse";
import Backbtn from "../../component/backBtn";

export default function Mypatient() {
  const nurse = useCurrentNurseLogin();
  const [myPatientIDs, setMyPatientIDs] = useState([]);
  const [apiData, setApiData] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const nurse_id: any = nurse?.data?.id;

  const lp = useQueryLinkedPatients(nurse_id);

  useEffect(() => {
    if (!lp.data) {
      return;
    }
    const searchPattern = new RegExp(searchQuery.trim(), "i");
    const searchedPatients = lp.data.filter(
      (patient) =>
        searchPattern.test(patient.f_name) ||
        searchPattern.test(patient.l_name) ||
        searchPattern.test(`${patient.f_name} ${patient.l_name}`) ||
        searchPattern.test(patient.an) ||
        searchPattern.test(patient.current_bed_number)
    );
    setApiData(searchedPatients);
  }, [lp.data, searchQuery]);

  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  if (nurse.isLoading || lp.isLoading) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }

  if (nurse.isError || lp.isError) {
    return (
      <div className="flex justify-center items-center text-center min-h-screen">
        {(nurse.error as Error)?.message || (lp.error as Error)?.message}
      </div>
    );
  }

  return (
    <div>
      <Backbtn />
      <div className=" mx-auto">
        <div className="flex justify-center mt-[40px] mb-[10px] text-xl">
          <LocalHospitalRoundedIcon sx={{ fontSize: 40 }} />
        </div>
        <h1 className="flex justify-center mb-[20px] text-black font-extrabold text-[25px]">
          My Patient
        </h1>
        <div className="mx-auto max-w-[640px]">
          <div className="flex mx-[10%] mb-[20px] relative">
            <input
              className="w-full h-[40px] pl-[35px] pr-[10px] bg-[#f5f5f5] text-[15px] rounded-[5px] items-center mr-[-64px] outline-none"
              id="identificationid"
              type="search"
              placeholder="Name / AN / Bed No."
              value={searchQuery}
              onChange={handleInputChange}
            />
            <SearchIcon
              className="absolute"
              style={{ color: "#000000" }}
              sx={{ top: 8, left: 7 }}
            />
          </div>
          <div className="flex justify-between px-[10%] mb-[20px]">
            <p className="py-[3px] text-[17px]">Total: {lp.data?.length}</p>
            <Button
              variant="outlined"
              size="small"
              color="error"
              sx={{ marginLeft: "10px" }}
            >
              Clear All
            </Button>
          </div>
        </div>
        <div className="mb-[70px]">
          <PatientCard apiData={apiData} />
        </div>
        <Navbar />
      </div>
    </div>
    //  <div>
    //    <App/>
    // </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import "./styles.css";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Navbar from "../../component/Navbarbottom";
import Spinner from "../../component/spinner";
import {
  useQueryLinkedPatients,
  useQueryPatientsByIds,
} from "../../query/patient";
import PatientCard from "./PatientCard";
import { Patient } from "../../types/patient";
import { useCurrentNurseLogin } from "../../query/nurse";
import { number } from "zod";
import Backbtn from "../../component/backBtn";

export default function Mypatient() {
  const nurse_id: any = useCurrentNurseLogin()?.id;
  const [myPatientIDs, setMyPatientIDs] = useState([]);
  const [apiData, setApiData] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: LP_data,
    isLoading: LP_isLoading,
    isError: LP_isError,
    error: LP_error,
  } = useQueryLinkedPatients(nurse_id);

  const {
    data: PBID_data,
    isLoading: PBID_isLoading,
    isError: PBID_isError,
    error: PBID_error,
    refetch,
  } = useQueryPatientsByIds({
    ids: LP_data ? LP_data.map((link) => link.patient_id) : [],
  });

  useEffect(() => {
    if (LP_isLoading || PBID_isLoading) {
      return;
    }

    if (LP_isError) {
      console.error((LP_error as Error).message);
      return;
    }

    if (PBID_isError) {
      console.error((PBID_error as Error).message);
      return;
    }

    const nursePatientIds = LP_data
      ? LP_data.map((link) => link.patient_id)
      : [];
    const filteredPatients =
      PBID_data?.filter((patient) => nursePatientIds.includes(patient.id)) ||
      [];

    // Filter patients based on search query
    const searchPattern = new RegExp(searchQuery.trim(), "i");
    const searchedPatients = filteredPatients.filter(
      (patient) =>
        searchPattern.test(patient.f_name) ||
        searchPattern.test(patient.l_name) ||
        searchPattern.test(`${patient.f_name} ${patient.l_name}`) ||
        searchPattern.test(patient.identification_id)
    );
    setApiData(searchedPatients);
  }, [
    LP_isLoading,
    PBID_isLoading,
    LP_isError,
    PBID_isError,
    LP_data,
    PBID_data,
    searchQuery,
  ]);

  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

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
              placeholder="Search by Name or ID"
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
            <p className="py-[3px] text-[17px]">Total: {LP_data?.length}</p>
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

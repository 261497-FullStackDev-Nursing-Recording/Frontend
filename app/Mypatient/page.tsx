"use client";
import { useState, useEffect } from "react";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import "./styles.css";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Navbar from "../../component/Navbarbottom";
import Spinner from "../../component/spinner";
import { useQueryPatients, useQueryLinkedPatients } from "../../query/patient";
import { useCurrentNurseLogin } from "../../query/nurse";
import PatientCard from "./PatientCard";
import { PatientType } from "../../types/patient";

export default function Mypatient() {
  const nurse_id: string = "201bcea3-043e-4ace-8be1-142e2a7388e1";

  const {
    data: linkedPatientsData,
    isLoading: isLinkedPatientsLoading,
    isError: isLinkedPatientsError,
    error: linkedPatientsError,
  } = useQueryLinkedPatients(nurse_id);

  const {
    data: allPatientsData,
    isLoading: isAllPatientsLoading,
    isError: isAllPatientsError,
    error: allPatientsError,
  } = useQueryPatients({});

  const [apiData, setApiData] = useState<PatientType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isLinkedPatientsLoading || isAllPatientsLoading) {
      // Loading state, you can show a loading spinner or message here
      return;
    }

    if (isLinkedPatientsError || isAllPatientsError) {
      // Error state, handle the error here
      console.error(
        isLinkedPatientsError ? linkedPatientsError : allPatientsError
      );
      return;
    }

    if (linkedPatientsData && allPatientsData) {
      // Filter and map the patient data to match the patient IDs associated with the nurse's user ID
      const nursePatientIds = linkedPatientsData.map((link) => link.patient_id);
      const nursePatients = allPatientsData.filter((patient) =>
        nursePatientIds.includes(patient.id)
      );
      const searchPattern = new RegExp(searchQuery.trim(), "i");
      const filteredPatients = nursePatients.filter(
        (patient) =>
          searchPattern.test(patient.f_name) ||
          searchPattern.test(patient.l_name) ||
          searchPattern.test(`${patient.f_name} ${patient.l_name}`) ||
          searchPattern.test(patient.identification_id)
      );
      setApiData(filteredPatients);
    }
  }, [
    linkedPatientsData,
    isLinkedPatientsLoading,
    isLinkedPatientsError,
    allPatientsData,
    isAllPatientsLoading,
    isAllPatientsError,
    linkedPatientsError,
    allPatientsError,
    searchQuery,
  ]);

  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      {isLinkedPatientsError || isAllPatientsError ? (
        <div className="flex justify-center items-center text-center min-h-screen">
          <p className="text-red-500">Error</p>
        </div>
      ) : isLinkedPatientsLoading || isAllPatientsLoading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <div>
          <div>
            <div className="flex justify-center mt-[40px] mb-[20px] text-xl">
              <LocalHospitalRoundedIcon
                sx={{ fontSize: 40 }}
              ></LocalHospitalRoundedIcon>
            </div>
            <h1 className="flex justify-center mb-[20px] text-black font-extrabold text-3xl">
              My Patients
            </h1>
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
              <p className="py-[3px] text-[17px]">
                Total: {linkedPatientsData.length}
              </p>
              <Button
                variant="outlined"
                size="small"
                color="error"
                sx={{ marginLeft: "10px" }}
              >
                Clear All
              </Button>
              <Button variant="outlined" size="small">
                Select
              </Button>
            </div>
            {/* <div className="flex justify-between px-[10%] mb-[20px]">
              <p className="py-[3px] text-[17px]">0 Selected</p>
              <div>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ marginLeft: "1px" }}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ marginLeft: "1px" }}
                >
                  Done
                </Button>
              </div>
            </div> */}

            <div>
              <PatientCard apiData={apiData} />
            </div>
            <Navbar />
            {/**/}
          </div>
        </div>
      )}
    </div>
  );
}

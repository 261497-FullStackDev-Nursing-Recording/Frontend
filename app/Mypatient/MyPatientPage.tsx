"use client";
import Navbar from "@/Component/Navbarbottom";
import P_Card from "./P_Card";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import "./MyPatientPage.css";
import { useState, useEffect } from "react";
import Spinner from "@/Component/spinner";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

export default function Mypatient() {
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
            />
            <SearchIcon
              className="absolute"
              style={{ color: "#000000" }}
              sx={{ top: 8, left: 7 }}
            />
          </div>
          {/* <div className="flex justify-center px-[10%] mb-[20px]">
            <Button variant="outlined" size="small">
              Select
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              sx={{ marginLeft: "10px" }}
            >
              Delete All
            </Button>
          </div> */}
          <div className="flex justify-between px-[10%] mb-[20px]">
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
          </div>

          <div>
            <P_Card />
            <P_Card />
            <P_Card />
            <P_Card />
            <P_Card />
          </div>
          <Navbar />
          {/**/}
        </div>
      ) : (
        <div className="spinner-container">
          <Spinner />
        </div>
      )}
    </div>
  );
}

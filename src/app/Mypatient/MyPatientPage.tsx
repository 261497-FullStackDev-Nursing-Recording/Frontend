"use client";
import Navbar from "@/Component/Navbarbottom";
import P_Card from "./P_Card";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import "./MyPatientPage.css";
import { useState, useEffect } from "react";
import Spinner from "@/Component/spinner";
import React from "react";

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
          <div className="container">
            <P_Card />
            <P_Card />
            <P_Card />
            <P_Card />
            <P_Card />
          </div>
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

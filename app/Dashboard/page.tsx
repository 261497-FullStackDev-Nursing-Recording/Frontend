"use client";
import "./styles.css";
import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import StatusCount from "../../component/Dashboard/GetStatusCount";
import NurseCount from "../../component/Dashboard/NurseCount";
import PatientCount from "../../component/Dashboard/PatientCount";
import Spinner from "../../component/spinner";
import Navbar from "../../component/Navbarbottom";
import PatientNurseRatio from "../../utils/patientRatio";
import Backbtn from "../../component/backBtn";
import { useRouter } from "next/navigation";
import useAuth from "../../services/useAuth";

export default function Dashboard(): JSX.Element {
  const queryClient = new QueryClient()

  //Check User's authen 
  const { user, getAuth, isLoading } = useAuth();
  useEffect(() => {
  getAuth();
}, []);

  return (
    
    <QueryClientProvider client={queryClient}>
      <Backbtn/>
      <div className="dashboard-container">
        
          <div className="centered-content">
            <HomeRoundedIcon sx={{ fontSize: 40 }} />
            <div className="chart-wrapper">
              <StatusCount />
            </div>
            <span className="NperP">
               1 : <PatientNurseRatio />
            </span>
            <div className="NperPtext">จำนวนพยาบาลต่อผู้ป่วย</div>
            <div className="countbox">
              <div className="nursecount">
                จำนวนพยาบาล
                <div className="nursetext">
                  <NurseCount />
                </div>
              </div>
              <div className="pateintcount">
                จำนวนผู้ป่วย
                <div className="patienttext">
                  <PatientCount />
                </div>
              </div>
            </div>
          </div>
        <Navbar />
      </div>
    </QueryClientProvider>
  );
}

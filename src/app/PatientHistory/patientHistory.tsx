"use client";
import Navbar from "@/Component/Navbarbottom";
import "./MyPatientPage.css";
import Carddata from "../InsideMypatient/Carddata";
import * as React from "react";
import Spinner from "@/Component/spinner";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

interface Patient {
  id: string,
  f_name: string,
  l_name: string,
  hn: string,
  identification_id: string,
  status: string,
  created_at: string,
}

interface Record {
  id: string,
  user_id: string,
  patient_id: string,
  bed_number: string,
  ward: string,
  diseaseGroup: string,
  shift: string,
  visit_number: string,
  created_at: string,
  modified_at: string,
}

function apiRequest(url: string, payload: object, callback: (response: any) => void) {
  axios
  .post<any>(url, payload, {
    headers: {
      "Content-Type": "application/json"
    },
  })
  .then(callback)
  .catch((error) => {
    console.error("API Error for ID:", error);
  })
}

export default function PatientHistory() {
  const [isPageReady, setIsPageReady] = React.useState(false);
  const { identification_id } = useParams<{ identification_id: string }>();
  const [patientData, setPatientData] = useState<Patient | undefined>();
  const [recordData, setRecordData] = useState<Record[]>([]);
  const records = recordData.map(record => {
    return <div className="Name">
      {record.visit_number}
    </div>
  })

  React.useEffect(() => {
    apiRequest('http://localhost:5001/api/patient/search', {
      id: identification_id
    }, response => setPatientData(response.data[0]));
    apiRequest('http://localhost:5001/api/records/search', {
      patient_id: identification_id
    }, response => setRecordData(response.data));
  }, [isPageReady])

  React.useEffect(() => {
    setIsPageReady(true);
  });

  return (
    <div>
      {isPageReady ? (
        <div className="Container">
          <div>
            <LocalHospitalRoundedIcon className="Icon" />
          </div>
          <div className="Name">Name: {patientData?.f_name} {patientData?.l_name}</div>
          <div className="containercard">{records}</div>
          <div className="card"></div>
        </div>
      ) : (
        <div className="spinner-container">
          <Spinner />
        </div>
      )}
      <Navbar />
    </div>
  );
}
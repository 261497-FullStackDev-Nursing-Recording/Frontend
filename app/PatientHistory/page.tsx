"use client";
import "./styles.css";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useState,useEffect } from "react";
import Navbar from "../../component/Navbarbottom";
import { useSearchParams } from "next/navigation";
import Backbtn from "../../component/backBtn";
import Link from "next/link";
import useAuth from "../../services/useAuth";

const {user,getAuth, isLoading} = useAuth();
useEffect(() => {
  getAuth();
}, []);


interface Patient {
  id: string;
  f_name: string;
  l_name: string;
  hn: string;
  identification_id: string;
  status: string;
  created_at: string;
}

interface Record {
  id: string;
  user_id: string;
  patient_id: string;
  bed_number: number;
  ward: string;
  disease_group: string;
  shift: string;
  visit_number: string;
  created_at: string;
  modified_at: string;
  fields: string;
}

function apiRequest(
  url: string,
  payload: object,
  callback: (response: any) => void
) {
  axios
    .post<any>(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(callback)
    .catch((error) => {
      console.error("API Error for ID:", error);
    });
}

export default function PatientHistory() {
  const { identification_id } = useParams<{ identification_id: string }>();
  const searchParams = useSearchParams();
  const PatientHistory = searchParams.get("id");
  console.log(PatientHistory);

  // const { PatientHistory } = router.;
  // const param = useParams();
  // console.log(param);

  // const PatientHistory = 5;
  // const Patient_id = query.PatientHistory;
  // console.log(router);

  const [patientData, setPatientData] = useState<Patient | undefined>();
  const [recordData, setRecordData] = useState<Record[]>([]);
  const records = recordData.map((record, index) => (
    <Link 
      href={{
        pathname: `/RecordData`,
        query: { id:PatientHistory },
      }}
      key={`${record.id}-${index}`} // Use a combination of id and index for uniqueness
    >
      <div className="box">
        กลุ่มโรค: {record.disease_group}
        <div />
        เตียงที่: {record.bed_number}
        <div />
        กลุ่มโรค: {record.visit_number}
        <div />
        สร้างเมื่อ: {record.created_at}
      </div>
    </Link>
  ));
  
  

  React.useEffect(() => {
    apiRequest(
      "http://localhost:5001/api/patient/getAllPatient",
      {
        id: PatientHistory,
      },
      (response) => setPatientData(response.data[0])
    );
    apiRequest(
      "http://localhost:5001/api/records/getAllRecord",
      {
        patient_id: PatientHistory,
        includeFields: true,
      },
      (response) => setRecordData(response.data)
    );
  }, []);
  console.log(recordData);
  return (
    <div>
       <Backbtn/>
      <div className="Container">
        <div>
          <LocalHospitalRoundedIcon className="Icon" />
        </div>
        <div className="Name">
          Name: {patientData?.f_name} {patientData?.l_name}
        </div>
        <div className="ID">
          Citizen ID:
          <div /> {patientData?.identification_id}
        </div>
        {recordData.length > 0 ? (
          <div className="containercard">{records}</div>
        ) : (
          <div className="NoRecord">ยังไม่มีบันทึกการพยาบาล</div>
        )}
        <div className="card"></div>
      </div>
      <Navbar />
    </div>
  );
}

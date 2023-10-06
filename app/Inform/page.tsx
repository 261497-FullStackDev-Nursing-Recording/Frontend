"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Tabs } from "@mantine/core";
import Backbtn from "../../component/backBtn";
import NDXForm from "../../component/Form/ndxForm";
import SForm from "../../component/Form/sForm";
import OForm from "../../component/Form/oForm";
import IForm from "../../component/Form/iForm";
import EForm from "../../component/Form/eForm";
import Navbar from "../../component/Navbarbottom";
import "./styles.css";

interface Patient {
  id: string;
  f_name: string;
  l_name: string;
  hn: string;
  identification_id: string;
  status: string;
  created_at: string;
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

export default function Inform() {
  const [patientData, setPatientData] = useState<Patient | undefined>();
  const searchParams = useSearchParams();
  const PatientHistory = searchParams.get("id");
  // console.log(PatientHistory);

  useEffect(() => {
    apiRequest(
      "http://localhost:5001/api/patient/getAllPatient",
      {
        id: PatientHistory,
      },
      (response) => setPatientData(response.data[0])
    );
  }, [PatientHistory]);

  return (
    <div className="inform-container">
      <Backbtn />
      <div className="patientheaddata">
        <div className="Name">{patientData?.f_name} {patientData?.l_name}</div>
        <div className="ID">{patientData?.identification_id}</div>
      </div>
      <Tabs defaultValue="first" variant="pills">
        <Tabs.List
          style={{ display: "flex", justifyContent: "space-between" }}
          className="tabs"
        >
          <Tabs.Tab value="first" color="teal">
            NDX Field
          </Tabs.Tab>
          <Tabs.Tab value="second" color="pink">
            S Field
          </Tabs.Tab>
          <Tabs.Tab value="third">O Field</Tabs.Tab>
          <Tabs.Tab value="fourth" color="grape">
            I Field
          </Tabs.Tab>
          <Tabs.Tab value="fifth" color="lime">
            E Field
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="first" pt="xs">
          <NDXForm />
        </Tabs.Panel>

        <Tabs.Panel value="second" pt="xs">
          <SForm />
        </Tabs.Panel>

        <Tabs.Panel value="third" pt="xs">
          <OForm />
        </Tabs.Panel>

        <Tabs.Panel value="fourth" pt="xs">
          <IForm />
        </Tabs.Panel>

        <Tabs.Panel value="fifth" pt="xs">
          <EForm />
        </Tabs.Panel>
      </Tabs>

      <Navbar />
    </div>
  );
}

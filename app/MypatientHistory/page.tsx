"use client";
import "./styles.css";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import Navbar from "../../component/Navbarbottom";
import { useSearchParams } from "next/navigation";
import Button from "@mui/material/Button";
// import { useRouter } from "next/router";
import Link from "next/link";
import Backbtn from "../../component/backBtn";

export type Patient = {
	id: string;
	f_name: string;
	l_name: string;
	hn: string;
	identification_id: string;
	status: string;
	created_at: string;
};

export type Record = {
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
};

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
	// console.log(PatientHistory);

	const [patientData, setPatientData] = useState<Patient | undefined>();
	const [recordData, setRecordData] = useState<Record[]>([]);
	const records = recordData.map((record, index) => {
		return (
			<Link
				href={{
					pathname: `/RecordData`,
					query: { id: PatientHistory },
				}}
				key={`${record.id}-${index}`} // Use a combination of id and index for uniqueness
			>
				<div className="box" key={record.id}>
					กลุ่มโรค: {record.disease_group}
					<div />
					เตียงที่: {record.bed_number}
					<div />
					กลุ่มโรค: {record.visit_number}
					<div />
					สร้างเมื่อ: {record.created_at}
				</div>
			</Link>
		);
	});

	React.useEffect(() => {
		apiRequest(
			"/api/api/patient/getAllPatient",
			{
				id: PatientHistory,
			},
			(response) => setPatientData(response.data[0])
		);
		apiRequest(
			"/api/api/records/getAllRecord",
			{
				patient_id: PatientHistory,
				includeFields: true,
			},
			(response) => setRecordData(response.data)
		);
	}, []);

	return (
		<div>
			<Backbtn />
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
				<div className="Btn">
					<Link
						href={{
							pathname: `/Inform`,
							query: { id: PatientHistory },
						}}
					>
						<div className="addbutton">เพิ่มการบันทึกทางพยาบาล</div>
					</Link>
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

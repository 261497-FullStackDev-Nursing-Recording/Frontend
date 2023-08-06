"use client";
import Navbar from "@/Component/Navbarbottom";
import "./MyPatientPage.css";
import { Card, Text } from '@mantine/core';
import Carddata from "../InsideMypatient/Carddata"

export default function Mypatient() {
	return (
		<div>
				<div className="patientheaddata">
					<div>Name</div>
					<div className="Name">
						Name
					</div>
					
					<div>ID</div>
					<div className="ID">
						ID
					</div>
				</div>
				<div className="containercard">
				
				<Carddata/>
				</div>	
				<div className="card">

				</div>
			<Navbar />
		</div>
	);
}

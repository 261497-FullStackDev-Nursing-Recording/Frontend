import React, { useState, useEffect } from "react";
import Chart from "../../Component/DonughnutChart";
import "./DashboardPage.css";
import Navbar from "../../Component/Navbarbottom";
import NurseCount from "./DataNurse";
import PatientCount from "./DataPatient";
import Spinner from "@/Component/spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PatientNurseRatio from "./DataPatientNurseRatio";
import StatusCount from "./GetStatusCount";

export default function Dashboard(): JSX.Element {
	const queryClient = new QueryClient();
	const [isPageReady, setIsPageReady] = useState(false); // State for page readiness


	// Simulate some loading process (e.g., fetching data) and then set the page as ready
	useEffect(() => {
		// Simulate loading completion after 2 seconds
		setTimeout(() => {
			setIsPageReady(true);
		}, 300);
	}, []);
	return (
		<QueryClientProvider client={queryClient}>
			
			<div className="dashboard-container">
				{isPageReady ? ( // Conditionally render based on page readiness
					<div className="centered-content">
						<HomeRoundedIcon className="IconHome"/>
						<div className="chart-wrapper">
							{/* <Chart /> */}
							<StatusCount/>
						</div>
						<span className="NperP">1 : <PatientNurseRatio /></span>
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
				) : (
					<div className="spinner-container">
						<Spinner />
					</div>
				)}
				<Navbar />
			</div>
		</QueryClientProvider>
	);
}

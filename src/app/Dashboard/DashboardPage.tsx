import React, { useState, useEffect } from "react";
import Chart from "../../Component/DonughnutChart";
import "./DashboardPage.css";
import Navbar from "../../Component/Navbarbottom";
import NurseCount from "./DataNurse";
import PatientCount from "./DataPatient";
import Spinner from "@/Component/spinner";

export default function Dashboard(): JSX.Element {
    const [isPageReady, setIsPageReady] = useState(false); // State for page readiness

    // Simulate some loading process (e.g., fetching data) and then set the page as ready
    useEffect(() => {
        // Simulate loading completion after 2 seconds
        setTimeout(() => {
            setIsPageReady(true);
        }, 1000);
    }, []);
    return (
        <div className="dashboard-container">
            {isPageReady ? ( // Conditionally render based on page readiness
            <div className="centered-content">
                <div className="svgcontainer">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                                stroke="#1C274C"
                                strokeWidth="1.5"
                            ></path>{" "}
                            <path
                                d="M12 15L12 18"
                                stroke="#1C274C"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            ></path>{" "}
                        </g>
                    </svg>
                </div>
                <div className="chart-wrapper">
                    <Chart />
                </div>
                <div className="NperP">1 :</div>
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
    );
}

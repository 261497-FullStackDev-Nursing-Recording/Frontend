"use client";
import Navbar from "@/Component/Navbarbottom";
import "./MyPatientPage.css";
import Carddata from "../InsideMypatient/Carddata";
import * as React from 'react';
import Spinner from "@/Component/spinner";
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import { Button } from "@mantine/core";


export default function PatientHistory() {
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
            {isPageReady ? ( // Conditionally render based on page readiness
                <div className="Container">
                    <div>
                        <LocalHospitalRoundedIcon className="Icon" />
                    </div>
                    <div className="Name">Name</div>
                    <div className="ID">ID</div>
                    <div className="containercard">
                        <Carddata />
                    </div>
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

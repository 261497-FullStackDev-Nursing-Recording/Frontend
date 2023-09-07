"use client";
import Navbar from "@/Component/Navbarbottom";
import "./MyPatientPage.css";
import Carddata from "../InsideMypatient/Carddata";
import * as React from 'react';
import Spinner from "@/Component/spinner";
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
// import { useParams } from "react-router-dom";


export default function PatientHistory() {
    const [isPageReady, setIsPageReady] = React.useState(false);
    // const { identificationId } = useParams<{ identificationId: string }>();

    React.useEffect(() => {
        setTimeout(() => {
            setIsPageReady(true);
        }, 300);
    }, []);

    

    return (
        <div>
            {isPageReady ? (
                <div className="Container">
                    <div>
                        <LocalHospitalRoundedIcon className="Icon" />
                    </div>
                    <div className="Name">Name</div>
                    <div className="ID">identificationId</div>
                    <div className="containercard">
                        
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

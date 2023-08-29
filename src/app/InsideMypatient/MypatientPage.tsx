"use client";
import Navbar from "@/Component/Navbarbottom";
import "./MyPatientPage.css";
import Carddata from "../InsideMypatient/Carddata";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Spinner from "@/Component/spinner";
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';

export default function Mypatient() {
    const [isPageReady, setIsPageReady] = React.useState(false); // State for page readiness

    // Simulate some loading process (e.g., fetching data) and then set the page as ready
    React.useEffect(() => {
        // Simulate loading completion after 1 seconds
        setTimeout(() => {
            setIsPageReady(true);
        }, 1000);
    }, []);

    return (
        <div>
            {isPageReady ? ( // Conditionally render based on page readiness
                <div className="Container">
                    <div>
                        <LocalHospitalRoundedIcon className="Icon"/>
                    </div>
                    <div className="Name">Name</div>
                    <div className="ID">ID</div>
                    <div className="buttoncontainer">
                            <Button
                                className="flex h-[40px] text-black items-center ml-[10px] px-[100px] rounded-[5px] bg-[#A2FF86]"
                                variant="contained"
                                color="success"
                                style={{ fontWeight: 'bold' }}
                                startIcon={<AddIcon />}
                            >
                                ADD
                            </Button>

                    </div>
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

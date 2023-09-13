"use client";
import "./MyPatientPage.css";
import Carddata from "./Carddata";
import * as React from "react";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import { Button } from "@mantine/core";
import Spinner from "../../component/spinner";
import Navbar from "../../component/Navbarbottom";

export default function Mypatient() {
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
          <div className="buttoncontainer">
            <Button
              variant="outline"
              color="green"
              onClick={() => console.log("Add Patient")}
              style={{ fontWeight: "bold" }}
            >
              Add Record
            </Button>
            {/* <ActionIcon color="green" size="xl" >
                            <IconAdjustments size="2.125rem" />
                        </ActionIcon> */}
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

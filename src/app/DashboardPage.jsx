import Chart from "../Component/DonughnutChart";
import { AiOutlineHome } from "react-icons/Ai";
import "./DashboardPage.css";
import Navbar from "../Component/Navbarbottom";
import Navbar2 from "../Component/Navbarbottom2";

export default function Dashboard(){

    // const nurseperpatient = patient/nurse;
    // let patient;
    // let nurse;
    return(
        <div className="dashboard-container">
            <div className="centered-content">
                <AiOutlineHome className="HomeLogo"/>
                    <div className="chart-wrapper">
                        <Chart />
                    </div>
                    <div className="NperP">
                            1 : 21
                    </div>
                    <div className="NperPtext">
                        จำนวนพยาบาลต่อผู้ป่วย
                    </div>
                    <div className="countbox">  
                        <div className="nursecount">
                        จำนวนพยาบาล
                            <div className="nursetext">
                            20
                            </div>
                        </div>
                        <div className="pateintcount">
                        จำนวนผู้ป่วย
                            <div className="patienttext">
                            420
                            </div>
                        </div>
                    </div>
            </div>
            <Navbar2 />
            {/* <Navbar /> */}
        </div>
        
    )
}
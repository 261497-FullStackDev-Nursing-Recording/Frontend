import Chart from "../Component/DonughnutChart";
import { AiOutlineHome } from "react-icons/Ai";
import "./DashboardPage.css";
import Navbar from "../Component/Navbarbottom";

export default function Dashboard(){
    return(
        <div className="dashboard-container">
            <div className="centered-content">
                <AiOutlineHome className="HomeLogo"/>
                    <div className="chart-wrapper">
                        <Chart />
                    </div>
                    <div>
                        
                    </div>
            </div>
            <Navbar />
        </div>
        
    )
}
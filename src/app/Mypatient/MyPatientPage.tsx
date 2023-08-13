"use client";
import Navbar from "@/Component/Navbarbottom";
import P_Card from "./P_Card";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import "./MyPatientPage.css";

export default function Mypatient() {
  return (
    <div>
      <div className="flex justify-center mt-[40px] mb-[20px] text-xl">
        <LocalHospitalRoundedIcon
          sx={{ fontSize: "60px" }}
        ></LocalHospitalRoundedIcon>
      </div>
      <h1 className="flex justify-center mb-[20px] text-black font-extrabold text-3xl">
        My Patients
      </h1>
      <div className="container">
        <P_Card />
        <P_Card />
        <P_Card />
        <P_Card />
        <P_Card />
      </div>
      <Navbar />
    </div>
  );
}

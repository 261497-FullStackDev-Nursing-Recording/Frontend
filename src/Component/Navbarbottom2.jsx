import { BottomNavigationAction } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation/BottomNavigation';
import { AiOutlineHome,AiOutlineFileAdd } from "react-icons/Ai";
import { FiUsers } from "react-icons/Fi";
// import Box from '@mui/material/Box';
import Link from 'next/link';
import "../Component/Navbarbottom2.css";
import Typography from '@mui/material/Typography';



export default function Navbar2(){
    const value = 0;
    return(
        <div className="Navbar">
          <hr/>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label={
            <Typography variant="body2" style={{ fontFamily: 'Kanit', fontSize: 16 }}>
              Dashboard
            </Typography>
          } icon={<AiOutlineHome />} />
          <BottomNavigationAction label={
            <Typography variant="body2" style={{ fontFamily: 'Kanit', fontSize: 16 }}>
              Rocord
            </Typography>
          } icon={<AiOutlineFileAdd />} />
          <BottomNavigationAction label={
            <Typography variant="body2" style={{ fontFamily: 'Kanit', fontSize: 16 }}>
              Patient
            </Typography>
          } icon={<FiUsers />} />
        </BottomNavigation>
        </div>
    )
}
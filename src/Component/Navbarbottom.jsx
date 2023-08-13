import "daisyui/dist/full.css";
import "../Component/Navbarbuttom.css";
import Link from "next/link";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';

export default function Navbar() {
	return (
		<div className="btm-nav">
			<button className="Home">
				<Link href="/Dashboard">
					<div className="Home">
						<HomeRoundedIcon />
						<span className="btm-nav-label">Home</span>
					</div>
				</Link>
			</button>

			<button className="Record">
			<Link href="/Addpt">
				<PersonSearchRoundedIcon />
				<span className="btm-nav-label">Record</span>
			</Link>
			</button>

			<button className="Patient">
				<Link href="/InsideMypatient">
				<LocalHospitalRoundedIcon />
				<span className="btm-nav-label">Patient</span>
				</Link>
			</button>
		</div>
	);
}

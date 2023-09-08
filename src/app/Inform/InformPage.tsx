import Navbar from "../../Component/Navbarbottom";
import "./InformPage.css";
import AForm from "../../Component/aForm";
import OForm from "@/Component/oForm";
import IForm from "@/Component/iForm";
import EForm from "@/Component/eForm";
export default function Inform() {
	return (
		<div className="inform-container">
			
			<div className="svgcontainer">
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
					<g
						id="SVGRepo_tracerCarrier"
						strokeLinecap="round"
						strokeLinejoin="round"
					></g>
					<g id="SVGRepo_iconCarrier">
						{" "}
						<path
							d="M16 4C18.175 4.01211 19.3529 4.10856 20.1213 4.87694C21 5.75562 21 7.16983 21 9.99826V15.9983C21 18.8267 21 20.2409 20.1213 21.1196C19.2426 21.9983 17.8284 21.9983 15 21.9983H9C6.17157 21.9983 4.75736 21.9983 3.87868 21.1196C3 20.2409 3 18.8267 3 15.9983V9.99826C3 7.16983 3 5.75562 3.87868 4.87694C4.64706 4.10856 5.82497 4.01211 8 4"
							stroke="#1C274C"
							strokeWidth="1.5"
						></path>{" "}
						<path
							d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z"
							stroke="#1C274C"
							strokeWidth="1.5"
						></path>{" "}
						<path
							d="M15 13L12 13M12 13L9 13M12 13L12 10M12 13L12 16"
							stroke="#1C274C"
							strokeWidth="1.5"
							strokeLinecap="round"
						></path>{" "}
					</g>
				</svg>
			</div>

			<div className="patientheaddata">
					<div className="top">Name</div>
					<div className="Name">
						Name
					</div>
					
					<div className="top">Identification ID</div>
					<div className="ID">
						ID
					</div>
				</div>
				
			<div className="formlayout">
			<AForm />
			<OForm/>
			<IForm/>
			<EForm/>
			</div>
			
			<Navbar />
		</div>
	);
}
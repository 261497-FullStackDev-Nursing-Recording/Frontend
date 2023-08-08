"use client";
import Navbar from "@/Component/Navbarbottom";
import "./MyPatientPage.css";
import Carddata from "../InsideMypatient/Carddata"
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function Mypatient() {
	return (
		<div>
			<div className="Container">
					{/* <div>Name</div> */}
					<div className="Name">
						Name
					</div>
					
					{/* <div>ID</div> */}
					<div className="ID">
						ID
					</div>
			<div className="buttoncontainer">			
				<Stack direction="row" spacing={2}>
							<Button variant="outlined" color="success"  size="large" startIcon={<AddIcon />}>
								ADD
							</Button>
							<Button variant="outlined" color="error"  size="large" endIcon={<DeleteIcon />}>
								DEL
							</Button>
					{/* <Button variant="outlined" color="success">
						Error
					</Button>
					<Button variant="outlined" color="error">
						Error
					</Button> */}
				</Stack>
				
			</div>
				<div className="containercard">
				<Carddata/>
				</div>	
				<div className="card">

				</div>
			</div>
			<Navbar />
		</div>
	);
}
